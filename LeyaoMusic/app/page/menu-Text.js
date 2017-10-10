import React, { Component, PropTypes } from "react";
import {
    View,
    Text,
    Image,
    TouchableWithoutFeedback,
    StyleSheet,
    DeviceEventEmitter,
} from 'react-native';

let pause = true;

export default class MenuText extends Component {

    static propTypes = {
        showText: PropTypes.string,  // 显示标题\文字
        tag: PropTypes.string,  // Tag
        onClick: PropTypes.func  // 回调函数
    }

    constructor(props) {
        super(props);
        this._onClick = this._onClick.bind(this);  // 需要在回调函数中使用this,必须使用bind(this)来绑定
        this.state = {
            isplayBtn: require('../resource/btn_bofang.png')  //播放/暂停按钮背景图，初始状态：暂停
        }
    }

    componentDidMount() {
        this.listener = DeviceEventEmitter.addListener('changeMusicIcon', (events) => {
            //是匹配的url，变为播放状态
            if (events.TAG == this.props.tag) {
                if (pause == true) {
                    this.setState({
                        isplayBtn: require('../resource/btn_bofangzhong.png')
                    })
                    pause == false
                } 
                else {
                    this.setState({
                        isplayBtn: require('../resource/btn_bofang.png')
                    })
                    pause == true
                }
            }
            //主动暂停或播放，要加上当前播放歌曲url来判断
            else if(events.TAG == true) {
                if(events.TAG2 == this.props.tag) {
                    this.setState({
                        isplayBtn: require('../resource/btn_bofangzhong.png')
                    })
                }
            }
            else if(events.TAG == false) {
                if(events.TAG2 == this.props.tag) {
                    this.setState({
                        isplayBtn: require('../resource/btn_bofang.png')
                    })
                }
            }
            //不是匹配的url，变为暂停状态
            else {
                this.setState({
                    isplayBtn: require('../resource/btn_bofang.png')
                })
            }
        });
    }

    componentWillUnmount() {
        this.listener.remove();
    };

    _onClick() {
        if (this.props.onClick) {   // 在设置了回调函数的情况下
            this.props.onClick(this.props.showText, this.props.tag);  // 回调Title和Tag
        }
    }

    render() {
        return (
            <TouchableWithoutFeedback onPress={this._onClick}>
                <View style={{ flexDirection: 'row', alignItems: 'center', flex: 1 }}>
                    <Image style={{ marginLeft: 10, width: 14, height: 14 }}
                        source={this.state.isplayBtn}
                    />
                    <Text style={{ color: '#7f7f7f', fontSize: 12, padding: 6 }}>{this.props.showText}</Text>
                </View>
            </TouchableWithoutFeedback>
        );
    }
}
