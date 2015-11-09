//
//  ReactVersion.m
//  ReactVersion
//
//  Created by Vic on 15/10/13.
//  Copyright © 2015年 fx-team. All rights reserved.
//

#import "ReactVersion.h"
#import "RCTLog.h"

#import "RCTJavaScriptLoader.h"

#import "UIAlertView+Blocks.h"
#import "NSString+VersionCompare.h"


#define kCurrentReactJsCodeVersion    @"kCurrentReactJsCodeVersion"
#define kPrevReactJsCodeVersion       @"kPrevReactJsCodeVersion"


#define kVersionMode                  @"kVersionMode"

#define kInHousePist @"https://***/catapp.plist"

#define ErrorDomain @"VersionDomain"

@implementation ReactVersion {
    
    NSURLSession *  __URLSession;
    
}

RCT_EXPORT_MODULE();

@synthesize bridge = _bridge;


#pragma -
#pragma mark Object Alloc/Dealloc

- (instancetype)init
{
    self = [super init];
    if (self) {
        [[NSNotificationCenter defaultCenter] addObserver:self selector:@selector(appDidLaunch:) name:UIApplicationDidFinishLaunchingNotification object:nil];
        
        
        NSURLSessionConfiguration *sessionConfiguration = [NSURLSessionConfiguration defaultSessionConfiguration];
        sessionConfiguration.requestCachePolicy = NSURLRequestReloadIgnoringLocalCacheData;
        sessionConfiguration.HTTPCookieAcceptPolicy = NSHTTPCookieAcceptPolicyNever;
        __URLSession = [NSURLSession sessionWithConfiguration:sessionConfiguration delegate:nil delegateQueue:[NSOperationQueue mainQueue]];
        
        
    }
    return self;
}

- (void)dealloc
{
    [[NSNotificationCenter defaultCenter] removeObserver:self];
}



#pragma -
#pragma mark JS Method

RCT_EXPORT_METHOD(getCurrentJsVersion:(RCTPromiseResolveBlock)resolver
                             rejecter:(RCTPromiseRejectBlock)rejecter)
{
    NSString *jsCodeVersion = [[NSUserDefaults standardUserDefaults] stringForKey:kCurrentReactJsCodeVersion] ?: __inAppVersion;
    
    if (jsCodeVersion) {
        resolver(jsCodeVersion);
    } else {
        rejecter([NSError errorWithDomain:ErrorDomain code:(500) userInfo:@{NSLocalizedDescriptionKey: [NSString stringWithFormat:@"Can not get JS Version"]}]);
    }
}


RCT_EXPORT_METHOD(getRemoteVersion:(RCTPromiseResolveBlock)resolver
                          rejecter:(RCTPromiseRejectBlock)rejecter)
{
    NSURLRequest *configRequest = [NSURLRequest requestWithURL:[NSURL URLWithString:@"https://***/version.config"] cachePolicy:NSURLRequestReloadIgnoringLocalAndRemoteCacheData timeoutInterval:10];
    NSURLSessionTask *configTask = [__URLSession dataTaskWithRequest:configRequest completionHandler:^(NSData * data, NSURLResponse * response, NSError * error) {
        
        if (error) {
            rejecter(error);
            return;
        }
        @try {
            
            NSError *serilazationError;
            NSDictionary *config= [NSJSONSerialization JSONObjectWithData:data options:0 error:&serilazationError];
            
            if (serilazationError) {
                rejecter(serilazationError);
                return;
            }
            
            NSString *remoteJsVersion = config[@"bundle_version"];
            if (remoteJsVersion) {
                resolver(remoteJsVersion);
            } else {
                rejecter([NSError errorWithDomain:ErrorDomain code:(500) userInfo:@{NSLocalizedDescriptionKey: [NSString stringWithFormat:@"Can not get JS Version"]}]);
            }
            
        }
        @catch (NSException *exception) {
            rejecter([NSError errorWithDomain:ErrorDomain code:(500) userInfo:@{NSLocalizedDescriptionKey: exception.reason}]);
        }
        
    }];
    [configTask resume];
}


