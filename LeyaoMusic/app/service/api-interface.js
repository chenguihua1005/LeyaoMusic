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

  static upload(token, fileName, base64) {
    return BaseRequest.post(APIConstant.BASE_URL + '/file/upload', {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'token': token
    }, {
      'fileName': fileName,
      'base64': base64
    })
  }

  static updateUser(token, body) {
    return BaseRequest.post(APIConstant.BASE_URL + '/user/updateUser', {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'token': token
    }, body)
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
    return BaseRequest.get(APIConstant.BASE_URL + '/user/getTUserSummary', {
      'sessionCode': token,
      'hUserPhoneNr': username
    })
  }
}
