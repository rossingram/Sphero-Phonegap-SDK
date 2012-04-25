package com.orbotix.phonegap;

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
