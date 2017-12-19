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

export default class SightsingSearchPage extends Component {
  constructor(props) {
    super(props);
    this._onMenuClick = this._onMenuClick.bind(this);
    this.state = {
      dataSource: null,
      sEventSearchContentTxt: props.sEventSearchContentTxt
    };

    //请求网络，并解析封装数据
    this.getSearchResult();
  }

  back() {
    Actions.pop()
  }

  //搜索結果
  getSearchResult() {
    APIClient.access(APIInterface.search(this.state.sEventSearchContentTxt))
      .then((response) => {
        return response.json()
      })
      .then((json) => {
        console.log(json)
        let dataList = []
        let arr = json.rows;
        //去掉最后的奇数位（如果有的话）
        let index = json.total;
        if (index % 2)
          index = index - 1;
        for (let i = 0; i < index; i += 2) {
          let data = {
            'p1': APIConstant.BASE_URL_PREFIX + arr[i].sEventTitleUrl, "u1": arr[i].sEventContentUrl,
            'p2': APIConstant.BASE_URL_PREFIX + arr[i + 1].sEventTitleUrl, "u2": arr[i + 1].sEventContentUrl
          }
          dataList.push(data)
        }
        //奇数个
        if (json.total % 2) {
          let data = {
            'p1': APIConstant.BASE_URL_PREFIX + arr[json.total - 1].sEventTitleUrl, "u1": arr[json.total - 1].sEventContentUrl
          }
          dataList.push(data)
        }
        //返回数据个数为0，则将dataList置为null
        if (json.total == 0)
          dataList = null;
        //重新设置数据源
        this.setState({ dataSource: new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 }).cloneWithRows(dataList) });

      })
      .catch((error) => {
        console.log(error);
      })
  }

  staveIntroduce() {
    Actions.stave_introduction()
  }

  noteDuration() {
    Actions.note_duration()
  }

  _onMenuClick(tag) {
    APIConstant.URL_EVENT = tag;
    Actions.update_webview({ type: ActionConst.PUSH });
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
                }}>搜索结果</Text>
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
            <Text>没有找到符合条件的内容</Text>
          </View>
        </View>
      );
    } else {//当this.state.data有了数据，则渲染ListView
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
                }}>搜索结果</Text>
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

          <View style={{ paddingTop: 0 }}>
            <ListView
              dataSource={this.state.dataSource}
              renderRow={
                (rowData) =>
                  <View style={{ flex: 1, flexDirection: 'row', flexWrap: 'wrap' }}>
                    <View style={styles.itemStyle} >
                      <MenuImage renderIcon={rowData.p1}
                        tag={rowData.u1}
                        onClick={this._onMenuClick} />
                    </View>
                    <View style={styles.itemStyle} >
                      <MenuImage renderIcon={rowData.p2}
                        tag={rowData.u2}
                        onClick={this._onMenuClick} />
                    </View>
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
  itemStyle: {
    width: '50%',
    height: 100,
    borderWidth: 2,
    borderColor: '#e6faff',
    padding: 2.5
  }

});
