import BaseRequest from './base-request';
import APIConstant from './api-constant';

export default class APIInterface {

  static getLeyaoMusicParty() {
    return BaseRequest.get(APIConstant.BASE_URL_MUSIC_PARTY, {

    })
  }

  static getLeyaoMusicTeach() {
    return BaseRequest.get(APIConstant.BASE_URL_MUSIC_TEACH, {

    })
  }

  static getLeyaoMusicShare() {
    return BaseRequest.get(APIConstant.BASE_URL_MUSIC_SHARE, {

    })
  }

  static getLeyaoMusician() {
    return BaseRequest.get(APIConstant.BASE_URL_MUSICIAN, {

    })
  }

  //-->new add interface
  //听我1 看我2 读我3
  static getLeyaoAudio() {
    return BaseRequest.get(APIConstant.BASE_URL_AUDIO, {

    })
  }  

  static getLeyaoVedio() {
    return BaseRequest.get(APIConstant.BASE_URL_VEDIO, {

    })
  }

  static getLeyaoImage() {
    return BaseRequest.get(APIConstant.BASE_URL_IMAGE, {

    })
  }

  static getLeyaoAll() {
    return BaseRequest.get(APIConstant.BASE_URL_ALL, {

    })
  }

  //--<new add interface

  static getCodeList() {
    return BaseRequest.post(APIConstant.BASE_URL + '/code/getCodeList', {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }, {})
  }

  static getVerifyCode(phone) {
    return BaseRequest.post(APIConstant.BASE_URL + '/user/getVerifyCode?hUserPhoneNr=' + phone, {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },{

    })
  }

  static register(username, password, code) {
    return BaseRequest.post(APIConstant.BASE_URL + '/user/regist', {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }, {
      'hUserPhoneNr': username,
      'sUserPasswordStr': password,
      'verifyCode': code
    })
  }

  static login(username, password) {
    return BaseRequest.post(APIConstant.BASE_URL + '/user/login', {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }, {
      'hUserPhoneNr': username,
      'sUserPasswordStr': password
    })
  }

  static forgetPWD(username, password, code) {
    return BaseRequest.post(APIConstant.BASE_URL + '/user/reset', {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }, {
      'hUserPhoneNr': username,
      'sUserPasswordStr': password,
      'verifyCode': code
    })
  }

  static upload(sessionCode, fileName, hUserPhoneNr, base64) {
    return BaseRequest.post(APIConstant.BASE_URL + '/user/uploadProfile', {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }, {
      'sessionCode': sessionCode,
      'fileName': fileName,
      'hUserPhoneNr': hUserPhoneNr,
      'base64': base64
    })
  }

  static updateUser() {
    return BaseRequest.get(APIConstant.BASE_URL + '/message/getTMessageSummaryListByCondition?sessionCode=1234', {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    }, {})
  }

  static updateSuggestion(sUserFeedbackStr, hUserPhoneNr) {
    return BaseRequest.post(APIConstant.BASE_URL + '/user/addSUserFeedbackSummary', {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }, {
      'sUserFeedbackStr': sUserFeedbackStr,
      'hUserPhoneNr': hUserPhoneNr
    })
  }

  static getNoticeList(token, numPerPage, pageNum) {
    return BaseRequest.post(APIConstant.BASE_URL + '/notice/getNoticeList', {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'token': token
    }, {
      'numPerPage': numPerPage,
      'pageNum': pageNum
    })
  }

  static details(token, username) {
    return BaseRequest.get(APIConstant.BASE_URL_DETAILS, {
      
    })
  }
}
