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
import TopBarNav from 'top-bar-nav';
import MenuImage from './menu-image';
import APIClient from '../service/api-client';
import APIInterface from '../service/api-interface';
import APIConstant from '../service/api-constant';

//在所在的代码区块内有效,即全局有效
// let dataList1 = []
// let dataList2 = []
// let dataList3 = []

export default class UpdateFocusPage extends Component {
  constructor(props) {
    super(props);
    this._onMenuClick = this._onMenuClick.bind(this);
    this.state = {
      dataSource1: null,
      dataSource2: null,
      dataSource3: null
    };

    //请求网络，并解析封装数据
    this.getMusicParty();
    this.getMusicTeach();
    this.getMusicShare();

    //待渲染场景
    Scene1 = ({ index }) => (
      <ListView
        contentContainerStyle={styles.contentContainerStyle}
        dataSource={this.state.dataSource1}
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

    );
    Scene2 = ({ index }) => (
      <ListView
        contentContainerStyle={styles.contentContainerStyle}
        dataSource={this.state.dataSource2}
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
    );
    Scene3 = ({ index }) => (
      <ListView
        contentContainerStyle={styles.contentContainerStyle}
        dataSource={this.state.dataSource3}
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
    );

    this.ROUTES = {
      Scene1,
      // ideally you would have a ROUTES object with multiple React component scenes
      Scene2,
      Scene3
    };

    this.ROUTESTACK = [
      { label: '盒声活动', title: 'Scene1' }, // label is what you see in the top bar
      { label: '音乐教学', title: 'Scene2' }, // title is just the name of the Component being rendered.  See the renderScene property below
      { label: '艺人分享', title: 'Scene3' }
    ];
  }

  back() {
    Actions.pop()
  }

  //音乐屋：盒声活动
  getMusicParty() {
    APIClient.access(APIInterface.focus(1))
      .then((response) => {
        return response.json()
      })
      .then((json) => {
        console.log(json)
        let arr = json.rows;
        let index = json.total;
        let dataList1 = [];
        for (let i = 0; i < index; i++) {
          let data = {
            'p': APIConstant.BASE_URL_PREFIX + arr[i].sEventTitleUrl, "u": arr[i].sEventContentUrl,
            'e': arr[i].hEventId, 'c': arr[i].sEventCategoryCd,
          }
          dataList1.push(data)
        }
        //重新设置数据源
        this.setState({ dataSource1: new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 }).cloneWithRows(dataList1) });

      })
      .catch((error) => {
        console.log(error);
      })
  }

  //音乐屋：音乐教学
  getMusicTeach() {
    APIClient.access(APIInterface.focus(2))
      .then((response) => {
        return response.json()
      })
      .then((json) => {
        console.log(json)
        let arr = json.rows;
        let index = json.total;
        let dataList2 = [];
        for (let i = 0; i < index; i++) {
          let data = {
            'p': APIConstant.BASE_URL_PREFIX + arr[i].sEventTitleUrl, "u": arr[i].sEventContentUrl,
            'e': arr[i].hEventId, 'c': arr[i].sEventCategoryCd,
          }
          dataList2.push(data)
        }        //重新设置数据源
        this.setState({ dataSource2: new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 }).cloneWithRows(dataList2) });

      })
      .catch((error) => {
        console.log(error);
      })
  }


  //音乐屋：艺人分享
  getMusicShare() {
    APIClient.access(APIInterface.focus(3))
      .then((response) => {
        return response.json()
      })
      .then((json) => {
        console.log(json)
        let arr = json.rows;
        let index = json.total;
        let dataList3 = [];
        for (let i = 0; i < index; i++) {
          let data = {
            'p': APIConstant.BASE_URL_PREFIX + arr[i].sEventTitleUrl, "u": arr[i].sEventContentUrl,
            'e': arr[i].hEventId, 'c': arr[i].sEventCategoryCd,
          }
          dataList3.push(data)
        }
        //重新设置数据源
        this.setState({ dataSource3: new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 }).cloneWithRows(dataList3) });
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
    if (!this.state.dataSource3 || !this.state.dataSource2 || !this.state.dataSource1) {//如果this.state.data没有数据(即网络请求未完成),则返回一个加载中的文本   
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
              }}>我的关注</Text>
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
          <TopBarNav
            // routeStack and renderScene are required props
            routeStack={this.ROUTESTACK}
            renderScene={(route, i) => {
              // This is a lot like the now deprecated Navigator component
              let Component = this.ROUTES[route.title];
              return <Component index={i} />;
            }}
            // Below are optional props
            headerStyle={[styles.headerStyle, { paddingTop: 20 }]} // probably want to add paddingTop: 20 if using TopBarNav for the  entire height of screen on iOS
            labelStyle={styles.labelStyle}
            underlineStyle={styles.underlineStyle}
            imageStyle={styles.imageStyle}
            sidePadding={40} // Can't set sidePadding in headerStyle because it's needed to calculate the width of the tabs
            inactiveOpacity={1}
            fadeLabels={false}
          />
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
