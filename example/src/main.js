import React, { Component } from 'react';
import ReactNative, {AppRegistry,
    TouchableHighlight,
    Image,
    ScrollView,
    TextInput,
    ListView,
    StyleSheet,
    Text,
    View} from 'react-native';
import MaxSocial from 'maxleap-socialshare-react-native';
// var MaxSocialUser = require('maxleap-socialshare-react-native');

const styles = {
  container: {
    justifyContent: 'center',
    flex: 1
  },
  btnText: {
    textAlign: 'center',
    fontSize: 18
  },
  btn: {
    height: 50,
    justifyContent: 'center'
  }
};

var tester001Id = '5751517b169e7d0001c71196',
    tester002Id = '57515186169e7d0001c711a2',
    tester003Id = '5751518f169e7d0001c711b4',
    tester004Id = '5751519a169e7d0001c711c7',
    tester005Id = '575151a2169e7d0001c711db';

var username = 'tester001' + new Date().getTime();
var password = '123123123';
var mobilePhoneNumber = '18964079527';
var smsCode = '846062';

var userId = '';

// var maxSocialUser = new MaxSocial.User(userId);
var locationId = '';
var longitude = 23;
var latitude = 31;
var distance= 1000;

var reverse=true;

var anotherUserId = '57515186169e7d0001c711a2';

var relationId = '';

var imageUrl = '';

var shuo = {
      text: 'this is the datails of shuo',
      // link: 'http://www.maxleap.cn', // webpage link
      imgPaths: ['file:///sdcard/me.jpeg'],
      location: {
        latitude: 31, // [-90, 90]
        longitude: 23 // [-180, 180]
      },
      square: true  // square参数直接影响friend cycle，当square为true时，代表此条shuo既发广场又发朋友圈，此时friend cycle应为false
      //当square为flase时，代表此条shuo只发朋友圈不发广场，此时friend Cycle应为true
}
var shuoId = '';
var commentShuoText = 'the comment of Shuo';
var commentId = '';

