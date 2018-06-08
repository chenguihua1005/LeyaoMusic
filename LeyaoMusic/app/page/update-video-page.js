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
  WebView,
  DeviceEventEmitter
} from 'react-native';
import {
  Actions
} from 'react-native-router-flux';

import VideoPlayer from 'react-native-video-controls';
import APIConstant from '../service/api-constant';

export default class UpdateVideoPage extends Component {

  constructor(props) {
    super(props)
    this.state = {
      parentComponent: props.parentComponent,
      file_link: { uri: 'http://47.94.94.196/LeyaoTemp/vedio/1.mp4' },   //视频播放链接
    }
  }

  componentDidMount() {
    this.setState({ file_link: { uri: APIConstant.URL_VEDIO } });
    //发广播通知暂停音乐
    DeviceEventEmitter.emit('pauseMusic', {});
  }

  componentWillUnmount() {
    //发广播通知播放音乐
    DeviceEventEmitter.emit('resumeMusic', {});
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
          source={this.state.file_link}
          playInBackground={true}
          playWhenInactive={true}
          navigator={this.props.navigator}
          onBack={this.back.bind(this)}
        />
      </View>
    );
  }
}
