//
//  RCTDeviceExtension.m
//  RNDemo
//
//  Created by Vic on 15/9/24.
//  Copyright © 2015年 Facebook. All rights reserved.
//

#import "RCTDeviceExtension.h"
#import "RCTUtils.h"
#import "RCTEventDispatcher.h"
#import "RCTConvert.h"

static NSDictionary *CurrentDimensions()
{
  CGFloat width = MIN(RCTScreenSize().width, RCTScreenSize().height);
  CGFloat height = MAX(RCTScreenSize().width, RCTScreenSize().height);
  CGFloat scale = RCTScreenScale();
  if (UIDeviceOrientationIsLandscape([UIDevice currentDevice].orientation)) {
    width = MAX(RCTScreenSize().width, RCTScreenSize().height);
    height = MIN(RCTScreenSize().width, RCTScreenSize().height);
  }
  
  return @{@"width":@(width),
           @"height":@(height),
           @"scale":@(scale)};

}

@implementation RCTDeviceExtension

@synthesize bridge = _bridge;

RCT_EXPORT_MODULE();


- (instancetype)init
{
  self = [super init];
  if (self) {
    [[NSNotificationCenter defaultCenter] addObserver:self selector:@selector(orientationDidChange:) name:UIDeviceOrientationDidChangeNotification object:nil];
  }
  return self;
}

- (void)dealloc
{
  [[NSNotificationCenter defaultCenter] removeObserver:self];
}


- (NSDictionary *)constantsToExport
{
  return @{@"EVENT_ORIENTATION":@"orientationDidChange"};
}

#pragma mark - Notification Selector
- (void)orientationDidChange:(id)noti
{
  [_bridge.eventDispatcher sendDeviceEventWithName:@"orientationDidChange"
                                              body:@{@"Orientation":UIDeviceOrientationIsLandscape([UIDevice currentDevice].orientation) ? @"Landscape":@"Portrait",
                                                     @"Dimensions":CurrentDimensions()}];
}

#pragma mark - Public APIs

RCT_EXPORT_METHOD(getCurrentDimensions:(RCTResponseSenderBlock)callback) {
  
  callback(@[[NSNull null], CurrentDimensions()]);
  
}






@end

