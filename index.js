'use strict';

import invariant from 'invariant';
import ReactNative, { NativeModules } from 'react-native';

const MaxSocialNative = NativeModules.MaxSocial;

class MaxSocial {}

class MaxSocialUser {
  constructor(userId) {
    invariant(userId, 'Cannot create a social user object without userId.');
    this.userId = userId;
  }

  static signUp(username, password) {
    let promise = MaxSocialNative.signUp({username, password});
    return promise;
  }

  static login(username, password) {
    let promise = MaxSocialNative.login({username, password});
    return promise;
  }

  static requestSmsCode(phone) {
    let promise = MaxSocialNative.requestSmsCode(phone);
    return promise;
  }

  static loginByMobile(mobilePhone, smsCode) {
    let promise = MaxSocialNative.loginByMobile({mobilePhone, smsCode});
    return promise;
  }

  /**

  */
  follow(followeeId, reverse=true) {
    let userId = this.userId;
    let promise = MaxSocialNative.follow({userId, followeeId, reverse});
    return promise;
  }

  unfollow(followeeId) {
    let userId = this.userId;
    let promise = MaxSocialNative.unfollow({userId, followeeId});
    return promise;
  }

  /**

  */
  block(anotherUserId) {
    let userId = this.userId;
    let promise = MaxSocialNative.block({userId, anotherUserId});
    return promise;
  }

  unblock(anotherUserId) {
    let userId = this.userId;
    let promise = MaxSocialNative.unblock({userId, anotherUserId});
    return promise;
  }

  getRelationInfo(relationInfoId) {
    let promise = MaxSocialNative.getRelationInfo(relationInfoId);
    return promise;
  }

  getRelationInfoBetweenUsers(userId, followerId) {
    let promise = MaxSocialNative.getRelationInfoBetweenUsers({userId, followerId});
    return promise;
  }

  deleteRelationInfo(relationInfoId) {
    let promise = MaxSocialNative.deleteRelationInfo(relationInfoId);
    return promise;
  }

  /**

  */
  checkStatusBetweenUser(userId, anotherUserId) {
    let promise = MaxSocialNative.checkStatusBetweenUser({userId, anotherUserId});
    return promise;
  }

  /**
    @param params
    {
      pageId: 0,
      sort: 1,        // 0 byUserId, 1 byCreatedTime
      asc: false      // ascending or not
    }
  */
  findFollowees(params={pageId:0, sort:1, asc:false}) {
    params.followerId = this.userId;
    let promise = MaxSocialNative.findFollowees(params);
    return promise;
  }

  /**
    @param params
    {
      pageId: 0,
      sort: 1,          // 0 byUserId, 1 byCreatedTime
      asc: false        // ascending or not
    }
  */
  findFollowers(params={pageId:0, sort:1, asc:false}) {
    params.userId = this.userId;
    let promise = MaxSocialNative.findFollower(params);
    return promise;
  }

  /**
    @param shuo
    {
      text: '',
      link: 'http://www.baidu.com', // webpage link
      imgPaths: ['imgPath'],
      location: {
        latitude: 31, // [-90, 90]
        longitude: 23 // [-180, 180]
      },
      square: true  // whether others can see the shuo on square
    }
  */
  postShuo(shuo) {
    let userId = this.userId;
    let promise = MaxSocialNative.postShuo({userId, shuo});
    return promise;
  }

  fetchShuo(shuoId) {
    let promise = MaxSocialNative.fetchShuo(shuoId);
    return promise;
  }

  deleteShuo(shuoId) {
    let userId = this.userId;
    let promise = MaxSocialNative.deleteShuo({userId, shuoId});
    return promise;
  }

  /**
    Fetch the shuoshuo of the receiver.
    @param params
    {
      pageId: 0,
      sort: 1,          // 0 byUserId, 1 byCreatedTime
      asc: false,
      black: false
    }
  */
  fetchShuoList(params={pageId:0, sort:1, asc:false}) {
    params.userId = this.userId;
    let promise = MaxSocialNative.fetchShuoList(params);
    return promise;
  }

  /**
    Fetch the shuoshuo of the receiver.
    @param params
    {
      pageId: 0,
      sort: 1,          // 0 byUserId, 1 byCreatedTime
      asc: false
    }
  */
  fetchSquareShuo(params={pageId:0, sort:1, asc:false}) {
    let promise = MaxSocialNative.fetchSquareShuo(params);
    return promise;
  }

  /**
    Fetch the shuoshuo of the receiver.
    @param params
    {
      pageId: 0,
      sort: 1,          // 0 byUserId, 1 byCreatedTime
      asc: false
    }
  */
  fetchFriendCycleShuo(params={page:0, sort:1, ascending:false}) {
    let userId = this.userId;
    let promise = MaxSocialNative.fetchFriendCycleShuo({userId, params});
    return promise;
  }

  fetchShuoNear(latitude=0, longitude=0, distance=1000) {
    let params = {latitude, longitude, distance};
    let promise = MaxSocialNative.fetchShuoNear(params);
    return promise;
  }

  // getImageNamesOfShuoShuo

  // unneccessary
  // downloadImg().then(imgPath=>{})
  downloadImg(imageUrl, shuoId, progress=p=>{}) {
    let userId = this.userId;
    let params = {userId, imageUrl, shuoId};
    let promise = MaxSocialNative.downloadImg(params, progress);
    return promise;
  }



  updateLocation(latitude=0, longitude=0) {
    let userId = this.userId;
    let promise = MaxSocialNative.updateLocation({userId, latitude, longitude});
    return promise;
  }

  getLocation(locationId) {
    let promise = MaxSocialNative.getLocation(locationId);
    return promise;
  }

  getLocationByUserId() {
    let promise = MaxSocialNative.getLocationByUserId(this.userId);
    return promise;
  }

  findUserNear(latitude=0, longitude=0, distance=1000) {
    let userId = this.userId;
    let promise = MaxSocialNative.findUserNear({userId, latitude, longitude, distance});
    return promise;
  }

  deleteLocation(locationInfoId) {
    let promise = MaxSocialNative.deleteLocation(locationInfoId);
    return promise;
  }



  commentShuo(shuoId, text) {
    let userId = this.userId;
    let promise = MaxSocialNative.commentShuo({userId, shuoId, text});
    return promise;
  }

  likeShuo(shuoId) {
    let userId = this.userId;
    let promise = MaxSocialNative.likeShuo({userId, shuoId});
    return promise;
  }

  markCommentAsRead(commentId) {
    let promise = MaxSocialNative.markCommentAsRead(commentId);
    return promise;
  }

  fetchComment(commentId) {
    let promise = MaxSocialNative.fetchComment(commentId);
    return promise;
  }

  deleteComment(commentId) {
    let promise = MaxSocialNative.deleteComment(commentId);
    return promise;
  }

  /**
    Fetch the shuoshuo of the receiver.
    @param params
    {
      pageId: 0,
      sort: 1,     // 0 byUserId, 1 byCreatedTime
      zan: false,
      asc: false
    }
  */
  fetchCommentOfShuo(shuoId, params={pageId:0, sort: 1, zan: false, asc: false}) {
    params.shuoId = shuoId;
    let promise = MaxSocialNative.fetchCommentOfShuo(params);
    return promise;
  }

  fetchUnreadComment() {
    let promise = MaxSocialNative.fetchUnreadComment(this.userId);
    return promise;
  }
}

MaxSocial.User = MaxSocialUser;

export default MaxSocial;
