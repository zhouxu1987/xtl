// pages/zhushou/ProductList/ProductList.js
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
    var _this = this
    var cm_factory =options.cm_factory;
    var cm_brand =options.cm_brand;
    var cm_model =options.cm_model;
    var cm_displacement =options.cm_displacement;
    var cm_fuel_type =options.cm_fuel_type;
    this.setData({
      cm_factory:cm_factory,
      cm_brand:cm_brand,
      cm_model:cm_model,
      cm_displacement:cm_displacement,
      cm_fuel_type:cm_fuel_type,
    })
    
    App._get('api/Carmodel/carmodel', {
      cm_brand:_this.data.cm_brand,
      cm_factory:_this.data.cm_factory,
      cm_model:_this.data.cm_model,
      cm_displacement:_this.data.cm_displacement,
      cm_fuel_type:_this.data.cm_fuel_type
    }, function (result) {   
      _this.setData({
        cm_engine_model: result.data,
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

  }
})