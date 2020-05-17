// pages/setting/setting.js
import LangUtils from '../../utils/LangUtils'
let langSrc = LangUtils.getLangSrc()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    lang: {
      ...langSrc.setting
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

   /**
   * 重新设置语言
   */
  setLanguage() {
    langSrc = LangUtils.getLangSrc();
    this.setData({
      lang: {
        ...langSrc.setting
      }
    })
    // 设置 NavigationBarTitle
    LangUtils.setNavigationBarTitle(langSrc.navTitle.setting);
  }
})