import React, { Component } from 'react';
import ReactNative, { View, Text, TouchableHighlight } from 'react-native';
import share from 'maxleap-socialshare-react-native';

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
  _share() {
    // text
    share({
    	type: 'text', // valid values are: text,image,webpage,music,video
    	title: 'hello',
    	detail: 'nimeidetail',
    	latitude: 13.1,
    	longitude: 23.3,
    	// for iPad
    	rect: {x: 0, y: 0, width: 320, height: 30}
    })
    .catch( error => {
      alert(error);
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <TouchableHighlight onPress={()=>this._share()}
                            underlayColor={'#32BE78'}
                            style={styles.btn}>
          <Text style={styles.btnText}>
            Share
          </Text>
        </TouchableHighlight>
      </View>
    );
  }
}
