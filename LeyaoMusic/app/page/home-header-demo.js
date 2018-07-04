import React, { Component } from "react";
import {
    Image,
    TextInput,
    View,
    Platform,
    StyleSheet,
    Text,
    TouchableWithoutFeedback,
} from 'react-native';
import {
    Actions,
    ActionConst
} from 'react-native-router-flux';

export default class Header extends Component {

    constructor(props) {
        super(props);
        this.state = {
        }
    }

    componentDidMount() {
    }

    //监听搜索的文本
    onFocus(event) {
        Actions.sightsing_focus();
    }

    componentWillUnmount() {
    };

    onBack() {
        Actions.pop();
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
                    <TouchableWithoutFeedback
                        onPress={() => this.onBack()}>
                        <View
                            style={{
                                marginLeft: 10
                            }}>
                            <Image
                                source={require('../resource/arrow.png')}
                                style={{
                                    width: 10,
                                    height: 19.5,
                                    marginLeft: 5,
                                    marginBottom: 5
                                }} />
                        </View>
                    </TouchableWithoutFeedback>
                    <Text style={{ color: '#353E3F', fontSize: 17, fontWeight: 'bold', fontFamily: 'PingFangSC-Semibold', paddingLeft: 0 }}>SoundCube</Text>
                    <Text></Text>
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