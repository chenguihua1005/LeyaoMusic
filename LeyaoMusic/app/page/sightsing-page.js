import React, { Component } from "react";
import {
  Dimensions,
  Image,
  Text,
  TouchableWithoutFeedback,
  View,
  StyleSheet,
  ListView,
  Alert
} from 'react-native';
import {
  Actions,
  ActionConst
} from 'react-native-router-flux';
import TopBarNav from 'top-bar-nav';
import MenuImageReport from './menu-image-report';
import APIClient from '../service/api-client';
import APIInterface from '../service/api-interface';
import APIConstant from '../service/api-constant';

//在所在的代码区块内有效,即全局有效
// let dataList1 = []
// let dataList2 = []
// let dataList3 = [
  // {
  //   'p1': "http://47.94.94.196:8088/image/1.jpg", "u1": "http://www.baidu.com",
  //   'p2': "http://47.94.94.196:8088/image/2.jpg", "u2": "https://www.sohu.com"
  // },
// ]

let copy;

export default class SightsingPage extends Component {
  constructor(props) {
    super(props);
    this._onMenuClick = this._onMenuClick.bind(this);
    this.state = {
      dataSource1: null,
      dataSource2: null,
      dataSource3: null
    };

    //请求网络，并解析封装数据
    this.load();

    //待渲染场景
    Scene1 = ({ index }) => (
      <ListView
        contentContainerStyle={styles.contentContainerStyle}
        dataSource={this.state.dataSource1}
        renderRow={
          (rowData) =>
            <View style={styles.itemStyle} >
              <MenuImageReport renderIcon={rowData.p}
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
              <MenuImageReport renderIcon={rowData.p}
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
              <MenuImageReport renderIcon={rowData.p}
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

  componentDidMount() {
    copy = this;
    //增加10*60s定时器轮询
    this.timer = setInterval(function () {
      copy.load();
    }, 10 * 60 * 1000);
  }

  componentWillUnmount() {
    //清除定时器
    this.timer && clearInterval(this.timer);
  };

  //加载数据
  load() {
    //音乐屋：盒声活动
    this.getMusicParty();
    //音乐屋：音乐教学
    this.getMusicTeach();
    //音乐屋：艺人分享
    this.getMusicShare();
  }

  //音乐屋：盒声活动
  getMusicParty() {
    APIClient.access(APIInterface.getLeyaoMusicParty())
      .then((response) => {
        return response.json()
      })
      .then((json) => {
        console.log(json)
        let arr = json.rows;
        let dataList1 = [];
        arr.map(item => {
          let data = {
            'p': APIConstant.BASE_URL_PREFIX + item.sEventTitleUrl, "u": item.sEventContentUrl,
            'e': item.hEventId, 'c': item.sEventCategoryCd,
          }
          dataList1.push(data)
        })
        //重新设置数据源
        this.setState({ dataSource1: new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 }).cloneWithRows(dataList1) });

      })
      .catch((error) => {
        console.log(error);
      })
  }

  //音乐屋：音乐教学
  getMusicTeach() {
    APIClient.access(APIInterface.getLeyaoMusicTeach())
      .then((response) => {
        return response.json()
      })
      .then((json) => {
        console.log(json)
        let arr = json.rows;
        let dataList2 = [];
        arr.map(item => {
          let data = {
            'p': APIConstant.BASE_URL_PREFIX + item.sEventTitleUrl, "u": item.sEventContentUrl,
            'e': item.hEventId, 'c': item.sEventCategoryCd,
          }
          dataList2.push(data)
        })
        //重新设置数据源
        this.setState({ dataSource2: new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 }).cloneWithRows(dataList2) });

      })
      .catch((error) => {
        console.log(error);
      })
  }


  //音乐屋：艺人分享
  getMusicShare() {
    APIClient.access(APIInterface.getLeyaoMusicShare())
      .then((response) => {
        return response.json()
      })
      .then((json) => {
        console.log(json)
        let arr = json.rows;
        let dataList3 = [];
        arr.map(item => {
          let data = {
            'p': APIConstant.BASE_URL_PREFIX + item.sEventTitleUrl, "u": item.sEventContentUrl,
            'e': item.hEventId, 'c': item.sEventCategoryCd,
          }
          dataList3.push(data)
        })
        //重新设置数据源
        this.setState({ dataSource3: new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 }).cloneWithRows(dataList3) });
      })
      .catch((error) => {
        console.log(error);
      })
  }

  // staveIntroduce() {
  //   Actions.stave_introduction()
  // }

  // noteDuration() {
  //   Actions.note_duration()
  // }

  _onMenuClick(tag, hEventId, rUserEventCategory) {
    //添加用户阅读记录
    APIClient.access(APIInterface.report(hEventId))
      .then((response) => {
        return response.json()
      })
      .then((json) => {
        if (json.responseResult == APIConstant.STATUS_SUCCEED) {
          Alert.alert('上报成功！')
        } else {
          Alert.alert('上报失败！')
        }
      })
      .catch((error) => {
        console.log(error)
      })


    APIConstant.URL_EVENT = tag;
    Actions.update_webview({ 
      type: ActionConst.PUSH,
      hEventId: hEventId
    });
  }

  render() {
    if (!this.state.dataSource3 || !this.state.dataSource2 || !this.state.dataSource1) {//如果this.state.data没有数据(即网络请求未完成),则返回一个加载中的文本   
      return (
        <Text>loading...</Text>
      );
    } else {//当this.state.data有了数据，则渲染ListView
      return (
        <View style={{ flex: 1 }}>
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
    width: (Dimensions.get('window').width) * 0.5,
    height: 100,
    borderWidth: 2,
    borderColor: '#e6faff',
    padding: 2.5
  }

});
