#import "Pinterest.h"
#import "PDKClient.h"
#import "PDKUser.h"
#import "PDKResponseObject.h"
#import <objc/runtime.h>


@interface NSMutableDictionary(dictionaryWithObject)

+(NSMutableDictionary *) dictionaryWithPropertiesOfObject:(id) obj;

@end
@implementation NSMutableDictionary(dictionaryWithObject)

+(NSMutableDictionary *) dictionaryWithPropertiesOfObject:(id)obj
{
    NSMutableDictionary *dict = [NSMutableDictionary dictionary];
    
    unsigned count;
    objc_property_t *properties = class_copyPropertyList([obj class], &count);
    
    for (int i = 0; i < count; i++) {
        NSString *key = [NSString stringWithUTF8String:property_getName(properties[i])];
        [dict setObject:[obj valueForKey:key] forKey:key];
    }
    
    free(properties);
    
    return [NSMutableDictionary dictionaryWithDictionary:dict];
}

@end


@implementation Pinterest
@synthesize accessToken;

- (void)pluginInitialize
{
    NSString* appId = [[NSBundle mainBundle] objectForInfoDictionaryKey:@"PinterestAppId"];
    [PDKClient configureSharedInstanceWithAppId:appId];
    NSLog(@"I'm alive");
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
    NSLog(@"Login was called");
    
    
    [[PDKClient sharedInstance] authenticateWithPermissions:scopes withSuccess:^(PDKResponseObject *responseObject) {
        
        NSLog(@"Success, logged in");
        
        PDKUser* user = [responseObject user];
        
        NSMutableDictionary* data = [NSMutableDictionary dictionaryWithPropertiesOfObject:user];
        
        
        if (accessToken != nil) {
            [data setValue:accessToken forKey:@"access_token"];
        }
        
        CDVPluginResult* result = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsDictionary:data];
        [self.commandDelegate sendPluginResult:result callbackId:command.callbackId];
        
    } andFailure:^(NSError *error) {
        
        NSLog(@"Failed lol");
        
        CDVPluginResult* result = [CDVPluginResult resultWithStatus:CDVCommandStatus_ERROR messageAsString:error.localizedDescription];
        [self.commandDelegate sendPluginResult:result callbackId:command.callbackId];
        
    }];
    
    
}

- (void)getMe:(CDVInvokedUrlCommand *)command
{
    
}

@end
