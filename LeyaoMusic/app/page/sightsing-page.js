import React, { Component } from "react";
import {
  Dimensions,
  Image,
  Text,
  TouchableWithoutFeedback,
  View,
  StyleSheet,
} from 'react-native';
import {
  Actions,
  ActionConst
} from 'react-native-router-flux';
import TopBarNav from 'top-bar-nav';
import MenuImage from './menu-image';
import APIConstant from '../service/api-constant';

export default class SightsingPage extends Component {
    constructor(props) {
        super(props);
        this._onMenuClick = this._onMenuClick.bind(this);
        Scene1 = ({ index }) => (
            <View style={{ flex: 1, flexDirection: 'row', flexWrap: 'wrap' }}>
              <View style={{ width: '50%',height:100 }} >
                  <MenuImage  renderIcon={require('../resource/banner2.jpg')}
                              tag={'http://www.leyaomusic.com'}
                              onClick={this._onMenuClick}/>
              </View>
              <View style={{ width: '50%',height:100 }} >
                  <MenuImage  renderIcon={require('../resource/banner4.jpg')}
                              tag={'http://www.leyaomusic.com'}
                              onClick={this._onMenuClick}/>
              </View>
              <View style={{ width: '50%',height:100 }} >
                  <MenuImage  renderIcon={require('../resource/banner2.jpg')}
                              tag={'http://www.leyaomusic.com'}
                              onClick={this._onMenuClick}/>
              </View>
              <View style={{ width: '50%',height:100 }} >
                  <MenuImage  renderIcon={require('../resource/banner4.jpg')}
                              tag={'http://www.leyaomusic.com'}
                              onClick={this._onMenuClick}/>
              </View>
              <View style={{ width: '50%',height:100 }} >
                  <MenuImage  renderIcon={require('../resource/banner2.jpg')}
                              tag={'http://www.leyaomusic.com'}
                              onClick={this._onMenuClick}/>
              </View>
              <View style={{ width: '50%',height:100 }} >
                  <MenuImage  renderIcon={require('../resource/banner4.jpg')}
                              tag={'http://www.leyaomusic.com'}
                              onClick={this._onMenuClick}/>
              </View>
              <View style={{ width: '50%',height:100 }} >
                  <MenuImage  renderIcon={require('../resource/banner2.jpg')}
                              tag={'http://www.leyaomusic.com'}
                              onClick={this._onMenuClick}/>
              </View>
              <View style={{ width: '50%',height:100 }} >
                  <MenuImage  renderIcon={require('../resource/banner4.jpg')}
                              tag={'http://www.leyaomusic.com'}
                              onClick={this._onMenuClick}/>
              </View>
              <View style={{ width: '50%',height:100 }} >
                  <MenuImage  renderIcon={require('../resource/banner2.jpg')}
                              tag={'http://www.leyaomusic.com'}
                              onClick={this._onMenuClick}/>
              </View>
              <View style={{ width: '50%',height:100 }} >
                  <MenuImage  renderIcon={require('../resource/banner4.jpg')}
                              tag={'http://www.leyaomusic.com'}
                              onClick={this._onMenuClick}/>
              </View> 
            </View>
          );
          Scene2 = ({ index }) => (
            <View style={{ flex: 1, flexDirection: 'row', flexWrap: 'wrap' }}>
              <View style={{ width: '50%',height:100 }} >
                  <MenuImage  renderIcon={require('../resource/banner2.jpg')}
                              tag={'https://www.baidu.com'}
                              onClick={this._onMenuClick}/>
              </View>
              <View style={{ width: '50%',height:100 }} >
                  <MenuImage  renderIcon={require('../resource/banner4.jpg')}
                              tag={'https://www.baidu.com'}
                              onClick={this._onMenuClick}/>
              </View>
              <View style={{ width: '50%',height:100 }} >
                  <MenuImage  renderIcon={require('../resource/banner2.jpg')}
                              tag={'https://www.baidu.com'}
                              onClick={this._onMenuClick}/>
              </View>
              <View style={{ width: '50%',height:100 }} >
                  <MenuImage  renderIcon={require('../resource/banner4.jpg')}
                              tag={'https://www.baidu.com'}
                              onClick={this._onMenuClick}/>
              </View>
              <View style={{ width: '50%',height:100 }} >
                  <MenuImage  renderIcon={require('../resource/banner2.jpg')}
                              tag={'https://www.baidu.com'}
                              onClick={this._onMenuClick}/>
              </View>
              <View style={{ width: '50%',height:100 }} >
                  <MenuImage  renderIcon={require('../resource/banner4.jpg')}
                              tag={'https://www.baidu.com'}
                              onClick={this._onMenuClick}/>
              </View>
              <View style={{ width: '50%',height:100 }} >
                  <MenuImage  renderIcon={require('../resource/banner2.jpg')}
                              tag={'https://www.baidu.com'}
                              onClick={this._onMenuClick}/>
              </View>
              <View style={{ width: '50%',height:100 }} >
                  <MenuImage  renderIcon={require('../resource/banner4.jpg')}
                              tag={'https://www.baidu.com'}
                              onClick={this._onMenuClick}/>
              </View>
              <View style={{ width: '50%',height:100 }} >
                  <MenuImage  renderIcon={require('../resource/banner2.jpg')}
                              tag={'https://www.baidu.com'}
                              onClick={this._onMenuClick}/>
              </View>
              <View style={{ width: '50%',height:100 }} >
                  <MenuImage  renderIcon={require('../resource/banner4.jpg')}
                              tag={'https://www.baidu.com'}
                              onClick={this._onMenuClick}/>
              </View>               
            </View>
          );
          Scene3 = ({ index }) => (
            <View style={{ flex: 1, flexDirection: 'row', flexWrap: 'wrap' }}>
              <View style={{ width: '50%',height:100 }} >
                  <MenuImage  renderIcon={require('../resource/banner2.jpg')}
                              tag={'http://www.265.com'}
                              onClick={this._onMenuClick}/>
              </View>
              <View style={{ width: '50%',height:100 }} >
                  <MenuImage  renderIcon={require('../resource/banner4.jpg')}
                              tag={'http://www.265.com'}
                              onClick={this._onMenuClick}/>
              </View>
              <View style={{ width: '50%',height:100 }} >
                  <MenuImage  renderIcon={require('../resource/banner2.jpg')}
                              tag={'http://www.265.com'}
                              onClick={this._onMenuClick}/>
              </View>
              <View style={{ width: '50%',height:100 }} >
                  <MenuImage  renderIcon={require('../resource/banner4.jpg')}
                              tag={'http://www.265.com'}
                              onClick={this._onMenuClick}/>
              </View>
              <View style={{ width: '50%',height:100 }} >
                  <MenuImage  renderIcon={require('../resource/banner2.jpg')}
                              tag={'http://www.265.com'}
                              onClick={this._onMenuClick}/>
              </View>
              <View style={{ width: '50%',height:100 }} >
                  <MenuImage  renderIcon={require('../resource/banner4.jpg')}
                              tag={'http://www.265.com'}
                              onClick={this._onMenuClick}/>
              </View>
              <View style={{ width: '50%',height:100 }} >
                  <MenuImage  renderIcon={require('../resource/banner2.jpg')}
                              tag={'http://www.265.com'}
                              onClick={this._onMenuClick}/>
              </View>
              <View style={{ width: '50%',height:100 }} >
                  <MenuImage  renderIcon={require('../resource/banner4.jpg')}
                              tag={'http://www.265.com'}
                              onClick={this._onMenuClick}/>
              </View>
              <View style={{ width: '50%',height:100 }} >
                  <MenuImage  renderIcon={require('../resource/banner2.jpg')}
                              tag={'http://www.265.com'}
                              onClick={this._onMenuClick}/>
              </View>
              <View style={{ width: '50%',height:100 }} >
                  <MenuImage  renderIcon={require('../resource/banner4.jpg')}
                              tag={'http://www.265.com'}
                              onClick={this._onMenuClick}/>
              </View>               
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
    return (
      <View style={{ flex: 1}}>
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

const styles = StyleSheet.create({
  headerStyle: {
    borderBottomWidth: 1,
    borderColor: '#e6faff',
    backgroundColor: '#3385ff'
  },
  labelStyle: {
    fontSize: 15,
    fontWeight: '500',
    color: '#fff'
  },
  imageStyle: {
    height: 20,
    width: 20,
    tintColor: '#e6faff'
  },
  underlineStyle: {
    height: 3.6,
    backgroundColor: '#e6faff'
  }
});
