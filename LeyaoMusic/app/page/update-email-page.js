import React, { Component } from "react";
import {
  ActivityIndicator,
  Alert,
  AsyncStorage,
  Dimensions,
  Image,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View
} from 'react-native';
import {
  Actions
} from 'react-native-router-flux';

import APIClient from '../service/api-client';
import APIInterface from '../service/api-interface';
import APIConstant from '../service/api-constant';
import StorageConstant from '../service/storage-constant';

export default class UpdateEmailPage extends Component {

  constructor(props) {
    super(props)
    this.state = {
      indicating: false,
      email: props.email,
      //parentComponent: props.parentComponent
    }
  }

  back() {
    Actions.pop()
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
          console.log(result)

          var email = copy.state.email
          copy.setState({ indicating: true })
          APIClient.access(APIInterface.updateUserEmail(APIConstant.SESSIONCODE, APIConstant.USER_PHONE, email))
            .then((response) => {
              copy.setState({ indicating: false })
              return response.json()
            })
            .then((json) => {
              console.log(json)
              if (json.responseResult == APIConstant.STATUS_SUCCEED) {
                //存储修改成功后的邮箱
                APIConstant.MY_EMAIL = email
                Alert.alert('修改邮箱成功！')
                Actions.pop()
                //copy.state.parentComponent.load()
                //不要直接使用copy，否则消耗内存很大，改用发通知的形式来优化
                
              } else {
                //Alert.alert('', json.errorCode)
                Alert.alert('修改邮箱失败！')
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
            }}>邮箱</Text>
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
                }}>完成</Text>
            </View>
          </TouchableWithoutFeedback>
        </View>
        <View
          style={{
            width: Dimensions.get('window').width,
            height: 50,
            marginTop: 5,
            backgroundColor: 'rgba(0, 0, 0, 0)',
            justifyContent: 'center',
            flexDirection: 'row',
            alignItems: 'center'
          }}>
          <TextInput
            style={{
              fontFamily: 'ArialMT',
              fontSize: 13,
              width: Dimensions.get('window').width - 20,
              color: '#000'
            }}
            onChangeText={(value) => this.setState({ email: value })}
            value={this.state.email} />
        </View>
      </Image>
    );
  }
}
