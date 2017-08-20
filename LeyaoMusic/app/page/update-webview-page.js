import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  WebView
} from 'react-native';
import {
  Actions
} from 'react-native-router-flux';

export default class UpdateWebviewPage extends Component {

  constructor(props) {
    super(props)
    this.state = {
      url: 'http://www.leyaomusic.com',
      title: '',
      canBack: false
    }
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
        <View style={styles.item}>
            <Text style={styles.text} onPress={()=>{this.onBack()}}>返回</Text>
            <TextInput style={styles.input}
                      defaultValue={'http://www.leyaomusic.com'}
                      onChangeText={text=>this.text=text}></TextInput>
            <Text style={styles.text} onPress={()=>{this.onNext()}}>GO</Text>
        </View>
        <WebView source={{uri:this.state.url}}
              onNavigationStateChange={(e)=>this.onNavigationStateChange(e)}
              ref={webView=>this.webView=webView}>
        </WebView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    text: {
        fontSize: 20,
        color: '#333',
        marginLeft: 10
    },
    input: {
        height: 40,
        marginLeft: 10,
        flex: 1,
        borderWidth: 1
    },
    item: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingTop: 10,
        marginRight: 10
    }
  });
