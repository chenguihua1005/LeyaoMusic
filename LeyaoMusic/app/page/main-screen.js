import React, { Component } from "react";
import {
  Dimensions,
  Image,
  Text,
  TouchableWithoutFeedback,
  View,
  TextInput,
  Platform,
  StyleSheet,
  Navigator
} from 'react-native';
import {
  Actions
} from 'react-native-router-flux';

import Header from './home-header'; 
import HomePage from './home-page';
import SightsingPage from './sightsing-page';
import ProfilePage from './profile-page';
// import SQLite from './sqlite'; 
// var sqLite = new SQLite();
// var db;
// const Product_TABLE_NAME = "t_event_page";//表名称
//var eventData = [];  

import TabNavigator from 'react-native-tab-navigator';
import VideoPlayer from 'react-native-video-controls';
import ViewPager from 'react-native-viewpager';

import APIClient from '../service/api-client';
import APIInterface from '../service/api-interface';
import APIConstant from '../service/api-constant';

const HOME = '首页';
const HOME_NORMAL = require('../resource/icon_shouye.png');
const HOME_FOCUS = require('../resource/icon_shouye_xuanzhong.png');
const CATEGORY = 'category';

const FAXIAN = '音乐屋';
const FAXIAN_NORMAL = require('../resource/icon_yintyuewu.png');
const FAXIAN_FOCUS = require('../resource/icon_yintyuewu_xuanzhong.png');
const CART = 'cart';

const PERSONAL = '个人';
const PERSONAL_NORMAL = require('../resource/icon_wode.png');
const PERSONAL_FOCUS = require('../resource/icon_wode_xuanzhong.png');


export default class MainScreen extends Component {

  constructor(props) {
    super(props)
    this.url = 'https://vjs.zencdn.net/v/oceans.mp4'; 
    this.state = {selectedTab: HOME} 
  }

  componentWillMount(){  
    // //开启数据库  
    // if(!db){  
    //   db = sqLite.open();  
    // }  
    // //建表  
    // sqLite.createTable();  
    // //删除数据  
    // sqLite.deleteData();
    // //请求数据，插入数据库，查询数据库    
    // this.getAllResource(); 
  } 
  
  compennetDidUnmount(){  
    // sqLite.close();  
  } 

  //   //get all resource
  //   getAllResource() {
  //     APIClient.access(APIInterface.getLeyaoAll())
  //     .then((response) => {
  //       return response.json()
  //     })
  //     .then((json) => {
  //         console.log(json);
  //         let arr = json.rows;
  //         for (let i = 0; i < arr.length; i++) {
  //             var event = {}; 
  //             event.hEventId = arr[i].hEventId;
  //             event.rEventCategoryDesc = arr[i].rEventCategoryDesc;
  //             event.rEventTypeDesc = arr[i].rEventTypeDesc;  
  //             event.sEventActiveInd = arr[i].sEventActiveInd;
  //             event.sEventCategoryCd = arr[i].sEventCategoryCd;
  //             event.sEventContentUrl = arr[i].sEventContentUrl;
  //             event.sEventSearchContentTxt = arr[i].sEventSearchContentTxt;
  //             event.sEventSubContent1Url = arr[i].sEventSubContent1Url;
  //             event.sEventTitleUrl = arr[i].sEventTitleUrl;
  //             event.sEventTypeCd = arr[i].sEventTypeCd;
  //             event.createTs = arr[i].createTs;
  //             event.updateTs = arr[i].updateTs;
  //             eventData.push(event);
  //         }          
  //         //插入数据  
  //         sqLite.insertUserData(eventData);  
  //         //查询  
  //         db.transaction((tx)=>{  
  //           tx.executeSql("select * from " + Product_TABLE_NAME, [],(tx,results)=>{  
  //             var len = results.rows.length;  
  //             for(let i=0; i<len; i++){  
  //               var u = results.rows.item(i);  
  //               //一般在数据查出来之后，  可能要 setState操作，重新渲染页面  
  //               console.log("db_sqlite:" + "字段1: "+u.h_event_id+"，字段2："+u.s_event_title_url+"，字段3："+u.update_ts);
  //             }  
  //           });  
  //         },(error)=>{//打印异常信息  
  //           console.log(error);  
  //         }); 
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // }

    _renderTabItem(img, selectedImg, tag, childView) {
      return (
          <TabNavigator.Item
              selected={this.state.selectedTab === tag}
              renderIcon={() => <Image style={styles.tabIcon} source={img}/>}
              renderSelectedIcon={() => <Image style={styles.tabIcon} source={selectedImg}/>}
              onPress={() => this.setState({ selectedTab: tag })}>
              {childView}
          </TabNavigator.Item>
      );
  }

    render() {
      return (
        <View style={{flex: 1}}>  
          <Header />  
          <TabNavigator hidesTabTouch={true} tabBarStyle={styles.tab}>
            {this._renderTabItem(HOME_NORMAL, HOME_FOCUS, HOME, <HomePage nav={this.props.nav}/>)}
            {this._renderTabItem(FAXIAN_NORMAL, FAXIAN_FOCUS, FAXIAN, <SightsingPage nav={this.props.nav}/>)}
            {this._renderTabItem(PERSONAL_NORMAL, PERSONAL_FOCUS, PERSONAL, <ProfilePage nav={this.props.nav}/>)}
          </TabNavigator>
        </View >      
    );
  }

}

const styles = StyleSheet.create({
    tab: {
        height: 52,
        backgroundColor: '#303030',
        alignItems: 'center',
    },
    tabIcon: {
        width: 30,
        height: 30,
        resizeMode: 'stretch',
        marginTop: 12.5
    }
});
