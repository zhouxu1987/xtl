// pages/ModelList/ModelList.js
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
    let _this = this;
    var cm_brand=options.cm_brand
    var cm_brand_letter=options.cm_brand_letter
    this.setData({
      cm_brand:cm_brand,
      cm_brand_letter:cm_brand_letter
    })
    App._get('api/Carmodel/brands', {}, function (result) {
      //在数组中筛选，符合条件的数据
      //var new_arr = old_arr.filter(o=>o.title="筛选数据")
      //定义一个新数组=老数组.对其使用【filter】筛选方法(o=>o.【固定格式】)
      //凡是数组中的title等于筛选数据的进行保留，其余全部删除
      var left_list = result.data[1].list.filter(o=> o.cm_brand_letter==_this.data.cm_brand_letter)
      _this.setData({left_list:left_list})
      
    });

    App._get('api/Carmodel/models', {
      cm_brand:_this.data.cm_brand
    }, function (result) {
      //在数组中筛选，符合条件的数据
      //var new_arr = old_arr.filter(o=>o.title="筛选数据")
      //定义一个新数组=老数组.对其使用【filter】筛选方法(o=>o.【固定格式】)
      //凡是数组中的title等于筛选数据的进行保留，其余全部删除
      console.log(result.data)
      _this.setData({right_list:result.data})
      
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
  toModel:function(e){
    var cm_models = e.currentTarget.dataset.cm_models;
    var cm_brands = e.currentTarget.dataset.cm_brands;
    var cm_factory = e.currentTarget.dataset.cm_factory;
    wx.navigateTo({
    url: '../SelectModel/SelectModel?cm_models='+cm_models+'&cm_brands='+cm_brands+'&cm_factory='+cm_factory,  
    })
    
    },

    tolist:function(e){
      console.log(e)
      var cm_brand = e.currentTarget.dataset.cm_brand;
      var cm_brand_letter = e.currentTarget.dataset.cm_brand_letter;
      wx.navigateTo({
      
      url: '/pages/zhushou/ModelList/ModelList?cm_brand='+cm_brand+'&cm_brand_letter='+cm_brand_letter,  
      
      })
      
      }
})