import zh from '../i18n/zh-CN.js'
import en from '../i18n/en-US.js'
import Constants from '../constants/Constants';

export default{

  //初始化语言设置。在 app.js 里调用这个方法。
  initLang(){
    //先获取是不是已存在语言的设置
    let lang = wx.getStorageSync('lang')
    if(!lang){
      //如果不存在,设置默认语言为中文
      this.setLang(Constants.langCN)
    }
  },

  //设置语言
  setLang(lang){
    try{
      wx.setStorageSync('lang', lang)
    }catch(e){
      console.log('设置语言失败', e)
    }
  },

  //获取语言设置
  getLang(){
    try{
      let lang = wx.getStorageSync('lang')
      return lang;
    }catch(e){
      console.log('获取语言设置失败', e)
    }
  },

  //获取当前语言下的资源文件
  getLangSrc(){
    let lang = this.getLang();
    if(lang === Constants.langCN){
      return zh;
    } else if(lang === Constants.langEN){
      return en;
    }else{
      return zh;
    }
  },

  //设置 NavigationBarTitle
  setNavigationBarTitle(title){
    wx.setNavigationBarTitle({
      title: title
    })
  },

  /**
   * 设置 tabBar。因为 tabBar 是在 app.json 里写死的，需要使用 wx.setTabBarItem
   * 循环设置 tabBar
   */
  setTabBarLang(){
    let tabBarTitles = this.getLangSrc().tabBarTitles;
    console.log('tabBarTitles', tabBarTitles)
    tabBarTitles.forEach((item, index) => {
      console.log(item, index)
      wx.setTabBarItem({
        index: index,
        text: item,
        success: (res) => {
          console.log('setTabBarItem success', res)
        },
        fail: (err) => {
          console.log('setTabBarItem fail', err)
        }
      });
    });
  },
}