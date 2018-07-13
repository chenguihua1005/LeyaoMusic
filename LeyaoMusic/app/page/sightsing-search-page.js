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
  }

  componentDidMount() {
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
        let index = json.total;
        for (let i = 0; i < index; i++) {
          let data = {
            'p': APIConstant.BASE_URL_PREFIX + arr[i].sEventTitleUrl, "u": arr[i].sEventContentUrl,
            'e': arr[i].hEventId, 'c': arr[i].sEventCategoryCd,
          }
          dataList.push(data)
          //alert("p = "  + arr[i].sEventTitleUrl);
        }
        //返回数据个数为0，则将dataList置为null
        if (json.total === 0) {
          dataList = null;
          return;
        }
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
    if(tag.indexOf(".mp3") == -1 && tag.indexOf(".mp4") == -1) {
      APIConstant.URL_EVENT = tag;
      Actions.update_webview({ type: ActionConst.PUSH });
    }
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
              }}>搜索结果</Text>
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

          <View style={{ flex: 1 }}>
            <ListView
              contentContainerStyle={styles.contentContainerStyle}
              dataSource={this.state.dataSource}
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
