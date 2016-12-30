#import <Cordova/CDV.h>
#import "PDKResponseObject.h"

@interface Pinterest : CDVPlugin

@property (nonatomic, retain) NSString* accessToken;

- (void) login:(CDVInvokedUrlCommand*)command;
- (void) getMe:(CDVInvokedUrlCommand*)command;
- (void) getMyPins:(CDVInvokedUrlCommand*)command;
- (void) getMyBoards:(CDVInvokedUrlCommand*)command;
- (void) getMyLikes:(CDVInvokedUrlCommand*)command;
- (void) getMyFollowers:(CDVInvokedUrlCommand*)command;
- (void) getMyFollowedBoards:(CDVInvokedUrlCommand*)command;
- (void) getMyFollowedInterests:(CDVInvokedUrlCommand*)command;
- (void) getUser:(CDVInvokedUrlCommand*)command;
- (void) getBoard:(CDVInvokedUrlCommand*)command;
- (void) getBoardPins:(CDVInvokedUrlCommand*)command;
- (void) deleteBoard:(CDVInvokedUrlCommand*)command;
- (void) createBoard:(CDVInvokedUrlCommand*)command;
- (void) getPin:(CDVInvokedUrlCommand*)command;
- (void) deletePin:(CDVInvokedUrlCommand*)command;
- (void) createPin:(CDVInvokedUrlCommand*)command;

@end
