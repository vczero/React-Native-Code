//
//  NSString+VersionCompare.h
//  CtripFxKit
//
//  Created by Vic on 15/6/11.
//  Copyright (c) 2015年 vincent. All rights reserved.
//

#import <Foundation/Foundation.h>

@interface NSString (CompareToVersion)

-(NSComparisonResult)compareToVersion:(NSString *)version;

-(BOOL)isOlderThanVersion:(NSString *)version;
-(BOOL)isNewerThanVersion:(NSString *)version;
-(BOOL)isEqualToVersion:(NSString *)version;
-(BOOL)isEqualOrOlderThanVersion:(NSString *)version;
-(BOOL)isEqualOrNewerThanVersion:(NSString *)version;

@end
