/*
 * Copyright (c) 28/01/2013 Mario Negro (@emenegro)
 *
 * Permission is hereby granted, free of charge, to any person obtaining
 * a copy of this software and associated documentation files (the
 * "Software"), to deal in the Software without restriction, including
 * without limitation the rights to use, copy, modify, merge, publish,
 * distribute, sublicense, and/or sell copies of the Software, and to
 * permit persons to whom the Software is furnished to do so, subject to
 * the following conditions:
 *
 * The above copyright notice and this permission notice shall be
 * included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
 * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
 * MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
 * NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
 * LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
 * OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
 * WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */

#import <UIKit/UIKit.h>

/*
 * Completion handler invoked when user taps a button.
 *
 * @param alertView The alert view being shown.
 * @param buttonIndex The index of the button tapped.
 */
typedef void(^UIAlertViewHandler)(UIAlertView *alertView, NSInteger buttonIndex);

/**
 * Category of `UIAlertView` that offers a completion handler to listen to interaction. This avoids the need of the implementation of the delegate pattern.
 *
 * @warning Completion handler: Invoked when user taps a button.
 *
 * typedef void(^UIAlertViewHandler)(UIAlertView *alertView, NSInteger buttonIndex);
 *
 * - *alertView* The alert view being shown.
 * - *buttonIndex* The index of the button tapped.
 */
@interface UIAlertView (Blocks)

/**
 * Shows the receiver alert with the given handler.
 *
 * @param handler The handler that will be invoked in user interaction.
 */
- (void)showWithHandler:(UIAlertViewHandler)handler;

/**
 * Utility selector to show an alert with a title, a message and a button to dimiss.
 *
 * @param title The title of the alert.
 * @param message The message to show in the alert.
 * @param handler The handler that will be invoked in user interaction.
 */
+ (void)showWithTitle:(NSString *)title
              message:(NSString *)message
              handler:(UIAlertViewHandler)handler;

/**
 * Utility selector to show an alert with an "Error" title, a message and a button to dimiss.
 *
 * @param message The message to show in the alert.
 * @param handler The handler that will be invoked in user interaction.
 */
+ (void)showErrorWithMessage:(NSString *)message
                     handler:(UIAlertViewHandler)handler;

/**
 * Utility selector to show an alert with a "Warning" title, a message and a button to dimiss.
 *
 * @param message The message to show in the alert.
 * @param handler The handler that will be invoked in user interaction.
 */
+ (void)showWarningWithMessage:(NSString *)message
                       handler:(UIAlertViewHandler)handler;

/**
 * Utility selector to show a confirmation dialog with a title, a message and two buttons to accept or cancel.
 *
 * @param title The title of the alert.
 * @param message The message to show in the alert.
 * @param handler The handler that will be invoked in user interaction.
 */
+ (void)showConfirmationDialogWithTitle:(NSString *)title
                                message:(NSString *)message
                                handler:(UIAlertViewHandler)handler;

@end
