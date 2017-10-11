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
    Actions,
    ActionConst
} from 'react-native-router-flux';

import APIClient from '../service/api-client';
import APIInterface from '../service/api-interface';
import APIConstant from '../service/api-constant';

import Swiper from 'react-native-swiper';
import MenuButton from './menu-button';
import MenuText from './menu-text';

const len = 160;

//state中转变量 
let musician_title1 = []
let musician_url1 = []
let musician_title2 = []
let musician_url2 = []
let audio_title = []
let audio_url = []
let vedio_title = []
let vedio_url = []
let image_title = []
let image_url = [];

//读我听我看我，个数先统一为4个
const length = 4;

let sliderImgs = [
    'http://47.94.94.196:8088/image/1.jpg',
    'http://47.94.94.196:8088/image/2.jpg',
    'http://47.94.94.196:8088/image/3.jpg',
    'http://47.94.94.196:8088/image/4.jpg',
    'http://47.94.94.196:8088/image/5.jpg'
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
            musician_title1: [],
            musician_url1: [],
            musician_title2: [],
            musician_url2: [],
            audio_title: [],
            audio_url: [],
            vedio_title: [],
            vedio_url: [],
            image_title: [],
            image_url: [],
        }
    }

    componentWillMount() {
        //音乐家
        this.getMusicianList();

        //读我听我看我
        this.getImageList();
        this.getAudioList();
        this.getVedioList();
    }

    //音乐家
    getMusicianList() {
        APIClient.access(APIInterface.getLeyaoMusician())
            .then((response) => {
                return response.json()
            })
            .then((json) => {
                console.log(json)
                let arr = json.rows;
                //一共有2名音乐家，每名音乐家下面有3首歌曲
                //"sEventSubContent1UrlList":["audio/1.mp3","audio/2.mp3","audio/3.mp3"],
                //"sEventSubContent2StrList":["musician1","musician1","musician1"]
                for (let i = 0; i < 3; i++) {
                    musician_title1[i] = arr[0].sEventSubContent2StrList[i];
                    musician_url1[i] = arr[0].sEventSubContent1UrlList[i];
                }
                for (let i = 0; i < 3; i++) {
                    musician_title2[i] = arr[1].sEventSubContent2StrList[i];
                    musician_url2[i] = arr[1].sEventSubContent1UrlList[i];
                }

                this.setState({ musician_title1: musician_title1 })
                this.setState({ musician_url1: musician_url1 })
                this.setState({ musician_title2: musician_title2 })
                this.setState({ musician_url2: musician_url2 })
            })
            .catch((error) => {
                console.log(error);
            })
    }

    //get all pages，读我
    getImageList() {
        APIClient.access(APIInterface.getLeyaoImage())
            .then((response) => {
                return response.json()
            })
            .then((json) => {
                console.log(json)
                let arr = json.rows;
                for (let i = 0; i < length; i++) {
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

    //get all audios，听我
    getAudioList() {
        APIClient.access(APIInterface.getLeyaoAudio())
            .then((response) => {
                return response.json()
            })
            .then((json) => {
                console.log(json)
                let arr = json.rows;
                for (let i = 0; i < length; i++) {
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

    //get all vedios，看我
    getVedioList() {
        APIClient.access(APIInterface.getLeyaoVedio())
            .then((response) => {
                return response.json()
            })
            .then((json) => {
                console.log(json)
                let arr = json.rows;
                for (let i = 0; i < length; i++) {
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

    _renderPage(data, pageID) {
        return (
            <Image
                source={data}
                style={styles.page} />
        );
    }

    //音乐家和听我，点击后统一调用接口
    _onMenuClick(title, tag) {
        //调用事件通知
        DeviceEventEmitter.emit('changeMusic', { TAG: tag });
        Alert.alert('提示', '你点击了:' + title + " Tag:" + tag);
    }

    _onMenuClick2(title, tag) {
        APIConstant.URL_VEDIO = tag;
        Actions.update_video();
        Alert.alert('URL_VEDIO = ' + tag);
    }

    _onMenuClick3(title, tag) {
        APIConstant.URL_EVENT = tag;
        Actions.update_webview({ type: ActionConst.PUSH });
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
                                    style={{ width: '50%', height: 80 }}
                                    resizeMode={'stretch'}
                                    source={{ uri: 'http://47.94.94.196:8088/image/1.jpg' }}
                                />
                                <View style={{ flexDirection: 'column', width: '50%' }}>
                                    <MenuText showText={this.state.musician_title1[0]} tag={APIConstant.BASE_URL_PREFIX + this.state.musician_url1[0]}
                                        onClick={this._onMenuClick} />
                                    <MenuText showText={this.state.musician_title1[1]} tag={APIConstant.BASE_URL_PREFIX + this.state.musician_url1[1]}
                                        onClick={this._onMenuClick} />
                                    <MenuText showText={this.state.musician_title1[2]} tag={APIConstant.BASE_URL_PREFIX + this.state.musician_url1[2]}
                                        onClick={this._onMenuClick} />
                                </View>
                            </View>
                            <View style={{ flex: 1, flexDirection: 'row', margin: 10 }}>
                                <Image
                                    style={{ width: '50%', height: 80 }}
                                    resizeMode={'stretch'}
                                    source={{ uri: 'http://47.94.94.196:8088/image/2.jpg' }}
                                />
                                <View style={{ flexDirection: 'column', width: '50%' }}>
                                    <MenuText showText={this.state.musician_title2[0]} tag={APIConstant.BASE_URL_PREFIX + this.state.musician_url2[0]}
                                        onClick={this._onMenuClick} />
                                    <MenuText showText={this.state.musician_title2[1]} tag={APIConstant.BASE_URL_PREFIX + this.state.musician_url2[1]}
                                        onClick={this._onMenuClick} />
                                    <MenuText showText={this.state.musician_title2[2]} tag={APIConstant.BASE_URL_PREFIX + this.state.musician_url2[2]}
                                        onClick={this._onMenuClick} />
                                </View>
                            </View>

                            <Text style={{ color: '#7f7f7f', fontSize: 12, padding: 10 }}>听我 ></Text>
                            <View style={styles.menuView}>
                                <MenuButton renderIcon={require('../resource/song1.png')}
                                    showText={this.state.audio_title[0]} tag={APIConstant.BASE_URL_PREFIX + this.state.audio_title[0]}
                                    onClick={this._onMenuClick} />
                                <MenuButton renderIcon={require('../resource/song2.png')}
                                    showText={this.state.audio_title[1]} tag={APIConstant.BASE_URL_PREFIX + this.state.audio_title[1]}
                                    onClick={this._onMenuClick} />
                                <MenuButton renderIcon={require('../resource/song3.png')}
                                    showText={this.state.audio_title[2]} tag={APIConstant.BASE_URL_PREFIX + this.state.audio_title[2]}
                                    onClick={this._onMenuClick} />
                                <MenuButton renderIcon={require('../resource/song4.png')}
                                    showText={this.state.audio_title[3]} tag={APIConstant.BASE_URL_PREFIX + this.state.audio_title[3]}
                                    onClick={this._onMenuClick} />
                            </View>
                            <View style={{ marginTop: 15, borderWidth: 0.5, borderColor: '#ccc' }} />
                            <Text style={{ color: '#7f7f7f', fontSize: 12, padding: 10 }}>看我 ></Text>
                            <View style={styles.menuView}>
                                <MenuButton renderIcon={require('../resource/song1.png')}
                                    showText={this.state.vedio_title[0]} tag={APIConstant.BASE_URL_PREFIX + this.state.vedio_title[0]}
                                    onClick={this._onMenuClick2} />
                                <MenuButton renderIcon={require('../resource/song2.png')}
                                    showText={this.state.vedio_title[1]} tag={APIConstant.BASE_URL_PREFIX + this.state.vedio_title[1]}
                                    onClick={this._onMenuClick2} />
                                <MenuButton renderIcon={require('../resource/song3.png')}
                                    showText={this.state.vedio_title[2]} tag={APIConstant.BASE_URL_PREFIX + this.state.vedio_title[2]}
                                    onClick={this._onMenuClick2} />
                                <MenuButton renderIcon={require('../resource/song4.png')}
                                    showText={this.state.vedio_title[3]} tag={APIConstant.BASE_URL_PREFIX + this.state.vedio_title[3]}
                                    onClick={this._onMenuClick2} />
                            </View>

                            <View style={{ marginTop: 15, borderWidth: 0.5, borderColor: '#ccc' }} />
                            <Text style={{ color: '#7f7f7f', fontSize: 12, padding: 10 }}>读我 ></Text>
                            <View style={styles.menuView}>
                                <MenuButton renderIcon={require('../resource/song1.png')}
                                    showText={'发现图文1'} tag={this.state.image_url[0]}
                                    onClick={this._onMenuClick3} />
                                <MenuButton renderIcon={require('../resource/song2.png')}
                                    showText={'发现图文2'} tag={this.state.image_url[1]}
                                    onClick={this._onMenuClick3} />
                                <MenuButton renderIcon={require('../resource/song3.png')}
                                    showText={'发现图文3'} tag={this.state.image_url[2]}
                                    onClick={this._onMenuClick3} />
                                <MenuButton renderIcon={require('../resource/song4.png')}
                                    showText={'发现图文4'} tag={this.state.image_url[3]}
                                    onClick={this._onMenuClick3} />
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
        marginTop: 0,
        height: 110,
        resizeMode: Image.resizeMode.stretch,
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