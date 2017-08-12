import React, { Component } from "react";
import {
  Dimensions,
  Image,
  Text,
  TouchableWithoutFeedback,
  View,
  StyleSheet
} from 'react-native';
import {
  Actions
} from 'react-native-router-flux';
import TopBarNav from 'top-bar-nav';

const Scene1 = ({ index }) => (
  <View style={{ flex: 1, flexDirection: 'row', flexWrap: 'wrap' }}>
    <Image
        style={{ width: '50%',height:100 }}
        source={require('../resource/banner2.jpg')}
    />
    <Image
        style={{ width: '50%',height:100 }}
        source={require('../resource/banner4.jpg')}
    />
    <Image
        style={{ width: '50%',height:100 }}
        source={require('../resource/banner2.jpg')}
    />
    <Image
        style={{ width: '50%',height:100 }}
        source={require('../resource/banner4.jpg')}
    />
    <Image
        style={{ width: '50%',height:100 }}
        source={require('../resource/banner2.jpg')}
    />
    <Image
        style={{ width: '50%',height:100 }}
        source={require('../resource/banner4.jpg')}
    />
    <Image
        style={{ width: '50%',height:100 }}
        source={require('../resource/banner2.jpg')}
    />
    <Image
        style={{ width: '50%',height:100 }}
        source={require('../resource/banner4.jpg')}
    />
    <Image
        style={{ width: '50%',height:100 }}
        source={require('../resource/banner2.jpg')}
    />
    <Image
        style={{ width: '50%',height:100 }}
        source={require('../resource/banner4.jpg')}
    />
  </View>
);
const Scene2 = ({ index }) => (
  <View style={{ flex: 1, flexDirection: 'row', flexWrap: 'wrap' }}>
    <Image
    style={{ width: '50%',height:100 }}
    source={require('../resource/banner2.jpg')}
    />
    <Image
        style={{ width: '50%',height:100 }}
        source={require('../resource/banner4.jpg')}
    />
    <Image
        style={{ width: '50%',height:100 }}
        source={require('../resource/banner2.jpg')}
    />
    <Image
        style={{ width: '50%',height:100 }}
        source={require('../resource/banner4.jpg')}
    />
    <Image
        style={{ width: '50%',height:100 }}
        source={require('../resource/banner2.jpg')}
    />
    <Image
        style={{ width: '50%',height:100 }}
        source={require('../resource/banner4.jpg')}
    />
    <Image
        style={{ width: '50%',height:100 }}
        source={require('../resource/banner2.jpg')}
    />
    <Image
        style={{ width: '50%',height:100 }}
        source={require('../resource/banner4.jpg')}
    />
    <Image
        style={{ width: '50%',height:100 }}
        source={require('../resource/banner2.jpg')}
    />
    <Image
        style={{ width: '50%',height:100 }}
        source={require('../resource/banner4.jpg')}
    />
  </View>
);
const Scene3 = ({ index }) => (
  <View style={{ flex: 1, flexDirection: 'row', flexWrap: 'wrap' }}>
    <Image
    style={{ width: '50%',height:100 }}
    source={require('../resource/banner2.jpg')}
    />
    <Image
        style={{ width: '50%',height:100 }}
        source={require('../resource/banner4.jpg')}
    />
    <Image
        style={{ width: '50%',height:100 }}
        source={require('../resource/banner2.jpg')}
    />
    <Image
        style={{ width: '50%',height:100 }}
        source={require('../resource/banner4.jpg')}
    />
    <Image
        style={{ width: '50%',height:100 }}
        source={require('../resource/banner2.jpg')}
    />
    <Image
        style={{ width: '50%',height:100 }}
        source={require('../resource/banner4.jpg')}
    />
    <Image
        style={{ width: '50%',height:100 }}
        source={require('../resource/banner2.jpg')}
    />
    <Image
        style={{ width: '50%',height:100 }}
        source={require('../resource/banner4.jpg')}
    />
    <Image
        style={{ width: '50%',height:100 }}
        source={require('../resource/banner2.jpg')}
    />
    <Image
        style={{ width: '50%',height:100 }}
        source={require('../resource/banner4.jpg')}
    />
  </View>
);

const ROUTES = {
  Scene1,
  // ideally you would have a ROUTES object with multiple React component scenes
  Scene2,
  Scene3
};

const ROUTESTACK = [
  { label: '乐谣活动', title: 'Scene1' }, // label is what you see in the top bar
  { label: '音乐教学', title: 'Scene2' }, // title is just the name of the Component being rendered.  See the renderScene property below
  { label: '艺人分享', title: 'Scene3' }
];