var shuoListParams = {
      pageId: 0,
      sort: 1,          // 0 byUserId, 1 byCreatedTime
      asc: false,
      black: false      //zan这个参数还不确定要不要传值
}
var squareShuoParams = {
      pageId: 0,
      sort: 1,          // 0 byUserId, 1 byCreatedTime
      asc: false
}
var friendCycleShuoParams = {
      pageId: 0,
      sort: 1,          // 0 byUserId, 1 byCreatedTime
      asc: false
}
var followeesParams = {
      pageId: 0,
      sort: 1,        // 0 byUserId, 1 byCreatedTime
      asc: false      // ascending or not
}
var followersParams = {
      pageId: 0,
      sort: 1,        // 0 byUserId, 1 byCreatedTime
      asc: false      // ascending or not
}
var commentShuoParams = {
      pageId: 0,
      sort: 1,     // 0 byUserId, 1 byCreatedTime
      zan: false,
      asc: false
}
// public static final String USER_ID = "userId";
// public static final String FOLLOWEE_ID = "followeeId";
// public static final String FOLLOWER_ID = "followerId";
// public static final String REVERSE = "reverse";
// public static final String ANOTHER_USER_ID = "anotherUserId";
// public static final String TEXT = "text";
// public static final String LINK = "link";
// public static final String IMAGE_PATH = "imgPaths";
// public static final String LOCATION = "location";
// public static final String SQUARE = "square";
// public static final String LATITUDE = "latitude";
// public static final String LONGITUDE = "longitude";
// public static final String SHUO_ID = "shuoId";
// public static final String DISTANCE = "distance";
export default class Main extends Component {
  render() {
    return (
      <ScrollView>

        <TouchableHighlight onPress={()=>this._share()}
                            underlayColor={'#32BE78'}
                            style={styles.btn}>
          <Text style={styles.btnText}>
            Social!!!
          </Text>
        </TouchableHighlight>

        <TouchableHighlight
            style={[{backgroundColor: 'aqua'},styles.btnMargin]}
            onPress={this._signUp.bind(this)}>
          <Text>User SignUp!!!</Text>
        </TouchableHighlight>
        <TouchableHighlight
            style={[{backgroundColor: 'aqua'},styles.btnMargin]}
            onPress={this._login.bind(this)}>
          <Text>User login!!!</Text>
        </TouchableHighlight>
        <TouchableHighlight
            style={[{backgroundColor: 'aqua'},styles.btnMargin]}
            onPress={this._requestSmsCode.bind(this)}>
          <Text>request sms code!!!</Text>
        </TouchableHighlight>        
        <TouchableHighlight
            style={[{backgroundColor: 'aqua'},styles.btnMargin]}
            onPress={this._loginByMobile.bind(this)}>
          <Text>login by mobilephone!!!</Text>
        </TouchableHighlight>



        <TouchableHighlight
            style={[{backgroundColor: 'aqua'},styles.btnMargin]}
            onPress={this._postShuo.bind(this)}>
          <Text>post Shuo!!!</Text>
        </TouchableHighlight>
        <TouchableHighlight
            style={[{backgroundColor: 'aqua'},styles.btnMargin]}
            onPress={this._fetchShuo.bind(this)}>
          <Text>fetch Shuo!!!</Text>
        </TouchableHighlight>
        <TouchableHighlight
            style={[{backgroundColor: 'aqua'},styles.btnMargin]}
            onPress={this._fetchShuoList.bind(this)}>
          <Text>fetch Shuo List!!!</Text>
        </TouchableHighlight>
        <TouchableHighlight
            style={[{backgroundColor: 'aqua'},styles.btnMargin]}
            onPress={this._fetchSquareShuo.bind(this)}>
          <Text>fetch Square Shuo!!!</Text>
        </TouchableHighlight>
        <TouchableHighlight
            style={[{backgroundColor: 'aqua'},styles.btnMargin]}
            onPress={this._fetchFriendCycleShuo.bind(this)}>
          <Text>fetch friend cycle shuo!!!</Text>
        </TouchableHighlight>
        <TouchableHighlight
            style={[{backgroundColor: 'aqua'},styles.btnMargin]}
            onPress={this._fetchShuoNear.bind(this)}>
          <Text>fetch Shuo Near!!!</Text>
        </TouchableHighlight>
        <TouchableHighlight
            style={[{backgroundColor: 'aqua'},styles.btnMargin]}
            onPress={this._downloadImg.bind(this)}>
          <Text>download image!!!</Text>
        </TouchableHighlight>
        <TouchableHighlight
            style={[{backgroundColor: 'aqua'},styles.btnMargin]}
            onPress={this._likeShuo.bind(this)}>
          <Text>like shuo!!!</Text>
        </TouchableHighlight>
        <TouchableHighlight
            style={[{backgroundColor: 'aqua'},styles.btnMargin]}
            onPress={this._commentShuo.bind(this)}>
          <Text>comment shuo!!!</Text>
        </TouchableHighlight>
        <TouchableHighlight
            style={[{backgroundColor: 'aqua'},styles.btnMargin]}
            onPress={this._fetchComment.bind(this)}>
          <Text>fetch comment!!!</Text>
        </TouchableHighlight>
        <TouchableHighlight
            style={[{backgroundColor: 'aqua'},styles.btnMargin]}
            onPress={this._fetchCommentOfShuo.bind(this)}>
          <Text>fetch comment by ShuoId!!!</Text>
        </TouchableHighlight>
        <TouchableHighlight
            style={[{backgroundColor: 'aqua'},styles.btnMargin]}
            onPress={this._fetchUnreadComment.bind(this)}>
          <Text>fetch unread comment!!!</Text>
        </TouchableHighlight>
        <TouchableHighlight
            style={[{backgroundColor: 'aqua'},styles.btnMargin]}
            onPress={this._markCommentAsRead.bind(this)}>
          <Text>mark comment as read!!!</Text>
        </TouchableHighlight>
        <TouchableHighlight
            style={[{backgroundColor: 'aqua'},styles.btnMargin]}
            onPress={this._deleteComment.bind(this)}>
          <Text>delete the comment!!!</Text>
        </TouchableHighlight>
        <TouchableHighlight
            style={[{backgroundColor: 'aqua'},styles.btnMargin]}
            onPress={this._deleteShuo.bind(this)}>
          <Text>delete Shuo!!!</Text>
        </TouchableHighlight>

        <TouchableHighlight
            style={[{backgroundColor: 'aqua'},styles.btnMargin]}
            onPress={this._block.bind(this)}>
          <Text>block anotherUser!!!</Text>
        </TouchableHighlight>
        <TouchableHighlight
            style={[{backgroundColor: 'aqua'},styles.btnMargin]}
            onPress={this._unblock.bind(this)}>
          <Text>unblock anotherUser!!!</Text>
        </TouchableHighlight>

        <TouchableHighlight
            style={[{backgroundColor: 'aqua'},styles.btnMargin]}
            onPress={this._follow.bind(this)}>
          <Text>follow create relation!!!</Text>
        </TouchableHighlight>
        <TouchableHighlight
            style={[{backgroundColor: 'aqua'},styles.btnMargin]}
            onPress={this._unfollow.bind(this)}>
          <Text>unfollow delete relation!!!</Text>
        </TouchableHighlight>

        <TouchableHighlight
            style={[{backgroundColor: 'aqua'},styles.btnMargin]}
            onPress={this._getRelationInfo.bind(this)}>
          <Text>get Relation information!!!</Text>
        </TouchableHighlight>
        <TouchableHighlight
            style={[{backgroundColor: 'aqua'},styles.btnMargin]}
            onPress={this._getRelationInfoBetweenUsers.bind(this)}>
          <Text>get Relation information between Users!!!</Text>
        </TouchableHighlight>
        <TouchableHighlight
            style={[{backgroundColor: 'aqua'},styles.btnMargin]}
            onPress={this._checkStatusBetweenUser.bind(this)}>
          <Text>get Relation information between Users!!!</Text>
        </TouchableHighlight>

        <TouchableHighlight
            style={[{backgroundColor: 'aqua'},styles.btnMargin]}
            onPress={this._findFollowees.bind(this)}>
          <Text>find followees!!!</Text>
        </TouchableHighlight>
        <TouchableHighlight
            style={[{backgroundColor: 'aqua'},styles.btnMargin]}
            onPress={this._findFollowers.bind(this)}>
          <Text>find followers!!!</Text>
        </TouchableHighlight>

        <TouchableHighlight
            style={[{backgroundColor: 'aqua'},styles.btnMargin]}
            onPress={this._deleteRelationInfo.bind(this)}>
          <Text>delete relation infomation!!!</Text>
        </TouchableHighlight>

        <TouchableHighlight
            style={[{backgroundColor: 'aqua'},styles.btnMargin]}
            onPress={this._updateLocation.bind(this)}>
          <Text>update location!!!</Text>
        </TouchableHighlight>
        <TouchableHighlight
            style={[{backgroundColor: 'aqua'},styles.btnMargin]}
            onPress={this._getLocation.bind(this)}>
          <Text>get location!!!</Text>
        </TouchableHighlight>
        <TouchableHighlight
            style={[{backgroundColor: 'aqua'},styles.btnMargin]}
            onPress={this._getLocationByUserId.bind(this)}>
          <Text>get location by userId!!!</Text>
        </TouchableHighlight>
        <TouchableHighlight
            style={[{backgroundColor: 'aqua'},styles.btnMargin]}
            onPress={this._findUserNear.bind(this)}>
          <Text>find user near!!!</Text>
        </TouchableHighlight>
        <TouchableHighlight
            style={[{backgroundColor: 'aqua'},styles.btnMargin]}
            onPress={this._deleteLocation.bind(this)}>
          <Text>delete location!!!</Text>
        </TouchableHighlight>
      </ScrollView>
    );
  }


