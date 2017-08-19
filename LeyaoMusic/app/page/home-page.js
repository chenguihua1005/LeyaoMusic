import React, { Component } from "react";
import {
    View,
    Text,
    Image,
    StyleSheet,
    ScrollView,
    Alert,
    ListView,
    RefreshControl,
    Dimensions,
    PixelRatio,
    TouchableWithoutFeedback,
    DeviceEventEmitter
} from 'react-native';

import {
  Actions
} from 'react-native-router-flux';

import APIClient from '../service/api-client';
import APIInterface from '../service/api-interface';
import APIConstant from '../service/api-constant';

import ViewPager from 'react-native-viewpager';
import MenuButton from './menu-button';
import MenuText from './menu-Text';

const BANNER_IMGS = [
    require('../resource/banner1.jpg'),
    require('../resource/banner2.jpg'),
    require('../resource/banner3.jpg'),
    require('../resource/banner4.jpg'),
    require('../resource/banner5.jpg')
];

const len = 160;

let audio_title =  ['title','title','title']
let audio_url = ['url','url','url']

export default class HomePage extends Component {

    constructor(props) {
        super(props);

        // 用于构建DataSource对象
        var dataSource = new ViewPager.DataSource({
            pageHasChanged: (p1, p2) => p1 !== p2,
        });
        this._onMenuClick = this._onMenuClick.bind(this);
        this._onRecommendClick = this._onRecommendClick.bind(this);
        this._renderRow = this._renderRow.bind(this);
        var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        // 实际的DataSources存放在state中
        this.state = {
            dataSource: dataSource.cloneWithPages(BANNER_IMGS),
            listData: ds,
            title:['','',''],
            url:['','','']
        }
    }

    componentWillMount() {

        APIClient.access(APIInterface.getLeyaoAudio())
        .then((response) => {
          return response.json()
        })
        .then((json) => {
            console.log(json)
            let arr = json.rows;
            for (let i = 0; i < arr.length; i++) {
                audio_title[i] = arr[i].sEventTitleUrl;
                audio_url[i] = arr[i].sEventContentUrl;
            }          
            this.setState({title : audio_title})
            this.setState({url : audio_url})
        })
        .catch((error) => {
          console.log(error);
        })
       
    }

    _renderPage(data, pageID) {
        return (
            <Image
                source={data}
                style={styles.page}/>
        );
    }

    _onMenuClick(title, tag) {
        //调用事件通知
        DeviceEventEmitter.emit('changeMusic',{TAG:tag});
        //Alert.alert('提示', '你点击了:' + title + " Tag:" + tag);
    }

    _onMenuClick2(title, tag) {
        Actions.update_video();
        //Alert.alert('提示', '你点击了:' + title + " Tag:" + tag);
    }

    _onRecommendClick(wareId) {
        let url = 'http://item.m.jd.com/product/' + wareId + '.html';
        // this.props.nav.push({
        //     id: 'webview',
        //     title: 'webiew',
        //     url: url
        // });
        Alert.alert('提示', '你点击了:tupian');
    }

    _renderRow(rowData) {
        return (
            <View style={{flexDirection:'row'}}>
            </View>
        );
    }

    getAudioList() {
        APIClient.access(APIInterface.getLeyaoAudio(1))
        .then((response) => {
          return response.json()
        })
        .then((json) => {
          console.log(json)

        })
        .catch((error) => {
          console.log(error);
        })
    }

    getVedioList() {
        
    }


