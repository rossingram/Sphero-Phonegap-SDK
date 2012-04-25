# Sphero PhoneGap SDK - (Getting Started) - iOS #
 
- - -





## Getting Started ##

Class documentation for the iOS SDK is located at

 * [http://docs.gosphero.com/ios/robot_kit/hierarchy.html](http://docs.gosphero.com/ios/robot_kit/hierarchy.html "robotkit")

## Requirements within Xcode

 * Add ExternalAccessories.Framework
 
 * Add RobotKit.Framework

 * Change Build Settings -> Linking -> Other Linker Flags
	* -lstdc++
	* -all_load
	* -ObjC
	* -lsqlite3

## Modify Xcode ##

 * Change Cordova.plist :
	*  Under plugins, add Row :  sphero  ->  spheroGap

 * Change Application-info.plist
	* Application does not run in background ->  YES
	* (not required but helpful)

 * Search the Build Settings for:  CLANG_ENABLE_OBJC_ARC
	* change from YES to NO

 * Make sure you are building for an iOS Device, NOT the simulator!

## Adding the SpheroGap Plugin  ##

 * Drag spheroGap.m and spheroGap.h to the Plugins dir within Xcode.

 * Drag the www folder to your project in Xcode, along with spheroGap.js
	* Add  `<script src="spheroGap.js"></script>`    

## Connect to Sphero

It is required that you run RKSetupRobotConnection before sending commands to Sphero.  This goes within the index.html file.

	function onDeviceReady()
	{
        RKDeviceCommand.RKSetupRobotConnection(["Sphero"],
                                               function(result) {
                                               alert("Connection to Sphero has failed");
                                               },
                                               function(error) {
                                               alert("You have Connected to Sphero");
                                               }
                                               );
         
        
        RKDeviceCommand.RKRGBLEDOutputCommand(["0.00","1.0","0.6"],function(result) {},function(error) {});

	}



 

 