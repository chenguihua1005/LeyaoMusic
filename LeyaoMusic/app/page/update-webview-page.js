import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  WebView,
  Image,
  TouchableWithoutFeedback,
} from 'react-native';
import {
  Actions
} from 'react-native-router-flux';
import APIConstant from '../service/api-constant';

export default class UpdateWebviewPage extends Component {

  constructor(props) {
    super(props)
    this.state = {
      url: 'http://www.leyaomusic.com',
      title: '',
      canBack: false
    }
  }

  componentWillMount() {
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

  render() {
    return (
      <View style={styles.container}>
        <WebView source={{ uri: this.state.url }}
          onNavigationStateChange={(e) => this.onNavigationStateChange(e)}
          ref={webView => this.webView = webView}>
        </WebView>

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
