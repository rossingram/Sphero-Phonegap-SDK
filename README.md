# Sphero PhoneGap SDK

## Setting up for Android:

First, follow the directions in the PhoneGap "Getting Started" guide, at http://phonegap.com/start#android to install the Cordova JavaScript and Java libraries, and to configure your project for Cordova (aka PhoneGap).

Get the Sphero Android SDK at https://github.com/OrbotixInc/MOBILE-ANDROID-SDK and follow the directions in the readme to add RobotLibrary and RobotUILibrary to your project.

After RobotLibrary and RobotUILibrary are in your project's build path, add the line:

	<activity android:name="orbotix.robot.app.StartupActivity" />

to your project manifest. This will allow the StartupActivity to run, which is needed to connect to the Sphero.

Download the Sphero Cordova plugin for Android at https://github.com/Orbotix/MOBILE-PHONEGAP-SDK

Place the spheroplugin.js file into your assets/www folder, and place the SpheroPlugin.java file into your project's source folder.

If you have followed the PhoneGap "Getting Started" guide, you should have an Android Activity in your project that extends the DroidGap class. In this Activity, add the line:

	startActivity(new Intent(this, StartupActivity.class));

to your onCreate method. This will initiate the connection to Sphero. 

Add the following onDestroy implementation:

    @Override
    public void onDestroy() {
        super.onDestroy();

        RobotProvider.getDefaultProvider().disconnectControlledRobots();
    }

This will disconnect from Sphero after exiting the app.

Your main Activity should look something like this:

	import android.content.Intent;
	import android.os.Bundle;
	import orbotix.robot.app.StartupActivity;
	import orbotix.robot.base.RobotProvider;
	import org.apache.cordova.DroidGap;
	
	public class MainActivity extends DroidGap
	{
	    /** Called when the activity is first created. */
	    @Override
	    public void onCreate(Bundle savedInstanceState)
	    {
	        super.onCreate(savedInstanceState);
	        loadUrl("file:///android_asset/www/index.html");
	
	        startActivity(new Intent(this, StartupActivity.class));
    	}
	
    	@Override
    	public void onDestroy() {
        	super.onDestroy();
	
	        RobotProvider.getDefaultProvider().disconnectControlledRobots();
	    }
	}

You're now ready to code to Sphero with JavaScript.


###

## Sphero PhoneGap Javascript

Most interaction with Sphero in the plugin is done with the mySpehro object. mySphero has the following methods for basic commands

*  mySphero

	* setupRobot - 

	* setHeading - heading (int) [0-359]

	* backLED - brightless (float) [0.0 - 1.0]

	* stabilization - state (bool) [0 / 1]

	* roll - heading (int) [0-359], speed (float) [0.0 - 1.0]

	* rotationRate - rate (float) [ 0.0 - 1.0 ]

	* rgb - red (float) [0.0-1.0], green (float) [0.0-1.0], blue (float) [0.0-1.0]

	* sleep - 

	* ping - 

	* rawMotors - 
		* leftMode (int) [0 = off, 1= forward, 2=reverse, 3=brake, 4=ignore ]
		* leftPower (float) [0.0 - 1.0]
		* rightMode  (int) [0 = off, 1= forward, 2=reverse, 3=brake, 4=ignore ]
		* rightPower (float) [0.0 - 1.0]

	* stream (explained below)

For example, to make Sphero drive forward, you would do this:

	mySphero.roll(0, 1);

Which would tell Sphero to roll at 0 degrees heading (directly forward) at a speed of 1 (full speed).

## Streaming

To start streaming, use the "stream" method of the mySphero object, chain config methods to configure the streaming, and then use the "start" method at the end.

	mySphero.stream()
                .withGyro()
                .withListener(function(data){

			 //use the streamed data 
                        var x = data.gyro_filtered[0];
                        var y = data.gyro_filtered[1];
                        var z = data.gyro_filtered[2];

                        console.log("x:"+x+", y:"+y+", z:"+z);
                    })
                .start();

The stream() method returns a StreamingConfig object, the chained configuration methods configure the configuration object, and then the start() method tells the mySphero object to start streaming using the options set in the StreamingConfig object. The plugin will execute the callback included in the withListener method every time streaming data is received. 


