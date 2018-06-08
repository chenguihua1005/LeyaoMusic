import React, { Component, PropTypes } from "react";
import {
    View,
    Text,
    Image,
    TouchableWithoutFeedback,
    StyleSheet,
    Dimensions,
} from 'react-native';

let pause = true;

export default class MenuMessage extends Component {

    static propTypes = {
        showText1: PropTypes.string,  // 显示标题
        showText2: PropTypes.string,  // 显示时间
        tag: PropTypes.string,  // Tag
        onClick: PropTypes.func  // 回调函数
    }

    constructor(props) {
        super(props);
        this._onClick = this._onClick.bind(this);  // 需要在回调函数中使用this,必须使用bind(this)来绑定
    }

    _onClick() {
        if (this.props.onClick) {   // 在设置了回调函数的情况下
            this.props.onClick(this.props.tag);  // 回调Title和Tag
        }
    }

    render() {
        return (
            <TouchableWithoutFeedback onPress={this._onClick}>
                <View style={styles.cellViewStyle}>
                    <View style={styles.rightViewStyle}>
                        <Text style={styles.topTitleStyle}>{this.props.showText1}</Text>
                        <Text style={styles.bottomTitleStyle}>{this.props.showText2}</Text>
                    </View>
                </View>
            </TouchableWithoutFeedback>
        );
    }
}

const styles = StyleSheet.create({
    cellViewStyle: {
      padding: 5,
      backgroundColor: 'white',
      borderBottomWidth: 0.5,
      borderBottomColor: "#e8e8e8",
      flexDirection: 'column',
    },
    rightViewStyle:{  
      justifyContent:"center",  
      width: (Dimensions.get('window').width) * 0.9,  
     },   
    topTitleStyle: {
      fontWeight: 'bold',
      color: "#333333",
      fontSize: 15,
    },
    bottomTitleStyle: {
      fontWeight: 'bold',
      color: "#BDBDBD",
      fontSize: 12,
      marginTop: 5
    }
  }); 