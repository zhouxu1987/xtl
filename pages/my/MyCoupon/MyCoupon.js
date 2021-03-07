// pages/main/youhui/youhui.js
const App = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    coupon_list:""
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
  /**
   * 获取优惠券列表
   */
    let _this = this;
    App._post_form('api/myCash', {
      token:wx.getStorageSync('token')
    }, function (result) {
      console.log(result.data)
      _this.setData({
        coupon_list:result.data
      })
    });


  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    console.log("↓")
    console.log(this.data.coupon_list)
    console.log("↑")
  },


  // 使用优惠券
  sueing:function(e){
    if(this.data.price == ''){
      App.showSuccess('请在服务中使用');
    }else{
      let pages = getCurrentPages();
      let prevPage = pages[pages.length - 2];
      prevPage.setData({
        coupon_id: e.currentTarget.dataset.id,
        jian_price: e.currentTarget.dataset.price
      })
      wx.navigateBack({
        delta: 1,
      })
    }
  }
})