import React, { Component } from "react";
import {
  ActivityIndicator,
  Alert,
  AsyncStorage,
  Dimensions,
  Image,
  Text,
  TouchableWithoutFeedback,
  View,
  StyleSheet,
  WebView
} from 'react-native';
import {
  Actions
} from 'react-native-router-flux';

import VideoPlayer from 'react-native-video-controls';

const url='http://www.sina.com/';
export default class UpdateVideoPage extends Component {

  constructor(props) {
    super(props)
    this.state = {
      parentComponent: props.parentComponent
    }
  }

  back() {
    Actions.pop()
  }

  render() {
    return (
        <View style={{
            flex: 1
          }}>
          <VideoPlayer
            source={{uri:'http://47.94.94.196/LeyaoTemp/vedio/3.mp4'}}
            playInBackground={ true }
            playWhenInactive={ true }
            navigator={this.props.navigator} 
            onBack={ this.back.bind(this)  } 
          />
        </View>
    );
  }
}
