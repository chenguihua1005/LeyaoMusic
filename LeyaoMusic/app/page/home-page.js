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

import ViewPager from 'react-native-viewpager';
import MenuButton from './menu-button';
import MenuText from './menu-Text';

const BANNER_IMGS = [
    require('../resource/banner1.jpg'),
    require('../resource/banner2.jpg'),
    require('../resource/banner3.jpg'),
    require('../resource/banner4.jpg'),
    require('../resource/banner5.jpg')
];

const len = 160;

export default class HomePage extends Component {

    constructor(props) {
        super(props);

        // 用于构建DataSource对象
        var dataSource = new ViewPager.DataSource({
            pageHasChanged: (p1, p2) => p1 !== p2,
        });
        this._onMenuClick = this._onMenuClick.bind(this);
        this._onRecommendClick = this._onRecommendClick.bind(this);
        this._renderRow = this._renderRow.bind(this);
        var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        // 实际的DataSources存放在state中
        this.state = {
            dataSource: dataSource.cloneWithPages(BANNER_IMGS),
            listData: ds
        }
    }

    componentWillMount() {
        fetch('http://m.jd.com/index/recommend.action?_format_=json&page=1')
            .then((res)=> res.json())
            .then((str)=> {
                let arr = JSON.parse(str.recommend).wareInfoList;
                var rows = [];
                for (let i = 0; i < arr.length; i += 2) {
                    var item = {id: i, left: null, right: null};
                    item.left = (arr[i]);
                    if (i < arr.length - 1) {
                        item.right = (arr[i + 1]);
                    }
                    rows.push(item);
                }
                var ds = this.state.listData.cloneWithRows(rows);
                this.setState({listData: ds});
            });
    }

    _renderPage(data, pageID) {
        return (
            <Image
                source={data}
                style={styles.page}/>
        );
    }

    _onMenuClick(title, tag) {
        //调用事件通知
        DeviceEventEmitter.emit('changeMusic',{TAG:tag});
        //Alert.alert('提示', '你点击了:' + title + " Tag:" + tag);
    }

    _onMenuClick2(title, tag) {
        Actions.update_video();
        //Alert.alert('提示', '你点击了:' + title + " Tag:" + tag);
    }

    _onRecommendClick(wareId) {
        let url = 'http://item.m.jd.com/product/' + wareId + '.html';
        // this.props.nav.push({
        //     id: 'webview',
        //     title: 'webiew',
        //     url: url
        // });
        Alert.alert('提示', '你点击了:tupian');
    }

    _renderRow(rowData) {
        return (
            <View style={{flexDirection:'row'}}>
                {/*<TouchableWithoutFeedback style={{flex:1,alignItems:'center'}}
                                          onPress={()=>{this._onRecommendClick(rowData.left.wareId)}}>
                    <View style={{flex:1,alignItems:'center'}}>
                        <Image resizeMode={'stretch'} source={{uri:rowData.left.imageurl}}
                               style={{width:len,height:len}}/>
                        <Text numberOfLines={2} style={styles.recommendTitle}>{rowData.left.wname}</Text>
                        <View style={{width:len,borderWidth:0.5,borderColor:'#d7d7d7'}}/>
                        <View
                            style={{flexDirection:'row',width:len, marginTop: 6, marginBottom: 22,alignItems:'flex-start'}}>
                            <Text style={styles.priceText}>￥{rowData.left.jdPrice}</Text>
                            <TouchableWithoutFeedback>
                                <View style={{width:50,height:18,borderWidth:1,borderColor:'#999999',borderRadius:3,justifyContent: 'center',
alignItems: 'center'}}>
                                    <Text
                                        style={{color:'#999999',fontSize:12,textAlign:'center'}}>看相似</Text>
                                </View>
                            </TouchableWithoutFeedback>
                        </View>
                    </View>
                </TouchableWithoutFeedback>
                <TouchableWithoutFeedback style={{flex:1,alignItems:'center'}}
                                          onPress={()=>{this._onRecommendClick(rowData.right.wareId)}}>
                    <View style={{flex:1,alignItems:'center'}}>
                        <Image resizeMode={'stretch'} source={{uri:rowData.right.imageurl}}
                               style={{width:len,height:len}}/>
                        <Text numberOfLines={2} style={styles.recommendTitle}>{rowData.right.wname}</Text>
                        <View style={{width:len,borderWidth:0.5,borderColor:'#d7d7d7'}}/>
                        <View
                            style={{flexDirection:'row',width:len, marginTop: 6, marginBottom: 22,alignItems:'flex-start'}}>
                            <Text style={styles.priceText}>￥{rowData.right.jdPrice}</Text>
                            <TouchableWithoutFeedback>
                                <View style={{width:50,height:18,borderWidth:1,borderColor:'#999999',borderRadius:3,justifyContent: 'center',
alignItems: 'center'}}>
                                    <Text
                                        style={{color:'#999999',fontSize:12,textAlign:'center'}}>看相似</Text>
                                </View>
                            </TouchableWithoutFeedback>
                        </View>
                    </View>
                </TouchableWithoutFeedback>*/}
            </View>
        );
    }

