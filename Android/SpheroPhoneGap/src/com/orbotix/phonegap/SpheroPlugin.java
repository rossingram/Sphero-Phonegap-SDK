package com.orbotix.phonegap;

import android.util.Log;
import com.phonegap.api.Plugin;
import orbotix.robot.base.*;
import orbotix.robot.sensor.*;
import org.apache.cordova.api.PluginResult;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.util.List;

/**
 * Created by Orbotix Inc.
 * Date: 4/19/12
 *
 * @author Adam Williams
 */
public class SpheroPlugin extends Plugin {

    public final static String TAG = "SpheroPlugin";

    private final static String sCommand              = "COMMAND";
    private final static String sStartStreaming       = "START_STREAMING";
    private final static String sStopStreaming        = "STOP_STREAMING";
    
    private String mStreamingCallbackId = "";
    
    private DeviceMessenger.AsyncDataListener mAsyncDataListener = null;

    @Override
    public PluginResult execute(String action, JSONArray args, String callbackId) {

        Robot robot = null;
        
        if(RobotProvider.getDefaultProvider().getControlledRobots().size() > 0){
            
            robot = RobotProvider.getDefaultProvider().getControlledRobots().get(0);
        }

        if(robot != null){
            if(action.equals(sCommand)){

                Log.i(TAG, "Running DeviceCommand with json: "+args.toString());

                if(args.length() == 1){
                    try {
                        
                        JSONObject o = args.getJSONObject(0);
                        DeviceCommand c = DeviceCommandFactory.createFromJson(o);
                        robot.doCommand(c, 0);

                        return new PluginResult(PluginResult.Status.OK);
                        
                    } catch (JSONException e) {
                        Log.e(TAG, "Failed to get command from argument to PhoneGap plugin.", e);
                        return new PluginResult(PluginResult.Status.ERROR, e.getMessage());
                    }
                }
            }else if(action.equals(sStartStreaming)){

                if(mAsyncDataListener == null){
                    mAsyncDataListener = new DeviceMessenger.AsyncDataListener() {
                        @Override
                        public void onDataReceived(DeviceAsyncData data) {

                            if(data instanceof DeviceSensorsAsyncData){

                                processAsyncData((DeviceSensorsAsyncData)data);
                            }
                        }
                    };

                    DeviceMessenger.getInstance().addAsyncDataListener(robot, mAsyncDataListener);

                    try {

                        //Get streaming params
                        final int divisor = args.getInt(0);
                        final int packet_frames = args.getInt(1);
                        final int sensor_mask = args.getInt(2);
                        final int packet_count = args.getInt(3);

                        Log.i(TAG, "Starting streaming. Mask is:"+sensor_mask);

                        //Create command to start streaming\
                        SetDataStreamingCommand.sendCommand(
                                robot,
                                divisor,
                                packet_frames,
                                sensor_mask,
                                packet_count
                        );

                    } catch (JSONException e) {
                        Log.e(TAG, "Failed to start streaming.", e);
                        return new PluginResult(PluginResult.Status.ERROR, e.getMessage());
                    }

                    //Set the js callback id
                    mStreamingCallbackId = callbackId;

                    PluginResult result = new PluginResult(PluginResult.Status.NO_RESULT);
                    result.setKeepCallback(true);
                    return result;
                }
            }else if(action.equals(sStopStreaming)){

                if(mAsyncDataListener != null){

                    DeviceMessenger.getInstance().removeAsyncDataListener(robot, mAsyncDataListener);

                    mAsyncDataListener = null;

                    SetDataStreamingCommand.sendCommand(robot, 0, 0, SetDataStreamingCommand.DATA_STREAMING_MASK_OFF, 0);

                    //Send no result with the streaming callback id to clear the callback
                    success(new PluginResult(PluginResult.Status.NO_RESULT), mStreamingCallbackId);

                    mStreamingCallbackId = null;

                    return new PluginResult(PluginResult.Status.OK);
                }
            }
        }

        return new PluginResult(PluginResult.Status.NO_RESULT);
    }
    
    private void processAsyncData(DeviceSensorsAsyncData data){
        
        if(mStreamingCallbackId != null && !mStreamingCallbackId.equals("")){

            List<DeviceSensorsData> sensor_data = data.getAsyncData();

            if(sensor_data != null){
                for(DeviceSensorsData d : sensor_data){

                    JSONObject o   = new JSONObject();

                    try {
                        fillGyroData(d, o);
                        fillAccelerometerData(d, o);
                        fillAttitudeData(d, o);
                    } catch (JSONException e) {
                        Log.e(TAG, "Failed to put streaming data into json.", e);
                    }

                    PluginResult result = new PluginResult(PluginResult.Status.OK, o);
                    result.setKeepCallback(true);
                    success(result, mStreamingCallbackId);
                }
            }

        }
    }

    private void fillGyroData(DeviceSensorsData data, JSONObject o) throws JSONException {

        GyroData d = data.getGyroData();

        if(d != null){
            JSONObject gyro_obj = new JSONObject();

            JSONObject filtered = new JSONObject();
            filtered.put("x", d.getRotationRateFiltered().x);
            filtered.put("y", d.getRotationRateFiltered().y);
            filtered.put("z", d.getRotationRateFiltered().z);

            JSONObject raw = new JSONObject();
            raw.put("x", d.getRotationRateRaw().x);
            raw.put("y", d.getRotationRateRaw().y);
            raw.put("z", d.getRotationRateRaw().z);

            gyro_obj.put("filtered", filtered);
            gyro_obj.put("raw", raw);

            o.put("gyro", gyro_obj);
        }
    }

    private void fillAccelerometerData(DeviceSensorsData data, JSONObject o) throws JSONException {

        AccelerometerData d = data.getAccelerometerData();

        if(d != null){
            JSONObject accel_obj = new JSONObject();

            JSONObject filtered = new JSONObject();
            filtered.put("x", d.getFilteredAcceleration().x);
            filtered.put("y", d.getFilteredAcceleration().y);
            filtered.put("z", d.getFilteredAcceleration().z);

            JSONObject raw = new JSONObject();
            raw.put("x", d.getRawAcceleration().x);
            raw.put("y", d.getRawAcceleration().y);
            raw.put("z", d.getRawAcceleration().z);

            accel_obj.put("filtered", filtered);
            accel_obj.put("raw", raw);

            o.put("accelerometer", accel_obj);
        }
    }

    private void fillAttitudeData(DeviceSensorsData data, JSONObject o) throws JSONException {

        AttitudeData d = data.getAttitudeData();

        if(d != null){
            JSONObject attitude_obj = new JSONObject();

            attitude_obj.put("roll", d.getAttitudeSensor().roll);
            attitude_obj.put("pitch", d.getAttitudeSensor().pitch);
            attitude_obj.put("yaw", d.getAttitudeSensor().yaw);

            o.put("attitude", attitude_obj);
        }
    }

    private void fillMagnetometerData(DeviceSensorsData data, JSONObject o) throws JSONException {

        MagnetometerData d = data.getMagnetometerData();

        if(d != null){
            JSONObject magnet = new JSONObject();
        }
    }
}
