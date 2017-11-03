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
import SightsingSearchPage from './page/sightsing-search-page';
import ProfilePage from './page/profile-page';
import NotificationPage from './page/notification-page';
import UpdateNamePage from './page/update-name-page';
import UpdatePersonalPage from './page/update-personal-page'
import UpdateGenderPage from './page/update-gender-page';
import UpdateEmailPage from './page/update-email-page';
import UpdateVideoPage from './page/update-video-page';
import UpdateWebviewPage from './page/update-webview-page';
import UpdateMessagePage from './page/update-message-page';
import UpdateFocusPage from './page/update-focus-page';
import UpdateHistoryPage from './page/update-history-page';
import UpdateSuggestionPage from './page/update-suggestion-page';

// import TabIconWidget from './widget/tab-icon-widget'

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
    <Scene
      key="notification"
      hideNavBar={ true }
      component={ NotificationPage }/>
    <Scene
      key="update_name"
      hideNavBar={ true }
      component={ UpdateNamePage }/>
    <Scene
      key="update_personal"
      hideNavBar={ true }
      component={ UpdatePersonalPage }/>  
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
      key="update_webview"
      hideNavBar={ true }
      component={ UpdateWebviewPage }/>  
      <Scene
      key="update_message"
      hideNavBar={ true }
      component={ UpdateMessagePage }/>
      <Scene
      key="update_focus"
      hideNavBar={ true }
      component={ UpdateFocusPage }/>
      <Scene
      key="update_history"
      hideNavBar={ true }
      component={ UpdateHistoryPage }/>
      <Scene
      key="update_suggestion"
      hideNavBar={ true }
      component={ UpdateSuggestionPage }/>
      <Scene
      key="sightsing_search"
      hideNavBar={ true }
      component={ SightsingSearchPage }/>
  </Scene>
);
