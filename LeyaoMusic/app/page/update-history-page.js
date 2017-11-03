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
      <View style={{ paddingTop: 0 }}>
        <ListView
          dataSource={this.state.dataSource1}
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

    );
    Scene2 = ({ index }) => (
      <View style={{ paddingTop: 0 }}>
        <ListView
          dataSource={this.state.dataSource2}
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

    );
    Scene3 = ({ index }) => (
      <View style={{ paddingTop: 0 }}>
        <ListView
          dataSource={this.state.dataSource3}
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
    );

    this.ROUTES = {
      Scene1,
      // ideally you would have a ROUTES object with multiple React component scenes
      Scene2,
      Scene3
    };

    this.ROUTESTACK = [
      { label: '乐谣活动', title: 'Scene1' }, // label is what you see in the top bar
      { label: '音乐教学', title: 'Scene2' }, // title is just the name of the Component being rendered.  See the renderScene property below
      { label: '艺人分享', title: 'Scene3' }
    ];
  }

  back() {
    Actions.pop()
  }

  //音乐屋：乐谣活动
  getMusicParty() {
    APIClient.access(APIInterface.focus(1))
      .then((response) => {
        return response.json()
      })
      .then((json) => {
        console.log(json)
        let dataList1 = []
        let arr = json.rows;
        for (let i = 0; i < json.total; i += 2) {
          let data = {
            'p1': APIConstant.BASE_URL_PREFIX + arr[i].sEventTitleUrl, "u1": arr[i].sEventContentUrl,
            'p2': APIConstant.BASE_URL_PREFIX + arr[i + 1].sEventTitleUrl, "u2": arr[i + 1].sEventContentUrl
          }
          dataList1.push(data)
        }
        //奇数个
        if (json.total % 2) {
          let data = {
            'p1': APIConstant.BASE_URL_PREFIX + arr[json.total - 1].sEventTitleUrl, "u1": arr[json.total - 1].sEventContentUrl
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
        let dataList2 = []
        for (let i = 0; i < json.total; i+=2) {
          let data = {
            'p1': APIConstant.BASE_URL_PREFIX + arr[i].sEventTitleUrl, "u1": arr[i].sEventContentUrl,
            'p2': APIConstant.BASE_URL_PREFIX + arr[i + 1].sEventTitleUrl, "u2": arr[i + 1].sEventContentUrl
          }
          dataList2.push(data)
        }
        //奇数个
        if (json.total % 2) {
          let data = {
            'p1': APIConstant.BASE_URL_PREFIX + arr[json.total - 1].sEventTitleUrl, "u1": arr[json.total - 1].sEventContentUrl
          }
          dataList2.push(data)
        }
        //重新设置数据源
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
        let dataList3 = []
        for (let i = 0; i < json.total; i+=2) {
          let data = {
            'p1': APIConstant.BASE_URL_PREFIX + arr[i].sEventTitleUrl, "u1": arr[i].sEventContentUrl,
            'p2': APIConstant.BASE_URL_PREFIX + arr[i + 1].sEventTitleUrl, "u2": arr[i + 1].sEventContentUrl
          }
          dataList3.push(data)
        }
        //奇数个
        if (json.total % 2) {
          let data = {
            'p1': APIConstant.BASE_URL_PREFIX + arr[json.total - 1].sEventTitleUrl, "u1": arr[json.total - 1].sEventContentUrl
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
                }}>我的历史</Text>
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
  itemStyle: {
    width: '50%',
    height: 100,
    borderWidth: 2,
    borderColor: '#e6faff',
    padding: 2.5
  }

});