RCT_EXPORT_METHOD(updateVersion:(NSDictionary *)config
                       resolver:(RCTPromiseResolveBlock)resolver
                       rejecter:(RCTPromiseRejectBlock)rejecter)
{
    
    @try {
        
        NSString *remoteJsVersion = config[@"bundle_version"];
        NSString *jsCodeVersion = [[NSUserDefaults standardUserDefaults] stringForKey:kCurrentReactJsCodeVersion] ?: __inAppVersion;
        
        if ([remoteJsVersion isNewerThanVersion:jsCodeVersion]) {
            
            NSURLRequest *request = [NSURLRequest requestWithURL:[NSURL URLWithString:config[@"bundle_url"]] cachePolicy:NSURLRequestReloadIgnoringLocalAndRemoteCacheData timeoutInterval:10];
            NSURLSessionTask *downloadTask = [__URLSession downloadTaskWithRequest:request completionHandler:^(NSURL * location, NSURLResponse * response, NSError * error) {
                
                if (error || !location) {
                    RCTLogWarn(@"Download error. %@",[error description]);
                    rejecter(error);
                    return;
                }
                
                NSError *ioError;
                if ([[NSFileManager defaultManager] copyItemAtPath:[location resourceSpecifier] toPath:[ReactVersion pathForVersion:remoteJsVersion] error:&ioError]) {
                    
                    [[NSUserDefaults standardUserDefaults] setObject:jsCodeVersion forKey:kPrevReactJsCodeVersion];
                    [[NSUserDefaults standardUserDefaults] setObject:remoteJsVersion forKey:kCurrentReactJsCodeVersion];
                    [[NSUserDefaults standardUserDefaults] synchronize];
                    RCTLogInfo(@"Update Js Code success");
                    resolver(remoteJsVersion);
                } else {
                    rejecter(ioError);
                }
                
            }];
            [downloadTask resume];
            
        } else {
            rejecter([NSError errorWithDomain:ErrorDomain code:(500) userInfo:@{NSLocalizedDescriptionKey: @"don't need update"}]);
        }
        
    }
    @catch (NSException *exception) {
        rejecter([NSError errorWithDomain:ErrorDomain code:(500) userInfo:@{NSLocalizedDescriptionKey: exception.reason}]);
    }
   
    
}


RCT_EXPORT_METHOD(reloadVersion:(NSString *)version
                  resolver:(RCTPromiseResolveBlock)resolver
                  rejecter:(RCTPromiseRejectBlock)rejecter)
{
    
    NSString *path;
    if ([version isEqualToString:__inAppVersion]) {
        path = [[NSBundle mainBundle] pathForResource:@"main" ofType:@"jsbundle"];
    } else {
        path = [ReactVersion pathForVersion:version];
    }
    
    if (![[NSFileManager defaultManager] fileExistsAtPath:path]) {
        rejecter([NSError errorWithDomain:ErrorDomain code:(500) userInfo:@{NSLocalizedDescriptionKey: @"no file exists"}]);
        return;
    }

    self.bridge.bundleURL = [NSURL fileURLWithPath:path];
    [self.bridge reload];
   
}

#pragma -
#pragma mark Notif

- (void)appDidLaunch:(id)noti
{
    // check app version
    NSURLRequest *plistRequest = [NSURLRequest requestWithURL:[NSURL URLWithString:kInHousePist]
                                                    cachePolicy:NSURLRequestReloadIgnoringLocalCacheData
                                                timeoutInterval:5];
    
    NSURLSessionDataTask *plistTask =
    [__URLSession dataTaskWithRequest:plistRequest completionHandler:^(NSData * data, NSURLResponse * response, NSError *  error) {
        
        if (error || !data) {
            RCTLogWarn(@"fetch app plist error");
            return;
        }
        
        NSDictionary *plist = [ReactVersion convertPlist:data];
        @try {
            
            NSString *remoteVersion = plist[@"items"][0][@"metadata"][@"bundle-version"];
            NSString *currentVersion = [[NSBundle mainBundle] objectForInfoDictionaryKey:@"CFBundleShortVersionString"];
            
            if ([remoteVersion isNewerThanVersion:currentVersion]) {
                
                NSString *messsage = [NSString stringWithFormat:@"发现新版本%@\n是否更新",remoteVersion];
                [UIAlertView showConfirmationDialogWithTitle:@"提示" message:messsage handler:^(UIAlertView *alertView, NSInteger buttonIndex) {
                    
                    if (buttonIndex != alertView.cancelButtonIndex) {
                        NSString *updateLink = [NSString stringWithFormat:@"itms-services://?action=download-manifest&url=%@",kInHousePist];
                        [[UIApplication sharedApplication] openURL:[NSURL URLWithString:updateLink]];
                        dispatch_after(dispatch_time(DISPATCH_TIME_NOW, (int64_t)(2 * NSEC_PER_SEC)), dispatch_get_main_queue(), ^{
                            exit(0);
                        });
                    }
                    
                }];
                
            } else {
                [self updateJS];
            }
            
        }
        @catch (NSException *exception) {
            RCTLogWarn(@"Error ");
        }
        
    }];
    [plistTask resume];
    
    
}




#pragma -
#pragma mark Sanbox

+ (NSString *)pathForVersion:(NSString *)version
{
    return [[ReactVersion reactPath] stringByAppendingPathComponent:[NSString stringWithFormat:@"%@.js",version]];
}

+ (NSString *)reactPath
{
    return [ReactVersion ensurePath:[[NSSearchPathForDirectoriesInDomains(NSDocumentDirectory, NSUserDomainMask, YES) firstObject] stringByAppendingPathComponent:@"ReactNative"]];
}

