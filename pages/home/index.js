//index.js
//获取应用实例
const app = getApp()

import Constants from '../../constants/Constants'
// 获取对应语言的资源文件
import LangUtils from '../../utils/LangUtils'
let langSrc = LangUtils.getLangSrc();

// 语言选项
const LANGUAGE_OPTIONS = [{
    key: Constants.langCN,
    value: '中文'
  },
  {
    key: Constants.langEN,
    value: 'English'
  }
]

Page({
  data: {
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    // 通过解构赋值将 common 和 home 下的变量赋值给 lang。最好每个模块建一个对象
    // 对象里的属性不宜过多，否则在 data 里放入太多内容会影响性能，用到什么放什么。
    lang: {
      ...langSrc.common,
      ...langSrc.home
    },
    langOptions: LANGUAGE_OPTIONS,
    index: 0
  },

  onLoad: function () {
    // 根据当前语言设置 picker 默认选中的值
    let lang = LangUtils.getLang();
    this.setData({
      index: lang === Constants.langCN ? 0 : 1
    })

    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  onShow: function () {
    //每次 onShow 重新设置语言，以防语言更新
    this.setLanguage();
  },

  getUserInfo: function (e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },

  /**
   * 选择语言变化回调函数
   */
  onLanguageChange(e) {
    const index = e.detail.value
    console.log(e)
    this.setData({
      index: index
    })
    // 更改语言
    LangUtils.setLang(this.data.langOptions[index].key);
    // 重新设置 tabBar 的语言
    LangUtils.setTabBarLang();
    this.setLanguage();
  },

  /**
   * 重新设置语言
   */
  setLanguage() {
    langSrc = LangUtils.getLangSrc();
    this.setData({
      lang: {
        ...langSrc.common,
        ...langSrc.home
      }
    })
    // 设置 NavigationBarTitle
    LangUtils.setNavigationBarTitle(langSrc.navTitle.home);
  }

})