    render() {
        return (
            <ListView
                style={{flex:1,backgroundColor:'white'}}
                dataSource={this.state.listData}
                renderRow={this._renderRow}
                renderHeader={()=>{return(
                <View>
                    <ViewPager
                        style={{height:130}}
                        dataSource={this.state.dataSource}
                        renderPage={this._renderPage}
                        isLoop={true}
                        autoPlay={true}/>

                    <View style={{ flex: 1, flexDirection: 'row',margin: 10}}>
                        <Image
                            style={{ width: '30%', height:80 }}
                            source={require('../resource/star1.png')}
                        />
                        <View style={{flexDirection: 'column',width: '70%'}}>
                            <MenuText showText={'维也纳森林故事  词：Jack  曲：John'} tag={'MUS_1'}
                                        onClick={this._onMenuClick}/>
                            <MenuText showText={'星星索  词：Jesse  曲：Mike'} tag={'MUS_2'}
                                        onClick={this._onMenuClick}/>
                            <MenuText showText={'兰色多瑙河舞曲  词：Alex  曲：Andy'} tag={'MUS_3'}
                                        onClick={this._onMenuClick}/>
                        </View>
                    </View>
                    <View style={{ flex: 1, flexDirection: 'row',margin: 10}}>
                        <Image
                            style={{ width: '30%', height:80 }}
                            source={require('../resource/star2.png')}
                        />
                        <View style={{flexDirection: 'column',width: '70%'}}>
                            <MenuText showText={this.state.title[0]} tag={APIConstant.BASE_URL_PREFIX+ this.state.url[0]}
                                        onClick={this._onMenuClick}/>
                            <MenuText showText={this.state.title[1]} tag={APIConstant.BASE_URL_PREFIX+ this.state.url[1]}
                                        onClick={this._onMenuClick}/>
                            <MenuText showText={this.state.title[2]} tag={APIConstant.BASE_URL_PREFIX+ this.state.url[2]}
                                        onClick={this._onMenuClick}/>
                        </View>
                    </View>

                    <Text style={{color:'#7f7f7f',fontSize:12,padding:10}}>听我 ></Text>    
                    <View style={styles.menuView}>
                        <MenuButton renderIcon={require('../resource/wdgz.png')}
                                    showText={'歌曲1'} tag={'MUSIC_1'}
                                    onClick={this._onMenuClick}/>
                        <MenuButton renderIcon={require('../resource/wlcx.png')}
                                    showText={'歌曲2'} tag={'MUSIC_2'}
                                    onClick={this._onMenuClick}/>
                        <MenuButton renderIcon={require('../resource/cz.png')}
                                    showText={'歌曲3'} tag={'MUSIC_3'}
                                    onClick={this._onMenuClick}/>
                        <MenuButton renderIcon={require('../resource/dyp.png')}
                                    showText={'歌曲4'} tag={'MUSIC_4'}
                                    onClick={this._onMenuClick}/>
                    </View>
                    <View style={{marginTop:15,borderWidth:0.5,borderColor:'#ccc'}}/>
                    <Text style={{color:'#7f7f7f',fontSize:12,padding:10}}>看我 ></Text>
                    <View style={styles.menuView}>
                        <MenuButton renderIcon={require('../resource/yxcz.png')}
                                    showText={'视频1'} tag={'MUSIC_1'}
                                    onClick={this._onMenuClick2}/>
                        <MenuButton renderIcon={require('../resource/xjk.png')}
                                    showText={'视频2'} tag={'MUSIC_2'}
                                    onClick={this._onMenuClick2}/>
                        <MenuButton renderIcon={require('../resource/ljd.png')}
                                    showText={'视频3'} tag={'MUSIC_3'}
                                    onClick={this._onMenuClick2}/>
                        <MenuButton renderIcon={require('../resource/gd.png')}
                                    showText={'视频4'} tag={'MUSIC_4'}
                                    onClick={this._onMenuClick2}/>
                    </View>
                </View>)}}>
            </ListView>
        )
    }
}

const styles = StyleSheet.create({
    page: {
        flex: 1,
        height: 130,
        resizeMode: 'stretch'
    },

    menuView: {
        flexDirection: 'row',
        marginTop: 10
    },
    recommendTitle: {
        width: len,
        flexWrap: 'wrap',
        fontSize: 12,
        color: 'black',
        flex: 1,
        marginTop: 8,
        marginBottom: 8,
        height: 30
    },
    priceText: {
        flex: 1,
        alignSelf: 'flex-start',
        textAlign: 'left',
        fontSize: 13,
        color: '#f15353'
    }
});