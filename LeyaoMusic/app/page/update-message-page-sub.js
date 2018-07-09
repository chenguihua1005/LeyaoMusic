import React, { Component } from "react";
import {
  ActivityIndicator,
  Alert,
  AsyncStorage,
  Dimensions,
  Image,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View,
  StyleSheet,
} from 'react-native';
import {
  Actions
} from 'react-native-router-flux';

export default class UpdateMessagePageSub extends Component {

  constructor(props) {
    super(props)
  }

  back() {
    Actions.pop()
  }

  render() {
    return (
      <Image
        source={require('../resource/main-background.jpg')}
        style={{
          flex: 1,
          width: null,
          height: null,
          alignItems: 'flex-start',
          backgroundColor: 'rgba(0, 0, 0, 0)',
        }}>
        <View
          style={{
            width: Dimensions.get('window').width,
            marginTop: 20,
            height: 44,
            alignItems: 'center',
            justifyContent: 'space-between',
            flexDirection: 'row'
          }}>
            <TouchableWithoutFeedback
              onPress={this.back.bind(this)}>
              <View
                style={{
                  marginLeft: 10,
                  width: 35
                }}>
                <Image
                  source={require('../resource/arrow.png')}
                  style={{
                    width: 10,
                    height: 19.5,
                    marginLeft: 5
                  }} />
              </View>
            </TouchableWithoutFeedback>
          <Text
            style={{
              fontFamily: 'ArialMT',
              fontSize: 18,
              color: '#000'
            }}>我的消息</Text>
          <View
            style={{
              marginRight: 10,
              width: 35
            }}>
            {/* <Text
                style={{
                  fontFamily: 'ArialMT',
                  fontSize: 16,
                  color: '#b3d66e'
                }}></Text> */}
          </View>
        </View>
        <View style={{ paddingTop: 22, paddingLeft: 10 }}>
          <Text style={styles.topTitleStyle}>{this.props.ContentStr}</Text>
        </View>
      </Image>
    );
  }
}

const styles = StyleSheet.create({
  topTitleStyle: {
    color: "#333333",
    fontSize: 15,
  },
}); 
