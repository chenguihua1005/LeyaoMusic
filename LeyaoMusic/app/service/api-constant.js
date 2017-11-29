export default class APIConstant {
  //所有请求的基址
  static BASE_URL = "http://47.94.94.196:8088/v1/service/"
  static SESSIONCODE = 1234;
  //音乐、视频等资源的前缀
  static BASE_URL_PREFIX = "http://47.94.94.196:8088/"
  //用户登录的手机号
  static USER_PHONE = "-1";

  //服务器返回码Code
  static STATUS_SUCCEED = "SUCCESS"
  static STATUS_FAILED = "ERROR"
  static STATUS_FAILED_VERIFY = -1

  //音乐屋，每个tab的搜索功能只能搜索各自tab的内容，根据sEventCategoryCd来进行筛选乐谣活动->1；音乐教学->2，艺人分享->3,音乐家->4
  static SEARCH_CATEGORY = ''
  //加判断，是否在“音乐屋页面
  static SEARCH_PAGE = 0

  //新的API地址
  static BASE_URL_ALL = APIConstant.BASE_URL + "getEvents"
  //Banner
  static BASE_URL_BANNER = APIConstant.BASE_URL + "event/getTEventSummaryForBanner?sessionCode=" + APIConstant.SESSIONCODE  
  //1:听我 2:看我 3:读我 
  static BASE_URL_AUDIO = APIConstant.BASE_URL + "event/getTEventSummaryByType?sEventTypeCd=1&sessionCode=" + APIConstant.SESSIONCODE
  static BASE_URL_VEDIO = APIConstant.BASE_URL + "event/getTEventSummaryByType?sEventTypeCd=2&sessionCode=" + APIConstant.SESSIONCODE
  static BASE_URL_IMAGE = APIConstant.BASE_URL + "event/getTEventSummaryByType?sEventTypeCd=3&sessionCode=" + APIConstant.SESSIONCODE

  //1:音乐屋活动 2:音乐屋教学 3:音乐屋分享 4:首页音乐家
  static BASE_URL_MUSIC_PARTY = APIConstant.BASE_URL + "event/getTEventSummaryByCategory?sEventCategoryCd=1&sessionCode=" + APIConstant.SESSIONCODE
  static BASE_URL_MUSIC_TEACH = APIConstant.BASE_URL + "event/getTEventSummaryByCategory?sEventCategoryCd=2&sessionCode=" + APIConstant.SESSIONCODE
  static BASE_URL_MUSIC_SHARE = APIConstant.BASE_URL + "event/getTEventSummaryByCategory?sEventCategoryCd=3&sessionCode=" + APIConstant.SESSIONCODE
  // static BASE_URL_MUSICIAN = APIConstant.BASE_URL + "event/getTEventSummaryByCategory?sEventCategoryCd=4&sessionCode=" + APIConstant.SESSIONCODE
  static BASE_URL_MUSICIAN = APIConstant.BASE_URL + "event/getTEventSummaryByCondition?sEventCategoryCd=4&sessionCode=" + APIConstant.SESSIONCODE
  
  //
  static BASE_URL_DETAILS = APIConstant.BASE_URL + "user/getTUserSummary?sessionCode=" + APIConstant.SESSIONCODE + "&hUserPhoneNr="
  static BASE_URL_SEARCH = APIConstant.BASE_URL + "event/getTEventSummaryByConditionGlobal?sessionCode=" + APIConstant.SESSIONCODE + "&sEventSearchContentTxt="
  //我的关注
  static BASE_URL_FOCUS = APIConstant.BASE_URL + "event/getTEventSummaryByCondition?sessionCode=" + APIConstant.SESSIONCODE  + "&sEventCategoryCd="

  //视频uri地址，音乐uri地址，事件uri地址
  static URL_VEDIO = ""
  static MUSIC_URI = ""
  static URL_EVENT = ""

  //修改成功后保存的头像url、昵称、性别、邮箱值
  static MY_IMAGE = ""
  static MY_NICKNAME = ""
  static MY_GENDER = 0
  static MY_EMAIL = ""
  
  
}
