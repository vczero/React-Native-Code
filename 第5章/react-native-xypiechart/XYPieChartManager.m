//
//  XYPieChartManager.m
//  XYPieChart
//
//  Created by Vincent on 15/9/13.
//  Copyright (c) 2015年 Framework-UBT. All rights reserved.
//

#import "XYPieChartManager.h"
#import "RCTEventDispatcher.h"
#import "XYPieChart.h"
#import "RCTConvert.h"
#import "UIView+React.h"
#import <objc/runtime.h>
#import "RCTUIManager.h"

#import "RCTSparseArray.h"

#import "RCTWebView.h"

@interface XYPieChart (ReactCategory)<XYPieChartDataSource>

@property (nonatomic, strong) NSArray *chartData;

@end

@implementation XYPieChart (ReactCategory)

- (NSArray *)chartData
{
    return (NSArray *)objc_getAssociatedObject(self, @selector(chartData));
}

- (void)setChartData:(NSArray *)chartData
{
    objc_setAssociatedObject(self, @selector(chartData), chartData, OBJC_ASSOCIATION_RETAIN_NONATOMIC);
    [self reloadData];
}


- (NSUInteger)numberOfSlicesInPieChart:(XYPieChart *)pieChart
{
    return [self.chartData count];
}

- (CGFloat)pieChart:(XYPieChart *)pieChart valueForSliceAtIndex:(NSUInteger)index
{
    return [self.chartData[index][@"value"] intValue];
}

- (UIColor *)pieChart:(XYPieChart *)pieChart colorForSliceAtIndex:(NSUInteger)index
{
    return [RCTConvert UIColor:self.chartData[index][@"color"]];
}

- (NSString *)pieChart:(XYPieChart *)pieChart textForSliceAtIndex:(NSUInteger)index
{
    return self.chartData[index][@"label"];
}


@end



@interface XYPieChartManager ()<XYPieChartDelegate>

@end

@implementation XYPieChartManager


RCT_EXPORT_MODULE()

- (instancetype)init
{
    self = [super init];
    if (self) {
    }
    return self;
}

- (UIView *)view
{
    
    XYPieChart *pieChart = [[XYPieChart alloc] init];
    pieChart.dataSource = pieChart;
    pieChart.delegate = self;

    return pieChart;
}


RCT_EXPORT_VIEW_PROPERTY(chartData, NSArray)

RCT_EXPORT_VIEW_PROPERTY(showPercentage, BOOL)

RCT_EXPORT_VIEW_PROPERTY(labelFont, UIFont)

RCT_EXPORT_VIEW_PROPERTY(labelColor, UIColor)


RCT_EXPORT_METHOD(reload:(nonnull NSNumber*)reactTag
                    data:(NSArray *)data)
{
    [self.bridge.uiManager addUIBlock:^(RCTUIManager *uiManager, RCTSparseArray *viewRegistry) {
    
        
        XYPieChart *chart = viewRegistry[reactTag];
        
        if ([chart isKindOfClass:[XYPieChart class]]) {
            [chart setChartData:data];
            [chart reloadData];
        }
        
    }];
}

//- (NSArray *)customBubblingEventTypes
//{
//    return @[@"select"];
//}

- (void)pieChart:(XYPieChart *)pieChart didSelectSliceAtIndex:(NSUInteger)index
{
    NSDictionary *event = @{
                            @"target": [pieChart reactTag],
                            @"data" : pieChart.chartData[index]
                            };
    
    
    [self.bridge.eventDispatcher sendInputEventWithName:@"change" body:event];
    
}




@end
