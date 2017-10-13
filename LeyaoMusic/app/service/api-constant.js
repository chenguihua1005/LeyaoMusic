export default class APIConstant {
  // static BASE_URL = "http://panruifeng.loan/poker/api"
  static BASE_URL = "http://47.94.94.196:8088/v1/service"
  static BASE_FILE_URI = "http://panruifeng.loan/poker/"

  static STATUS_SUCCEED = "SUCCESS"
  static STATUS_FAILED = "ERROR"
  static STATUS_FAILED_VERIFY = -1


  //新的API地址
  // static BASE_URL_PREFIX = "http://47.94.94.196/LeyaoTemp/"
  static BASE_URL_ALL = "http://47.94.94.196/LeyaoTemp/v1/service/getEvents"
  //1:读我 2:听我 3:看我
  static BASE_URL_IMAGE = "http://47.94.94.196:8088/v1/service/event/getTEventSummaryByType?sEventTypeCd=1&sessionCode=hello"
  static BASE_URL_AUDIO = "http://47.94.94.196:8088/v1/service/event/getTEventSummaryByType?sEventTypeCd=2&sessionCode=hello"
  static BASE_URL_VEDIO = "http://47.94.94.196:8088/v1/service/event/getTEventSummaryByType?sEventTypeCd=3&sessionCode=hello"

  static BASE_URL_PREFIX = "http://47.94.94.196:8088/"

  //1:音乐屋活动 2:音乐屋教学 3:音乐屋分享 4:首页音乐家
  static BASE_URL_MUSIC_PARTY = "http://47.94.94.196:8088/v1/service/event/getTEventSummaryByCategory?sEventCategoryCd=1&sessionCode=hello"
  static BASE_URL_MUSIC_TEACH = "http://47.94.94.196:8088/v1/service/event/getTEventSummaryByCategory?sEventCategoryCd=2&sessionCode=hello"
  static BASE_URL_MUSIC_SHARE = "http://47.94.94.196:8088/v1/service/event/getTEventSummaryByCategory?sEventCategoryCd=3&sessionCode=hello"  
  static BASE_URL_MUSICIAN = "http://47.94.94.196:8088/v1/service/event/getTEventSummaryByCategory?sEventCategoryCd=4&sessionCode=hello"

  static URL_VEDIO = ""
  static URL_EVENT = ""

  //音乐uri地址
  static MUSIC_URI = ""
}
