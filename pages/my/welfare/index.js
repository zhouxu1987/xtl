// pages/main/youhui/youhui.js
const App = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    shaixuan: [
      {
        name: "可领取",
        classname: "service_top_one_active",
        data_type:'not_use'
      },
      {
        name: "已领取",
        classname: "service_top_one_moren2",
        data_type: 'is_use'
      },
      {
        name: "已过期",
        classname: "service_top_one_moren2",
        data_type: 'is_expire'
      }
    ],
    data_type: 'not_use',
    price:''
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getcoupon_list()
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },
  // 切换分类
  swichCate: function (e) {
    var list = this.data.shaixuan;
    for (var i = 0; i < list.length; i++) {
      list[i].classname = 'service_top_one_moren2';
    }
    list[e.currentTarget.dataset.id].classname = 'service_top_one_active';
    this.setData({
      shaixuan: list,
      data_type: list[e.currentTarget.dataset.id].data_type
    },function(){
      this.getcoupon_list(e.currentTarget.dataset.id);
    })
  },
  /**
   * 获取优惠券列表
   */
  getcoupon_list: function (e) {
    let _this = this;
    console.log(e)
    if(e==0||!e)
    {
      App._get('api/cashList', {
        token:wx.getStorageSync('token')
      }, function (result) {
        _this.setData({
          coupon_list:result.data
        });
      });
    }
    else if(e==1)
    {
      App._post_form('api/myCash', {
        token:wx.getStorageSync('token')
      }, function (result) {
        _this.setData({
          coupon_list:result.data
        });
      });
    }
    else
    {
      this.setData({
        coupon_list:""
      })
    }

  },
  /**
   * 领取优惠券
   */
  getcoupon: function (e) {
    let _this = this;
    var id=e.target.dataset.id
    App._get('api/gainCash', {
      token:wx.getStorageSync('token'),
      cid:id//这里填写代金券ID
    }, function (result) {
      console.log(result)
      _this.setData(result.data);
      if(result.code==200)
      {
        App.showSuccess('领取成功');
        wx.redirectTo({
          url: '/pages/my/MyCoupon/MyCoupon'
        })
      }
    });
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