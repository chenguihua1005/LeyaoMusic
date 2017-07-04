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
import SQLite from './sqlite'; 
var sqLite = new SQLite();
var db;
import TabNavigator from 'react-native-tab-navigator';
import VideoPlayer from 'react-native-video-controls';
import ViewPager from 'react-native-viewpager';

const HOME = 'home';
const HOME_NORMAL = require('../resource/home_normal.png');
const HOME_FOCUS = require('../resource/home_focus.png');
const CATEGORY = 'category';
//const CATEGORY_NORMAL = require('../resource/category_normal.png');
//const CATEGORY_FOCUS = require('../resource/category_focus.png');
const FAXIAN = 'faxian';
const FAXIAN_NORMAL = require('../resource/faxian_normal.png');
const FAXIAN_FOCUS = require('../resource/faxian_focus.png');
const CART = 'cart';
//const CART_NORMAL = require('../resource/cart_normal.png');
//const CART_FOCUS = require('../resource/cart_focus.png');
const PERSONAL = 'personal';
const PERSONAL_NORMAL = require('../resource/personal_normal.png');
const PERSONAL_FOCUS = require('../resource/personal_focus.png');


export default class MainScreen extends Component {

  constructor(props) {
    super(props)
    this.url = 'https://vjs.zencdn.net/v/oceans.mp4'; 
    this.state = {selectedTab: HOME} 
  }

  compennetDidUnmount(){  
    sqLite.close();  
  } 

  componentWillMount(){  
    //开启数据库  
    if(!db){  
      db = sqLite.open();  
    }  
    //建表  
    sqLite.createTable();  
    //删除数据  
    sqLite.deleteData();  
    //模拟一条数据  
    var userData = [];  
    var user = {};  
    user.name = "张三";  
    user.age = "28";  
    user.sex = "男";  
    user.phone = "18900001111";  
    user.email = "2343242@qq.com";  
    user.qq = "111222";  
    userData.push(user);  
    //插入数据  
    sqLite.insertUserData(userData);  
    //查询  
    db.transaction((tx)=>{  
      tx.executeSql("select * from user", [],(tx,results)=>{  
        var len = results.rows.length;  
        for(let i=0; i<len; i++){  
          var u = results.rows.item(i);  
          //一般在数据查出来之后，  可能要 setState操作，重新渲染页面  
          alert("姓名："+u.name+"，年龄："+u.age+"，电话："+u.phone);  
        }  
      });  
    },(error)=>{//打印异常信息  
      console.log(error);  
    });  
  }  

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

    static _createChildView(tag) {
        return (
            <View style={{flex:1,backgroundColor:'#00baff',alignItems:'center',justifyContent:'center'}}>
                <Text style={{fontSize:22}}>{tag}</Text>
            </View>
        )
    }


    render() {
      return (
        <View style={{flex: 1}}>  
          <Header />  
          <TabNavigator hidesTabTouch={true} tabBarStyle={styles.tab}>
            {this._renderTabItem(HOME_NORMAL, HOME_FOCUS, HOME, <HomePage nav={this.props.nav}/>)}
            {/*{this._renderTabItem(CATEGORY_NORMAL, CATEGORY_FOCUS, CATEGORY, MainScreen._createChildView(CATEGORY))}*/}
            {this._renderTabItem(FAXIAN_NORMAL, FAXIAN_FOCUS, FAXIAN, MainScreen._createChildView(FAXIAN))}
            {/*{this._renderTabItem(CART_NORMAL, CART_FOCUS, CART, MainScreen._createChildView(CART))}*/}
            {this._renderTabItem(PERSONAL_NORMAL, PERSONAL_FOCUS, PERSONAL, MainScreen._createChildView(PERSONAL))}
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
        height: 35,
        resizeMode: 'stretch',
        marginTop: 12.5
    }
});