+ (NSString *)ensurePath:(NSString *)path
{
    NSFileManager *__fileManager = [NSFileManager defaultManager];
    BOOL rt = NO;
    BOOL isDirecory = NO;
    if (![__fileManager fileExistsAtPath:path isDirectory:&isDirecory]) {
        rt = [__fileManager createDirectoryAtPath:path
                      withIntermediateDirectories:YES
                                       attributes:nil
                                            error:nil];
        if (!rt) {
            RCTLogWarn(@"Error create directory At %@",path);
            return nil;
        }
        return path;
        
    } else {
        
        return path;
        
    }
    
}

#pragma -
#pragma mark Public API
+ (NSURL *)currentVersionPath
{
    NSString *__jsCodeVersion = [[NSUserDefaults standardUserDefaults] stringForKey:kCurrentReactJsCodeVersion];
    
    
    if (__jsCodeVersion
        && [__jsCodeVersion isNewerThanVersion:__inAppVersion]
        && [[NSFileManager defaultManager] fileExistsAtPath:[ReactVersion pathForVersion:__jsCodeVersion]]) {
        
        return [NSURL fileURLWithPath:[ReactVersion pathForVersion:__jsCodeVersion]];
        
    }
    return [[NSBundle mainBundle] URLForResource:@"main" withExtension:@"jsbundle"];
}

static NSString* __inAppVersion;
+ (void)setInAppVersion:(NSString *)version
{
    __inAppVersion = version;
}



#pragma -
#pragma mark Private 


- (void)updateJS
{
    NSString *jsCodeVersion = [[NSUserDefaults standardUserDefaults] stringForKey:kCurrentReactJsCodeVersion] ?: __inAppVersion;
    
    NSURLRequest *configRequest = [NSURLRequest requestWithURL:[NSURL URLWithString:@"https://***/version.config"] cachePolicy:NSURLRequestReloadIgnoringLocalAndRemoteCacheData timeoutInterval:10];
    NSURLSessionTask *configTask = [__URLSession dataTaskWithRequest:configRequest completionHandler:^(NSData * data, NSURLResponse * response, NSError * error) {
        
        if (error || !data) {
            RCTLogWarn(@"Fetch config error. %@",response.URL);
            return;
        }
        @try {
            
            NSError *serilazationError;
            NSDictionary *config= [NSJSONSerialization JSONObjectWithData:data options:0 error:&serilazationError];
            
            NSString *remoteJsVersion = config[@"bundle_version"];
            
            if ([remoteJsVersion isNewerThanVersion:jsCodeVersion]) {
                
                NSURLRequest *request = [NSURLRequest requestWithURL:[NSURL URLWithString:config[@"bundle_url"]] cachePolicy:NSURLRequestReloadIgnoringLocalAndRemoteCacheData timeoutInterval:10];
                
                NSURLSessionTask *downloadTask = [__URLSession downloadTaskWithRequest:request completionHandler:^(NSURL * location, NSURLResponse * response, NSError * error) {
                    
                    if (error || !location) {
                        RCTLogWarn(@"Download error. %@",[error description]);
                        return;
                    }
                    
                    if ([[NSFileManager defaultManager] copyItemAtPath:[location resourceSpecifier] toPath:[ReactVersion pathForVersion:remoteJsVersion] error:nil]) {
                        
                        NSLog(@"%@",[ReactVersion pathForVersion:remoteJsVersion]);
                        [[NSUserDefaults standardUserDefaults] setObject:jsCodeVersion forKey:kPrevReactJsCodeVersion];
                        [[NSUserDefaults standardUserDefaults] setObject:remoteJsVersion forKey:kCurrentReactJsCodeVersion];
                        [[NSUserDefaults standardUserDefaults] synchronize];
                        RCTLogInfo(@"Update Js Code success");
                        
                    }
                    
                }];
                [downloadTask resume];
            }
            
        }
        @catch (NSException *exception) {
            RCTLogWarn(@"process config error. %@",exception);
        }
        
    }];
    [configTask resume];
    
}


+ (NSDictionary *)convertPlist:(NSData *)data
{
    CFPropertyListRef presetPropertyList = 0;
    CFPropertyListFormat dataFormat = 0;
    CFErrorRef errorRef = 0;
    presetPropertyList = CFPropertyListCreateWithData (
                                                       kCFAllocatorDefault,
                                                       (__bridge CFDataRef)(data),
                                                       kCFPropertyListImmutable,
                                                       &dataFormat,
                                                       &errorRef
                                                       );
    
    NSDictionary *plist = (__bridge NSDictionary *)(presetPropertyList);
    if (presetPropertyList) {
        CFRelease(presetPropertyList);
    }
    return plist;
}


@end
