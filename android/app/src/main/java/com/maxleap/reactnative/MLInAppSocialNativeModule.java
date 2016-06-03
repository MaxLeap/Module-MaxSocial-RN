package com.maxleap.reactnative;

import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.ReadableArray;
import com.facebook.react.bridge.ReadableMap;
import com.facebook.react.bridge.ReadableMapKeySetIterator;
import com.maxleap.social.CommentService;
import com.maxleap.social.HermsException;
import com.maxleap.social.LocationService;
import com.maxleap.social.RelationService;
import com.maxleap.social.ShuoShuoService;
import com.maxleap.social.SocialPassService;
import com.maxleap.social.entity.Constraint;
import com.maxleap.social.entity.ShuoShuo;
import com.maxleap.social.thirdparty.internal.ProgressCallback;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;

/**
 * Created by SidneyXu on 2016/05/11.
 */
public class MLInAppSocialNativeModule extends ReactContextBaseJavaModule {

    private static final String LIBRARY_NAME = "MaxSocial";

    private static String SERVER = "http://api.maxleap.cn/2.0";
    private static ExecutorService worker = Executors.newSingleThreadExecutor();

    private final RelationService relationService;
    private final ShuoShuoService shuoShuoService;
    private final CommentService commentService;
    private final LocationService locationService;
    private final SocialPassService socialPassService;

    private int timeout = 15000;

    public static final String USER_ID = "userId";
    public static final String FOLLOWEE_ID = "followeeId";
    public static final String FOLLOWER_ID = "followerId";
    public static final String REVERSE = "reverse";
    public static final String ANOTHER_USER_ID = "anotherUserId";
    public static final String TEXT = "text";
    public static final String LINK = "link";
    public static final String IMAGE_PATH = "imgPaths";
    public static final String LOCATION = "location";
    public static final String SQUARE = "square";
    public static final String LATITUDE = "latitude";
    public static final String LONGITUDE = "longitude";
    public static final String SHUO_ID = "shuoId";
    public static final String DISTANCE = "distance";
    public static final String USERNAME = "username";
    public static final String PASSWORD = "password";
    public static final String MOBILE_PHONE = "mobilePhone";
    public static final String SMS_CODE = "smsCode";


    public MLInAppSocialNativeModule(ReactApplicationContext reactContext) {
        super(reactContext);
        relationService = new RelationService(SERVER);
        shuoShuoService = new ShuoShuoService(SERVER, timeout);
        commentService = new CommentService(SERVER);
        locationService = new LocationService(SERVER);
        socialPassService = new SocialPassService(SERVER);
    }

    @Override
    public String getName() {
        return LIBRARY_NAME;
    }

    //    relation
    @ReactMethod
    public void follow(ReadableMap map, final Promise promise) {
        final String userId = map.getString(USER_ID);
        final String followerId = map.getString(FOLLOWEE_ID);
        final boolean reverse = optBoolean(map, REVERSE, true);
        final boolean black = false;

        worker.execute(new Runnable() {
            @Override
            public void run() {
                try {
                    JSONArray result = relationService.createRelation(userId, followerId, reverse, black);
                    promise.resolve(result.toString());
                } catch (HermsException e) {
                    promise.reject("" + e.getErrorCode(), e.getMessage());
                }
            }
        });
    }

    @ReactMethod
    public void unfollow(ReadableMap map, final Promise promise) {
        final String userId = map.getString(USER_ID);
        final String followerId = map.getString(FOLLOWEE_ID);
        worker.execute(new Runnable() {
            @Override
            public void run() {
                try {
                    JSONObject result = relationService.deleteByUser(userId, followerId);
                    promise.resolve(result.toString());
                } catch (HermsException e) {
                    promise.reject("" + e.getErrorCode(), e.getMessage());
                }
            }
        });
    }

    @ReactMethod
    public void block(ReadableMap map, final Promise promise) {
        final String userId = map.getString(USER_ID);
        final String followerId = map.getString(ANOTHER_USER_ID);
        worker.execute(new Runnable() {
            @Override
            public void run() {
                try {
                    JSONArray result = relationService.createRelation(userId, followerId, false, true);
                    promise.resolve(result.toString());
                } catch (HermsException e) {
                    promise.reject("" + e.getErrorCode(), e.getMessage());
                }
            }
        });
    }

