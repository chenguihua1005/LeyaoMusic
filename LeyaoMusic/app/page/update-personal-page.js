import React, { Component } from "react";
import {
  ActionSheetIOS,
  ActivityIndicator,
  Alert,
  AsyncStorage,
  Dimensions,
  Image,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View,
  DeviceEventEmitter
} from 'react-native';
import {
  Actions
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

export default class UpdatePersonalPage extends Component {

  constructor(props) {
    super(props)
    this.state = {
      indicating: false,
      avatar: props.avatar,
      realName: props.realName,
      userName: props.userName,
      gender: props.gender,
      email: props.email,
      parentComponent: props.parentComponent
    }
    //Alert.alert('', 'avatar =' + JSON.stringify(this.state.avatar))
  }

  back() {
    Actions.pop()
    //返回到个人界面，则通知其刷新数据
    DeviceEventEmitter.emit('updateProfile', { TAG: this.state.avatar });
  }

  save() {
  }

  load() {
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
          //强制刷新
          this.forceUpdate()
          // copy.setState({
          //   realName: arr.sUserNameStr.size > 0 ? arr.sUserNameStr : realName,
          //   //userName手机号，不能修改
          //   gender: arr.sUserGenderCd.size > 0 ? arr.sUserGenderCd : gender,
          //   email: arr.sUserEmailStr.size > 0 ? arr.sUserEmailStr : email
          // })
        }
        else {
          Alert.alert('', '获取用户详情错误')
        }
      })
      .catch((error) => {
        console.log(error);
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
                  APIClient.access(APIInterface.upload(APIConstant.SESSIONCODE, response.fileName, APIConstant.USER_PHONE, response.data))
                    .then((response) => {
                      copy.setState({ indicating: false })
                      return response.json()
                    })
                    .then((json) => {
                      console.log(json)
                      if (json.responseResult == APIConstant.STATUS_SUCCEED) {
                        copy.load()
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
          alignItems: 'center',
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
            width: Dimensions.get('window').width,
            marginTop: 20,
            height: 44,
            alignItems: 'center',
            justifyContent: 'space-between',
            flexDirection: 'row'
          }}>
          <TouchableWithoutFeedback
            onPress={this.back.bind(this)}>
            <View
              style={{
                marginLeft: 10
              }}>
              <Image
                source={require('../resource/arrow.png')}
                style={{
                  width: 10,
                  height: 19.5,
                  marginLeft: 5
                }} />
            </View>
          </TouchableWithoutFeedback>
          <Text
            style={{
              fontFamily: 'ArialMT',
              fontSize: 18,
              color: '#000'
            }}>个人信息</Text>
          <TouchableWithoutFeedback
            onPress={this.save.bind(this)}>
            <View
              style={{
                marginRight: 10
              }}>
              <Text
                style={{
                  fontFamily: 'ArialMT',
                  fontSize: 16,
                  color: '#b3d66e'
                }}></Text>
            </View>
          </TouchableWithoutFeedback>
        </View>

        <TouchableWithoutFeedback
          onPress={this.choosePicture.bind(this)}>
          <View
            style={{
              width: Dimensions.get('window').width,
              height: 59,
              marginTop: 10,
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
              }}>头像</Text>
            <View style={{
              flexDirection: 'row',
              justifyContent: 'flex-start',
              alignItems: 'center'
            }}>
              <Image
                source={this.state.avatar}
                style={{
                  borderRadius: 21,
                  width: 42,
                  height: 42,
                  marginRight: 11
                }} />
              <Image style={{ height: 20, width: 20 }} source={require('../resource/btn_jiantou.png')} />
            </View>

          </View>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback
          onPress={this.updateName.bind(this)}>
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
              }}>昵称</Text>
            <View style={{
              flexDirection: 'row',
              justifyContent: 'flex-start',
              alignItems: 'center'
            }}>
              <Text
                style={{
                  fontFamily: 'ArialMT',
                  fontSize: 13,
                  color: '#000',
                  marginRight: 11
                }}>{this.state.realName}</Text>
              <Image style={{ height: 20, width: 20 }} source={require('../resource/btn_jiantou.png')} />
            </View>
          </View>
        </TouchableWithoutFeedback>
        <View
          style={{
            width: Dimensions.get('window').width,
            height: 1,
            justifyContent: 'space-between',
            backgroundColor: 'rgba(0, 0, 0, 0)'
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
              }}>性别</Text>
            <View style={{
              flexDirection: 'row',
              justifyContent: 'flex-start',
              alignItems: 'center'
            }}>
              <Text
                style={{
                  fontFamily: 'ArialMT',
                  fontSize: 13,
                  color: '#000',
                  marginRight: 11
                }}>{sex}</Text>
              <Image style={{ height: 20, width: 20 }} source={require('../resource/btn_jiantou.png')} />
            </View>
          </View>
        </TouchableWithoutFeedback>
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
            backgroundColor: 'rgba(0, 0, 0, 0)'
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
              }}>邮箱</Text>
            <View style={{
              flexDirection: 'row',
              justifyContent: 'flex-start',
              alignItems: 'center'
            }}>
              <Text
                style={{
                  fontFamily: 'ArialMT',
                  fontSize: 13,
                  color: '#000',
                  marginRight: 11
                }}>{this.state.email}</Text>
              <Image style={{ height: 20, width: 20 }} source={require('../resource/btn_jiantou.png')} />
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Image>
    );
  }
}
