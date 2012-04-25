

function SpheroPlugin(){

    this.listener = null;
};

SpheroPlugin.prototype.setHeading = function(heading, success, fail){

    //heading is an integer between 0 and 359

    success = (success)?success:function(){};
    fail    = (fail)?fail:function(){};

    this.sendCommand(0x01, [heading], success, fail);
};

SpheroPlugin.prototype.backLED = function(brightness, success, fail){

    success = (success)?success:null;
    fail    = (fail)?fail:null;

    //brightness is a float between 0 and 1
    this.sendCommand(0x21, [brightness], success, fail);
};

SpheroPlugin.prototype.stabilization = function(state, success, fail){

    //state is a bool

    success = (success)?success:function(){};
    fail    = (fail)?fail:function(){};

    this.sendCommand(0x02, [state], success, fail);
};

SpheroPlugin.prototype.roll = function(heading, speed, success, fail){

    //heading is an int from 0 to 359
    //speed is a float from 0 to 1

    success = (success)?success:function(){};
    fail    = (fail)?fail:function(){};

    this.sendCommand(0x30, [heading, speed], success, fail);
};

SpheroPlugin.prototype.rotationRate = function(rate, success, fail){

    //rate is a float from 0 to 1

    success = (success)?success:function(){};
    fail    = (fail)?fail:function(){};

    this.sendCommand(0x03, [rate], success, fail);
};

SpheroPlugin.prototype.rgb = function(red, green, blue, success, fail){


    //values are floats from 0 to 1
    success = (success)?success:function(){};
    fail    = (fail)?fail:function(){};

    this.sendCommand(0x20, [red, green, blue], success, fail);
};

SpheroPlugin.prototype.sleep = function(success, fail){

    success = (success)?success:function(){};
    fail    = (fail)?fail:function(){};

    this.sendCommand(0x22, [0, 0], success, fail);
};

SpheroPlugin.prototype.rawMotors = function(left_mode, left_power, right_mode, right_power, success, fail){


    //left_mode and right_mode are ints from 0 to 4
    //left_power and right_power are floats from 0 to 1
    success = (success)?success:function(){};
    fail    = (fail)?fail:function(){};

    this.sendCommand(0x33, [left_mode, left_power, right_mode, right_power], success, fail);
};

SpheroPlugin.prototype.sendCommand = function(id, params, success, fail){

    var command = [{
        "IDENTIFIER": id,
        "PARAMS": params
    }];

    success = (success)?success:null;
    fail    = (fail)?fail:null;

    return cordova.exec(success, fail, "SpheroPlugin", "COMMAND", command);
};

SpheroPlugin.prototype.startStreaming = function(divisor, packet_frames, sensor_mask, packet_count, listener, fail){

    return cordova.exec(listener, function(){}, "SpheroPlugin", "START_STREAMING", [divisor, packet_frames, sensor_mask, packet_count]);
};

SpheroPlugin.prototype.stream = function(){

    return new StreamingConfig(this);
};



/**
 * Config object for starting streaming
 * @param sphero The SpheroPlugin to start streaming
 * @param divisor The divisor of the maximum hz of responses that you wish to stream back to you. A divisor of 1 will
 * stream responses back at 400hz, and a divisor of 2 at 200hz, and so on. Default is 50.
 * @param frames The number of packets included in each stream response. Default is 1.
 * @param count The number of responses to receive before ending streaming. If 0, will stream indefinitely. Default is 0.
 * @param success A callback function to be run if streaming starts successfully
 * @param fail A callback function to be run if streaming starts unsuccessfully.
 */
