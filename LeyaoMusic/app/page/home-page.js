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

import Swiper from 'react-native-swiper';
import MenuButton from './menu-button';
import MenuText from './menu-Text';

const len = 160;

let audio_title = []
let audio_url = []
let vedio_title = []
let vedio_url = []
let image_title = []
let image_url = [];

let sliderImgs = [
    'http://images3.c-ctrip.com/SBU/apph5/201505/16/app_home_ad16_640_128.png',
    'http://images3.c-ctrip.com/rk/apph5/C1/201505/app_home_ad49_640_128.png',
    'http://images3.c-ctrip.com/rk/apph5/D1/201506/app_home_ad05_640_128.jpg',
    'http://images3.c-ctrip.com/SBU/apph5/201505/16/app_home_ad16_640_128.png',
    'http://images3.c-ctrip.com/rk/apph5/C1/201505/app_home_ad49_640_128.png'    
];

export default class HomePage extends Component {

    constructor(props) {
        super(props);
        this._onMenuClick = this._onMenuClick.bind(this);
        this._renderRow = this._renderRow.bind(this);
        var ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
        // 实际的DataSources存放在state中
        this.state = {
            listData: ds,
            audio_title: [],
            audio_url: [],
            vedio_title: [],
            vedio_url: [],
            image_title: [],
            image_url: [],
        }
    }

    componentWillMount() {
        this.getImageList();
        this.getAudioList();
        this.getVedioList();
    }

