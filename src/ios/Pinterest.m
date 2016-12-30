#import "Pinterest.h"
#import "PDKClient.h"
#import "PDKUser.h"
#import "PDKResponseObject.h"

@implementation Pinterest

@synthesize accessToken;

- (void)pluginInitialize
{
    
    NSString* appId = [[NSBundle mainBundle] objectForInfoDictionaryKey:@"PinterestAppId"];
    [PDKClient configureSharedInstanceWithAppId:appId];
    
}

- (void (^)(PDKResponseObject*)) getSuccess:(CDVInvokedUrlCommand*) command
{
    
    return ^(PDKResponseObject* responseObject) {
        [self sendDictionaryToJs:[responseObject parsedJSONDictionary][@"data"] withCommand:command];
    };
    
}

- (void (^)(NSError*)) getError:(CDVInvokedUrlCommand*) command
{
    
    return ^(NSError* error) {
        CDVPluginResult* result = [CDVPluginResult resultWithStatus:CDVCommandStatus_ERROR messageAsString:error.localizedDescription];
        [self.commandDelegate sendPluginResult:result callbackId:command.callbackId];
    };
    
}


- (void)sendDictionaryToJs:(NSDictionary * )data
               withCommand:(CDVInvokedUrlCommand *) command
{
    
    CDVPluginResult* result = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsDictionary:data];
    [self.commandDelegate sendPluginResult:result callbackId:command.callbackId];
    
}

- (void)sendArrayToJs:(NSArray *)data
          withCommand:(CDVInvokedUrlCommand *)command
{
    
    CDVPluginResult* result = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsArray:data];
    [self.commandDelegate sendPluginResult:result callbackId:command.callbackId];
    
}

- (NSDictionary*)getParamsWithFields:(NSString *) fields
{
    
    NSDictionary* const params = @{
                                   @"fields": fields
                                   };
    return params;
    
}

- (NSDictionary*)getParamsWithFields:(NSString *) fields
                           withLimit:(NSNumber *) limit
{
    
    NSDictionary* const params = @{
                                   @"fields": fields,
                                   @"limit": limit
                                   };
    return params;
    
}

- (void)handleOpenURL:(NSNotification *)notification
{
    
    NSURL* url = [notification object];
    
    if ([url isKindOfClass:[NSURL class]]) {
        
        NSString* query = url.query;
        if ([query hasPrefix:@"access_token="]) {
            accessToken = [query substringFromIndex:13];
            NSLog(@"Access token is %@", accessToken);
        }
        
        [[PDKClient sharedInstance] handleCallbackURL:url];
    }
    
}

- (void)login:(CDVInvokedUrlCommand*)command
{
    
    NSArray* scopes = command.arguments;
    
    [[PDKClient sharedInstance] authenticateWithPermissions:scopes withSuccess:^(PDKResponseObject *responseObject) {
        
        NSMutableDictionary* data = [[responseObject parsedJSONDictionary] mutableCopy];
        
        if (accessToken != nil) {
            [data setValue:accessToken forKey:@"access_token"];
        }
        
        [self sendDictionaryToJs:data withCommand:command];
        
    } andFailure:[self getError:command]];
    
}

- (void)getMe:(CDVInvokedUrlCommand *)command
{
    
    [[PDKClient sharedInstance] getPath:@"me" parameters:[self getParamsWithFields:[command.arguments objectAtIndex:0]] withSuccess:[self getSuccess:command] andFailure:[self getError:command]];

}


- (void)getMyPins:(CDVInvokedUrlCommand *)command
{
    
    [[PDKClient sharedInstance] getPath:@"me/pins" parameters:[self getParamsWithFields:[command.arguments objectAtIndex:0] withLimit:[command.arguments objectAtIndex:1]] withSuccess:[self getSuccess:command] andFailure:[self getError:command]];

}

- (void)getMyBoards:(CDVInvokedUrlCommand *)command
{
    
    [[PDKClient sharedInstance] getPath:@"me/boards" parameters:[self getParamsWithFields:[command.arguments objectAtIndex:0] withLimit:[command.arguments objectAtIndex:1]] withSuccess:[self getSuccess:command] andFailure:[self getError:command]];

}

- (void)getMyLikes:(CDVInvokedUrlCommand *)command
{
    
    [[PDKClient sharedInstance] getPath:@"me/likes" parameters:[self getParamsWithFields:[command.arguments objectAtIndex:0] withLimit:[command.arguments objectAtIndex:1]] withSuccess:[self getSuccess:command] andFailure:[self getError:command]];

}

