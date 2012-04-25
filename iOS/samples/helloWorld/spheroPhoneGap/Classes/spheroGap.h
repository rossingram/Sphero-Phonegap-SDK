//
//  spheroGap.h
//  spheroPhoneGap
//
//  Created by Adam Wilson on 4/19/12.
//  Copyright (c) 2012 Orbotix. All rights reserved.
//

#import <Foundation/Foundation.h>
#import <Cordova/CDVPlugin.h>


@interface spheroGap : CDVPlugin {
    NSString* callbackID;
    BOOL robotOnline;
}

@property (nonatomic, copy) NSString* callbackID;

-(void) setupRobotConnection:       (NSMutableArray*)arguments withDict:(NSMutableDictionary*)options;
-(void) sendRGBCommand:             (NSMutableArray*)arguments withDict:(NSMutableDictionary*)options;
-(void) sendBackLEDCommand:         (NSMutableArray*)arguments withDict:(NSMutableDictionary*)options;
-(void) sendRollCommand:            (NSMutableArray*)arguments withDict:(NSMutableDictionary*)options;
-(void) sendCalibrateCommand:       (NSMutableArray*)arguments withDict:(NSMutableDictionary*)options;
-(void) sendGoToSleepCommand:       (NSMutableArray*)arguments withDict:(NSMutableDictionary*)options;
-(void) sendPingCommand:            (NSMutableArray*)arguments withDict:(NSMutableDictionary*)options;
-(void) sendStabilizationCommand:   (NSMutableArray*)arguments withDict:(NSMutableDictionary*)options;
-(void) sendRawMotorValuesCommand:  (NSMutableArray*)arguments withDict:(NSMutableDictionary*)options;
-(void) setupRobot;
-(void) handleRobotOnline;

@end
