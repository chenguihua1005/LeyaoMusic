import React, { Component } from "react";
import {
    Image,
    TextInput,
    View,
    Platform,
    StyleSheet,
    TouchableOpacity,
    DeviceEventEmitter,
    Alert,
    Text,
} from 'react-native';
import TopBarNav from 'top-bar-nav';
import Video from 'react-native-video';
import APIInterface from '../service/api-interface';
import APIConstant from '../service/api-constant';
import {
    Actions,
    ActionConst
} from 'react-native-router-flux';

const music_1 = require('../resource/silent.mp3');

const bofang = require('../resource/btn_bofang.png');
const bofangzhong = require('../resource/btn_bofangzhong.png');

// 存储中间变量
let uri_temp = ""

export default class Header extends Component {

    constructor(props) {
        super(props);
        this.state = {
            songs: [],   //歌曲id数据源
            playModel: 1,  // 播放模式  1:列表循环    2:随机    3:单曲循环
            file_link: music_1,   //歌曲播放链接
            songLyr: [],     //当前歌词
            sliderValue: 0,    //Slide的value
            pause: true,       //歌曲暂停/播放
            isplayBtn: require('../resource/btn_bofang.png')  //播放/暂停按钮背景图
        }
    }

    componentDidMount() {
        this.listener = DeviceEventEmitter.addListener('changeMusic', (events) => {
            //第一次进来icon：“暂停”->“播放”
            if (this.state.pause == true) {
                this.setState({
                    pause: false,
                    isplayBtn: bofangzhong
                })
            }

            //音乐的url
            this.setState({ file_link: { uri: events.TAG + '?' + APIInterface.encryptByDES() } });
            //console.log("file_link = " + events.TAG + '?' + APIInterface.encryptByDES());

            //前后两次url地址不一样，通知改变音乐播放状态icon
            if (uri_temp != events.TAG) {
                uri_temp = events.TAG
                DeviceEventEmitter.emit('changeMusicIcon', { TAG: uri_temp });
            }

            //Alert.alert('提示', '收到监听事件');
            //强制启动渲染
            // this.forceUpdate();
        });
    }

    componentWillUnmount() {
        this.listener.remove();
    };

    //监听搜索的文本
    onFocus(event) {
        Actions.sightsing_focus();
    }

    //播放/暂停
    playAction = () => {
        this.setState({
            pause: !this.state.pause
        })
        //判断按钮显示什么
        if (this.state.pause == true) {
            this.setState({
                isplayBtn: bofangzhong
            })
        } else {
            this.setState({
                isplayBtn: bofang
            })
        }
        //发通知
        DeviceEventEmitter.emit('changeMusicIcon', { TAG: this.state.pause, TAG2: uri_temp });
    }

    render() {
        return (
            <View style={styles.container}>
                <View
                    style={{
                        flex: 1,
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        flexDirection: 'row',
                    }}>
                    {/*播放器*/}
                    <Video
                        source={this.state.file_link}
                        ref='audio'
                        volume={1.0}
                        repeat={true}
                        paused={this.state.pause}
                        playInBackground={true}
                    />
                    <Text style={{ color: '#353E3F', fontSize: 17, fontWeight: 'bold', fontFamily: 'PingFangSC-Semibold', paddingLeft: 27}}>乐谣音乐</Text>
                    <TouchableOpacity onPress={() => this.playAction()}>
                        <Image source={this.state.isplayBtn} style={styles.pauseIcon} />
                    </TouchableOpacity>
                </View>
                <View style={styles.searchBox}>
                    <Image source={require('../resource/icon_search.png')} style={styles.searchIcon} />
                    <TextInput
                        style={styles.inputText}
                        keyboardType='web-search'
                        placeholder='点击搜索你感兴趣的内容'
                        onFocus={() => this.onFocus()} />
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',   // 竖直排布
        paddingLeft: 10,
        paddingRight: 10,
        marginTop: 10,
        marginBottom: 10,
        paddingTop: Platform.OS === 'ios' ? 20 : 0,  // 处理iOS状态栏
        height: Platform.OS === 'ios' ? 68 : 48,   // 处理iOS状态栏
        backgroundColor: 'white',
    },
    pauseIcon: {
        height: 25,
        width: 25,
        resizeMode: 'stretch'
    },
    searchBox: {
        height: 30,  // 类似于android中的layout_weight,设置为1即自动拉伸填充
        flexDirection: 'row',
        borderRadius: 5,  // 设置圆角边
        backgroundColor: '#f9f9f9',
        alignItems: 'center',
        marginTop: 10,
        marginLeft: 10,
        marginRight: 10,
    },
    searchIcon: {
        marginLeft: 6,
        marginRight: 6,
        width: 16.7,
        height: 16.7,
        resizeMode: 'stretch'
    },
    inputText: {
        flex: 1,
        backgroundColor: 'transparent',
        fontSize: 14
    }
});