- (void)getMyFollowers:(CDVInvokedUrlCommand *)command
{
    
    [[PDKClient sharedInstance] getPath:@"me/followers" parameters:[self getParamsWithFields:[command.arguments objectAtIndex:0] withLimit:[command.arguments objectAtIndex:1]] withSuccess:[self getSuccess:command] andFailure:[self getError:command]];

}

- (void)getMyFollowedBoards:(CDVInvokedUrlCommand *)command
{
    
    [[PDKClient sharedInstance] getPath:@"me/following/boards" parameters:[self getParamsWithFields:[command.arguments objectAtIndex:0] withLimit:[command.arguments objectAtIndex:1]] withSuccess:[self getSuccess:command] andFailure:[self getError:command]];

}

- (void)getMyFollowedInterests:(CDVInvokedUrlCommand *)command
{
    
    [[PDKClient sharedInstance] getPath:@"me/following/interests" parameters:[self getParamsWithFields:[command.arguments objectAtIndex:0] withLimit:[command.arguments objectAtIndex:1]] withSuccess:[self getSuccess:command] andFailure:[self getError:command]];

}

- (void)getUser:(CDVInvokedUrlCommand *)command
{
    
    NSMutableString* path = [[NSMutableString alloc] init];
    [path appendString:@"users/"];
    [path appendString:[command.arguments objectAtIndex:1]];
    [[PDKClient sharedInstance] getPath:path parameters:[self getParamsWithFields:[command.arguments objectAtIndex:0]] withSuccess:[self getSuccess:command] andFailure:[self getError:command]];

}

- (void)getBoard:(CDVInvokedUrlCommand *)command
{
    
    NSMutableString* path = [[NSMutableString alloc] init];
    [path appendString:@"boards/"];
    [path appendString:[command.arguments objectAtIndex:1]];
    [[PDKClient sharedInstance] getPath:path parameters:[self getParamsWithFields:[command.arguments objectAtIndex:0]] withSuccess:[self getSuccess:command] andFailure:[self getError:command]];

}

- (void)getBoardPins:(CDVInvokedUrlCommand *)command
{
    
    NSMutableString* path = [[NSMutableString alloc] init];
    [path appendString:@"boards/"];
    [path appendString:[command.arguments objectAtIndex:1]];
    [path appendString:@"/pins"];
    [[PDKClient sharedInstance] getPath:path parameters:[self getParamsWithFields:[command.arguments objectAtIndex:0] withLimit:[command.arguments objectAtIndex:1]] withSuccess:[self getSuccess:command] andFailure:[self getError:command]];

}

- (void)deleteBoard:(CDVInvokedUrlCommand *)command
{
    
    [[PDKClient sharedInstance] deleteBoard:[command.arguments objectAtIndex:0] withSuccess:[self getSuccess:command] andFailure:[self getError:command]];

}

- (void)createBoard:(CDVInvokedUrlCommand *)command
{
    
    [[PDKClient sharedInstance] createBoard:[command.arguments objectAtIndex:0] boardDescription:[command.arguments objectAtIndex:1] withSuccess:[self getSuccess:command] andFailure:[self getError:command]];

}

- (void)getPin:(CDVInvokedUrlCommand *)command
{
    
    NSMutableString* path = [[NSMutableString alloc] init];
    [path appendString:@"pins/"];
    [path appendString:[command.arguments objectAtIndex:1]];
    [[PDKClient sharedInstance] getPath:path parameters:[self getParamsWithFields:[command.arguments objectAtIndex:0]] withSuccess:[self getSuccess:command] andFailure:[self getError:command]];

}

- (void)deletePin:(CDVInvokedUrlCommand *)command
{
    
    [[PDKClient sharedInstance] deletePin:[command.arguments objectAtIndex:0] withSuccess:[self getSuccess:command] andFailure:[self getError:command]];
    
}

- (void)createPin:(CDVInvokedUrlCommand *)command
{
    
    [[PDKClient sharedInstance] createPinWithImageURL:[command.arguments objectAtIndex:2] link:[command.arguments objectAtIndex:3] onBoard:[command.arguments objectAtIndex:1] description:[command.arguments objectAtIndex:0] withSuccess:[self getSuccess:command] andFailure:[self getError:command]];
    
}

@end
