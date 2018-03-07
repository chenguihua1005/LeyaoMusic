import React, { Component } from "react";
import {
  Dimensions,
  Image,
  Text,
  TouchableWithoutFeedback,
  View,
  StyleSheet,
  ListView,
  Platform,
  TextInput,
} from 'react-native';
import {
  Actions,
  ActionConst
} from 'react-native-router-flux';
import MenuImage from './menu-image';
import APIClient from '../service/api-client';
import APIInterface from '../service/api-interface';
import APIConstant from '../service/api-constant';
import Header from './home-header';

export default class SightsingSearchFocus extends Component {
  constructor(props) {
    super(props);
  }

  back() {
    Actions.pop()
  }

  //监听搜索的文本
  onSubmitEditingTextKeyword(event) {
    //判断当前是否在“音乐屋”下面，在其哪个tab下
    if(APIConstant.SEARCH_PAGE == 1) {
        APIConstant.SEARCH_CATEGORY = TopBarNav.SEARCH_PAGE_INDEX;
    }else APIConstant.SEARCH_CATEGORY = '';
    //Alert.alert('监听到事件：' + event.nativeEvent.text)
    Actions.sightsing_search({
        sEventSearchContentTxt: event.nativeEvent.text,
    })
  }


  render() {
    return (
      <View style={styles.container}>
        <View
          style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'space-between',
            flexDirection: 'row'
          }}>
          <View
            style={{
              flex: 0.6,
              alignItems: 'center',
              justifyContent: 'flex-end',
              flexDirection: 'row'
            }}>
            <Text style={{ color: '#353E3F', fontSize: 17, fontWeight: 'bold' }}>乐谣音乐</Text>
          </View>
          <View style={{
            flex: 0.4,
            alignItems: 'center',
            justifyContent: 'flex-end',
            flexDirection: 'row'
          }}>
            <TouchableWithoutFeedback
              onPress={this.back.bind(this)}>
              <View
                style={{
                  marginLeft: 5
                }}>
                <Text>取消</Text>
              </View>
            </TouchableWithoutFeedback>
          </View>

        </View>
        <View style={styles.searchBox}>
          <Image source={require('../resource/icon_search.png')} style={styles.searchIcon} />
          <TextInput
            style={styles.inputText}
            keyboardType='web-search'
            placeholder='点击搜索你感兴趣的内容'
            onSubmitEditing={this.onSubmitEditingTextKeyword.bind(this)}
          />
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',   // 竖直排布
    paddingLeft: 10,
    paddingRight: 10,
    marginTop: 10,
    marginBottom: 10,
    paddingTop: Platform.OS === 'ios' ? 20 : 0,  // 处理iOS状态栏
    height: Platform.OS === 'ios' ? 68 : 48,   // 处理iOS状态栏
    backgroundColor: 'white',
    alignItems: 'center'  // 使元素垂直居中排布, 当flexDirection为column时, 为水平居中
  },
  searchBox: {
    height: 30,
    flexDirection: 'row',
    flex: 1,  // 类似于android中的layout_weight,设置为1即自动拉伸填充
    borderRadius: 5,  // 设置圆角边
    backgroundColor: '#f9f9f9',
    alignItems: 'center',
    marginTop: 10,
    marginLeft: 8,
    marginRight: 12,
  },
  searchIcon: {
    marginLeft: 6,
    marginRight: 6,
    width: 16.7,
    height: 16.7,
    resizeMode: 'center'
  },
  inputText: {
    flex: 1,
    backgroundColor: 'transparent',
    fontSize: 14
  }

});
