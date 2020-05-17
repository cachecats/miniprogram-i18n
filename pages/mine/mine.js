// pages/mine/mine.js
import LangUtils from '../../utils/LangUtils'
let langSrc = LangUtils.getLangSrc()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    lang: {
      ...langSrc.mine
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.setLanguage();
  },

  onClickButton(){
    wx.navigateTo({
      url: '../setting/setting',
    })
  },

  /**
   * 重新设置语言
   */
  setLanguage() {
    langSrc = LangUtils.getLangSrc();
    this.setData({
      lang: {
        ...langSrc.mine
      }
    })
    // 设置 NavigationBarTitle
    LangUtils.setNavigationBarTitle(langSrc.navTitle.mine);
  }

})