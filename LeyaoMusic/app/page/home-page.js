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

//state中转变量 
let slide_image = []
let slide_url = []
let musician_title1 = []
let musician_url1 = []
let musician_title2 = []
let musician_url2 = []
let audio_title = []
let audio_url = []
let vedio_title = []
let vedio_url = []
let image_title = []
let image_url = []

//读我听我看我，个数先统一为6个
const length = 5;

export default class HomePage extends Component {

    constructor(props) {
        super(props);
        this._onMenuClick = this._onMenuClick.bind(this);
        this._renderRow = this._renderRow.bind(this);
        var ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
        // 实际的DataSources存放在state中
        this.state = {
            listData: ds,
            slide_image: ['', '', '', '', '', ''],
            slide_url: [],
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
        //Banner页
        this.getBanner();

        //音乐家
        this.getMusicianList();

        //读我听我看我
        this.getImageList();
        this.getAudioList();
        this.getVedioList();
    }

    //Banner页
    getBanner() {
        APIClient.access(APIInterface.getBanner())
            .then((response) => {
                return response.json()
            })
            .then((json) => {
                console.log(json)
                let arr = json.rows;
                for (let i = 0; i < json.total; i++) {
                    slide_image[i] = arr[i].sEventTitleUrl;
                    slide_url[i] = arr[i].sEventContentUrl;
                }
                this.setState({ slide_image: slide_image })
                this.setState({ slide_url: slide_url })
            })
            .catch((error) => {
                console.log(error);
            });
    }

    _onClick1() {
        APIConstant.URL_EVENT = slide_url[0];
        Actions.update_webview({ type: ActionConst.PUSH });
    }
    _onClick2() {
        APIConstant.URL_EVENT = slide_url[1];
        Actions.update_webview({ type: ActionConst.PUSH });
    }
    _onClick3() {
        APIConstant.URL_EVENT = slide_url[2];
        Actions.update_webview({ type: ActionConst.PUSH });
    }
    _onClick4() {
        APIConstant.URL_EVENT = slide_url[3];
        Actions.update_webview({ type: ActionConst.PUSH });
    }
    _onClick5() {
        APIConstant.URL_EVENT = slide_url[4];
        Actions.update_webview({ type: ActionConst.PUSH });
    }
    _onClick6() {
        APIConstant.URL_EVENT = slide_url[2];
        Actions.update_webview({ type: ActionConst.PUSH });
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
                    //词：jack 曲：jesse 唱： mark
                    // musician_title1[i] = " 词：" + arr[0].sEventSubContent[i].lyricist +
                    //     " 曲：" + arr[0].sEventSubContent[i].composer +
                    //     " 唱：" + arr[0].sEventSubContent[i].singer;
                    //音乐家的歌曲描述用description那个字段
                    musician_title1[i] = arr[0].sEventSubContent[i].description
                    //字符串超过12，则截取后面的以...表示
                    if (musician_title1[i].length > 12)
                        musician_title1[i] = musician_title1[i].slice(0, 12) + '...';
                    musician_url1[i] = arr[0].sEventSubContent[i].url;
                }
                for (let i = 0; i < 3; i++) {
                    // musician_title2[i] = " 词：" + arr[1].sEventSubContent[i].lyricist +
                    //     " 曲：" + arr[1].sEventSubContent[i].composer +
                    //     " 唱：" + arr[1].sEventSubContent[i].singer;
                    musician_title2[i] = arr[1].sEventSubContent[i].description;
                    //字符串超过12，则截取后面的以...表示
                    if (musician_title2[i].length > 12)
                        musician_title2[i] = musician_title2[i].slice(0, 12) + '...';
                    musician_url2[i] = arr[1].sEventSubContent[i].url;
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

    //听我
    renderItem1() {
        var itemAry = [];
        for (var i = 0; i < 6; i++) {
            itemAry.push(
                <View key={i}>
                    <MenuButton renderIcon={APIConstant.BASE_URL_PREFIX + this.state.audio_title[i]}
                        showText={''} tag={APIConstant.BASE_URL_PREFIX + this.state.audio_url[i]}
                        onClick={this._onMenuClick} />
                </View>

            );
        }
        return itemAry;
    }

    //看我
    renderItem2() {
        var itemAry = [];
        for (var i = 0; i < 6; i++) {
            itemAry.push(
                <View key={i}>
                    <MenuButton renderIcon={APIConstant.BASE_URL_PREFIX + this.state.vedio_title[i]}
                        showText={''} tag={APIConstant.BASE_URL_PREFIX + this.state.vedio_url[i]}
                        onClick={this._onMenuClick2} />
                </View>

            );
        }
        return itemAry;
    }

    //读我
    renderItem3() {
        var itemAry = [];
        for (var i = 0; i < 6; i++) {
            itemAry.push(
                <View key={i}>
                    <MenuButton renderIcon={APIConstant.BASE_URL_PREFIX + this.state.image_title[i]}
                        showText={''} tag={this.state.image_url[i]}
                        onClick={this._onMenuClick3} />
                </View>

            );
        }
        return itemAry;
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
                                <View>
                                    <TouchableWithoutFeedback onPress={this._onClick1}>
                                        <Image style={[styles.slide,]} source={{ uri: APIConstant.BASE_URL_PREFIX + this.state.slide_image[0] }}></Image>
                                    </TouchableWithoutFeedback>
                                </View>
                                <View>
                                    <TouchableWithoutFeedback onPress={this._onClick2}>
                                        <Image style={[styles.slide,]} source={{ uri: APIConstant.BASE_URL_PREFIX + this.state.slide_image[1] }}></Image>
                                    </TouchableWithoutFeedback>
                                </View>
                                <View>
                                    <TouchableWithoutFeedback onPress={this._onClick3}>
                                        <Image style={[styles.slide,]} source={{ uri: APIConstant.BASE_URL_PREFIX + this.state.slide_image[2] }}></Image>
                                    </TouchableWithoutFeedback>
                                </View>
                                <View>
                                    <TouchableWithoutFeedback onPress={this._onClick4}>
                                        <Image style={[styles.slide,]} source={{ uri: APIConstant.BASE_URL_PREFIX + this.state.slide_image[3] }}></Image>
                                    </TouchableWithoutFeedback>
                                </View>
                                <View>
                                    <TouchableWithoutFeedback onPress={this._onClick5}>
                                        <Image style={[styles.slide,]} source={{ uri: APIConstant.BASE_URL_PREFIX + this.state.slide_image[4] }}></Image>
                                    </TouchableWithoutFeedback>
                                </View>
                                <View>
                                    <TouchableWithoutFeedback onPress={this._onClick6}>
                                        <Image style={[styles.slide,]} source={{ uri: APIConstant.BASE_URL_PREFIX + this.state.slide_image[1] }}></Image>
                                    </TouchableWithoutFeedback>
                                </View>
                            </Swiper>

                            <View style={{ flex: 1, flexDirection: 'row', margin: 10 }}>
                                <Image
                                    style={{ width: '40%', height: 80 }}
                                    resizeMode={'stretch'}
                                    source={{ uri: 'http://47.94.94.196:8088/static/image/1.jpg' }}
                                />
                                <View style={{ flexDirection: 'column', width: '60%' }}>
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
                                    style={{ width: '40%', height: 80 }}
                                    resizeMode={'stretch'}
                                    source={{ uri: 'http://47.94.94.196:8088/static/image/2.jpg' }}
                                />
                                <View style={{ flexDirection: 'column', width: '60%' }}>
                                    <MenuText showText={this.state.musician_title2[0]} tag={APIConstant.BASE_URL_PREFIX + this.state.musician_url2[0]}
                                        onClick={this._onMenuClick} />
                                    <MenuText showText={this.state.musician_title2[1]} tag={APIConstant.BASE_URL_PREFIX + this.state.musician_url2[1]}
                                        onClick={this._onMenuClick} />
                                    <MenuText showText={this.state.musician_title2[2]} tag={APIConstant.BASE_URL_PREFIX + this.state.musician_url2[2]}
                                        onClick={this._onMenuClick} />
                                </View>
                            </View>
                            <View style={{ flexDirection: 'row', margin: 10 }}>
                                <Text style={{ color: '#333333', fontSize: 18, fontWeight: 'bold', marginRight: 5 }}>听我</Text>
                                <Text style={{ color: '#BDBDBD', fontSize: 11, marginTop: 3 }}> · LISTEN ME</Text>
                            </View>
                            <View style={styles.menuView}>
                                <ScrollView style={styles.mainStyle}
                                    horizontal={true}   // 水平方向
                                    showsHorizontalScrollIndicator={false}  // 隐藏水平指示器
                                    showsVerticalScrollIndicator={false}    // 隐藏垂直指示器
                                >
                                    {this.renderItem1()}
                                </ScrollView>
                            </View>
                            {/* <View style={{ marginTop: 15, borderWidth: 0.5, borderColor: '#ccc' }} /> */}

                            <View style={{ flexDirection: 'row', margin: 10 }}>
                                <Text style={{ color: '#333333', fontSize: 18, fontWeight: 'bold', marginRight: 5 }}>看我</Text>
                                <Text style={{ color: '#BDBDBD', fontSize: 11, marginTop: 3 }}> · WATCH ME</Text>
                            </View>
                            <View style={styles.menuView}>
                                <ScrollView style={styles.mainStyle}
                                    horizontal={true}   // 水平方向
                                    showsHorizontalScrollIndicator={false}  // 隐藏水平指示器
                                    showsVerticalScrollIndicator={false}    // 隐藏垂直指示器
                                >
                                    {this.renderItem2()}
                                </ScrollView>
                            </View>
                            {/* <View style={{ marginTop: 15, borderWidth: 0.5, borderColor: '#ccc' }} /> */}
                            <View style={{ flexDirection: 'row', margin: 10 }}>
                                <Text style={{ color: '#333333', fontSize: 18, fontWeight: 'bold', marginRight: 5 }}>读我</Text>
                                <Text style={{ color: '#BDBDBD', fontSize: 11, marginTop: 3 }}> · READ ME</Text>
                            </View>
                            <View style={styles.menuView}>
                                <ScrollView style={styles.mainStyle}
                                    horizontal={true}   // 水平方向
                                    showsHorizontalScrollIndicator={false}  // 隐藏水平指示器
                                    showsVerticalScrollIndicator={false}    // 隐藏垂直指示器
                                >
                                    {this.renderItem3()}
                                </ScrollView>
                            </View>
                            <View style={{ marginTop: 15, borderWidth: 0.5, borderColor: '#ccc' }} />
                        </View>)
                }}>
            </ListView>
        )
    }
}

const styles = StyleSheet.create({
    menuView: {
        flexDirection: 'row',
        marginTop: 0
    },
    wrapper: {
        height: 130
    },
    slide: {
        marginTop: 0,
        height: 110,
        resizeMode: Image.resizeMode.stretch,
    },
    text: {
        color: '#fff',
        fontSize: 30,
        fontWeight: 'bold',
    },
    scrollViewStyle: {
        // 背景色
        backgroundColor: 'red'
    },
    mainStyle: {
        marginLeft: 5,
    },
    itemStyle: {
        // 尺寸
        width: 600,
        height: 600
    },
});