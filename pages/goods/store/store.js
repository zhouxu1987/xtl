const { img_url } = require("../../../siteinfo");

// pages/mendian/index.js
const App = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    user_latitude: "",
    user_longitude: "",
    img_url: "http://w.xtlcf.com/uploads/"
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var goods_id = options.goods_id
    this.setData({
      goods_id: goods_id
    })
    var that = this;
    wx.getLocation({
      type: 'wgs84',
      success: function (res) {
        //赋值经纬度 
        wx.setStorageSync('user_latitude', res.latitude)
        wx.setStorageSync('user_longitude', res.longitude)
        that.setData({
          user_latitude: res.latitude,
          user_longitude: res.longitude,
        });
      }
    })

    this.getList()
  },
  /**
   * 获取门店信息
   */
  getList: function () {
    var user_position = wx.getStorageSync('user_latitude') + ',' + wx.getStorageSync('user_longitude')
    var gid = this.data.goods_id
    var _this = this
    App._get('api/storeList', {
      position: user_position,
      gid: gid
    },
      function (result) {
        console.log(result.data)
        _this.setData({
          mdList: result.data
        })
      });
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
  toshop(e) {
    var id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: 'shop/index?id=' + id,
    })
  },
  //点击选择，将数据传给上一页
  select(e) {
    var shop_id = e.currentTarget.dataset.shop_id
    var shop_name = e.currentTarget.dataset.shop_name
    var pic = e.currentTarget.dataset.pic
    var address = e.currentTarget.dataset.address
    var shop_img=this.data.img_url+pic
    var pages = getCurrentPages();
    var prevPage = pages[pages.length - 2]; //上一个页面
    //直接调用上一个页面的setData()方法，把数据存到上一个页面中去
    prevPage.setData({
      mydata: { shop_id: shop_id, shop_name: shop_name, address: address,shop_img:shop_img }
    })
    wx.navigateBack({//返回
      delta: 1
    })
  }
})