  _signUp() {
    MaxSocial.User.signUp(username, password)
    .then(function(result) {
      console.log(result);
      userId = JSON.parse(result).objectId;
    })
    .catch(e=>console.log(e));
  }

  _login() {
    MaxSocial.User.login(username, password)
    .then(function(result) {
      console.log(result);
    })
    .catch(e=>console.log(e));
  }

  _requestSmsCode() {
    MaxSocial.User.requestSmsCode(mobilePhoneNumber)
    .then(function(result) {
      console.log(result);
    })
    .catch(e=>console.log(e));
  }

  _loginByMobile() {
    MaxSocial.User.loginByMobile(mobilePhoneNumber, smsCode)
    .then(function(result) {
      console.log(result);
    })
    .catch(e=>console.log(e));
  }

  _follow() {
    new MaxSocial.User(userId).follow(anotherUserId, reverse)
    .then(function(result) {
      console.log(result);
      relationId = result.objectId;
    })
    .catch(e=>console.log(e));
  }

  _unfollow() {
    new MaxSocial.User(userId).unfollow(anotherUserId)
    .then(result=>console.log(result))
    .catch(e=>console.log(e));
  }

  _block() {
    new MaxSocial.User(userId).block(anotherUserId)
    .then(result=>console.log(result))
    .catch(e=>console.log(e));
  }

  _unblock() {
    new MaxSocial.User(userId).unblock(anotherUserId)
    .then(result=>console.log(result))
    .catch(e=>console.log(e));
  }

  _getRelationInfo() {
    new MaxSocial.User(userId).getRelationInfo(relationId)
    .then(result=>console.log(result))
    .catch(e=>console.log(e));
  }

  _getRelationInfoBetweenUsers() {
    new MaxSocial.User(userId).getRelationInfoBetweenUsers(userId, anotherUserId)
    .then(result=>console.log(result))
    .catch(e=>console.log(e));
  }

  _checkStatusBetweenUser() {
    new MaxSocial.User(userId).checkStatusBetweenUser(userId, anotherUserId)
    .then(result=>console.log(result))
    .catch(e=>console.log(e));
  }

