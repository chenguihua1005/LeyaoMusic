import React, { Component } from 'react';
import {
  Actions,
  Scene,
  Reducer,
  Router
} from 'react-native-router-flux';

import WelcomePage from './page/welcome-page';
import GuidePage from './page/guide-page';
import LoginPage from './page/login-page';
import SetPasswordPage from './page/set-password-page';
import RegisterOnePage from './page/register-one-page';
import RegisterTwoPage from './page/register-two-page';
import MainScreen from './page/main-screen';
import SightsingPage from './page/sightsing-page';
import EarTrainingPage from './page/ear-training-page';
import ProfilePage from './page/profile-page';
import NotificationPage from './page/notification-page';
import StaveIntroductionPage from './page/stave-introduction-page';
import NoteDurationPage from './page/note-duration-page';
import UpdateNamePage from './page/update-name-page';
import UpdateGenderPage from './page/update-gender-page';
import UpdateEmailPage from './page/update-email-page';
import UpdateVideoPage from './page/update-video-page';
import AboutLeyaoPage from './page/about-leyao-page';
import MusicianPage from './page/musician-page';

import TabIconWidget from './widget/tab-icon-widget'

export default class AppRouter extends Component {
  render() {
    return (
      <Router scenes={ scenes } createReducer={ reducerCreate }/>
    );
  }
}

const reducerCreate = params => {
  const defaultReducer = new Reducer(params)
  console.log('params:', params)
  return (state, action) => {
    console.log('action:', action)
    console.log('state:', state)
    return defaultReducer(state, action)
  }
}

const scenes = Actions.create(
  <Scene key="root">
    <Scene
      key="welcome"
      initial="true"
      hideNavBar={ true }
      component={ WelcomePage }/>
    <Scene
      key="guide"
      hideNavBar={ true }
      component={ GuidePage }/>
    <Scene
      key="login"
      hideNavBar={ true }
      component={ LoginPage }/>
    <Scene
      key="set_password"
      hideNavBar={ true }
      component={ SetPasswordPage }/>
    <Scene
      key="register_one"
      hideNavBar={ true }
      component={ RegisterOnePage }/>
    <Scene
      key="register_two"
      hideNavBar={ true }
      component={ RegisterTwoPage }/>
    <Scene
      key="main"
      hideNavBar={ true }
      component={ MainScreen }/>
    {/*<Scene
      key="main"
      header = { require('./page/home-header') }
      tabs={ true }>
      <Scene
        key="home"
        hideNavBar={ true }
        component={ HomePage }
        icon={ TabIconWidget }
        title="首页"
        selectedIcon={ require('./resource/music-note-selected.png') }
        unSelectedIcon={ require('./resource/music-note-unselected.png') }
        selectedColor='rgba(179, 214, 110, 1)'
        unSelectedColor='rgba(255, 255, 255, 1)'/>
      <Scene
        key="sightsing"
        hideNavBar={ true }
        component={ SightsingPage }
        icon={ TabIconWidget }
        title="音乐屋"
        selectedIcon={ require('./resource/sightsing-selected.png') }
        unSelectedIcon={ require('./resource/sightsing-unselected.png') }
        selectedColor='rgba(179, 214, 110, 1)'
        unSelectedColor='rgba(255, 255, 255, 1)'/>
      <Scene
        key="ear_training"
        hideNavBar={ true }
        component={ EarTrainingPage }
        icon={ TabIconWidget }
        title="相关"
        selectedIcon={ require('./resource/headphone-selected.png') }
        unSelectedIcon={ require('./resource/headphone-unselected.png') }
        selectedColor='rgba(179, 214, 110, 1)'
        unSelectedColor='rgba(255, 255, 255, 1)'/>
      <Scene
        key="profile"
        hideNavBar={ true }
        component={ ProfilePage }
        icon={ TabIconWidget }
        title="个人"
        selectedIcon={ require('./resource/profile-selected.png') }
        unSelectedIcon={ require('./resource/profile-unselected.png') }
        selectedColor='#b3d66e'
        unSelectedColor='rgba(255, 255, 255, 1)'
        hideDivider={ true }/>
    </Scene>*/}
    <Scene
      key="notification"
      hideNavBar={ true }
      component={ NotificationPage }/>
    <Scene
      key="stave_introduction"
      hideNavBar={ true }
      component={ StaveIntroductionPage }/>
    <Scene
      key="note_duration"
      hideNavBar={ true }
      component={ NoteDurationPage }/>
    <Scene
      key="update_name"
      hideNavBar={ true }
      component={ UpdateNamePage }/>
    <Scene
      key="update_gender"
      hideNavBar={ true }
      component={ UpdateGenderPage }/>
    <Scene
      key="update_email"
      hideNavBar={ true }
      component={ UpdateEmailPage }/>
    <Scene
      key="update_video"
      hideNavBar={ true }
      component={ UpdateVideoPage }/>
    <Scene
      key="about_leyao"
      hideNavBar={ true }
      component={ AboutLeyaoPage }/>
    <Scene
      key="musician"
      hideNavBar={ true }
      component={ MusicianPage }/>
  </Scene>
);
