// pages/chezheng/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    SwiperList:[],//轮播图数组
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.request({
      url: 'http://admin.hcbainuo.com/api/getBannerList',
      success: (res) => {
        console.log(res.data.data);
        this.setData({
          SwiperList:res.data.data
        })
      },
      /**
       ** 接口调用失败的回调函数
      **/
      fail: (err) => {
        console.log(err);
      },
  
      /**
       ** 接口调用结束的回调函数（调用成功、失败都会执行）
      **/
      complete: (res) => {
        //console.log(res); 
      },
    })
  }
})