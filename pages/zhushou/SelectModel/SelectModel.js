// pages/SelectModel/SelectModel.js
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
    var cm_models =options.cm_models;
    var cm_brand = options.cm_brands;
    var cm_factory =  options.cm_factory;
    this.setData({
      cm_models:cm_models,
      cm_brand:cm_brand,
      cm_factory:cm_factory,
    })
    var _this = this
    App._get('api/Carmodel/models', {
      cm_brand:_this.data.cm_brand
    }, function (result) {   
      //在数组中筛选，符合条件的数据
      //var new_arr = old_arr.filter(o=>o.title="筛选数据")
      //定义一个新数组=老数组.对其使用【filter】筛选方法(o=>o.【固定格式】)
      //凡是数组中的title等于筛选数据的进行保留，其余全部删除
      var temp_1 = result.data.filter(o=> o.cm_factory==_this.data.cm_factory)
      var temp_2 = temp_1[0].cm_cars.filter(o=> o.cm_car==_this.data.cm_models)
      var car_cm_models=temp_2[0].cm_models

      _this.setData({
        car_cm_models:car_cm_models,
        params:'cm_factory='+cm_factory+'&cm_brand='+cm_brand+'&cm_model=',
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
  toDisplacement:function(e){
    var params = e.currentTarget.dataset.params;
    wx.navigateTo({
    
    url: '/pages/zhushou/SelectDisplacement/SelectDisplacement?'+params,  
    
    })
    
    }
})