  _findFollowees() {
    new MaxSocial.User(userId).findFollowees(followeesParams)
    .then(result=>console.log(result))
    .catch(e=>console.log(e));
  }

  _findFollowers() {
    new MaxSocial.User(userId).findFollowers(followersParams)
    .then(result=>console.log(result))
    .catch(e=>console.log(e));
  }

  _deleteRelationInfo() {
    new MaxSocial.User(userId).deleteRelationInfo(relationId)
    .then(result=>console.log(result))
    .catch(e=>console.log(e));
  }

  _updateLocation() {
    new MaxSocial.User(userId).updateLocation(50, 50)
    .then(function(result) {
      console.log(result);
      locationId = result.objectId;
    })
    .catch(e=>console.log(e));
  }

  _findUserNear() {
    new MaxSocial.User(userId).findUserNear(latitude, longitude, distance)
    .then(result=>console.log(result))
    .catch(e=>console.log(e));
  }

  _getLocation() {
    new MaxSocial.User(userId).getLocation(locationId)
    .then(result=>console.log(result))
    .catch(e=>console.log(e));
  }

  _deleteLocation() {
    new MaxSocial.User(userId).deleteLocation(locationId)
    .then(result=>console.log(result))
    .catch(e=>console.log(e));
  }

  _getLocationByUserId() {
    new MaxSocial.User(userId).getLocationByUserId()
    .then(result=>console.log(result))
    .catch(e=>console.log(e));
  }

  _commentShuo() {
    new MaxSocial.User(userId).commentShuo(shuoId, commentShuoText)
    .then(function(result) {
      console.log(result);
      commentId = JSON.parse(result).objectId;
    })
    .catch(e=>console.log(e));
  }

  _likeShuo() {
    new MaxSocial.User(userId).likeShuo(shuoId)
    .then(result => console.log(result))
    .catch(e=>console.log(e));
  }

  _markCommentAsRead() {
    new MaxSocial.User(userId).markCommentAsRead(commentId)
    .then(result => console.log(result))
    .catch(e=>console.log(e));
  }

  _fetchComment() {
    new MaxSocial.User(userId).fetchComment(commentId)
    .then(result => console.log(result))
    .catch(e=>console.log(e));
  }

  _deleteComment() {
    new MaxSocial.User(userId).deleteComment(commentId)
    .then(result => console.log(result))
    .catch(e=>console.log(e));
  }

  _fetchCommentOfShuo() {
    new MaxSocial.User(userId).fetchCommentOfShuo(shuoId, commentShuoParams)
    .then(result=>console.log(result))
    .catch(e=>console.log(e));
  }

  _fetchUnreadComment() {
    new MaxSocial.User(userId).fetchUnreadComment()
    .then(result => console.log(result))
    .catch(e=>console.log(e));
  }

  _postShuo() {
    new MaxSocial.User(userId).postShuo(shuo)
    .then(function(result) {
      console.log(result);
      shuoId = JSON.parse(result).objectId;
    })
    .catch(e=>console.log(e));
  }

  _fetchShuo() {
    new MaxSocial.User(userId).fetchShuo(shuoId)
    .then(function(result) {
      console.log(result);
    })
    .catch(e=>console.log(e));
  }

  _deleteShuo() {
    new MaxSocial.User(userId).deleteShuo(shuoId)
    .then(result=>console.log(result))
    .catch(e=>console.log(e));
  }

  _fetchShuoList() {
    new MaxSocial.User(userId).fetchShuoList(shuoListParams)
    .then(result=>console.log(result))
    .catch(e=>console.log(e));
  }

  _fetchSquareShuo() {
    new MaxSocial.User(userId).fetchSquareShuo(squareShuoParams)
    .then(result=>console.log(result))
    .catch(e=>console.log(e));
  }

  _fetchFriendCycleShuo() {
    new MaxSocial.User('57515186169e7d0001c711a2').fetchFriendCycleShuo(friendCycleShuoParams)
    .then(result=>console.log(result))
    .catch(e=>console.log(e));
  }

  // // _getPhotoList() { 没有这个方法}

  _downloadImg() {
    new MaxSocial.User(userId).downloadImg(imageUrl, shuoId, function(p){
      console.log(p);
    }) //此处有疑问
    // .then(result=>console.log(result))
    // .catch(e=>console.log(e));
  }

  // // _deletePhoto() {}

  _fetchShuoNear() {
    new MaxSocial.User(userId).fetchShuoNear(latitude, longitude, distance)
    .then(result=>console.log(result))
    .catch(e=>console.log(e));
  }

  // _getLatestShuoShuo() {}

  // _getFriendCycleShuoShuo() {}

}
