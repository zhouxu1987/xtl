// pages/main/address/address.js
const App = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    list: []
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.getIndex();
  },
  // 删除
  dellete: function (e) {
    let _this = this;
    wx.showModal({
      title: '操作提示',
      content: '是否删除该地址？',
      confirmColor: '#FEB400',
      success(res) {
        if (res.confirm) {
          App._get('Address/delete', {
            address_id: e.currentTarget.dataset.id
          }, function (result) {
            if (result.code == 1) {
              App.showSuccess('操作成功');
              setTimeout(function () {
                _this.getIndex();
              }, 2000)
            }
          });
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },
  // 地址列表
  getIndex: function () {
    let _this = this;
    App._get('api/getUserAddress', {}, function (result) {
      for (var i = 0; i < result.data.list.length; i++) {
        result.data.list[i].img = '../../../image/weixuanzhong_icon.png';
        if (result.data.list[i].address_id == result.data.default_id) {
          result.data.list[i].img = '../../../image/xuanzhong_icon.png';
        }
      }
      _this.setData({
        list: result.data.list
      })
    });
  },
  // 设置默认
  setMoren: function (e) {
    let _this = this;
    var list = _this.data.list;
    App._get('Address/setDefault', {
      address_id: e.currentTarget.dataset.id
    }, function (result) {
      if (result.code == 1) {
        for (var i = 0; i < list.length; i++) {
          list[i].img = '../../../image/weixuanzhong_icon.png';
        }
        list[e.currentTarget.dataset.idx].img = '../../../image/xuanzhong_icon.png';
        _this.setData({
          list: list
        })
      }
    });
  }
})