/**
 * Sphero PhoneGap SDK
 * Copyright (c) Orbotix 2012 - Have fun!
 *
 */
var mySphero = {
    
    
    
    // RKSetupRobotConnection
    /************************************************************************************
     + (void) sendCommand:		
     
     Initialize communication with Sphero
     
     @Parameters:  none
     ************************************************************************************/    
    
    setupRobot: function(types, success, fail) {
       
        success = (success)?success:function(){};
        fail = (fail)?fail:function(){};
        
        return cordova.exec(success, fail, "sphero", "setupRobotConnection", types);
    },
    
    
    
    
    
    // RKRollCommand
    /************************************************************************************
     + (void) sendCommandWithHeading:		(float) 	heading
                            velocity:		(float) 	velocity 
     
     Sends a roll command to the robot for the heading and velocity.
     
     @Parameters:
     heading	The angle in degrees from 0 to 360 for the robot to head to.
     velocity	The velocity from 0.0, no motion, to 1.0, full velocity for the robot to travel at.
     ************************************************************************************/    
    
    roll: function(types, success, fail) {
        success = (success)?success:function(){};
        fail = (fail)?fail:function(){};
        return cordova.exec(success, fail, "sphero", "sendRollCommand", types);
    },
    
    
    
    
    
    // RKRGBLEDOutputCommand
    /************************************************************************************
     + (void) sendCommandWithRed:		(float) 	red
                            green:		(float) 	green
                            blue:		(float) 	blue 
     
     This class is used to change the red, green, blue brightness of the RGB LED on a Sphero.
     
     Parameters:
     red	The red brightness value between 0.0 to 1.0 with 0.0 being off and 1.0 being full brightness.
     green	The green brightness value between 0.0 to 1.0 with 0.0 being off and 1.0 being full brightness.
     blue	The blue brightness value between 0.0 to 1.0 with 0.0 being off and 1.0 being full brightness.
     ************************************************************************************/
    
    rgb: function(types, success, fail){
        success = (success)?success:function(){};
        fail = (fail)?fail:function(){};
        return cordova.exec(success, fail, "sphero", "sendRGBCommand", types);
    },
    
    
    
    
    
    // RKBackLEDOutputCommand
    /************************************************************************************
     + (void) sendCommandWithBrightness:		(float) 	brightness
     
     This class is used to change the back blue LED brightness on Sphero. The back LED is designed to be inline with the forward direction (0° heading) of Sphero. Thus this can be used to aid in aiming Sphero (calibration), so a 0° heading set in the roll command goes in the user's prefered direction.
     
     Parameters:
     brightness	The brightness value between 0.0 to 1.0 where 0.0 is off and 1.0 is full brightness.
     ************************************************************************************/
    
    backLED: function(types, success, fail){
        success = (success)?success:function(){};
        fail = (fail)?fail:function(){};
        return cordova.exec(success, fail, "sphero", "sendBackLEDCommand", types);
    },
    
    
    
    
    
    // RKCalibrateCommand
    /*************************************************************************************
     + (void) sendCommandWithHeading:		(float) 	heading	
     
     Class that encapsulates a calibrate command used to set the 0° heading. Client code can use this along with RKBackLEDOutputCommand and RKRollCommand to aim Sphero so sending a roll command with 0° moves it in a user desired direction.
     
     Parameters:
     heading	Typically this should be 0.0, but setting it will add to the current heading when setting the new 0° point. The value is in degrees.
     *************************************************************************************/
    
    calibrate: function(types, success, fail){
        success = (success)?success:function(){};
        fail = (fail)?fail:function(){};
        return cordova.exec(success, fail, "sphero", "sendCalibrateCommand", types);
    },
    
    
    
    
    // RKGoToSleepCommand
    /*************************************************************************************
     + (void) sendCommand:	
     
     Class that encapsulates a go to sleep command which can be sent to a robot to have it sleep until the user wakes it or for a given time interval.
     
     Parameters:  none.
     *************************************************************************************/
    
    sleep: function(types, success, fail){
        success = (success)?success:function(){};
        fail = (fail)?fail:function(){};
        return cordova.exec(success, fail, "sphero", "sendGoToSleepCommand", types);
    },
    
    
    
    
    // RKPingCommand
    /*************************************************************************************
     + (void) sendCommand:		
     
     This is a simple command that requires no parameters which can be used to test the communication with the robot.
     
     Parameters:  none.
     *************************************************************************************/
    
    ping: function(types, success, fail){
        success = (success)?success:function(){};
        fail = (fail)?fail:function(){};
        return cordova.exec(success, fail, "sphero", "sendPingCommand", types);
    },
    
    
    
    
    // RKRawMotorValuesCommand
    /*************************************************************************************
     + (void) sendCommandWithLeftMode:		(RKRawMotorMode) 	leftMode
                            leftPower:		(RKRawMotorPower) 	leftPower
                            rightMode:		(RKRawMotorMode) 	rightMode
                            rightPower:		(RKRawMotorPower) 	rightPower 
     
     This command is used to set raw motor values to move the ball without the control system maintaining a heading and speed. The control system stabilization engine will be turned off when this command is run, and clients need to use RKStabilizationCommand to turn it back on.
     
     Parameters:
     leftMode	The left motor mode. 0 = stopped, 1 = forward, 2 = reverse, 3 = brake. 4 = ignore.
     leftPower	A value from 0 to 255 for the power to applied to the motor.
     rightMode	The right motor mode. 0 = stopped, 1 = forward, 2 = reverse, 3 = brake 4 = ignore.
     rightPower	A value from 0 to 255 for the power to applied to the motor.
     *************************************************************************************/
    
    rawMotors: function(types, success, fail){
        success = (success)?success:function(){};
        fail = (fail)?fail:function(){};
        return cordova.exec(success, fail, "sphero", "sendRawMotorValuesCommand", types);
    },
    
    
    
    
    //  RKStabilizationCommand
    /*************************************************************************************
     + (void) sendCommandWithState:		(RKStabilizationState) 	state	
     
     This class is used to turn off the control system on Sphero which stabilizes it.
     
     Parameters:
     state	The new state for the control system stabilization. 0 = Off, 1 = On
     *************************************************************************************/
    
    stabilization: function(types, success, fail){
        success = (success)?success:function(){};
        fail = (fail)?fail:function(){};
        return cordova.exec(success, fail, "sphero", "sendStabilizationCommand", types);
    }
        
    
};
