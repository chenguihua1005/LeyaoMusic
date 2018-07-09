import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  WebView,
  Image,
  TouchableWithoutFeedback,
  Alert,
} from 'react-native';
import {
  Actions
} from 'react-native-router-flux';
import APIConstant from '../service/api-constant';
import APIClient from '../service/api-client';
import APIInterface from '../service/api-interface';

export default class UpdateWebviewPage extends Component {

  constructor(props) {
    super(props)
    this.state = {
      url: 'http://www.leyaomusic.com',
      title: '',
      canBack: false
    }
  }

  componentDidMount() {
    this.setState({ url: APIConstant.URL_EVENT });
  }


  onBack() {
    //如果网页还有上级页面（可返回）
    if (this.state.canBack) {
      this.webView.goBack();
    } else {
      //提示不能返回上一页面了
      // this.toast.show('再点击就退出啦', DURATION.LENGTH_SHORT);
      Actions.pop();
    }
  }

  onNext() {
    this.setState({
      //设置请求地址
      url: this.text
    })
  }

  onNavigationStateChange(e) {
    this.setState({
      title: e.title,
      //设置是否要以返回上级页面
      canBack: e.canGoBack
    })
  }

  //关注
  stars() {
    APIClient.access(APIInterface.stars(hEventId=this.props.hEventId))
      .then((response) => {
        return response.json()
      })
      .then((json) => {
        if (json.responseResult == APIConstant.STATUS_SUCCEED) {
          Alert.alert('提示', '已收藏！');
        } else {
          Alert.alert('提示', '收藏失败！');
        }
      })
      .catch((error) => {
        console.log(error)
      })
  }

  render() {
    return (
      <View style={styles.container}>
        <WebView source={{ uri: this.state.url }}
          onNavigationStateChange={(e) => this.onNavigationStateChange(e)}
          ref={webView => this.webView = webView}>
        </WebView>

        <View
          style={{
            alignItems: 'center',
            justifyContent: 'space-between',
            flexDirection: 'row',
          }}>
          <TouchableWithoutFeedback
            onPress={() => this.onBack()}>
            <View
              style={{
                marginLeft: 10
              }}>
              <Image
                source={require('../resource/arrow.png')}
                style={{
                  width: 10,
                  height: 19.5,
                  marginLeft: 10,
                  marginBottom: 5
                }} />
            </View>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback
            onPress={() => this.stars()}>
            <View
              style={{
                marginRight: 10,
                width: 35
              }}>
              <Text
                style={{
                  fontFamily: 'ArialMT',
                  fontSize: 16,
                  color: '#b3d66e'
                }}>关注</Text>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 32,
  },
});
