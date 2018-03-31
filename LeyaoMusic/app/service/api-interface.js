import BaseRequest from './base-request';
import APIConstant from './api-constant';

import CryptoJS from 'crypto-js';

export default class APIInterface {

  //获取Banner事件
  static getBanner() {
    return BaseRequest.get(APIConstant.BASE_URL_BANNER, {})
  }

  //音乐屋
  static getLeyaoMusicParty() {
    return BaseRequest.get(APIConstant.BASE_URL_MUSIC_PARTY, {})
  }

  static getLeyaoMusicTeach() {
    return BaseRequest.get(APIConstant.BASE_URL_MUSIC_TEACH, {})
  }

  static getLeyaoMusicShare() {
    return BaseRequest.get(APIConstant.BASE_URL_MUSIC_SHARE, {})
  }

  static getLeyaoMusician() {
    return BaseRequest.get(APIConstant.BASE_URL_MUSICIAN, {})
  }

  //我的
  //-->new add interface
  //听我1 看我2 读我3
  static getLeyaoAudio() {
    return BaseRequest.get(APIConstant.BASE_URL_AUDIO, {})
  }

  static getLeyaoVedio() {
    return BaseRequest.get(APIConstant.BASE_URL_VEDIO, {})
  }

  static getLeyaoImage() {
    return BaseRequest.get(APIConstant.BASE_URL_IMAGE, {})
  }

  static getLeyaoAll() {
    return BaseRequest.get(APIConstant.BASE_URL_ALL, {})
  }

  //--<new add interface
  static getCodeList() {
    return BaseRequest.post(APIConstant.BASE_URL + 'code/getCodeList', {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }, {})
  }

  static getVerifyCode(phone) {
    return BaseRequest.post(APIConstant.BASE_URL + 'user/getVerifyCode?hUserPhoneNr=' + phone, {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }, {})
  }

  static register(username, password, code) {
    return BaseRequest.post(APIConstant.BASE_URL + 'user/regist', {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }, {
        'hUserPhoneNr': username,
        'sUserPasswordStr': password,
        'verifyCode': code
      })
  }

  static login(username, password) {
    return BaseRequest.post(APIConstant.BASE_URL + 'user/login', {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }, {
        'hUserPhoneNr': username,
        'sUserPasswordStr': password
      })
  }

  static forgetPWD(username, password, code) {
    return BaseRequest.post(APIConstant.BASE_URL + 'user/reset', {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }, {
        'hUserPhoneNr': username,
        'sUserPasswordStr': password,
        'verifyCode': code
      })
  }

  static upload(sessionCode, fileName, hUserPhoneNr, base64) {
    return BaseRequest.post(APIConstant.BASE_URL + 'user/uploadProfile', {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }, {
        'sessionCode': sessionCode,
        'fileName': fileName,
        'hUserPhoneNr': hUserPhoneNr,
        'base64': base64
      })
  }

  static updateMessage(hUserPhoneNr) {
    return BaseRequest.get(APIConstant.BASE_URL + 'message/getTMessageSummaryListByCondition?sessionCode=' + APIConstant.SESSIONCODE
      + '&isPush=1&hUserPhoneNr=' + hUserPhoneNr, {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      })
  }

  //修改昵称
  static updateUserName(sessionCode, hUserPhoneNr, sUserNameStr) {
    return BaseRequest.post(APIConstant.BASE_URL + 'user/editTUserSummary', {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    }, {
        'verifyCode': sessionCode,
        'hUserPhoneNr': hUserPhoneNr,
        'sUserNameStr': sUserNameStr
      })
  }

  //修改性别
  static updateUserGender(sessionCode, hUserPhoneNr, sUserGenderCd) {
    return BaseRequest.post(APIConstant.BASE_URL + 'user/editTUserSummary', {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    }, {
        'verifyCode': sessionCode,
        'hUserPhoneNr': hUserPhoneNr,
        'sUserGenderCd': sUserGenderCd
      })
  }

