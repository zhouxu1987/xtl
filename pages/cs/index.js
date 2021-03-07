// pages/my/about/index.js
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

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },


  login(){
    wx.login({
      success: function(res) {     
        if (res.code) {
          console.log(res.code)
          //发起网络请求
          wx.request({
            url: 'http://admin.hcbainuo.com/api/wxLogin',
            method:'post',
            header:{
              'content-type':'application/x-www-form-urlencoded'
            },
            data: {
              code: res.code
            }
          })
        } else {
          console.log('获取用户登录态失败！' + res.code)
        }
      }
    })
  }
})