function StreamingConfig(sphero){

    this.masks = {
        LEFT_MOTOR_BACK_EMF_FILTERED    : 0x00000020,
        RIGHT_MOTOR_BACK_EMF_FILTERED   : 0x00000040,
        MAGNETOMETER_Z_FILTERED         : 0x00000080,
        MAGNETOMETER_Y_FILTERED         : 0x00000100,
        MAGNETOMETER_X_FILTERED         : 0x00000200,
        GYRO_Z_FILTERED                 : 0x00000400,
        GYRO_Y_FILTERED                 : 0x00000800,
        GYRO_X_FILTERED                 : 0x00001000,
        ACCELEROMETER_Z_FILTERED        : 0x00002000,
        ACCELEROMETER_Y_FILTERED        : 0x00004000,
        ACCELEROMETER_X_FILTERED        : 0x00008000,
        IMU_YAW_ANGLE_FILTERED          : 0x00010000,
        IMU_ROLL_ANGLE_FILTERED         : 0x00020000,
        IMU_PITCH_ANGLE_FILTERED        : 0x00040000,
        LEFT_MOTOR_BACK_EMF_RAW         : 0x00200000,
        RIGHT_MOTOR_BACK_EMF_RAW        : 0x00400000,
        MAGNETOMETER_Z_RAW              : 0x00800000,
        MAGNETOMETER_Y_RAW              : 0x01000000,
        MAGNETOMETER_X_RAW              : 0x02000000,
        GYRO_Z_RAW                      : 0x04000000,
        GYRO_Y_RAW                      : 0x08000000,
        GYRO_X_RAW                      : 0x10000000,
        ACCELEROMETER_Z_RAW             : 0x20000000,
        ACCELEROMETER_Y_RAW             : 0x40000000,
        ACCELEROMETER_X_RAW             : 0x80000000
    };

    this.sphero = sphero;

    this.settings = {
        mask: 0,
        divisor: 100,
        frames: 1,
        count: 0,
        listener: function(){},
        success: function(){},
        fail: function(){}
    }


};

StreamingConfig.prototype.withListener = function(listener){

    if(typeof listener === "function"){
        this.settings.listener = listener;
    }
    return this;
};

StreamingConfig.prototype.withDivisor = function(divisor){

    if(typeof divisor === "number" && divisor > 0){
        this.settings.divisor = divisor;
    }
    return this;
}

StreamingConfig.prototype.setStreamingOff = function(){

    this.mask = 0;
    return this;
};

StreamingConfig.prototype.withLeftMotorBackEmfFiltered = function(){

    this.addMask(this.masks.LEFT_MOTOR_BACK_EMF_FILTERED);
    return this;
};

StreamingConfig.prototype.withGyroXFiltered = function(){

    this.addMask(this.masks.GYRO_X_FILTERED);
    return this;
};

StreamingConfig.prototype.withGyroYFiltered = function(){

    this.addMask(this.masks.GYRO_Y_FILTERED);
    return this;
};

StreamingConfig.prototype.withGyroZFiltered = function(){

    this.addMask(this.masks.GYRO_Z_FILTERED);
    return this;
};

StreamingConfig.prototype.withGyroXRaw = function(){

    this.addMask(this.masks.GYRO_X_RAW);
    return this;
};

StreamingConfig.prototype.withGyroYRaw = function(){

    this.addMask(this.masks.GYRO_Y_RAW);
    return this;
};

StreamingConfig.prototype.withGyroZRaw = function(){

    this.addMask(this.masks.GYRO_Z_RAW);
    return this;
};

StreamingConfig.prototype.withGyro = function(){

    return this.withGyroXFiltered()
                .withGyroYFiltered()
                .withGyroZFiltered()
                .withGyroXRaw()
                .withGyroYRaw()
                .withGyroZRaw();
};

StreamingConfig.prototype.addMask = function(mask){

    this.settings.mask = this.settings.mask | mask;
};

StreamingConfig.prototype.start = function(){

    this.sphero.startStreaming(
        this.settings.divisor,
        this.settings.frames,
        this.settings.mask,
        this.settings.count,
        this.settings.listener,
        this.settings.fail);
};

var mySphero = new SpheroPlugin();