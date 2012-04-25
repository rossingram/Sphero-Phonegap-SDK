//
//  spheroGap.m
//  spheroPhoneGap
//
//  Created by Adam Wilson on 4/19/12.
//  Copyright (c) 2012 Orbotix. All rights reserved.
//

#import "spheroGap.h"
#import "RobotKit/RobotKit.h"


@implementation spheroGap

@synthesize callbackID;

-(void) setupRobotConnection:(NSMutableArray*)arguments withDict:(NSMutableDictionary*)options
{
    self.callbackID = [arguments pop];
    
    [self setupRobot];
    
    // Return to Javascript
    NSMutableString *stringToReturn = [NSMutableString stringWithString: @"SetupRobot:"];
    CDVPluginResult* pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsString:                        [stringToReturn stringByAddingPercentEscapesUsingEncoding:NSUTF8StringEncoding]];
    
    if(robotOnline)
    {
        [self writeJavascript: [pluginResult toSuccessCallbackString:self.callbackID]];
    }else
    {    
        [self writeJavascript: [pluginResult toErrorCallbackString:self.callbackID]];
    }
}


-(void) sendRGBCommand:(NSMutableArray*)arguments withDict:(NSMutableDictionary*)options
{
    //Get the string that javascript sent us 
    self.callbackID = [arguments pop];  
    
    NSString *red   =  [ arguments objectAtIndex:0 ]; 
    NSString *green =  [ arguments objectAtIndex:1 ];
    NSString *blue  =  [ arguments objectAtIndex:2 ];
    
    // Sphero:  RGBLEDOutputCommand:  RED   GREEN  BLUE    -   FLOAT [0 - 1.0]
    [RKRGBLEDOutputCommand sendCommandWithRed:[red floatValue] green :[green floatValue] blue :[blue floatValue]];

    // Communicate with Javascript
    NSMutableString *stringToReturn = [NSMutableString stringWithString: @"StringReceived:"];
    [stringToReturn appendString: red];
    [stringToReturn appendString: green];
    [stringToReturn appendString: blue];
    CDVPluginResult* pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsString:                        [stringToReturn stringByAddingPercentEscapesUsingEncoding:NSUTF8StringEncoding]];
    
    if(robotOnline)
    {
        [self writeJavascript: [pluginResult toSuccessCallbackString:self.callbackID]];
    }else
    {    
        [self writeJavascript: [pluginResult toErrorCallbackString:self.callbackID]];
    }
}

-(void) sendBackLEDCommand:(NSMutableArray*)arguments withDict:(NSMutableDictionary*)options
{
    //Get the string that javascript sent us 
    self.callbackID = [arguments pop];  
    
    NSString *brightness   =  [ arguments objectAtIndex:0 ]; 
    
    // Sphero:  BackLEDCommand  -  brightness  FLOAT [0 - 1.0]
    [RKBackLEDOutputCommand sendCommandWithBrightness:[brightness floatValue]];
    
    // Communicate with Javascript
    NSMutableString *stringToReturn = [NSMutableString stringWithString: @"StringReceived:"];
    [stringToReturn appendString: brightness];
    
    CDVPluginResult* pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsString:                        [stringToReturn stringByAddingPercentEscapesUsingEncoding:NSUTF8StringEncoding]];
    
    if(robotOnline)
    {
        [self writeJavascript: [pluginResult toSuccessCallbackString:self.callbackID]];
    }else
    {    
        [self writeJavascript: [pluginResult toErrorCallbackString:self.callbackID]];
    }
}

-(void) sendRollCommand:(NSMutableArray*)arguments withDict:(NSMutableDictionary*)options
{
    //Get the string that javascript sent us 
    self.callbackID = [arguments pop];  
    
    NSString *heading   =  [ arguments objectAtIndex:0 ]; 
    NSString *velocity  =  [ arguments objectAtIndex:1 ];
    
    // Sphero:  RollCommand:  heading  FLOAT [0 - 360] :  velocity  FLOAT [0 - 1.0] 
    [RKRollCommand sendCommandWithHeading:[heading floatValue] velocity:[velocity floatValue]];
    
    // Communicate with Javascript
    NSMutableString *stringToReturn = [NSMutableString stringWithString: @"StringReceived:"];
    [stringToReturn appendString: heading];
    [stringToReturn appendString: velocity];
    
    CDVPluginResult* pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsString:                        [stringToReturn stringByAddingPercentEscapesUsingEncoding:NSUTF8StringEncoding]];
    
    if(robotOnline)
    {
        [self writeJavascript: [pluginResult toSuccessCallbackString:self.callbackID]];
    }else
    {    
        [self writeJavascript: [pluginResult toErrorCallbackString:self.callbackID]];
    }
}


-(void) sendCalibrateCommand:(NSMutableArray*)arguments withDict:(NSMutableDictionary*)options
{
    //Get the string that javascript sent us 
    self.callbackID = [arguments pop];  
    
    NSString *heading   =  [ arguments objectAtIndex:0 ]; 
    
    // Sphero:  CalibrateCommand:  heading  FLOAT [0 - 360]  
    [RKCalibrateCommand sendCommandWithHeading:[heading floatValue]];
    
    // Communicate with Javascript
    NSMutableString *stringToReturn = [NSMutableString stringWithString: @"StringReceived:"];
    [stringToReturn appendString: heading];
    
    CDVPluginResult* pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsString:                        [stringToReturn stringByAddingPercentEscapesUsingEncoding:NSUTF8StringEncoding]];
    
    if(robotOnline)
    {
        [self writeJavascript: [pluginResult toSuccessCallbackString:self.callbackID]];
    }else
    {    
        [self writeJavascript: [pluginResult toErrorCallbackString:self.callbackID]];
    }
}

