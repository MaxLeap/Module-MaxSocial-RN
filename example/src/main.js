import React, { Component } from 'react';
import ReactNative, { View, Text, TouchableHighlight } from 'react-native';
import MaxSocialUser from 'maxleap-socialshare-react-native';
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

export default class Main extends Component {

  render() {
    return (
      <View style={styles.container}>
        <TouchableHighlight onPress={()=>this._share()}
                            underlayColor={'#32BE78'}
                            style={styles.btn}>
          <Text style={styles.btnText}>
            Social!!!
          </Text>
        </TouchableHighlight>

        <TouchableHighlight
            style={[{backgroundColor: 'aqua'},styles.btnMargin]}
            onPress={this._createLocation.bind(this)}>
          <Text>create location!!!</Text>
        </TouchableHighlight>
      </View>
    );
  }

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

    var text = 'text for test';
    var userId = '574ff585169e7d0001a56040';
    var followeeId = '', followerId = '';
    var reverse = '';
    var anotherUserId = '5750e608a5ff7f00013a1c50';
    var link = 'http://www.maxleap.cn';
    var imgPaths = '';
    var location = {
      longitude: 50,
      latitude: 50
    }
    var square = '';
    var shuoId = ' ';
    var distance = '';


  _follow() {
    var followeeId = '';
    var reverse=true;
    new MaxSocialUser.follow(followeeId, reverse)
    .then(result=>console.log(result))
    .catch(e=>console.log(e));
  }

  _unfollow() {
    var followeeId = '';
    new MaxSocialUser.unfollow(followeeId)
    .then(result=>console.log(result))
    .catch(e=>console.log(e));
  }

  _block() {
    var anotherUserId = '5750e608a5ff7f00013a1c50'；
    new MaxSocialUser.block(anotherUserId)
    .then(result=>console.log(result))
    .catch(e=>console.log(e));
  }

  _unblock() {unblock
    var anotherUserId = '5750e608a5ff7f00013a1c50'；
    new MaxSocialUser.unblock(anotherUserId)
    .then(result=>console.log(result))
    .catch(e=>console.log(e));
  }

  _getRelationInfo() {
    var relationId = '';
    new MaxSocialUser.getRelationInfo(relationId)
    .then(result=>console.log(result))
    .catch(e=>console.log(e));
  }

  _getRelationInfoBetweenUsers() {
    var userId = '574ff585169e7d0001a56040';
    var anotherUserId = '5750e608a5ff7f00013a1c50';
    new MaxSocialUser.getRelationInfoBetweenUsers(userId, anotherUserId)
    .then(result=>console.log(result))
    .catch(e=>console.log(e));
  }

  _checkStatusBetweenUser() {
    var userId = '574ff585169e7d0001a56040';
    var anotherUserId = '5750e608a5ff7f00013a1c50';
    new MaxSocialUser.checkStatusBetweenUser(userId, anotherUserId)
    .then(result=>console.log(result))
    .catch(e=>console.log(e));
  }

  _findFollowees() {
    var params={
      pageId:0, 
      sort:1, 
      asc:false
    }
    new MaxSocialUser.findFollowees(params)
    .then(result=>console.log(result))
    .catch(e=>console.log(e));
  }

  _findFollowers() {
    var params={
      pageId:0, 
      sort:1, 
      asc:false
    }
    new MaxSocialUser.findFollowers(params)
    .then(result=>console.log(result))
    .catch(e=>console.log(e));
  }

  _deleteRelationInfo() {
    var relationId = '';
    new MaxSocialUser.deleteRelationInfo(relationId)
    .then(result=>console.log(result))
    .catch(e=>console.log(e));
  }

  _updateLocation() {
    var longitude = 50;
    var latitude = 50;
    new MaxSocialUser('574ff585169e7d0001a56040').updateLocation(latitude, longitude)
    .then(result=>console.log(result))
    .catch(e=>console.log(e));
  }

  _findUserNear() {
    var latitude=0, longitude=0, distance=1000;
    new MaxSocialUser.findUserNear(latitude, longitude, distance)
    .then(result=>console.log(result))
    .catch(e=>console.log(e));
  }

  _getLocation() {}

