import React, { Component } from "react";
import {
  Dimensions,
  Image,
  Text,
  TouchableWithoutFeedback,
  View,
  StyleSheet,
  ListView
} from 'react-native';
import {
  Actions,
  ActionConst
} from 'react-native-router-flux';
import MenuImage from './menu-image';
import APIClient from '../service/api-client';
import APIInterface from '../service/api-interface';
import APIConstant from '../service/api-constant';

//在所在的代码区块内有效,即全局有效
// let dataList = []

export default class UpdateFocusPage extends Component {
  constructor(props) {
    super(props);
    this._onMenuClick = this._onMenuClick.bind(this);
    this.state = {
      dataSource: null,
    };
  }
  componentDidMount() {
    //请求网络，并解析封装数据
    this.getMyHistory();
  }

  back() {
    Actions.pop()
  }

  //我的历史
  getMyHistory() {
    APIClient.access(APIInterface.history(APIConstant.USER_PHONE))
      .then((response) => {
        return response.json()
      })
      .then((json) => {
        console.log(json)
        let arr = json.rows;
        let dataList = [];
        arr.map(item => {
          let data = {
            'p': APIConstant.BASE_URL_PREFIX + item.sEventTitleUrl, "u": item.sEventContentUrl,
            'e': item.hEventId, 'c': item.sEventCategoryCd,
          }
          dataList.push(data)
        })
        //重新设置数据源
        this.setState({ dataSource: new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 }).cloneWithRows(dataList) });

      })
      .catch((error) => {
        console.log(error);
      })
  }


  _onMenuClick(tag) {
    APIConstant.URL_EVENT = tag;
    Actions.update_webview({ type: ActionConst.PUSH });
  }

  render() {
    if (!this.state.dataSource) {//如果this.state.data没有数据(即网络请求未完成),则返回一个加载中的文本   
      return (
        <Text>loading...</Text>
      );
    } else {//当this.state.data有了数据，则渲染ListView
      return (
        <View style={{
          flex: 1,
          width: null,
          height: null,
          alignItems: 'center',
          backgroundColor: 'rgba(0, 0, 0, 0)',
        }}>
          <View
            style={{
              width: Dimensions.get('window').width,
              marginTop: 20,
              height: 44,
              alignItems: 'center',
              justifyContent: 'space-between',
              flexDirection: 'row',
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
              }}>我的历史</Text>
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
          </View>
          <View style={{ flex: 1 }}>
            <ListView
              contentContainerStyle={styles.contentContainerStyle}
              dataSource={this.state.dataSource}
              enableEmptySections={true}
              renderRow={
                (rowData) =>
                  <View style={styles.itemStyle} >
                    <MenuImage renderIcon={rowData.p}
                      tag={rowData.u}
                      hEventId={rowData.e}
                      rUserEventCategory={rowData.c}
                      onClick={this._onMenuClick} />
                  </View>
              }
            />
          </View>
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  headerStyle: {
    borderBottomWidth: 1,
    borderColor: '#e6faff',
    backgroundColor: 'white'
  },
  labelStyle: {
    fontSize: 18,
    fontWeight: '500',
    color: 'black'
  },
  imageStyle: {
    height: 20,
    width: 20,
    tintColor: '#e6faff'
  },
  underlineStyle: {
    height: 3.6,
    backgroundColor: 'black'
  },
  contentContainerStyle: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  itemStyle: {
    width: '50%',
    height: 100,
    borderWidth: 2,
    borderColor: '#e6faff',
    padding: 2.5
  }

});
