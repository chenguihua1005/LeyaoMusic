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
  DeviceEventEmitter
} from 'react-native';
import {
  Actions
} from 'react-native-router-flux';

import APIClient from '../service/api-client';
import APIInterface from '../service/api-interface';
import APIConstant from '../service/api-constant';
import StorageConstant from '../service/storage-constant';

export default class UpdateGenderPage extends Component {

  constructor(props) {
    super(props)
    this.state = {
      indicating: false,
      maleChecked: (props.gender == 'M') ? true : false,
      femaleChecked: (props.gender == 'F') ? true : false,
      sex: 0,
      //parentComponent: props.parentComponent
    }
    this.save.bind(this)
  }

  back() {
    Actions.pop()
  }

  //检验是否为男性
  maleCheck() {
    this.setState({
      maleChecked: true,
      femaleChecked: false,
      sex: 1
    })

    this.save()
  }
  //检验是否为女性
  femaleCheck() {
    this.setState({
      maleChecked: false,
      femaleChecked: true,
      sex: 2
    })

    this.save()
  }

  save() {
    copy = this
    copy.setState({ indicating: true })
    AsyncStorage.getItem(StorageConstant.TOKEN, function (error, result) {
      copy.setState({ indicating: false })
      if (error) {
        console.log(error)
        return
      }
      if (!error) {
        if (result == null) {
        } else {
          console.log("result = " + result)

          var sex = copy.state.sex
          copy.setState({ indicating: true })
          APIClient.access(APIInterface.updateUserGender(
            APIConstant.SESSIONCODE, APIConstant.USER_PHONE, sex,
            APIConstant.MY_NICKNAME, APIConstant.MY_EMAIL))
            .then((response) => {
              copy.setState({ indicating: false })
              return response.json()
            })
            .then((json) => {
              console.log(json)
              if (json.responseResult == APIConstant.STATUS_SUCCEED) {
                //存储修改成功后的性别
                APIConstant.MY_GENDER = sex
                //发广播通知上层的界面刷新个人信息
                DeviceEventEmitter.emit('updateProfile', { TAG: "发出个人信息" });
                Alert.alert('修改性别成功！')
                Actions.pop()
                //copy.state.parentComponent.load()
                //不要直接使用copy，否则消耗内存很大，改用发通知的形式来优化

              } else {
                //Alert.alert('', json.errorCode)
                Alert.alert('修改性别失败！')
              }
            })
            .catch((error) => {
              copy.setState({ indicating: false })
              console.log(error)
            })
        }
      }
    })
  }

  render() {
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
                marginLeft: 10,
                width: 35
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
            }}>性别</Text>
          <TouchableWithoutFeedback>
            <View
              style={{
                marginRight: 10,
                width: 35
              }}>
              {/* <Text
                style={{
                  fontFamily: 'ArialMT',
                  fontSize: 16,
                  color: '#b3d66e'
                }}></Text> */}
            </View>
          </TouchableWithoutFeedback>
        </View>
        <TouchableWithoutFeedback
          onPress={this.maleCheck.bind(this)}>
          <View
            style={{
              width: Dimensions.get('window').width,
              height: 51,
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
                marginLeft: 10,
                color: '#000'
              }}>男</Text>
            {
              this.state.maleChecked ? (
                <Image
                  source={require('../resource/gender-selected.png')}
                  style={{
                    width: 15,
                    height: 10,
                    marginRight: 10,
                    backgroundColor: 'rgba(0, 0, 0, 0)'
                  }} />
              ) : (
                  null
                )
            }
          </View>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback
          onPress={this.femaleCheck.bind(this)}>
          <View
            style={{
              width: Dimensions.get('window').width,
              height: 51,
              marginTop: 1,
              backgroundColor: 'rgba(0, 0, 0, 0)',
              justifyContent: 'space-between',
              flexDirection: 'row',
              alignItems: 'center'
            }}>
            <Text
              style={{
                fontFamily: 'ArialMT',
                fontSize: 13,
                marginLeft: 10,
                color: '#000'
              }}>女</Text>
            {
              this.state.femaleChecked ? (
                <Image
                  source={require('../resource/gender-selected.png')}
                  style={{
                    width: 15,
                    height: 10,
                    marginRight: 10,
                    backgroundColor: 'rgba(0, 0, 0, 0)'
                  }} />
              ) : (
                  null
                )
            }
          </View>
        </TouchableWithoutFeedback>
      </Image>
    );
  }
}
