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
  View,
  ListView
} from 'react-native';
import {
  Actions
} from 'react-native-router-flux';

import APIClient from '../service/api-client';
import APIInterface from '../service/api-interface';
import APIConstant from '../service/api-constant';
import StorageConstant from '../service/storage-constant';

export default class UpdateMessagePage extends Component {

  constructor(props) {
    super(props)
    this.state = {
      indicating: false,
      name: '',
      dataSource: null,
      parentComponent: props.parentComponent
    }
  }

  componentDidMount() {
    this.save();
  }

  back() {
    Actions.pop()
  }

  componentWillUnmount() {
    //清掉消息
    //dataList = null
  };


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

          //sMessageContentStr
          copy.setState({ indicating: true })
          APIClient.access(APIInterface.updateMessage())
            .then((response) => {
              copy.setState({ indicating: false })
              return response.json()
            })
            .then((json) => {
              console.log(json)
              if (json.total > 0) {
                let dataList = []
                for (let i = 0; i < json.total; i++) {
                  let data = json.rows[i]
                  dataList.push(data)
                }
                //重新设置数据源
                copy.setState({ dataSource: new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 }).cloneWithRows(dataList) });

              } else {
                Alert.alert('获取我的消息失败！')
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
    if (!this.state.dataSource) {//如果this.state.data没有数据(即网络请求未完成),则返回一个加载中的文本   
      return (
        <View style={{ flex: 1 }}>
        <View
          style={{
            marginTop: 20,
            width: Dimensions.get('window').width,
            height: 44,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}>
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center'
            }}>
            <Text
              style={{
                fontFamily: 'ArialMT',
                fontSize: 18,
                color: '#000'
              }}>我的消息</Text>
          </View>
          <TouchableWithoutFeedback
            onPress={this.back.bind(this)}>
            <View
              style={{
                position: 'absolute'
              }}>
              <Image
                source={require('../resource/arrow.png')}
                style={{
                  width: 10,
                  height: 19.5,
                  marginLeft: 10
                }} />
            </View>
          </TouchableWithoutFeedback>
        </View>

        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Image
            style={{ width: 80, height: 80 }}
            /* resizeMode={'stretch'} */
            source={require('../resource/img_kong.png')}
          />
          <Text>暂时还没有消息</Text>
        </View>
      </View>
      );
    } else {//当this.state.data有了数据，则渲染ListView
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
                <Text
                  style={{
                    fontFamily: 'ArialMT',
                    fontSize: 16,
                    color: '#000'
                  }}>取消</Text>
              </View>
            </TouchableWithoutFeedback>
            <Text
              style={{
                fontFamily: 'ArialMT',
                fontSize: 18,
                color: '#000'
              }}>我的消息</Text>
            <TouchableWithoutFeedback>
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
          {/* <View
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
            //onChangeText={ (value) => this.setState({ name: value }) }
            value={ this.state.name }/>
        </View> */}
          <View style={{ paddingTop: 22 }}>
            <ListView
              dataSource={this.state.dataSource}
              renderRow={(rowData) => <Text>{rowData.sMessageContentStr}</Text>}
            />
          </View>
        </Image>
      );
    }
  }

}