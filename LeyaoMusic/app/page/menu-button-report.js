import React, { Component, PropTypes} from "react";
import {
    View,
    Text,
    Image,
    TouchableWithoutFeedback,
    StyleSheet
} from 'react-native';

export default class MenuButtonReport extends Component {

    static propTypes = {
        renderIcon: PropTypes.string,  // 图片,加入.isRequired即为必填项
        tag: PropTypes.string,  // Tag
        hEventId: PropTypes.number,
        onClick: PropTypes.func  // 回调函数
    };

    constructor(props) {
        super(props);
        this._onClick = this._onClick.bind(this);  // 需要在回调函数中使用this,必须使用bind(this)来绑定
    }

    _onClick() {
        if (this.props.onClick) {   // 在设置了回调函数的情况下
            this.props.onClick(this.props.tag,
                this.props.hEventId);  // 回调Title和Tag
        }
    }

    render() {
        return (
            <TouchableWithoutFeedback onPress={this._onClick}>
                <View style={{alignItems:'center',flex:1}}>
                    <Image style={styles.iconImg} resizeMode={'stretch'} source={{uri:this.props.renderIcon}}/>
                </View>
            </TouchableWithoutFeedback>
        );
    }
}

const styles = StyleSheet.create({
    iconImg: {
        width: 90,
        height: 90,
        margin: 5
    },
});