    @ReactMethod
    public void unblock(ReadableMap map, final Promise promise) {
        final String userId = map.getString(USER_ID);
        final String followerId = map.getString(ANOTHER_USER_ID);
        worker.execute(new Runnable() {
            @Override
            public void run() {
                try {
                    JSONArray result = relationService.createRelation(userId, followerId, false, false);
                    promise.resolve(result.toString());
                } catch (HermsException e) {
                    promise.reject("" + e.getErrorCode(), e.getMessage());
                }
            }
        });
    }

    @ReactMethod
    public void getRelationInfo(final String objectId, final Promise promise) {
        worker.execute(new Runnable() {
            @Override
            public void run() {
                try {
                    JSONObject result = relationService.getRelation(objectId);
                    promise.resolve(result.toString());
                } catch (HermsException e) {
                    promise.reject("" + e.getErrorCode(), e.getMessage());
                }
            }
        });
    }

    @ReactMethod
    public void getRelationInfoBetweenUsers(ReadableMap map, final Promise promise) {
        final String userId = map.getString(USER_ID);
        final String followerId = map.getString(FOLLOWER_ID);
        worker.execute(new Runnable() {
            @Override
            public void run() {
                try {
                    JSONObject result = relationService.getRelation(userId, followerId);
                    promise.resolve(result.toString());
                } catch (HermsException e) {
                    promise.reject("" + e.getErrorCode(), e.getMessage());
                }
            }
        });
    }

    @ReactMethod
    public void checkStatusBetweenUser(ReadableMap map, final Promise promise) {
        final String userId = map.getString(USER_ID);
        final String followerId = map.getString(ANOTHER_USER_ID);
        worker.execute(new Runnable() {
            @Override
            public void run() {
                try {
                    JSONObject result = relationService.getStatus(userId, followerId);
                    promise.resolve(result.toString());
                } catch (HermsException e) {
                    promise.reject("" + e.getErrorCode(), e.getMessage());
                }
            }
        });
    }

    private Constraint mapConstraint(ReadableMap map) {
        int page = optInt(map, "pageId");
        int sort = optInt(map, "sort");
        boolean ascending = optBoolean(map, "asc", false);

        Constraint.Builder builder = Constraint.Builder.newBuilder()
                .page(page);
        if (sort == Constraint.SORT_BY_TIME) {
            builder.orderByTime();
        } else {
            builder.orderByUserId();
        }
        if (ascending) {
            builder.asc();
        } else {
            builder.desc();
        }
        return builder.build();
    }

    @ReactMethod
    public void findFollowees(ReadableMap map, final Promise promise) {
        final String followerId = map.getString(FOLLOWER_ID);
        final Constraint constraint = mapConstraint(map);
        worker.execute(new Runnable() {
            @Override
            public void run() {
                try {
                    JSONObject result = relationService.getFollows(followerId, constraint);
                    promise.resolve(result.toString());
                } catch (HermsException e) {
                    promise.reject("" + e.getErrorCode(), e.getMessage());
                }
            }
        });
    }

    @ReactMethod
    public void findFollowers(ReadableMap map, final Promise promise) {
        final String userId = map.getString(USER_ID);
        final Constraint constraint = mapConstraint(map);
        worker.execute(new Runnable() {
            @Override
            public void run() {
                try {
                    JSONObject result = relationService.getFollowers(userId, constraint);
                    promise.resolve(result.toString());
                } catch (HermsException e) {
                    promise.reject("" + e.getErrorCode(), e.getMessage());
                }
            }
        });
    }

    @ReactMethod
    public void deleteRelationInfo(final String objectId, final Promise promise) {
        worker.execute(new Runnable() {
            @Override
            public void run() {
                try {
                    JSONObject result = relationService.deleteById(objectId);
                    promise.resolve(result.toString());
                } catch (HermsException e) {
                    promise.reject("" + e.getErrorCode(), e.getMessage());
                }
            }
        });
    }

