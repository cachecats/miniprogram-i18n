// pages/forum/components/comment.js
import LangUtils from '../../../../utils/LangUtils'
let langSrc = LangUtils.getLangSrc();

Component({
  data: {
    lang: {
      ...langSrc.comment
    }
  },

  pageLifetimes: {
    // 组件所在页面的生命周期函数
    show: function () { 
      console.log('page show---')
      this.setLanguage();
    },
  },

  /**
   * 组件的方法列表
   */
  methods: {
    /**
     * 重新设置语言
     */
    setLanguage() {
      langSrc = LangUtils.getLangSrc();
      this.setData({
        lang: {
          ...langSrc.comment
        }
      })
    }
  }
})