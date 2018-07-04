import React, { Component } from "react";
import {
    View,
    Image,
    StyleSheet,
    ListView,
    DeviceEventEmitter
} from 'react-native';

import {
    Actions,
    ActionConst
} from 'react-native-router-flux';

import APIConstant from '../service/api-constant';
import MenuText from './menu-text';
import HeaderDemo from './home-header-demo';

export default class HomePageDemo extends Component {

    constructor(props) {
        super(props);
        this._onMenuClick = this._onMenuClick.bind(this);

        let dataList = []
        for (let i in this.props.musician_title) {
            let data = {
                'title': this.props.musician_title[i],
                'url': APIConstant.BASE_URL_PREFIX + this.props.musician_url[i]
            }
            dataList.push(data)
        }
        this.state = {
            dataSource: new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 }).cloneWithRows(dataList)
        }

    }

    componentWillMount() {
    }

    componentWillUnmount() {
    };

    onBack() {
        Actions.pop();
    }

    //音乐家和听我，点击后统一调用接口
    _onMenuClick(title, tag) {
        //调用事件通知
        DeviceEventEmitter.emit('changeMusic', { TAG: tag });
        //Alert.alert('提示', '你点击了:' + title + " Tag:" + tag);
    }

    render() {
        return (
            <View>
                <HeaderDemo />
                <ListView
                    contentContainerStyle={styles.contentContainerStyle}
                    dataSource={this.state.dataSource}
                    renderRow={
                        (rowData) =>
                            <View style={{ flexDirection: 'row', margin: 10 }}>
                                <MenuText showText={rowData.title} tag={rowData.url}
                                    onClick={this._onMenuClick} />
                            </View>
                    }
                />

                {/* <View style={{ flexDirection: 'row', margin: 10 }}>
                    <MenuText showText={this.props.musician_title[2]} tag={APIConstant.BASE_URL_PREFIX + this.props.musician_url[2]}
                        onClick={this._onMenuClick} />
                    <Text style={{ color: '#333333', fontSize: 18, fontWeight: 'bold', marginRight: 5 }}>收藏</Text>
                    <Text style={{ color: '#BDBDBD', fontSize: 18, fontWeight: 'bold', marginRight: 5 }}>购买</Text>
                </View> */}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    menuView: {
        flexDirection: 'row',
        marginTop: 0
    },
    wrapper: {
        height: 130,
        marginBottom: -10,
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
    contentContainerStyle: {
        flexDirection: 'column',
        flexWrap: 'wrap',
    },
});