    //location
    @ReactMethod
    public void updateLocation(ReadableMap map, final Promise promise) {
        final String userId = map.getString(USER_ID);
        final double longitude = optDouble(map, LONGITUDE);
        final double latitude = optDouble(map, LATITUDE);
        worker.execute(new Runnable() {
            @Override
            public void run() {
                try {
                    JSONObject result = locationService.createLocation(userId, longitude, latitude);
                    promise.resolve(result.toString());
                } catch (HermsException e) {
                    promise.reject("" + e.getErrorCode(), e.getMessage());
                }
            }
        });
    }

    @ReactMethod
    public void findUserNear(ReadableMap map, final Promise promise) {
        final String userId = map.getString(USER_ID);
        final double longitude = optDouble(map, LONGITUDE);
        final double latitude = optDouble(map, LATITUDE);
        final double distance = optDouble(map, DISTANCE);
        worker.execute(new Runnable() {
            @Override
            public void run() {
                try {
                    JSONArray result = locationService.getNearByLocations(userId, longitude, latitude, distance);
                    promise.resolve(result.toString());
                } catch (HermsException e) {
                    promise.reject("" + e.getErrorCode(), e.getMessage());
                }
            }
        });
    }

    @ReactMethod
    public void getLocation(final String objectId, final Promise promise) {
        worker.execute(new Runnable() {
            @Override
            public void run() {
                try {
                    JSONObject result = locationService.getLocation(objectId);
                    promise.resolve(result.toString());
                } catch (HermsException e) {
                    promise.reject("" + e.getErrorCode(), e.getMessage());
                }
            }
        });
    }

    @ReactMethod
    public void deleteLocation(final String userId, final Promise promise) {
        worker.execute(new Runnable() {
            @Override
            public void run() {
                try {
                    JSONObject result = locationService.deleteLocation(userId);
                    promise.resolve(result.toString());
                } catch (HermsException e) {
                    promise.reject("" + e.getErrorCode(), e.getMessage());
                }
            }
        });
    }

    @ReactMethod
    public void getLocationByUserId(String json, final Promise promise) {
        try {
            JSONObject jsonObject = new JSONObject(json);
            final String userId = null;
            final String followerId = null;
            final boolean reverse = false;
            final boolean black = false;
            final String objectId = null;
            final Constraint constraint = null;
            worker.execute(new Runnable() {
                @Override
                public void run() {
                    try {
                        JSONArray result = locationService.getLocationByUserId(userId);
                        promise.resolve(result.toString());
                    } catch (HermsException e) {
                        promise.reject("" + e.getErrorCode(), e.getMessage());
                    }
                }
            });
        } catch (JSONException e) {
            promise.reject(e);
        }
    }

    //comment
    @ReactMethod
    public void commentShuo(ReadableMap map, final Promise promise) {
        final String userId = map.getString(USER_ID);
        final String shuoId = map.getString(SHUO_ID);
        final String content = map.getString(TEXT);
        final boolean zan = false;
        worker.execute(new Runnable() {
            @Override
            public void run() {
                try {
                    JSONObject result = commentService.createComment(userId, shuoId, content, zan);
                    promise.resolve(result.toString());
                } catch (HermsException e) {
                    promise.reject("" + e.getErrorCode(), e.getMessage());
                }
            }
        });
    }

    //comment
    @ReactMethod
    public void likeShuo(ReadableMap map, final Promise promise) {
        final String userId = map.getString(USER_ID);
        final String shuoId = map.getString(SHUO_ID);
        worker.execute(new Runnable() {
            @Override
            public void run() {
                try {
                    JSONObject result = commentService.createComment(userId, shuoId, null, true);
                    promise.resolve(result.toString());
                } catch (HermsException e) {
                    promise.reject("" + e.getErrorCode(), e.getMessage());
                }
            }
        });
    }

    @ReactMethod
    public void markCommentAsRead(final String objectId, final Promise promise) {
        worker.execute(new Runnable() {
            @Override
            public void run() {
                try {
                    JSONObject result = commentService.updateComment(objectId, true);
                    promise.resolve(result.toString());
                } catch (HermsException e) {
                    promise.reject("" + e.getErrorCode(), e.getMessage());
                }
            }
        });
    }

    @ReactMethod
    public void fetchComment(final String objectId, final Promise promise) {
        worker.execute(new Runnable() {
            @Override
            public void run() {
                try {
                    JSONObject result = commentService.getComment(objectId);
                    promise.resolve(result.toString());
                } catch (HermsException e) {
                    promise.reject("" + e.getErrorCode(), e.getMessage());
                }
            }
        });
    }

