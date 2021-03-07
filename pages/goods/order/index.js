// pages/goods/order/index.js
let App = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    goods_id: "",   //商品ID
    goods_img: "",  //商品图片
    goods_info: [], //商品详情
    goods_price: "",//商品价格
    goods_pay:"",   //商品小计
    g_num: "",      //商品数量

    user_name: "",  //购买人姓名
    user_phone: "", //购买人联系方式

    freight: 0,       //运费
    pay: 0,          //需要支付的金额
    order_id: "",     //订单ID
    mydata: "",      //接收门店页面传过来的值

    coupon: "",       //代金券
    coupon_is_num: 0, //是否使用代金券
    coupon_show:0     //代金券状态
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    this.setData({
      // 将上一个页面传递过来的产品ID和产品数量存入data中
      goods_id: options.id,//商品ID
      g_num: options.num,//商品数量
      goods_pay:options.goods_pay,//小计
    })
    this.get_goods()
    this.get_coupon()
  },

  // 获取产品详细信息
  get_goods() {
    var _this = this
    App._get('api/getGoodsInfo', {
      gid: _this.data.goods_id
    },
      function (result) {
        _this.setData({
          goods_info: result.data[0],
          goods_price: result.data[0].price,
          goods_img: App.globalData.img_url + result.data[0].goods_pic
        })
      });
  },

  // 获取优惠券信息
  get_coupon() {
    var _this = this
    App._get('api/getGoodsCash', {
      token: wx.getStorageSync('token'),
      gid: _this.data.goods_id
    }, function (result) {
      //获取优惠券返回数据
      console.log(result)
      console.log(result.code)
      if(result.code==200){
        _this.setData({
          coupon_is: result.data,
          coupon_show: 1
        })
      }
      else{
        console.log("沒有优惠券")
      }
    });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () { },

  // 计算产品价格
  count(e) {
    var goods_price = Number(this.data.goods_price)
    var g_num = Number(this.data.g_num)
    var quan = Number(this.data.coupon.jian)
    if (!quan) { quan = 0 }
    var pay_num = goods_price * g_num - quan
    var goods_pay=goods_price * g_num - quan
    this.setData({
      pay: pay_num,
      goods_pay:goods_pay
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    //接收门店信息
    var pages = getCurrentPages();
    var currPage = pages[pages.length - 1]; //当前页面
    // console.log(currPage) //，就可以看到data里mydata的值了
    console.log(this.data)
    if(!this.data.coupon.jian)
    {
      var pay=this.data.goods_pay
    }
    else{
      var pay=this.data.goods_pay-this.data.coupon.jian
    }
    this.setData({
      pay:pay
    })
  },
  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {},
  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {},
  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {},
  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () { },

  /**
    * 分享当前页面
    */
  onShareAppMessage: function () {
    console.log(App.getUserId())
    return {
      title: '小螳螂车服+',
      path: "/pages/index/index?user_id=" + App.getUserId(),
      imageUrl: '/static/images/logo/Logo.jpg',
      // 转发成功之后的回调
      success: function (res) {
        if (res.errMsg == 'shareAppMessage:ok') {
        }
      },
    };
  },

  //姓名
  user_name_save: function (e) {
    this.setData({
      user_name: e.detail.value
    })
  },
  //手机号
  user_phone_save: function (e) {
    this.setData({
      user_phone: e.detail.value
    })
  },

  // 提交订单
  submie_order: function (e) {
    let _this = this;
    if (_this.data.user_name == '未绑定' || _this.data.user_name == '') {
      App.showSuccess('请填写联系人');
      return;
    }
    else if (_this.data.user_phone == '未绑定' || _this.data.user_phone == '') {
      App.showSuccess('请填写手机号');
      return;
    }
    else if (_this.data.mydata == '未绑定' || _this.data.mydata == '') {
      App.showSuccess('请选择门店');
      return;
    }

    /**
     * 创建订单
     * token	        是	                   string	用户token
     * g_id 	        是	                   int	商品ID
     * g_num          是	                   int	商品数量
     * m_id	          是	                   int	门店ID
     * is_cash  	    是                     int	是否使用了代金券(0否,1是)
     * c_id     	    当is_cash=1时必填	     int	代金券ID
     * is_integral	  是	                   int	是否使用了积分(0否,1是)
     * integral_num	  当is_integral=1时必填	 int	积分数
     * integral_type	当is_integral=1时必填	 int	积分支付类型(0部分积分部分金钱,1全积分)
     * 
    */
    console.log("↓")
    console.log(_this.data.mydata)
    console.log("token:" + wx.getStorageSync('token'))
    console.log("g_id:" + _this.data.goods_id)
    console.log("g_num:" + _this.data.g_num)
    console.log("m_id:" + _this.data.mydata.shop_id)
    console.log("mydata.id:" + _this.data.mydata.shop_id)
    console.log("coupon_is_num:" + _this.data.coupon_is_num)
    console.log("coupon_is.id:" + _this.data.coupon_is.id)
    console.log("user_name:" + _this.data.user_name)
    console.log("user_phone:" + _this.data.user_phone)

    // 提供准备好的数据，创建订单
    App._get('api/createOrder', {
      token: wx.getStorageSync('token'),//用户token
      g_id: _this.data.goods_id,//商品ID
      g_num: _this.data.g_num,//商品数量
      m_id: _this.data.mydata.shop_id,//商户ID
      // 代金券
      is_cash: _this.data.coupon_is_num,//是否使用了代金券
      //c_id: _this.data.coupon_is.id,//如果使用了，需要填写代金券ID
      c_id: _this.data.coupon.id,//如果使用了，需要填写代金券ID
      //积分
      is_integral: 0,
      integral_num: 0,
      integral_type: 0,
      //用户信息
      real_name: _this.data.user_name,
      tel: _this.data.user_phone,
    },
      function (result) {
        console.log(result)
        _this.setData({
          order_id: result.data.order_id,
        }, function () {
          //提交token和orderNum，换取微信支付所需参数
          App._post_form('api/pay/PayIng', {
            token: wx.getStorageSync('token'),
            orderNum: _this.data.order_id,

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
                  url: '/pages/my/OrderList/index'
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
        })
      });
  }
})