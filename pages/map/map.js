// pages/map/map.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
       //设置标记点
       markers: [
        {
          iconPath: "/static/images/logo/Logo.jpg",
          id: 1,
          latitude:"",
          longitude:"",
          width: 30,
          height: 30,
          title:"小螳螂门店",
          desc: '我现在的位置'
        }
    ],
    scale:11,//缩放级别
    //当前定位位置
    latitude:wx.getStorageSync('user_latitude'),
    longitude:wx.getStorageSync('user_longitude'),
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
    var shop_coordinate=options.shop_coordinate.split(",")
    var temp_shop_longitude=Number(shop_coordinate[1])//门店经度
    var temp_shop_latitude=Number(shop_coordinate[0])//门店纬度
    var _this=this
    _this.setData({
      'markers[0].longitude':temp_shop_longitude,
      'markers[0].latitude':temp_shop_latitude,
    })
    _this.user_coordinate()
    console.log(typeof this.data.markers[0].longitude)
    console.log(typeof this.data.markers[0].latitude)
    console.log(typeof this.data.longitude)
    console.log(typeof this.data.latitude)
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

  user_coordinate(){
    //如果缓存中没有用户的经纬度信息那么就重新获取一次
    if(wx.getStorageSync('user_latitude')==""||wx.getStorageSync('key')=="")
    {
      var _this = this;
      wx.getLocation({
        type: 'wgs84',
        success: function (res) {
          //赋值经纬度 
          wx.setStorageSync('user_latitude', res.latitude)
          wx.setStorageSync('user_longitude', res.longitude)
          _this.setData({
            latitude:res.latitude,
            longitude:res.longitude,
          });
        }
      })
    }
    //如果缓存中已经存在用户的经纬度信息，那么就可以直接使用
  },
  navigate() {
    ////使用微信内置地图查看标记点位置，并进行导航
      wx.openLocation({
        latitude: this.data.markers[0].latitude,//要去的纬度-地址
        longitude: this.data.markers[0].longitude,//要去的经度-地址
        scale: 10,
        name:"位置名称",
        address:"地址详细说明"
      })
  },
})






 