    @ReactMethod
    public void deleteComment(final String objectId, final Promise promise) {
        worker.execute(new Runnable() {
            @Override
            public void run() {
                try {
                    JSONObject result = commentService.deleteComment(objectId);
                    promise.resolve(result.toString());
                } catch (HermsException e) {
                    promise.reject("" + e.getErrorCode(), e.getMessage());
                }
            }
        });
    }

    @ReactMethod
    public void fetchCommentOfShuo(ReadableMap map, final Promise promise) {
        final Constraint constraint = mapConstraint(map);
        final String shuoId = map.getString(SHUO_ID);
        worker.execute(new Runnable() {
            @Override
            public void run() {
                try {
                    JSONObject result = commentService.getComments(shuoId, constraint);
                    promise.resolve(result.toString());
                } catch (HermsException e) {
                    promise.reject("" + e.getErrorCode(), e.getMessage());
                }
            }
        });
    }

    @ReactMethod
    public void fetchUnreadComment(final String userId, final Promise promise) {
        worker.execute(new Runnable() {
            @Override
            public void run() {
                try {
                    JSONObject result = commentService.getUnReadComments(userId);
                    promise.resolve(result.toString());
                } catch (HermsException e) {
                    promise.reject("" + e.getErrorCode(), e.getMessage());
                }
            }
        });
    }

    //Shuoshuo
    @ReactMethod
    public void postShuo(ReadableMap map, final Promise promise) {
        final ShuoShuo shuoShuo = new ShuoShuo();
        shuoShuo.setContent(optString(map, TEXT));
        shuoShuo.setLink(optString(map, LINK));
        shuoShuo.setPhotoPath(converArray(optArray(map, IMAGE_PATH)));
        ReadableMap location = optMap(map, LOCATION);
        if (location != null) {
            shuoShuo.setLatitude(optDouble(location, LATITUDE));
            shuoShuo.setLongitude(optDouble(location, LONGITUDE));
        }
        shuoShuo.setFriendCircle(optBoolean(map, SQUARE, false));
        worker.execute(new Runnable() {
            @Override
            public void run() {
                try {
                    JSONObject result = shuoShuoService.createShuoShuo(shuoShuo);
                    promise.resolve(result.toString());
                } catch (HermsException e) {
                    promise.reject("" + e.getErrorCode(), e.getMessage());
                }
            }
        });
    }

    @ReactMethod
    public void fetchShuo(final String objectId, final Promise promise) {
        worker.execute(new Runnable() {
            @Override
            public void run() {
                try {
                    JSONObject result = shuoShuoService.getShuoShuo(objectId);
                    promise.resolve(result.toString());
                } catch (HermsException e) {
                    promise.reject("" + e.getErrorCode(), e.getMessage());
                }
            }
        });
    }

    @ReactMethod
    public void deleteShuo(final String objectId, final Promise promise) {
        worker.execute(new Runnable() {
            @Override
            public void run() {
                try {
                    JSONObject result = shuoShuoService.deleteShuoShuo(objectId);
                    promise.resolve(result.toString());
                } catch (HermsException e) {
                    promise.reject("" + e.getErrorCode(), e.getMessage());
                }
            }
        });
    }

    @ReactMethod
    public void fetchShuoList(ReadableMap map, final Promise promise) {
        final String userId = map.getString(USER_ID);
        final boolean black = false;
        final boolean zan = false;
        final Constraint constraint = mapConstraint(map);
        worker.execute(new Runnable() {
            @Override
            public void run() {
                try {
                    JSONObject result = shuoShuoService.getShuoShuoList(userId, constraint, black, zan);
                    promise.resolve(result.toString());
                } catch (HermsException e) {
                    promise.reject("" + e.getErrorCode(), e.getMessage());
                }
            }
        });
    }

    @ReactMethod
    public void fetchSquareShuo(ReadableMap map, final Promise promise) {
        final Constraint constraint = mapConstraint(map);
        worker.execute(new Runnable() {
            @Override
            public void run() {
                try {
                    JSONObject result = shuoShuoService.getLatestShuoShuo(constraint);
                    promise.resolve(result.toString());
                } catch (HermsException e) {
                    promise.reject("" + e.getErrorCode(), e.getMessage());
                }
            }
        });
    }