  _deleteLocation() {
    var locationId = '';
    new MaxSocialUser.deleteLocation(locationId)
    .then(result=>console.log(result))
    .catch(e=>console.log(e));
  }

  _getLocationByUserId() {}

  _commentShuo() {
    var shuoId = '';
    var text = 'the comment of Shuo';
    new MaxSocialUser.commentShuo(shuoId, text)
    .then(result=>console.log(result))
    .catch(e=>console.log(e));
  }

  _likeShuo() {
    var shuoId = '';
    new MaxSocialUser.likeShuo(shuoId)
    .then(result => console.log(result))
    .catch(e=>console.log(e));
  }

  _markCommentAsRead() {
    var commentId = '';
    new MaxSocialUser.markCommentAsRead(commentId)
    .then(result => console.log(result))
    .catch(e=>console.log(e));
  }

  _fetchComment() {
    var commentId = '';
    new MaxSocialUser.fetchComment(commentId)
    .then(result => console.log(result))
    .catch(e=>console.log(e));
  }

  _deleteComment() {
    var commentId = '';
    new MaxSocialUser.deleteComment(commentId)
    .then(result => console.log(result))
    .catch(e=>console.log(e));
  }

  _fetchCommentOfShuo() {
    var commentOfShuoMap = {
        shuoId: '',
        pageId:0, 
        sort: 1, 
        zan: false, 
        asc: false
    }
    new MaxSocialUser.fetchCommentOfShuo(commentOfShuoMap)
    .then(result=>console.log(result))
    .catch(e=>console.log(e));
  }

  _fetchUnreadComment() {
    var userId = '574ff585169e7d0001a56040';
    new MaxSocialUser.fetchUnreadComment(userId)
    .then(result => console.log(result))
    .catch(e=>console.log(e));
  }

  _postShuo() {
    shuoMap = {
      text: 'text for test',
      link: 'www.maxleap.cn',
      imgPaths: '',
      location: {
        longitude: 50,
        latitude: 50
      }
    }
    new MaxSocialUser.postShuo(shuoMap)
    .then(result => console.log(result), getObjectId)
    .catch(e=>console.log(e));
  }

  _fetchShuo() {
    var ShuoId = '';
    new MaxSocialUser.fetchShuo(ShuoId)
    .then(result=>console.log(result))
    .catch(e=>console.log(e));
  }

  _deleteShuo() {
    var ShuoId = '';
    new MaxSocialUser.deleteShuo(ShuoId)
    .then(result=>console.log(result))
    .catch(e=>console.log(e));
  }

  _fetchShuoList() {
    var ShuoListMap = {
      userId : '574ff585169e7d0001a56040'
    }
    new MaxSocialUser.fetchShuoList(ShuoListMap)
    .then(result=>console.log(result))
    .catch(e=>console.log(e));
  }

  _fetchSquareShuo() {
    var squareShuoMap = {
      pageId:0, 
      sort:1, 
      asc:false
    }
    new MaxSocialUser.fetchSquareShuo(squareShuoMap)
    .then(result=>console.log(result))
    .catch(e=>console.log(e));
  }

  _fetchFriendCycleShuo() {
    var friendCycleShuo = {
      userId : '574ff585169e7d0001a56040',
      page:0, 
      sort:1, 
      ascending:false
    }
    new MaxSocialUser.fetchFriendCycleShuo(friendCycleShuo)
    .then(result=>console.log(result))
    .catch(e=>console.log(e));
  }

  // _getPhotoList() { 没有这个方法}

  _downloadImg() {
    var downloadImgMap = {
      userId: '574ff585169e7d0001a56040', 
      imageUrl: '', 
      shuoId: ''
    }
    new MaxSocialUser.downloadImg(downloadImgMap)
    .then(result=>console.log(result))
    .catch(e=>console.log(e));
  }

  // _deletePhoto() {}

  _fetchShuoNear() {
    var ShuoNearMap = {
      latitude=0, 
      longitude=0, 
      distance=1000
    }
    new MaxSocialUser.fetchShuoNear(ShuoNearMap)
    .then(result=>console.log(result))
    .catch(e=>console.log(e));
  }

  // _getLatestShuoShuo() {}

  // _getFriendCycleShuoShuo() {}

}
