import BaseRequest from './base-request';
import APIConstant from './api-constant';

export default class APIInterface {

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
    return BaseRequest.get(APIConstant.BASE_URL + '/user/getVerifyCode?phone=' + phone, {

    })
  }

  static register(username, password, code) {
    return BaseRequest.post(APIConstant.BASE_URL + '/user/register', {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }, {
      'username': username,
      'password': password,
      'code': code
    })
  }

  static login(username, password) {
    return BaseRequest.post(APIConstant.BASE_URL + '/user/login', {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }, {
      'username': username,
      'password': password
    })
  }

  static forgetPWD(username, password, code) {
    return BaseRequest.post(APIConstant.BASE_URL + '/user/forgetPWD', {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }, {
      'username': username,
      'password': password,
      'code': code
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

  static details(token) {
    return BaseRequest.get(APIConstant.BASE_URL + '/user/details', {
      'token': token
    })
  }
}
