import BaseRequest from './base-request';
import APIConstant from './api-constant';

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

  static updateMessage() {
    return BaseRequest.get(APIConstant.BASE_URL + 'message/getTMessageSummaryListByCondition?sessionCode=' + APIConstant.SESSIONCODE, {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    })
  }

  //修改昵称
  static updateUserName(sessionCode,hUserPhoneNr,sUserNameStr) {
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
  static updateUserGender(sessionCode,hUserPhoneNr,sUserGenderCd) {
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
  static updateUserEmail(sessionCode,hUserPhoneNr,sUserEmailStr) {
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
    return BaseRequest.get(APIConstant.BASE_URL_SEARCH + sEventSearchContentTxt + '&sEventCategoryCd=' + APIConstant.SEARCH_CATEGORY, {})
  }

  //我的关注
  static focus(sEventCategoryCd) {
    return BaseRequest.get(APIConstant.BASE_URL_FOCUS + sEventCategoryCd, {})
  }

  //添加用户阅读习惯
  //我的历史功能只记录用户浏览过的所有事件，不包括搜素事件
  static report(hEventId, rUserEventCategory, hUserPhoneNr = APIConstant.USER_PHONE) {
    return BaseRequest.post(APIConstant.BASE_URL + 'event/feedbackTEventSummary', {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    }, {
        'hUserPhoneNr': hUserPhoneNr,
        'hEventId': hEventId,
        'rUserEventCategory': rUserEventCategory
      }) 
  }

}