// const ROUTESTACK = [
//   { image: require('./home.png'), title: 'Scene' },
//   { image: require('./search.png'), title: 'Scene' },
//   { image: require('./bell.png'), title: 'Scene' }
// ];


export default class SightsingPage extends Component {

  staveIntroduce() {
    Actions.stave_introduction()
  }

  noteDuration() {
    Actions.note_duration()
  }

  render() {
    return (
      <View style={{ flex: 1}}>
        <TopBarNav
          // routeStack and renderScene are required props
          routeStack={ROUTESTACK}
          renderScene={(route, i) => {
            // This is a lot like the now deprecated Navigator component
            let Component = ROUTES[route.title];
            return <Component index={i} />;
          }}
          // Below are optional props
          headerStyle={[styles.headerStyle, { paddingTop: 20 }]} // probably want to add paddingTop: 20 if using TopBarNav for the  entire height of screen on iOS
          labelStyle={styles.labelStyle}
          underlineStyle={styles.underlineStyle}
          imageStyle={styles.imageStyle}
          sidePadding={40} // Can't set sidePadding in headerStyle because it's needed to calculate the width of the tabs
          inactiveOpacity={1}
          fadeLabels={false}
        />
      </View>
    );
  }

  // render() {
  //   return (
  //     <Image
  //       source={ require('../resource/main-background.jpg') }
  //       style={{
  //         flex: 1,
  //         width: null,
  //         height: null,
  //         backgroundColor: 'rgba(0, 0, 0, 0)',
  //       }}>
  //       <View
  //         style={{
  //           marginTop: 20,
  //           height: 44,
  //           alignSelf: 'center',
  //           justifyContent: 'center'
  //         }}>
  //         <Text
  //           style={{
  //             fontFamily: 'ArialMT',
  //             fontSize: 18,
  //             color: '#ffffff'
  //           }}>乐理</Text>
  //       </View>
  //       <TouchableWithoutFeedback
  //         onPress={ this.staveIntroduce.bind(this) }>
  //         <View
  //           style={{
  //             width: Dimensions.get('window').width,
  //             flexDirection: 'row',
  //             alignItems: 'center',
  //             marginTop: 10
  //           }}>
  //           <Image
  //             source={ require('../resource/stave.png') }
  //             style={{
  //               width: 20.5,
  //               height: 14.5,
  //               marginLeft: 10
  //             }}/>
  //           <Text
  //             style={{
  //               fontFamily: 'ArialMT',
  //               fontSize: 13,
  //               color: '#ffffff',
  //               marginLeft: 15
  //             }}>五线谱介绍，谱号，加线</Text>
  //         </View>
  //       </TouchableWithoutFeedback>
  //       <Image
  //         source={ require('../resource/sightsing-divider.png') }
  //         style={{
  //           width: Dimensions.get('window').width,
  //           height: 1,
  //           marginTop: 11,
  //           marginLeft: 11
  //         }}/>
  //       <TouchableWithoutFeedback
  //         onPress={ this.noteDuration.bind(this) }>
  //         <View
  //           style={{
  //             width: Dimensions.get('window').width,
  //             flexDirection: 'row',
  //             alignItems: 'center',
  //             marginTop: 14
  //           }}>
  //           <Image
  //             source={ require('../resource/note-duration.png') }
  //             style={{
  //               width: 18.5,
  //               height: 16,
  //               marginLeft: 10
  //             }}/>
  //           <Text
  //             style={{
  //               fontFamily: 'ArialMT',
  //               fontSize: 13,
  //               color: '#ffffff',
  //               marginLeft: 15
  //             }}>音符时值（持续时间长短）</Text>
  //         </View>
  //       </TouchableWithoutFeedback>
  //       <Image
  //         source={ require('../resource/sightsing-divider.png') }
  //         style={{
  //           width: Dimensions.get('window').width,
  //           height: 1,
  //           marginTop: 11,
  //           marginLeft: 11
  //         }}/>
  //     </Image>
  //   );
  // }
}

const styles = StyleSheet.create({
  headerStyle: {
    borderBottomWidth: 1,
    borderColor: '#e6faff',
    backgroundColor: '#3385ff'
  },
  labelStyle: {
    fontSize: 15,
    fontWeight: '500',
    color: '#fff'
  },
  imageStyle: {
    height: 20,
    width: 20,
    tintColor: '#e6faff'
  },
  underlineStyle: {
    height: 3.6,
    backgroundColor: '#e6faff'
  }
});
