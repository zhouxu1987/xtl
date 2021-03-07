// pages/SelectDisplacement/SelectDisplacement.js
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
    console.log(options)
    var _this = this
    var cm_brand = options.cm_brand;//品牌
    var cm_factory =  options.cm_factory;//厂商
    var cm_model =options.cm_model;//型号
    console.log(cm_brand,cm_factory,cm_model)
    
    this.setData({
      cm_brand:cm_brand,
      cm_factory:cm_factory,
      cm_model:cm_model,
      params:'cm_factory='+cm_factory+'&cm_brand='+cm_brand+'&cm_model='+cm_model,
    })
    
    App._get('api/Carmodel/conditions', {
      cm_brand:_this.data.cm_brand,
      cm_factory:_this.data.cm_factory,
      cm_model:_this.data.cm_model,
    }, function (result) {   
      console.log(result.data)
      _this.setData({
        cm_displacement:result.data
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
  toProductList:function(e){
    console.log(e);
    var params = e.currentTarget.dataset.params;
    wx.navigateTo({
    url: '../ProductList/ProductList?'+params,  
    })
  }
    
})