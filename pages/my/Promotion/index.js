// pages/main/team/team.js
const App = getApp();
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
    this.getTeam();
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },
  /**
   * 获取团队
   */
  getTeam: function (order_id) {
    let _this = this;
    App._get('api/getUserDistribution', 
    {
      token:wx.getStorageInfoSync('token')
    }, function (result) {
      console.log(result)
      _this.setData({
        AllData:result.data
      })
    });
  },
  yaoqing:function(){
    App._get('user/getQrcodes', {
      user_id: wx.getStorageSync('user_id'),
    }, function (result) {
      wx.previewImage({
        urls: [result.data.path],
    });
    });
  }
})