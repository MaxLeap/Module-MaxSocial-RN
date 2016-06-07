//
//  RCTMaxSocial.m
//  RCTMaxSocial
//

#import "RCTMaxSocial.h"
#import <MaxSocial/MaxSocial.h>

#define HTTPMETHOD_GET @"GET"
#define HTTPMETHOD_POST @"POST"
#define HTTPMETHOD_PUT @"PUT"
#define HTTPMETHOD_DELETE @"DELETE"

#define kUserIdKey @"userId"
#define kFollowerIdKey @"followerId"
#define kFolloweeIdKey @"followeeId"
#define kAnotherUserIdKey @"anotherUserId"
#define kBlackKey @"black"

#define COMPLETION_BLOCK \
^(id _Nullable result, NSError * _Nullable error) { \
    if (error) { \
        reject([@(error.code) stringValue], \
               error.localizedDescription, \
               error); \
    } else { \
        resolve(result); \
    } \
}

//#define BOOL_COMPLETION_BLOCK

@interface MLInternalUtils : NSObject
+ (NSString *)stringFromDate:(NSDate *)date;
@end

@interface MaxSocialUser ()
- (void)get:(NSString *)path params:(NSDictionary *)params completion:(void(^)(id  _Nullable, NSError * _Nullable))block;
- (void)post:(NSString *)path body:(id)body completion:(void (^)(id _Nullable, NSError * _Nullable))block;
- (void)deletePath:(NSString *)path body:(id)body completion:(void (^)(id _Nullable, NSError * _Nullable))block;
- (void)deletePath:(NSString *)path params:(NSDictionary *)params completion:(void (^)(id _Nullable, NSError * _Nullable))block;
@end

@implementation RCTMaxSocial

RCT_EXPORT_MODULE()

// params: {userId, followeeId, reverse}
RCT_EXPORT_METHOD(follow:(NSDictionary *)params
                  resolver:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject)
{
    NSString *path = @"/maxsocial/relation";
    NSDictionary *body = @{kUserIdKey: params[kFolloweeIdKey],
                           kFollowerIdKey: params[kUserIdKey],
                           @"reverse": @([params[@"reverse"] boolValue])};
    [self post:path body:body completion:COMPLETION_BLOCK];
}

// params: {userId, followeeId}
RCT_EXPORT_METHOD(unfollow:(NSDictionary *)params
                  resolver:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject)
{
    NSString *path = @"/maxsocial/relation/delete";
    NSDictionary *parameters = @{kUserIdKey:params[kFolloweeIdKey],
                                 kFollowerIdKey:params[kUserIdKey]};
    [self deletePath:path params:parameters completion:COMPLETION_BLOCK];
}

// {userId, anotherUserId}
RCT_EXPORT_METHOD(block:(NSDictionary *)params
                  resolver:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject)
{
    NSString *path = @"/maxsocial/relation";
    NSDictionary *body = @{kUserIdKey:params[kUserIdKey],
                           kFollowerIdKey:params[kAnotherUserIdKey],
                           kBlackKey:@YES};
    [self post:path body:body completion:COMPLETION_BLOCK];
}

// {userId, anotherUserId}
RCT_EXPORT_METHOD(unblock:(NSDictionary *)params
                  resolver:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject)
{
    NSString *path = @"/maxsocial/relation";
    NSDictionary *body = @{kUserIdKey:params[kUserIdKey],
                           kFollowerIdKey:params[kAnotherUserIdKey],
                           kBlackKey:@NO};
    [self post:path body:body completion:COMPLETION_BLOCK];
}

RCT_EXPORT_METHOD(getRelationInfo:(NSString *)rid
                  resolver:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject)
{
    NSString *path = [NSString stringWithFormat:@"/maxsocial/relation/objectId/%@", rid];
    [self get:path params:nil completion:COMPLETION_BLOCK];
}

