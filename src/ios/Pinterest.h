#import <Cordova/CDV.h>

@interface Pinterest : CDVPlugin

@property (nonatomic, retain) NSString* accessToken;

- (void) login:(CDVInvokedUrlCommand*)command;
- (void) getMe:(CDVInvokedUrlCommand*)command;

@end
