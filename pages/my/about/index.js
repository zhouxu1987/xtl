var WxParse = require('../../wxParse/wxParse.js');
const App = getApp();
//const wxParse = require("../../../wxParse/wxParse.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var _this=this
    App._get('api/getAbout', {
    }, 
    function (result) 
    {
      console.log(result.data[0].about)
      var article=result.data[0].about
      WxParse.wxParse('article', 'html', article, _this,5);
      _this.setData({
        data:result.data[0].about
      })
    });
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },
  // 地址列表
  getIndex: function () {
    // let _this = this;
    // App._get('user.index/guanyu', {}, function (result) {
    //   // 富文本转码
    //   if (result.msg.content.length > 0) {
    //     wxParse.wxParse('content2', 'html', result.msg.content, _this, 0);
    //   }
    // });
  },
})