import React, { Component } from "react";
import {
  ActionSheetIOS,
  Alert,
  AsyncStorage,
  ActivityIndicator,
  Dimensions,
  Image,
  Text,
  TouchableWithoutFeedback,
  View,
  DeviceEventEmitter
} from 'react-native';
import {
  Actions,
  ActionConst
} from 'react-native-router-flux';

import APIClient from '../service/api-client';
import APIInterface from '../service/api-interface';
import APIConstant from '../service/api-constant';
import StorageConstant from '../service/storage-constant';
import MenuText from './menu-text';

export default class ProfilePage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      indicating: false,
      //avatar: require('../resource/default-avatar.png'),
      avatar: null,
      realName: "昵称未设置",
      //0:男
      gender: 0,
      userName: APIConstant.USER_PHONE,
      email: "邮箱未设置",

      message: "无",
      focus: "无",
      history: "无",
    }
    this.load.bind(this)
  }

  componentDidMount() {
    //加载个人信息
    this.load()
    //增加监听器
    this.listener = DeviceEventEmitter.addListener('updateProfile', (events) => {
      //接收到消息，就将存储的值取过来刷新界面
      this.setState({
        avatar: APIConstant.MY_IMAGE,
        realName: APIConstant.MY_NICKNAME,
        gender: APIConstant.MY_GENDER,
        email: APIConstant.MY_EMAIL
      })
      // Alert.alert('收到了消息！')
    });
  }

  componentWillUnmount() {
    this.listener.remove();
  };

  load() {
    // 获取存储的登陆token
    copy = this
    AsyncStorage.getItem(StorageConstant.TOKEN, function (error, result) {
      if (error) {
        console.log(error)
        return
      }
      if (!error) {
        if (result == null) {
        } else {
          console.log(result)

          APIClient.access(APIInterface.details(APIConstant.USER_PHONE))
            .then((response) => {
              return response.json()
            })
            .then((json) => {
              console.log(json)
              //如果rows为空，返回
              if (!json.rows[0]) return
              let arr = json.rows[0];
              if (arr != null) {
                if (arr.sUserProfileUrl && arr.sUserProfileUrl != '?') {
                  copy.setState({
                    avatar: { uri: (APIConstant.BASE_URL_PREFIX + "static/" + arr.sUserProfileUrl) },
                  })
                }
                copy.setState({
                  realName: arr.sUserNameStr != '' ? arr.sUserNameStr : copy.state.realName,
                  //userName手机号，不能修改
                  gender: arr.sUserGenderCd != '' ? arr.sUserGenderCd : copy.state.gender,
                  email: arr.sUserEmailStr != '' ? arr.sUserEmailStr : copy.state.email
                })
                console.log("avatar = " + APIConstant.BASE_URL_PREFIX + "static/" + arr.sUserProfileUrl);
              }
              else {
                Alert.alert('', '获取用户详情错误')
              }
            })
            .catch((error) => {
              console.log(error);
            })
        }
      }
    })
  }


  //点击个人相关信息
  choosePersonal() {
    //跳转到新的界面，显示“头像、昵称”等信息
    Actions.update_personal({
      avatar: this.state.avatar,
      realName: this.state.realName,
      userName: this.state.userName,
      gender: this.state.gender,
      email: this.state.email,
    })

  }

  //增加的4个菜单按钮事件
  //我的消息
  checkMessage() {
    console.log(APIInterface.getTimestamp());
    //加密解密
    let str1 = APIInterface.encryptByDES();
    let str2 = APIInterface.decryptByDESModeEBC(str1);
    console.log(str1.toString())
    console.log(str2)
    Actions.update_message({
      //message: this.state.message,
    })
  }
  //我的关注
  checkFocus() {
    Actions.update_focus({
      focus: this.state.focus,
    })
  }
  //我的历史
  checkHistory() {
    Actions.update_history({
      history: this.state.history,
    })
  }
  //意见反馈
  checkSuggestion() {
    Actions.update_suggestion({
    })
  }


  logout() {
    // 存储登陆token
    AsyncStorage.removeItem(StorageConstant.TOKEN, function (error) {
      if (error) {
        console.log(error)
      }
      if (!error) {
        Actions.guide({ type: ActionConst.REPLACE })
      }
    });
  }

  render() {
    var sex = this.state.gender
    var sexImage;
    if (this.state.gender == 0) {
      sex = '男'
      sexImage = require('../resource/icon_nan.png')
    } else if (this.state.gender == 1) {
      sex = '女'
      sexImage = require('../resource/icon_nv.png')
    }
    return (
      <Image
        source={require('../resource/main-background.jpg')}
        style={{
          flex: 1,
          width: null,
          height: null,
          backgroundColor: 'rgba(0, 0, 0, 0)',
        }}>
        <ActivityIndicator
          animating={this.state.indicating}
          style={{
            position: 'absolute',
            top: (Dimensions.get('window').height - 80) / 2,
            height: 80
          }}
          size="large" />

        <TouchableWithoutFeedback
          onPress={this.choosePersonal.bind(this)}>
          <View
            style={{
              width: Dimensions.get('window').width,
              height: 80,
              marginTop: 30,
              marginBottom: 10,
              justifyContent: 'space-between',
              flexDirection: 'row',
              alignItems: 'center'
            }}>
            <Image
              style={{ width: 88, height: 88, borderRadius: 10, marginLeft: 8 }}
              resizeMode={'stretch'}
              source={this.state.avatar}
            />
            <View style={{ flexDirection: 'column', width: '70%', height: 80 }}>
              <View style={{
                justifyContent: 'flex-start',
                flexDirection: 'row',
                alignItems: 'flex-start'
              }}>
                <Text style={{ fontSize: 30, color: '#333333', fontWeight: 'bold', height: 42 }}>{this.state.realName}</Text>
                <Image
                  style={{ width: 20, height: 20, marginTop: 8, marginLeft: 4 }}
                  source={sexImage}
                />
              </View>
              <View
                style={{
                  justifyContent: 'space-between',
                  flexDirection: 'row',
                  alignItems: 'center'
                }}>
                <Text style={{ height: 18, color: '#BDBDBD' }}>{this.state.userName}</Text>
                <Image style={{ height: 18, width: 20 }} source={require('../resource/btn_jiantou.png')} />
              </View>
              <Text style={{ height: 18, color: '#BDBDBD' }}>{this.state.email}</Text>
            </View>
          </View>
        </TouchableWithoutFeedback>
        <View style={{ marginTop: 15, borderWidth: 0.5, borderColor: '#ccc' }} />

        <TouchableWithoutFeedback
          onPress={this.checkMessage.bind(this)}>
          <View
            style={{
              width: Dimensions.get('window').width,
              height: 43,
              marginTop: 5,
              backgroundColor: 'rgba(0, 0, 0, 0)',
              justifyContent: 'space-between',
              flexDirection: 'row',
              alignItems: 'center'
            }}>
            <Text
              style={{
                fontFamily: 'ArialMT',
                fontSize: 14,
                color: '#333333',
                marginLeft: 11
              }}>我的消息</Text>
            <Image style={{ height: 20, width: 20 }} source={require('../resource/btn_jiantou.png')} />
          </View>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback
          onPress={this.checkFocus.bind(this)}>
          <View
            style={{
              width: Dimensions.get('window').width,
              height: 43,
              backgroundColor: 'rgba(0, 0, 0, 0)',
              justifyContent: 'space-between',
              flexDirection: 'row',
              alignItems: 'center'
            }}>
            <Text
              style={{
                fontFamily: 'ArialMT',
                fontSize: 14,
                color: '#333333',
                marginLeft: 11
              }}>我的关注</Text>
            <Image style={{ height: 20, width: 20 }} source={require('../resource/btn_jiantou.png')} />
          </View>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback
          onPress={this.checkHistory.bind(this)}>
          <View
            style={{
              width: Dimensions.get('window').width,
              height: 43,
              backgroundColor: 'rgba(0, 0, 0, 0)',
              justifyContent: 'space-between',
              flexDirection: 'row',
              alignItems: 'center'
            }}>
            <Text
              style={{
                fontFamily: 'ArialMT',
                fontSize: 14,
                color: '#333333',
                marginLeft: 11
              }}>我的历史</Text>
            <Image style={{ height: 20, width: 20 }} source={require('../resource/btn_jiantou.png')} />
          </View>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback
          onPress={this.checkSuggestion.bind(this)}>
          <View
            style={{
              width: Dimensions.get('window').width,
              height: 43,
              backgroundColor: 'rgba(0, 0, 0, 0)',
              justifyContent: 'space-between',
              flexDirection: 'row',
              alignItems: 'center'
            }}>
            <Text
              style={{
                fontFamily: 'ArialMT',
                fontSize: 14,
                color: '#333333',
                marginLeft: 11
              }}>意见反馈</Text>
            <Image style={{ height: 20, width: 20 }} source={require('../resource/btn_jiantou.png')} />
          </View>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback
          onPress={this.logout.bind(this)}>
          <View
            style={{
              width: Dimensions.get('window').width - 125,
              height: 43,
              backgroundColor: 'rgba(240, 240, 240, 1)',
              alignItems: 'center',
              justifyContent: 'center',
              alignSelf: 'center',
              marginTop: 20,
              borderRadius: 21
            }}>
            <Text
              style={{
                fontFamily: 'ArialMT',
                fontSize: 14,
                color: '#333333'
              }}>退出登录</Text>
          </View>
        </TouchableWithoutFeedback>
      </Image>
    );
  }
}
