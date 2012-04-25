package com.orbotix.phonegap;

import android.util.Log;
import com.phonegap.api.Plugin;
import orbotix.robot.base.*;
import orbotix.robot.sensor.DeviceSensorsData;
import orbotix.robot.sensor.GyroData;
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
            }
        }

        return new PluginResult(PluginResult.Status.NO_RESULT);
    }
    
    private void processAsyncData(DeviceSensorsAsyncData data){
        
        if(mStreamingCallbackId != null && !mStreamingCallbackId.equals("")){

            List<DeviceSensorsData> sensor_data = data.getAsyncData();

            if(sensor_data != null){
                for(DeviceSensorsData d : sensor_data){

                    //Gyro data
                    GyroData gyro = d.getGyroData();
                    if(gyro != null){

                        JSONObject o   = new JSONObject();
                        JSONArray rate = new JSONArray();
                        rate.put(gyro.getRotationRateFiltered().x);
                        rate.put(gyro.getRotationRateFiltered().y);
                        rate.put(gyro.getRotationRateFiltered().z);

                        try {
                            o.put("gyro_filtered", rate);


                            PluginResult result = new PluginResult(PluginResult.Status.OK, o);
                            result.setKeepCallback(true);
                            success(result, mStreamingCallbackId);


                        } catch (JSONException e) {
                            Log.e(TAG, "Failed to put filtered rotation rate.", e);
                        }
                    }
                }
            }

        }
    }
}
