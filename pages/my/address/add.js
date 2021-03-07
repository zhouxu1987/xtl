// pages/user/main/address/add.js
const App = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    region: '',
    address_id: '',
    name: "",
    phone: "",
    detail: ""
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (options.address_id) {
      this.setData({
        address_id: options.address_id
      })
    }
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    if (this.data.address_id) {
      this.getDetail();
    }
  },
  // 地址选择
  bindRegionChange: function (e) {
    this.setData({
      region: e.detail.value
    })
  },
  // 地址详情
  getDetail() {
    let _this = this;
    App._get('Address/detail', {
      address_id: _this.data.address_id
    }, function (result) {
      _this.setData({
        name: result.data.detail.name,
        phone: result.data.detail.phone,
        detail: result.data.detail.detail,
        region: result.data.detail.region.province + ',' + result.data.detail.region.city + ',' + result.data.detail.region.region,
      })
    });
  },
  /**
     * 输入框
     */
  changing: function (e) {
    this.setData({
      [e.currentTarget.dataset.type]: e.detail.value
    });
  },
  // 保存收货地址
  baocun: function () {
    let _this = this;
    App._post_form('Address/add', {
      address_id: _this.data.address_id,
      name: _this.data.name,
      phone: _this.data.phone,
      detail: _this.data.detail,
      region: _this.data.region,
    }, function (result) {
      if (result.code == 1) {
        App.showSuccess('操作成功');
        setTimeout(function () {
          wx.navigateBack();
        }, 2000)
      }
    });
  }
})