-(void) sendGoToSleepCommand:(NSMutableArray*)arguments withDict:(NSMutableDictionary*)options
{
    //Get the string that javascript sent us 
    self.callbackID = [arguments pop];  
    
    // Sphero:  Go to Sleep Sphero 
    [RKGoToSleepCommand sendCommand];
    
    // Communicate with Javascript
    NSMutableString *stringToReturn = [NSMutableString stringWithString: @"Go to Sleep:"];
    
    CDVPluginResult* pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsString:                        [stringToReturn stringByAddingPercentEscapesUsingEncoding:NSUTF8StringEncoding]];
    
    if(robotOnline)
    {
        [self writeJavascript: [pluginResult toSuccessCallbackString:self.callbackID]];
    }else
    {    
        [self writeJavascript: [pluginResult toErrorCallbackString:self.callbackID]];
    }
}

-(void) sendPingCommand:(NSMutableArray*)arguments withDict:(NSMutableDictionary*)options
{
    //Get the string that javascript sent us 
    self.callbackID = [arguments pop];  
    
    // Sphero:  Ping Command
    [RKPingCommand sendCommand];
    
    // Communicate with Javascript
    NSMutableString *stringToReturn = [NSMutableString stringWithString: @"Ping:"];
    
    CDVPluginResult* pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsString:                        [stringToReturn stringByAddingPercentEscapesUsingEncoding:NSUTF8StringEncoding]];
    
    if(robotOnline)
    {
        [self writeJavascript: [pluginResult toSuccessCallbackString:self.callbackID]];
    }else
    {    
        [self writeJavascript: [pluginResult toErrorCallbackString:self.callbackID]];
    }
}

-(void) sendRawMotorValuesCommand:(NSMutableArray*)arguments withDict:(NSMutableDictionary*)options
{
    //Get the string that javascript sent us 
    self.callbackID = [arguments pop];  
    
    NSString *leftMode      =  [ arguments objectAtIndex:0 ]; 
    NSString *leftPower     =  [ arguments objectAtIndex:1 ]; 
    NSString *rightMode     =  [ arguments objectAtIndex:2 ]; 
    NSString *rightPower    =  [ arguments objectAtIndex:3 ]; 
    
    // Sphero:  RawMotorCommand leftMode, leftPower, rightMode, rightPower
    [RKRawMotorValuesCommand sendCommandWithLeftMode:[leftMode intValue] leftPower:[leftPower intValue] rightMode:[rightMode intValue] rightPower:[rightPower intValue]];
    
    // Communicate with Javascript
    NSMutableString *stringToReturn = [NSMutableString stringWithString: @"StringReceived:"];
    [stringToReturn appendString: leftMode];
    [stringToReturn appendString: leftPower];
    [stringToReturn appendString: rightMode]; 
    [stringToReturn appendString: rightPower];
    
    CDVPluginResult* pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsString:                        [stringToReturn stringByAddingPercentEscapesUsingEncoding:NSUTF8StringEncoding]];
    
    if(robotOnline)
    {
        [self writeJavascript: [pluginResult toSuccessCallbackString:self.callbackID]];
    }else
    {    
        [self writeJavascript: [pluginResult toErrorCallbackString:self.callbackID]];
    }
}

-(void) sendStabilizationCommand:(NSMutableArray*)arguments withDict:(NSMutableDictionary*)options
{
    //Get the string that javascript sent us 
    self.callbackID = [arguments pop];  
    
    NSString *state      =  [ arguments objectAtIndex:0 ]; 
    
    // Sphero:  StabilizationCommand :  State On = 0x01  State Off = 0x00
    [RKStabilizationCommand sendCommandWithState:[state boolValue]];
    
    // Communicate with Javascript
    NSMutableString *stringToReturn = [NSMutableString stringWithString: @"Stabilization:"];
    [stringToReturn appendString: state];

    
    CDVPluginResult* pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsString:                        [stringToReturn stringByAddingPercentEscapesUsingEncoding:NSUTF8StringEncoding]];
    
    if(robotOnline)
    {
        [self writeJavascript: [pluginResult toSuccessCallbackString:self.callbackID]];
    }else
    {    
        [self writeJavascript: [pluginResult toErrorCallbackString:self.callbackID]];
    }
}


- (void) setupRobot;
{
    // Sphero : Connect to Sphero
    [[NSNotificationCenter defaultCenter] addObserver:self selector:@selector(handleRobotOnline) name:RKDeviceConnectionOnlineNotification object:nil];
    if ([[RKRobotProvider sharedRobotProvider] isRobotUnderControl]) {
        [[RKRobotProvider sharedRobotProvider] openRobotConnection];        
    }
}


- (void)handleRobotOnline {
    /*The robot is now online, we can begin sending commands*/
    if(!robotOnline) {
        /* Send startup commands to Sphero Here: */
    }
    robotOnline = YES;
}

-(void)appDidBecomeActive:(NSNotification*)notification {
    /*When the application becomes active after entering the background we try to connect to the robot*/
}

@end
