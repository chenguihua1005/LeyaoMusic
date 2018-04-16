import React, { Component } from "react";
import {
  AsyncStorage,
  View,
  Text,
  Image
} from 'react-native';
import {
  Actions,
  ActionConst
} from 'react-native-router-flux';
import StorageConstant from '../service/storage-constant';
import APIConstant from '../service/api-constant';
import APIInterface from "../service/api-interface";

export default class WelcomePage extends Component {

  componentDidMount() {
    setTimeout(() => {
      // 获取存储的登陆token
      copy = this
      AsyncStorage.getItem(StorageConstant.TOKEN, function(error, result) {
        if (error) {
          console.log("TOKEN = " + error);
          Actions.guide({ type: ActionConst.REPLACE })
        }
        if (!error) {
          if(result == null) {
            console.log("TOKEN = null");
            Actions.guide({ type: ActionConst.REPLACE })
            //为方便调试，TOKEN为空也直接跳转
            //Actions.main({ type: ActionConst.REPLACE })            
          } else {
            console.log("TOKEN = " + result);
            //如果上一次登录成功的话，把token赋值给USER_PHONE
            APIConstant.USER_PHONE = result
            if(APIInterface.checkMobile(APIConstant.USER_PHONE)) {
              Actions.main({ type: ActionConst.REPLACE })
            }else{
              //如果校验手机号失败，则返回登录引导页
              Actions.guide({ type: ActionConst.REPLACE })
            }
            
          }
        }
      })
    }, 2000)
  }

  render() {
    return (
      <Image
        source={ require('../resource/welcome-background.png') }
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
          width: null,
          height: null,
          backgroundColor: 'rgba(0, 0, 0, 0)',
        }}>
        <View>
          <Text
            style={{
              fontFamily: 'ArialMT',
              fontSize: 26,
              color: '#ffffff',
              fontWeight: 'bold',
              alignSelf: 'center'
            }}>盒声音乐</Text>
          <Text
            style={{
              fontFamily: 'PingFang SC',
              fontSize: 17.5,
              color: '#ffffff',
              alignSelf: 'center',
              marginTop: 5
            }}>HESHENG MUSIC</Text>
        </View>
      </Image>
    );
  }
}