// {userId, followerId}
RCT_EXPORT_METHOD(getRelationInfoBetweenUsers:(NSDictionary *)params
                  resolver:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject)
{
    NSString *path = @"/maxsocial/relation/getRelation";
    [self get:path params:params completion:COMPLETION_BLOCK];
}

RCT_EXPORT_METHOD(deleteRelationInfo:(NSString *)rid
                  resolver:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject)
{
    NSString *path = [NSString stringWithFormat:@"/maxsocial/relation/objectId/%@", rid];
    [self deletePath:path body:nil completion:COMPLETION_BLOCK];
}

// {userId, anotherUserId}
RCT_EXPORT_METHOD(checkStatusBetweenUser:(NSDictionary *)params
                  resolver:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject)
{
    NSString *path = @"/maxsocial/relation/status";
    NSDictionary *parameters = @{kUserIdKey:params[kAnotherUserIdKey],
                                 kFollowerIdKey:params[kUserIdKey]};
    [self get:path params:parameters completion:COMPLETION_BLOCK];
}


/**
 {
    page: 0,
    limit: 10,
    sort: 1,          // 0 byUserId, 1 byCreatedTime
    ascending: false
 }
 */
RCT_EXPORT_METHOD(findFollowees:(NSDictionary *)params
                  resolver:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject)
{
    NSString *path = @"/maxsocial/relation/follows";
    [self post:path body:params completion:COMPLETION_BLOCK];
}

RCT_EXPORT_METHOD(findFollowers:(NSDictionary *)params
                  resolver:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject)
{
    NSString *path = @"/maxsocial/relation/followers";
    [self post:path body:params completion:COMPLETION_BLOCK];
}

#pragma mark -
#pragma mark Shuo Shuo

RCT_EXPORT_METHOD(postShuo:(NSDictionary *)params
                  resolver:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject)
{
    NSDictionary *shuoDict = params[@"shuo"];
    MaxSocialShuoShuo *shuo = [MaxSocialShuoShuo new];
    
    NSString *text = shuoDict[@"text"];
    NSURL *weburl = [NSURL URLWithString:shuoDict[@"link"]];
    NSMutableArray *imgUrls = [NSMutableArray array];
    for (NSString *path in shuoDict[@"imgPaths"]) {
        [imgUrls addObject:[NSURL fileURLWithPath:path]];
    }
    
    if (imgUrls.count > 0) {
        shuo.content = [MaxSocialShuoShuoContent contentWithText:text imageURLs:imgUrls];
    } else if (weburl) {
        shuo.content = [MaxSocialShuoShuoContent contentWithText:text url:weburl];
    } else {
        shuo.content = [MaxSocialShuoShuoContent contentWithText:text];
    }
    
    if (params[@"location"]) {
        double latitude = [params[@"location"][@"latitude"] doubleValue];
        double longitude = [params[@"location"][@"longitude"] doubleValue];
        shuo.location = [MaxSocialLocation locationWithLatitude:latitude longitude:longitude];
    }
    
    MaxSocialUser *user = [MaxSocialUser userWithId:params[kUserIdKey]];
    BOOL square = [params[@"square"] boolValue];
    [user postShuoShuo:shuo toSquare:square block:^(BOOL succeeded, NSError * _Nullable error) {
        if (succeeded) {
            NSDictionary *dict = @{@"objectId": shuo.objectId,
                                   @"createdAt": [MLInternalUtils stringFromDate:shuo.createdAt]?:[NSNull null]};
            resolve(dict);
        } else {
            reject([@(error.code) stringValue],
                   error.localizedDescription,
                   error);
        }
    }];
}

RCT_EXPORT_METHOD(fetchShuo:(NSString *)shuoId
                  resolver:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject)
{
    NSString *path = [NSString stringWithFormat:@"/maxsocial/shuo/objectId/%@", shuoId];
    [self get:path params:nil completion:COMPLETION_BLOCK];
}