    @ReactMethod
    public void fetchFriendCycleShuo(ReadableMap map, final Promise promise) {
        final String userId = map.getString(USER_ID);
        final Constraint constraint = mapConstraint(map);
        worker.execute(new Runnable() {
            @Override
            public void run() {
                try {
                    JSONObject result = shuoShuoService.getFriendCycleShuoShuo(userId, constraint);
                    promise.resolve(result.toString());
                } catch (HermsException e) {
                    promise.reject("" + e.getErrorCode(), e.getMessage());
                }
            }
        });
    }

    @ReactMethod
    public void getPhotoList(String json, final Promise promise) {
        try {
            JSONObject jsonObject = new JSONObject(json);
            final String userId = null;
            final String objectId = null;
            worker.execute(new Runnable() {
                @Override
                public void run() {
                    try {
                        JSONArray result = shuoShuoService.getPhotoList(userId, objectId);
                        promise.resolve(result.toString());
                    } catch (HermsException e) {
                        promise.reject("" + e.getErrorCode(), e.getMessage());
                    }
                }
            });
        } catch (JSONException e) {
            promise.reject(e);
        }
    }

    @ReactMethod
    public void downloadImg(ReadableMap map, final Promise promise) {
        final String userId = map.getString(USER_ID);
        final String objectId = map.getString(SHUO_ID);
        final String fileName = map.getString("imageUrl");
        final String targetPath = null;
        worker.execute(new Runnable() {
            @Override
            public void run() {
                try {
                    shuoShuoService.downloadPhoto(
                            userId,
                            objectId,
                            fileName,
                            targetPath,
                            new ProgressCallback() {
                                @Override
                                public boolean onProgress(int i) {
                                    promise.resolve(i);
                                    return false;
                                }
                            }
                    );
                } catch (HermsException e) {
                    promise.reject("" + e.getErrorCode(), e.getMessage());
                }
            }
        });
    }

    @ReactMethod
    public void deletePhoto(String json, final Promise promise) {
        try {
            JSONObject jsonObject = new JSONObject(json);
            final String userId = null;
            final String followerId = null;
            final boolean reverse = false;
            final boolean black = false;
            final String objectId = null;
            final Constraint constraint = null;
            worker.execute(new Runnable() {
                @Override
                public void run() {
                    try {
                        JSONObject result = shuoShuoService.deletePhoto(userId, objectId);
                        promise.resolve(result.toString());
                    } catch (HermsException e) {
                        promise.reject("" + e.getErrorCode(), e.getMessage());
                    }
                }
            });
        } catch (JSONException e) {
            promise.reject(e);
        }
    }

    @ReactMethod
    public void fetchShuoNear(ReadableMap map, final Promise promise) {
        final double longitude = optDouble(map, LONGITUDE);
        final double latitude = optDouble(map, LATITUDE);
        final long distance = optInt(map, DISTANCE);
        worker.execute(new Runnable() {
            @Override
            public void run() {
                try {
                    JSONArray result = shuoShuoService.getNearByShuoshuos(longitude, latitude, distance);
                    promise.resolve(result.toString());
                } catch (HermsException e) {
                    promise.reject("" + e.getErrorCode(), e.getMessage());
                }
            }
        });
    }

    @ReactMethod
    public void getLatestShuoShuo(String json, final Promise promise) {
        try {
            JSONObject jsonObject = new JSONObject(json);
            final String userId = null;
            final String followerId = null;
            final boolean reverse = false;
            final boolean black = false;
            final String objectId = null;
            final Constraint constraint = null;
            worker.execute(new Runnable() {
                @Override
                public void run() {
                    try {
                        JSONObject result = shuoShuoService.getLatestShuoShuo(constraint);
                        promise.resolve(result.toString());
                    } catch (HermsException e) {
                        promise.reject("" + e.getErrorCode(), e.getMessage());
                    }
                }
            });
        } catch (JSONException e) {
            promise.reject(e);
        }
    }

