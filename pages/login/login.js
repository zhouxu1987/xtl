let App = getApp();

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
   * 授权登录
   */
  authorLogin: function (e) {
    console.log('login:'+wx.getStorageSync('user_id'));
    console.log('login2:'+wx.getStorageSync('p_id'));
    let _this = this;
    if (e.detail.errMsg !== 'getUserInfo:ok') {
      return false;
    }
    wx.showLoading({
      title: "正在登录",
      mask: true
    });
    // 执行微信登录
    wx.login({
      success: function (res) {
        // 发送用户信息
        App._post_form('api/wxLogin', {
          code: res.code,
          rawData: e.detail.rawData,
          encryptedData: e.detail.encryptedData,
          iv: e.detail.iv,
          signature: e.detail.signature,
          InvitationCode: wx.getStorageSync('InvitationCode')
        }, 

        function (result) 
        {
          // 记录token user_id
          console.log(result)
          console.log(result.data.token)
          wx.setStorageSync('token', result.data.token);
          wx.setStorageSync('user_id', result.data.user_id);
          wx.setStorageSync('InvitationCode', result.data.InvitationCode)
          // 跳转回原页面
          _this.navigateBack();
        }, false, function () {
          wx.hideLoading();
        });
      }
    });
  },

  /**
   * 授权成功 跳转回原页面
   */
  navigateBack: function () {
    wx.navigateBack();
    // let currentPage = wx.getStorageSync('currentPage');
    // wx.redirectTo({
    //   url: '/' + currentPage.route + '?' + App.urlEncode(currentPage.options)
    // });
  },
  goIndex: function () {
    wx.navigateBack();
  }
})