    render() {
        return (
            <ListView
                style={{flex:1,backgroundColor:'white'}}
                dataSource={this.state.listData}
                renderRow={this._renderRow}
                renderHeader={()=>{return(
                <View>
                    <ViewPager
                        style={{height:130}}
                        dataSource={this.state.dataSource}
                        renderPage={this._renderPage}
                        isLoop={true}
                        autoPlay={true}/>

                    <View style={{ flex: 1, flexDirection: 'row',margin: 10}}>
                        <Image
                            style={{ width: '30%', height:80 }}
                            source={require('../resource/star1.png')}
                        />
                        <View style={{flexDirection: 'column',width: '70%'}}>
                            <MenuText showText={'维也纳森林故事  词：Jack  曲：John'} tag={'MUS_1'}
                                        onClick={this._onMenuClick}/>
                            <MenuText showText={'星星索  词：Jesse  曲：Mike'} tag={'MUS_2'}
                                        onClick={this._onMenuClick}/>
                            <MenuText showText={'兰色多瑙河舞曲  词：Alex  曲：Andy'} tag={'MUS_3'}
                                        onClick={this._onMenuClick}/>
                        </View>
                    </View>
                    <View style={{ flex: 1, flexDirection: 'row',margin: 10}}>
                        <Image
                            style={{ width: '30%', height:80 }}
                            source={require('../resource/star2.png')}
                        />
                        <View style={{flexDirection: 'column',width: '70%'}}>
                            <MenuText showText={'匈牙利舞曲第五号  词：Jack  曲：John'} tag={'http://47.94.94.196/LeyaoTemp/audio/1.mp3'}
                                        onClick={this._onMenuClick}/>
                            <MenuText showText={'春江花月夜  词：Jesse  曲：Mike'} tag={'http://47.94.94.196/LeyaoTemp/audio/2.mp3'}
                                        onClick={this._onMenuClick}/>
                            <MenuText showText={'查拉图斯特拉如是说  词：Alex  曲：Andy'} tag={'http://47.94.94.196/LeyaoTemp/audio/3.mp3'}
                                        onClick={this._onMenuClick}/>
                        </View>
                    </View>

                    <Text style={{color:'#7f7f7f',fontSize:12,padding:10}}>听我 ></Text>    
                    <View style={styles.menuView}>
                        <MenuButton renderIcon={require('../resource/wdgz.png')}
                                    showText={'歌曲1'} tag={'MUSIC_1'}
                                    onClick={this._onMenuClick}/>
                        <MenuButton renderIcon={require('../resource/wlcx.png')}
                                    showText={'歌曲2'} tag={'MUSIC_2'}
                                    onClick={this._onMenuClick}/>
                        <MenuButton renderIcon={require('../resource/cz.png')}
                                    showText={'歌曲3'} tag={'MUSIC_3'}
                                    onClick={this._onMenuClick}/>
                        <MenuButton renderIcon={require('../resource/dyp.png')}
                                    showText={'歌曲4'} tag={'MUSIC_4'}
                                    onClick={this._onMenuClick}/>
                    </View>
                    <View style={{marginTop:15,borderWidth:0.5,borderColor:'#ccc'}}/>
                    <Text style={{color:'#7f7f7f',fontSize:12,padding:10}}>看我 ></Text>
                    <View style={styles.menuView}>
                        <MenuButton renderIcon={require('../resource/yxcz.png')}
                                    showText={'视频1'} tag={'MUSIC_1'}
                                    onClick={this._onMenuClick2}/>
                        <MenuButton renderIcon={require('../resource/xjk.png')}
                                    showText={'视频2'} tag={'MUSIC_2'}
                                    onClick={this._onMenuClick2}/>
                        <MenuButton renderIcon={require('../resource/ljd.png')}
                                    showText={'视频3'} tag={'MUSIC_3'}
                                    onClick={this._onMenuClick2}/>
                        <MenuButton renderIcon={require('../resource/gd.png')}
                                    showText={'视频4'} tag={'MUSIC_4'}
                                    onClick={this._onMenuClick2}/>
                    </View>
                </View>)}}>
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
    }
});