RCT_EXPORT_METHOD(deleteShuo:(NSDictionary *)params
                  resolver:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject)
{
    NSString *path = @"/maxsocial/shuo/photosdelete";
    NSDictionary *body = @{@"userId":params[kUserIdKey],
                           @"objectId":params[@"shuoId"]};
    [self deletePath:path body:body completion:COMPLETION_BLOCK];
}

RCT_EXPORT_METHOD(fetchShuoList:(NSDictionary *)params
                  resolver:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject)
{
    NSString *path = @"/maxsocial/shuo/list";
    [self post:path body:params completion:COMPLETION_BLOCK];
}

RCT_EXPORT_METHOD(fetchSquareShuo:(NSDictionary *)params
                  resolver:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject)
{
    NSString *path = @"/maxsocial/shuo/latest";
    [self post:path body:params completion:COMPLETION_BLOCK];
}

RCT_EXPORT_METHOD(fetchFriendCycleShuo:(NSDictionary *)params
                  resolver:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject)
{
    NSString *path = @"/maxsocial/shuo/friendCircle";
    [self post:path body:params completion:COMPLETION_BLOCK];
}

RCT_EXPORT_METHOD(fetchShuoNear:(NSDictionary *)params
                  resolver:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject)
{
    NSString *path = @"/maxsocial/shuo/near";
    [self post:path body:params completion:COMPLETION_BLOCK];
}

RCT_EXPORT_METHOD(downloadImg:(NSDictionary *)params
                  progress:(RCTResponseSenderBlock)progress
                  resolver:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject)
{
    MLProgressBlock block = nil;
    if (! [progress isEqual:[NSNull null]]) {
        block = ^(int percentDone) {
            progress(@[@(percentDone)]);
        };
    }
    
    MaxSocialUser *user = [MaxSocialUser userWithId:params[kUserIdKey]];
    [user downloadImageWithName:params[@"imageUrl"]
                     ofShuoShuo:params[@"shuoId"]
                       progress:block
                     completion:COMPLETION_BLOCK];
}

#pragma mark -
#pragma mark Location

RCT_EXPORT_METHOD(updateLocation:(NSDictionary *)params
                  resolver:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject)
{
    NSString *path = @"/maxsocial/location";
    NSDictionary *body = @{@"userId":params[kUserIdKey],
                           @"location":@{@"type":@"Point",
                                         @"coordinates":@[
                                                 params[@"longitude"],
                                                 params[@"latitude"]
                                                 ]
                                         }
                           };
    [self post:path body:body completion:COMPLETION_BLOCK];
}

RCT_EXPORT_METHOD(getLocation:(NSString *)locationObjectId
                  resolver:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject)
{
    NSString *path = [NSString stringWithFormat:@"/maxsocial/location/%@", locationObjectId];
    [self get:path params:nil completion:COMPLETION_BLOCK];
}

RCT_EXPORT_METHOD(getLocationByUserId:(NSString *)userId
                  resolver:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject)
{
    NSString *path = [NSString stringWithFormat:@"/maxsocial/location/userId/%@", userId];
    [self get:path params:nil completion:COMPLETION_BLOCK];
}

RCT_EXPORT_METHOD(findUserNear:(NSDictionary *)params
                  resolver:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject)
{
    NSString *path = @"/maxsocial/location/near";
    [self post:path body:params completion:COMPLETION_BLOCK];
}

RCT_EXPORT_METHOD(deleteLocation:(NSString *)locId
                  resolver:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject)
{
    NSString *path = [NSString stringWithFormat:@"/maxsocial/location/%@", locId];
    [self deletePath:path body:nil completion:COMPLETION_BLOCK];
}

#pragma mark -
#pragma mark Comment

RCT_EXPORT_METHOD(commentShuo:(NSDictionary *)params
                  resolver:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject)
{
    NSString *path = @"/maxsocial/comment";
    NSDictionary *dict = @{@"userId": params[kUserIdKey],
                           @"content": params[@"text"],
                           @"shuoId": params[@"shuoId"],
                           @"zan": @(NO)};
    [self post:path body:dict completion:COMPLETION_BLOCK];
}