    //get all audios
    getAudioList() {
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
                this.setState({ audio_title: audio_title })
                this.setState({ audio_url: audio_url })
            })
            .catch((error) => {
                console.log(error);
            });
    }

    //get all vedios
    getVedioList() {
        APIClient.access(APIInterface.getLeyaoVedio())
            .then((response) => {
                return response.json()
            })
            .then((json) => {
                console.log(json)
                let arr = json.rows;
                for (let i = 0; i < arr.length; i++) {
                    vedio_title[i] = arr[i].sEventTitleUrl;
                    vedio_url[i] = arr[i].sEventContentUrl;
                }
                this.setState({ vedio_title: vedio_title })
                this.setState({ vedio_url: vedio_url })
            })
            .catch((error) => {
                console.log(error);
            })
    }

    //get all PAGES
    getImageList() {
        APIClient.access(APIInterface.getLeyaoImage())
            .then((response) => {
                return response.json()
            })
            .then((json) => {
                console.log(json)
                let arr = json.rows;
                for (let i = 0; i < arr.length; i++) {
                    image_title[i] = arr[i].sEventTitleUrl;
                    image_url[i] = arr[i].sEventContentUrl;
                }
                this.setState({ image_title: image_title })
                this.setState({ image_url: image_url })
            })
            .catch((error) => {
                console.log(error);
            })
    }

    _renderPage(data, pageID) {
        return (
            <Image
                source={data}
                style={styles.page} />
        );
    }

    _onMenuClick(title, tag) {
        //调用事件通知
        DeviceEventEmitter.emit('changeMusic', { TAG: tag });
        //Alert.alert('提示', '你点击了:' + title + " Tag:" + tag);
    }

    _onMenuClick2(title, tag) {
        APIConstant.URL_VEDIO = tag;
        Actions.update_video();
        //Alert.alert('URL_VEDIO = ' + tag);
    }

    _renderRow(rowData) {
        return (
            <View style={{ flexDirection: 'row' }}>
            </View>
        );
    }


    render() {
        return (
            <ListView
                style={{ flex: 1, backgroundColor: 'white' }}
                dataSource={this.state.listData}
                renderRow={this._renderRow}
                renderHeader={() => {
                    return (
                        <View>
                            <Swiper style={styles.wrapper} showsButtons={false} autoplay={true} autoplayTimeout={3}>
                                <Image style={[styles.slide,]} source={{ uri: sliderImgs[0] }}></Image>
                                <Image style={[styles.slide,]} source={{ uri: sliderImgs[1] }}></Image>
                                <Image style={[styles.slide,]} source={{ uri: sliderImgs[2] }}></Image>
                                <Image style={[styles.slide,]} source={{ uri: sliderImgs[3] }}></Image>
                                <Image style={[styles.slide,]} source={{ uri: sliderImgs[4] }}></Image>
                            </Swiper>

                            <View style={{ flex: 1, flexDirection: 'row', margin: 10 }}>
                                <Image
                                    style={{ width: '30%', height: 80 }}
                                    source={require('../resource/star1.png')}
                                />
                                <View style={{ flexDirection: 'column', width: '70%' }}>
                                    <MenuText showText={this.state.audio_title[0]} tag={APIConstant.BASE_URL_PREFIX + this.state.audio_url[0]}
                                        onClick={this._onMenuClick} />
                                    <MenuText showText={this.state.audio_title[1]} tag={APIConstant.BASE_URL_PREFIX + this.state.audio_url[1]}
                                        onClick={this._onMenuClick} />
                                    <MenuText showText={this.state.audio_title[2]} tag={APIConstant.BASE_URL_PREFIX + this.state.audio_url[2]}
                                        onClick={this._onMenuClick} />
                                </View>
                            </View>
                            <View style={{ flex: 1, flexDirection: 'row', margin: 10 }}>
                                <Image
                                    style={{ width: '30%', height: 80 }}
                                    source={require('../resource/star2.png')}
                                />
                                <View style={{ flexDirection: 'column', width: '70%' }}>
                                    <MenuText showText={this.state.audio_title[3]} tag={APIConstant.BASE_URL_PREFIX + this.state.audio_url[3]}
                                        onClick={this._onMenuClick} />
                                    <MenuText showText={this.state.audio_title[4]} tag={APIConstant.BASE_URL_PREFIX + this.state.audio_url[4]}
                                        onClick={this._onMenuClick} />
                                    <MenuText showText={this.state.audio_title[5]} tag={APIConstant.BASE_URL_PREFIX + this.state.audio_url[5]}
                                        onClick={this._onMenuClick} />
                                </View>
                            </View>

                            <Text style={{ color: '#7f7f7f', fontSize: 12, padding: 10 }}>听我 ></Text>
                            <View style={styles.menuView}>
                                <MenuButton renderIcon={require('../resource/wdgz.png')}
                                    showText={this.state.audio_title[0]} tag={APIConstant.BASE_URL_PREFIX + this.state.audio_url[0]}
                                    onClick={this._onMenuClick} />
                                <MenuButton renderIcon={require('../resource/wlcx.png')}
                                    showText={this.state.audio_title[1]} tag={APIConstant.BASE_URL_PREFIX + this.state.audio_url[1]}
                                    onClick={this._onMenuClick} />
                                <MenuButton renderIcon={require('../resource/cz.png')}
                                    showText={this.state.audio_title[2]} tag={APIConstant.BASE_URL_PREFIX + this.state.audio_url[2]}
                                    onClick={this._onMenuClick} />
                                <MenuButton renderIcon={require('../resource/dyp.png')}
                                    showText={this.state.audio_title[3]} tag={APIConstant.BASE_URL_PREFIX + this.state.audio_url[3]}
                                    onClick={this._onMenuClick} />
                            </View>
                            <View style={{ marginTop: 15, borderWidth: 0.5, borderColor: '#ccc' }} />
                            <Text style={{ color: '#7f7f7f', fontSize: 12, padding: 10 }}>看我 ></Text>
                            <View style={styles.menuView}>
                                <MenuButton renderIcon={require('../resource/yxcz.png')}
                                    showText={this.state.vedio_title[0]} tag={APIConstant.BASE_URL_PREFIX + this.state.vedio_url[0]}
                                    onClick={this._onMenuClick2} />
                                <MenuButton renderIcon={require('../resource/xjk.png')}
                                    showText={this.state.vedio_title[1]} tag={APIConstant.BASE_URL_PREFIX + this.state.vedio_url[1]}
                                    onClick={this._onMenuClick2} />
                                <MenuButton renderIcon={require('../resource/ljd.png')}
                                    showText={this.state.vedio_title[2]} tag={APIConstant.BASE_URL_PREFIX + this.state.vedio_url[2]}
                                    onClick={this._onMenuClick2} />
                                <MenuButton renderIcon={require('../resource/gd.png')}
                                    showText={this.state.vedio_title[3]} tag={APIConstant.BASE_URL_PREFIX + this.state.vedio_url[3]}
                                    onClick={this._onMenuClick2} />
                            </View>

                            <View style={{ marginTop: 15, borderWidth: 0.5, borderColor: '#ccc' }} />
                            <Text style={{ color: '#7f7f7f', fontSize: 12, padding: 10 }}>读我 ></Text>
                            <View style={styles.menuView}>
                                <MenuButton renderIcon={require('../resource/yxcz.png')}
                                    showText={'发现图文1'} tag={APIConstant.BASE_URL_PREFIX + this.state.vedio_url[0]}
                                    onClick={this._onMenuClick2} />
                                <MenuButton renderIcon={require('../resource/xjk.png')}
                                    showText={'发现图文2'} tag={APIConstant.BASE_URL_PREFIX + this.state.vedio_url[1]}
                                    onClick={this._onMenuClick2} />
                                <MenuButton renderIcon={require('../resource/ljd.png')}
                                    showText={'发现图文3'} tag={APIConstant.BASE_URL_PREFIX + this.state.vedio_url[2]}
                                    onClick={this._onMenuClick2} />
                                <MenuButton renderIcon={require('../resource/gd.png')}
                                    showText={'发现图文4'} tag={APIConstant.BASE_URL_PREFIX + this.state.vedio_url[3]}
                                    onClick={this._onMenuClick2} />
                            </View>
                            <View style={{ marginTop: 15, borderWidth: 0.5, borderColor: '#ccc' }} />
                        </View>)
                }}>
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
    },
    wrapper: {
        height: 130
    },
    slide: {
    	height:80,
    	resizeMode: Image.resizeMode.contain,
  	},
    slide1: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#9DD6EB',
    },
    slide2: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#97CAE5',
    },
    slide3: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#92BBD9',
    },
    text: {
        color: '#fff',
        fontSize: 30,
        fontWeight: 'bold',
    }
});