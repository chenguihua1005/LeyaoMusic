import React, { Component, PropTypes } from "react";
import {
    View,
    Text,
    Image,
    TouchableWithoutFeedback,
    StyleSheet
} from 'react-native';

export default class MenuImageReport2 extends Component {

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
                <Image style={styles.iconImg} source={{ uri: this.props.renderIcon }} />
            </TouchableWithoutFeedback>
        );
    }
}

const styles = StyleSheet.create({
    iconImg: {
        marginTop: 0,
        height: 110,
        resizeMode: Image.resizeMode.stretch
    }
});