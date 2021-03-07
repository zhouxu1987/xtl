// pages/main/order/order.js
let App = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    shaixuan: [
      // {
      //   name: "全部",
      //   classname: "service_top_one_active",
      //   dataType:0
      // },
      {
        name: "待付款",
        classname: "service_top_one_moren2",
        dataType: 0
      },
      {
        name: "已付款",
        classname: "service_top_one_moren2",
        dataType: 1
      },
      {
        name: "已成交",
        classname: "service_top_one_moren2",
        dataType: 2
      },
      {
        // name: "待评价",
        // classname: "service_top_one_moren2",
        // dataType: 4
      }
    ],
    dataType:0,
    list:[]
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (options.dataType != undefined){
      this.cateOrder(options.dataType);
    }else{
      this.cateOrder(0);
    }
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    // 获取订单列表
    
  },
  /**
  * 获取订单列表
  * 订单状态 :
  * 0=>未付款订单,
  * 1=>已付款待核销订单,
  * 2=>交易完成订单
  */
  getOrderList: function () {
    let _this = this;
    App._get('api/getOrderList', {
      token: wx.getStorageSync('token'),
      status:_this.data.dataType
    }, function (result) {
      _this.setData({list:result.data})
      console.log(result.data)
      console.log(_this.data)
    });
    
  },
  /**
   * 取消订单
   */
  cancelOrder: function (e) {
    let _this = this;
    let order_id = e.currentTarget.dataset.id;
    wx.showModal({
      title: "友情提示",
      content: "确认要取消该订单吗？",
      success: function (o) {
        if (o.confirm) {
          console.log(wx.getStorageSync('token'))
          console.log(order_id)
          App._get('api/cancelOrder', {
            token:wx.getStorageSync('token'),
            id:order_id
          }, function (result) {
            App.showSuccess("取消订单成功")
            console.log(result)
            _this.getOrderList();
            _this.onLoad()
          });
        }
      }
    });
  },
  /**
   * 发起付款
   */


   //
   
   //
  payOrder: function (e) {
    ////
    var order_id = e.currentTarget.dataset.id;
    var _this=this
    App._post_form('api/pay/PayIng', {
      token: wx.getStorageSync('token'),
      orderNum: order_id,
    }, function (res) {
      // 发起微信支付
      wx.requestPayment({
        timeStamp: res.timeStamp,
        nonceStr: res.nonceStr,
        package: res.package,
        signType: 'MD5',
        paySign: res.paySign,
        success: function (result_ok) {
          // 跳转我的服务订单详情
          wx.redirectTo({
            url: '../../index/index'
            //url: '../../main/service/detail?order_id=' + result.data.order_id,
          });
        },
        fail: function () {
          App.showError('订单未支付', function () {
            // 跳转到服务未付款订单
            // wx.redirectTo({
            //   url: '../../main/order/order?dataType=1',
            // });
          });
        },
      });
    })
    ////
    // let _this = this;
    // let order_id = e.currentTarget.dataset.id;

    // 显示loading
    // wx.showLoading({
    //   title: '正在处理...',
    // });
    // App._post_form('user.order/pay', {
    //   order_id
    // }, function (result) {
    //   if (result.code === -10) {
    //     App.showError(result.msg);
    //     return false;
    //   }
    //   // 发起微信支付
    //   wx.requestPayment({
    //     timeStamp: result.data.payment.timeStamp,
    //     nonceStr: result.data.payment.nonceStr,
    //     package: 'prepay_id=' + result.data.payment.prepay_id,
    //     signType: 'MD5',
    //     paySign: result.data.payment.paySign,
    //     success: function (res) {
    //       // 跳转到已付款订单
    //       wx.navigateTo({
    //         url: 'detail?order_id=' + order_id
    //       });
    //     },
    //     fail: function () {
    //       App.showError('订单未支付');
    //     },
    //   });
    // }, null, function () {
    //   wx.hideLoading();
    // });
  },
  /**
   * 确认收货
   */
  receipt: function (e) {
    let _this = this;
    let order_id = e.currentTarget.dataset.id;
    wx.showModal({
      title: "提示",
      content: "确认收到商品？",
      success: function (o) {
        if (o.confirm) {
          App._post_form('user.order/receipt', {
            order_id
          }, function (result) {
            _this.getOrderList();
          });
        }
      }
    });
  },
  // 切换分类
  swichCate: function (e) {
    this.cateOrder(e.currentTarget.dataset.id);
  },
  // 订单分类
  cateOrder:function(id){
    var list = this.data.shaixuan;
    for (var i = 0; i < list.length; i++) {
      list[i].classname = 'service_top_one_moren2';
    }
    list[id].classname = 'service_top_one_active';
    
    this.setData({
      shaixuan: list,
      dataType: list[id].dataType
    },function(){
      this.getOrderList();
    })
  }
})