    @ReactMethod
    public void getFriendCycleShuoShuo(String json, final Promise promise) {
        try {
            JSONObject jsonObject = new JSONObject(json);
            final String userId = null;
            final String followerId = null;
            final boolean reverse = false;
            final boolean black = false;
            final String objectId = null;
            final Constraint constraint = null;
            worker.execute(new Runnable() {
                @Override
                public void run() {
                    try {
                        JSONObject result = shuoShuoService.getFriendCycleShuoShuo(userId, constraint);
                        promise.resolve(result.toString());
                    } catch (HermsException e) {
                        promise.reject("" + e.getErrorCode(), e.getMessage());
                    }
                }
            });
        } catch (JSONException e) {
            promise.reject(e);
        }
    }

    @ReactMethod
    public void signUp(ReadableMap map, final Promise promise) {
        final String username = optString(map, USERNAME);
        final String password = optString(map, PASSWORD);
        worker.execute(new Runnable() {
            @Override
            public void run() {
                try {
                    JSONObject result = socialPassService.register(username, password);
                    promise.resolve(result.toString());
                } catch (HermsException e) {
                    promise.reject("" + e.getErrorCode(), e.getMessage());
                }
            }
        });
    }

    @ReactMethod
    public void login(ReadableMap map, final Promise promise) {
        final String username = optString(map, USERNAME);
        final String password = optString(map, PASSWORD);
        worker.execute(new Runnable() {
            @Override
            public void run() {
                try {
                    JSONObject result = socialPassService.login(username, password);
                    promise.resolve(result.toString());
                } catch (HermsException e) {
                    promise.reject("" + e.getErrorCode(), e.getMessage());
                }
            }
        });
    }

    @ReactMethod
    public void loginByMobile(ReadableMap map, final Promise promise) {
        final String mobilePhone = optString(map, MOBILE_PHONE);
        final String smsCode = optString(map, SMS_CODE);
        worker.execute(new Runnable() {
            @Override
            public void run() {
                try {
                    JSONObject result = socialPassService.loginByMobile(mobilePhone, smsCode);
                    promise.resolve(result.toString());
                } catch (HermsException e) {
                    promise.reject("" + e.getErrorCode(), e.getMessage());
                }
            }
        });
    }

    @ReactMethod
    public void requestSmsCode(ReadableMap map, final Promise promise) {
        final String mobilePhone = optString(map, MOBILE_PHONE);
        worker.execute(new Runnable() {
            @Override
            public void run() {
                try {
                    JSONObject result = socialPassService.getSmsCode(mobilePhone);
                    promise.resolve(result.toString());
                } catch (HermsException e) {
                    promise.reject("" + e.getErrorCode(), e.getMessage());
                }
            }
        });
    }

    private Map<String, String> convertMap(ReadableMap readableMap) {
        if (readableMap == null) return null;
        Map<String, String> map = new HashMap<String, String>();
        ReadableMapKeySetIterator iterator = readableMap.keySetIterator();
        while (iterator.hasNextKey()) {
            String key = iterator.nextKey();
            map.put(key, optString(readableMap, key));
        }
        return map;
    }

    private List<String> converArray(ReadableArray readableArray) {
        if (readableArray == null || readableArray.size() == 0) return null;
        List<String> list = new ArrayList<String>();
        int len = readableArray.size();
        for (int i = 0; i < len; i++) {
            list.add(readableArray.getString(i));
        }
        return list;
    }

    private String optString(ReadableMap map, String key) {
        if (map.hasKey(key)) {
            return map.getString(key);
        }
        return null;
    }

    private boolean optBoolean(ReadableMap map, String key, boolean defaultValue) {
        if (map.hasKey(key)) {
            return map.getBoolean(key);
        }
        return defaultValue;
    }

    private int optInt(ReadableMap map, String key) {
        if (map.hasKey(key)) {
            return map.getInt(key);
        }
        return 0;
    }

    private double optDouble(ReadableMap map, String key) {
        if (map.hasKey(key)) {
            return map.getDouble(key);
        }
        return 0;
    }

    private ReadableMap optMap(ReadableMap map, String key) {
        if (map.hasKey(key)) {
            return map.getMap(key);
        }
        return null;
    }

    private ReadableArray optArray(ReadableMap map, String key) {
        if (map.hasKey(key)) {
            return map.getArray(key);
        }
        return null;
    }
}
