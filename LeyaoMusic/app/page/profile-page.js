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
  View
} from 'react-native';
import {
  Actions,
  ActionConst
} from 'react-native-router-flux';
import ImagePicker from 'react-native-image-picker';

import APIClient from '../service/api-client';
import APIInterface from '../service/api-interface';
import APIConstant from '../service/api-constant';
import StorageConstant from '../service/storage-constant';

const choosePictureOption = [
  '拍照',
  '从手机相册选择',
  '取消'
]
const CHOOSE_PICTURE_OPTION_CANCEL_INDEX = 2

const options = {
  mediaType: 'photo', // 'photo' or 'video'
  videoQuality: 'high', // 'low', 'medium', or 'high'
  durationLimit: 10, // video recording max time in seconds
  maxWidth: 100, // photos only默认为手机屏幕的宽，高与宽一样，为正方形照片
  maxHeight: 100, // photos only
  allowsEditing: true, // 当用户选择过照片之后是否允许再次编辑图片
};

export default class ProfilePage extends Component {

  constructor(props) {
    super(props)
    this.state = {
      indicating: false,

      avatar: require('../resource/default-avatar.png'),
      realName: "未知",
      gender: "未知",
      userName: "未知",
      email: "未知",

      message: "无",
      focus: "无",
      history: "无",
      suggestion: "无"
    }
    this.load.bind(this)
  }

  componentDidMount() {
    this.load()
  }

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