RCT_EXPORT_METHOD(likeShuo:(NSDictionary *)params
                  resolver:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject)
{
    NSString *path = @"/maxsocial/comment";
    NSDictionary *dict = @{@"userId": params[kUserIdKey],
                           @"shuoId": params[@"shuoId"],
                           @"zan": @(YES)};
    [self post:path body:dict completion:COMPLETION_BLOCK];
}

RCT_EXPORT_METHOD(markCommentAsRead:(NSString *)commentId
                  resolver:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject)
{
    NSString *path = @"/maxsocial/comment/update";
    NSDictionary *body = @{@"objectId":commentId, @"read": @YES};
    [self post:path body:body completion:COMPLETION_BLOCK];
}

RCT_EXPORT_METHOD(fetchComment:(NSString *)commentId
                  resolver:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject)
{
    NSString *path = [NSString stringWithFormat:@"/maxsocial/comment/objectId/%@", commentId];
    [self get:path params:nil completion:COMPLETION_BLOCK];
}

RCT_EXPORT_METHOD(deleteComment:(NSString *)commentId
                  resolver:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject)
{
    NSString *path = [NSString stringWithFormat:@"/maxsocial/comment/objectId/%@", commentId];
    [self deletePath:path body:nil completion:COMPLETION_BLOCK];
}

RCT_EXPORT_METHOD(fetchCommentOfShuo:(NSDictionary *)params
                  resolver:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject)
{
    NSString *path = @"/maxsocial/comment/list";
    [self post:path body:params completion:COMPLETION_BLOCK];
}

RCT_EXPORT_METHOD(fetchUnreadComment:(NSString *)userId
                  resolver:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject)
{
    NSString *path = @"/maxsocial/comment/unread";
    [self get:path params:@{kUserIdKey:userId} completion:COMPLETION_BLOCK];
}

#pragma mark -
#pragma mark User

RCT_EXPORT_METHOD(signUp:(NSDictionary *)params
                  resolver:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject)
{
    NSString *path = @"/maxsocial/socialpass/register";
    [self post:path body:params completion:COMPLETION_BLOCK];
}

RCT_EXPORT_METHOD(login:(NSDictionary *)params
                  resolver:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject)
{
    NSString *path = @"/maxsocial/socialpass/login";
    [self post:path body:params completion:COMPLETION_BLOCK];
}

RCT_EXPORT_METHOD(requestSmsCode:(NSString *)phoneNumber
                  resolver:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject)
{
    NSString *path = @"/maxsocial/socialpass/smsCode";
    [self post:path body:@{@"mobilePhone":phoneNumber} completion:COMPLETION_BLOCK];
}

RCT_EXPORT_METHOD(loginByMobile:(NSDictionary *)params
                  resolver:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject)
{
    NSString *path = @"/maxsocial/socialpass/loginByMobile";
    [self post:path body:params completion:COMPLETION_BLOCK];
}

#pragma mark -

- (void)get:(NSString *)path params:(NSDictionary *)params completion:(void(^)(id  _Nullable result, NSError * _Nullable error))block {
    [[MaxSocialUser new] get:path params:params completion:block];
}

- (void)post:(NSString *)path body:(id)body completion:(void (^)(id _Nullable result, NSError * _Nullable error))block {
    [[MaxSocialUser new] post:path body:body completion:block];
}

- (void)deletePath:(NSString *)path body:(id)body completion:(void (^)(id _Nullable result, NSError * _Nullable error))block {
    [[MaxSocialUser new] deletePath:path body:body completion:block];
}

- (void)deletePath:(NSString *)path params:(NSDictionary *)params completion:(void (^)(id _Nullable result, NSError * _Nullable error))block {
    [[MaxSocialUser new] deletePath:path params:params completion:block];
}

@end