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
  onLoad: function (options) {
    var goods_id=options.goods_id
    var goods_num=options.goods_num
    var goods_pay=options.goods_pay
    this.setData({
      goods_id:goods_id,
      goods_num:goods_num,
      goods_pay:goods_pay
    })

  /**
   * 获取优惠券列表
   */
    let _this = this;
    App._get('api/getGoodsCash', {
      token:wx.getStorageSync('token'),
      gid:_this.data.goods_id
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

  },


  // 使用优惠券
  useing:function(e){
    var man=e.currentTarget.dataset.man
    var jian=e.currentTarget.dataset.jian
    var id=e.currentTarget.dataset.id

    var pages = getCurrentPages();
    var prevPage = pages[pages.length - 2]; //上一个页面
    //直接调用上一个页面的setData方法[prevPage.setData({})]，把数据存到上一个页面中去
    prevPage.setData({
      coupon: { man: man, jian:jian, id:id},
      coupon_is_num:1
    })
    wx.navigateBack({//返回
      delta:1
      })
  }
})