          APIClient.access(APIInterface.details(result, 13916174880))
            .then((response) => {
              return response.json()
            })
            .then((json) => {
              console.log(json)
              let arr = json.rows[0];
              if (arr != null) {
                  copy.setState({
                    avatar: {uri: (APIConstant.BASE_FILE_URI + arr.sUserProfileUrl)},
                    realName: arr.sUserNameStr,
                    //userName手机号
                    userName: arr.hUserPhoneNr,
                    gender: arr.sUserGenderCd,
                    email: arr.sUserEmailStr
                  })
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

  choosePicture() {
    ActionSheetIOS.showActionSheetWithOptions({
      options: choosePictureOption,
      cancelButtonIndex: CHOOSE_PICTURE_OPTION_CANCEL_INDEX
    },
      (buttonIndex) => {
        switch (buttonIndex) {
          case 0:
            ImagePicker.launchCamera(options, (response) => {

            });
            break;
          case 1:
            ImagePicker.launchImageLibrary(options, (response) => {
              if (response.didCancel) {
                return
              }
              // 获取存储的登陆token
              copy = this
              copy.setState({ indicating: true })
              AsyncStorage.getItem(StorageConstant.TOKEN, function (error, result) {
                copy.setState({ indicating: false })

                if (error) {
                  console.log(error);
                }
                if (!error) {
                  // 上传文件
                  copy.setState({ indicating: true })
                  APIClient.access(APIInterface.upload(1234, response.fileName, 13916174880, response.data))
                    .then((response) => {
                      copy.setState({ indicating: false })
                      return response.json()
                    })
                    .then((json) => {
                      console.log(json)
                      if (json.callStatus == APIConstant.STATUS_SUCCEED) {
                        copy.load()
                        // var body = {
                        //   'pic': json.data
                        // }
                        // APIClient.access(APIInterface.updateUser(result, body))
                        //   .then((response) => {
                        //     copy.setState({ indicating: false})
                        //     return response.json()
                        //   })
                        //   .then((json) => {
                        //     console.log(json)
                        //     if(json.callStatus == APIConstant.STATUS_SUCCEED) {
                        //       copy.load()
                        //     } else {
                        //       Alert.alert('', json.errorCode)
                        //     }
                        //   })
                        //   .catch((error) => {
                        //     copy.setState({ indicating: false})
                        //     console.log(error)
                        //   })
                      } else {
                        Alert.alert('', json.responseResultMsg)
                      }
                    })
                    .catch((error) => {
                      copy.setState({ indicating: false })
                      console.log(error)
                    })
                }
              });
            });
            break;
        }
      })
  }

  updateName() {
    var copy = this;
    Actions.update_name({
      realName: this.state.realName,
      parentComponent: copy
    })
  }

  updateGender() {
    var copy = this;
    Actions.update_gender({
      gender: this.state.gender,
      parentComponent: copy
    })
  }

  updateEmail() {
    var copy = this;
    Actions.update_email({
      email: this.state.email,
      parentComponent: copy
    })
  }

  //增加的4个菜单按钮事件
  //我的消息
  checkMessage() {
    var copy = this;
    Actions.update_message({
      message: this.state.message,
      parentComponent: copy
    })
  }
  //我的关注
  checkFocus() {
    var copy = this;
    Actions.update_focus({
      focus: this.state.focus,
      parentComponent: copy
    })
  }
  //我的历史
  checkHistory() {
    var copy = this;
    Actions.update_history({
      history: this.state.history,
      parentComponent: copy
    })
  }
  //意见反馈
  checkSuggestion() {
    var copy = this;
    Actions.update_suggestion({
      suggestion: this.state.suggestion,
      parentComponent: copy
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
    if (this.state.gender == 0) {
      sex = '男'
    } else if (this.state.gender == 1) {
      sex = '女'
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
        <View
          style={{
            marginTop: 5,
            height: 44,
            alignSelf: 'center',
            justifyContent: 'center'
          }}>
          <Text
            style={{
              fontFamily: 'ArialMT',
              fontSize: 18,
              color: '#000'
            }}>个人资料</Text>
        </View>
        <TouchableWithoutFeedback
          onPress={this.choosePicture.bind(this)}>
          <View
            style={{
              width: Dimensions.get('window').width,
              height: 59,
              marginTop: 10,
              backgroundColor: 'rgba(0, 0, 0, 0.5)',
              justifyContent: 'space-between',
              flexDirection: 'row',
              alignItems: 'center'
            }}>
            <Text
              style={{
                fontFamily: 'ArialMT',
                fontSize: 13,
                color: '#000',
                marginLeft: 11
              }}>头像</Text>
            <Image
              source={this.state.avatar}
              style={{
                borderRadius: 21,
                width: 42,
                height: 42,
                marginRight: 11
              }} />
          </View>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback
          onPress={this.updateName.bind(this)}>
          <View
            style={{
              width: Dimensions.get('window').width,
              height: 43,
              marginTop: 5,
              backgroundColor: 'rgba(0, 0, 0, 0.5)',
              justifyContent: 'space-between',
              flexDirection: 'row',
              alignItems: 'center'
            }}>
            <Text
              style={{
                fontFamily: 'ArialMT',
                fontSize: 13,
                color: '#000',
                marginLeft: 11
              }}>昵称</Text>
            <Text
              style={{
                fontFamily: 'ArialMT',
                fontSize: 13,
                color: '#000',
                marginRight: 11
              }}>{this.state.realName}</Text>
          </View>
        </TouchableWithoutFeedback>
        <View
          style={{
            width: Dimensions.get('window').width,
            height: 1,
            justifyContent: 'space-between',
            backgroundColor: 'rgba(0, 0, 0, 0.5)'
          }}>
          <View
            style={{
              width: Dimensions.get('window').width - 22,
              height: 1,
              alignSelf: 'center',
              backgroundColor: 'rgba(255, 255, 255, 0.1)'
            }} />
        </View>
        <TouchableWithoutFeedback
          onPress={this.updateGender.bind(this)}>
          <View
            style={{
              width: Dimensions.get('window').width,
              height: 43,
              backgroundColor: 'rgba(0, 0, 0, 0.5)',
              justifyContent: 'space-between',
              flexDirection: 'row',
              alignItems: 'center'
            }}>
            <Text
              style={{
                fontFamily: 'ArialMT',
                fontSize: 13,
                color: '#000',
                marginLeft: 11
              }}>性别</Text>
            <Text
              style={{
                fontFamily: 'ArialMT',
                fontSize: 13,
                color: '#000',
                marginRight: 11
              }}>{sex}</Text>
          </View>
        </TouchableWithoutFeedback>
        <View
          style={{
            width: Dimensions.get('window').width,
            height: 43,
            marginTop: 5,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            justifyContent: 'space-between',
            flexDirection: 'row',
            alignItems: 'center'
          }}>
          <Text
            style={{
              fontFamily: 'ArialMT',
              fontSize: 13,
              color: '#000',
              marginLeft: 11
            }}>手机号</Text>
          <Text
            style={{
              fontFamily: 'ArialMT',
              fontSize: 13,
              color: '#000',
              marginRight: 11
            }}>{this.state.userName}</Text>
        </View>
        <View
          style={{
            width: Dimensions.get('window').width,
            height: 1,
            justifyContent: 'space-between',
            backgroundColor: 'rgba(0, 0, 0, 0.5)'
          }}>
          <View
            style={{
              width: Dimensions.get('window').width - 22,
              height: 1,
              alignSelf: 'center',
              backgroundColor: 'rgba(255, 255, 255, 0.1)'
            }} />
        </View>
        <TouchableWithoutFeedback
          onPress={this.updateEmail.bind(this)}>
          <View
            style={{
              width: Dimensions.get('window').width,
              height: 43,
              backgroundColor: 'rgba(0, 0, 0, 0.5)',
              justifyContent: 'space-between',
              flexDirection: 'row',
              alignItems: 'center'
            }}>
            <Text
              style={{
                fontFamily: 'ArialMT',
                fontSize: 13,
                color: '#000',
                marginLeft: 11
              }}>个人邮箱</Text>
            <Text
              style={{
                fontFamily: 'ArialMT',
                fontSize: 13,
                color: '#000',
                marginRight: 11
              }}>{this.state.email}</Text>
          </View>
        </TouchableWithoutFeedback>
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
                fontSize: 13,
                color: '#000',
                marginLeft: 11
              }}>我的消息</Text>
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
                fontSize: 13,
                color: '#000',
                marginLeft: 11
              }}>我的关注</Text>
          </View>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback
          onPress={this.checkHistory.bind(this)}>
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
                fontSize: 13,
                color: '#000',
                marginLeft: 11
              }}>我的历史</Text>
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
                fontSize: 13,
                color: '#000',
                marginLeft: 11
              }}>意见反馈</Text>
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
                fontSize: 15,
                color: '#000'
              }}>退出登录</Text>
          </View>
        </TouchableWithoutFeedback>
      </Image>
    );
  }
}