  //修改邮箱
  static updateUserEmail(sessionCode, hUserPhoneNr, sUserEmailStr) {
    return BaseRequest.post(APIConstant.BASE_URL + 'user/editTUserSummary', {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    }, {
        'verifyCode': sessionCode,
        'hUserPhoneNr': hUserPhoneNr,
        'sUserEmailStr': sUserEmailStr
      })
  }

  //意见反馈
  static updateSuggestion(sUserFeedbackStr, hUserPhoneNr) {
    return BaseRequest.post(APIConstant.BASE_URL + 'user/addSUserFeedbackSummary', {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }, {
        'sUserFeedbackStr': sUserFeedbackStr,
        'hUserPhoneNr': hUserPhoneNr
      })
  }

  static getNoticeList(token, numPerPage, pageNum) {
    return BaseRequest.post(APIConstant.BASE_URL + 'notice/getNoticeList', {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'token': token
    }, {
        'numPerPage': numPerPage,
        'pageNum': pageNum
      })
  }

  //获取用户详情
  static details(username) {
    return BaseRequest.get(APIConstant.BASE_URL_DETAILS + username, {})
  }

  //搜索全局事件
  static search(sEventSearchContentTxt) {
    //console.log(APIConstant.BASE_URL_SEARCH + sEventSearchContentTxt + '&sEventCategoryCd=' + APIConstant.SEARCH_CATEGORY)
    return BaseRequest.get(APIConstant.BASE_URL_SEARCH + sEventSearchContentTxt, {})
  }

  //我的关注
  static focus(sEventCategoryCd) {
    return BaseRequest.get(APIConstant.BASE_URL_FOCUS + sEventCategoryCd, {})
  }

  //添加用户阅读习惯
  //我的历史功能只记录用户浏览过的所有事件，不包括搜素事件
  static report(hEventId, hUserPhoneNr = APIConstant.USER_PHONE) {
    return BaseRequest.post(APIConstant.BASE_URL + 'event/feedbackTEventSummary', {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    }, {
        'hUserPhoneNr': hUserPhoneNr,
        'hEventId': hEventId
      })
  }

  // DES加密
  static encryptByDES() {
    let message = APIConstant.DES_PRESTR + APIInterface.getTimestamp();
    //把私钥转换成16进制的字符串
    let keyHex = CryptoJS.enc.Utf8.parse(APIConstant.DES_KEY);
    //模式为ECB padding为Pkcs7
    let encrypted = CryptoJS.DES.encrypt(message, keyHex, {
      mode: CryptoJS.mode.ECB,
      padding: CryptoJS.pad.Pkcs7
    });
    //加密出来是一个16进制的字符串
    //return encrypted.ciphertext.toString();
    //base64编码
    return encrypted.ciphertext.toString(CryptoJS.enc.Base64);
  }
  //DES  ECB模式解密
  static decryptByDESModeEBC(ciphertext) {
    //把私钥转换成16进制的字符串
    let keyHex = CryptoJS.enc.Utf8.parse(APIConstant.DES_KEY);
    //把需要解密的数据从16进制字符串转换成字符byte数组
    let decrypted = CryptoJS.DES.decrypt({
      // ciphertext: CryptoJS.enc.Hex.parse(ciphertext)
      ciphertext: CryptoJS.enc.Base64.parse(ciphertext)
    }, keyHex, {
        mode: CryptoJS.mode.ECB,
        padding: CryptoJS.pad.Pkcs7
      });
    //以utf-8的形式输出解密过后内容
    let result_value = decrypted.toString(CryptoJS.enc.Utf8);
    return result_value;
  }

  // 获取当前时间戳(以s为单位)
  static getTimestamp() {
    var timestamp = Date.parse(new Date());
    timestamp = timestamp / 1000;
    return timestamp
  }

  //校验手机号码
  static checkMobile(str) {
    var re = /^1\d{10}$/
    if (re.test(str)) {
      return true
    } else {
      return false
    }
  }



}
