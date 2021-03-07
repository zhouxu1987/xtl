// pages/main/main.js
const App = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    menuList:[
      {
        icon: "/static/images/my/shangpindingdan_icon.png",
        name: "我的订单",
        url: "OrderList/index"
      },
      {
        icon: "/static/images/my/wodeshouhou_icon.png",
        name: "VIP会员",
        url: "VIP/index"
      },
      {
        icon: "/static/images/my/wodeshoucang_icon.png",
        name: "分享赚钱",
        url: "distribution/index"
      },
      {
        icon: "/static/images/my/youhuiquan_icon.png",
        name: "福利中心",
        url: "welfare/index"
      },
      {
        icon: "/static/images/my/dizhiguanli_icon.png",
        name: "收货地址",
        url: "address/index"
      },
      {
        icon: "/static/images/my/wodetuandui_icon.png",
        name: "团队中心",
        url: "Promotion/index"
      },
      {
        icon: "/static/images/my/shangchengchezhubibei_icon.png",
        name: "我的优惠券",
        url: "MyCoupon/MyCoupon"
      },
      {
        icon: "/static/images/my/lianxiwomen_icon.png",
        name: "联系我们",
        url: ""
      },
      {
        icon: "/static/images/my/guanyuxiaochengxu_icon.png",
        name: "关于小螳螂",
        url: "about/index"
      },
    ],
    token:wx.getStorageSync('token'),
    jifen:"0"
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
    this.setData({
      token:wx.getStorageSync('token')
    })
  },
  // 核销
  hexiao:function(){
    
  },
  // 跳转
   goUrl:function(e){
    // 判断授权
    var _this=this
    if (wx.getStorageSync('token') == '') {
      wx.navigateTo({
        url: '../login/login',
      })
      
      return;
    }
    wx.navigateTo({
      url: e.currentTarget.dataset.url,
    })
   },
/**
  * 分享当前页面
  */
 onShareAppMessage: function () {
  console.log(App.getUserId())
  return {
    title: '小螳螂车服+',
    path: "/pages/index/index?user_id=" + App.getUserId(),
    imageUrl:'/static/images/logo/Logo.jpg',
    // 转发成功之后的回调
    success: function(res){
      　if(res.errMsg == 'shareAppMessage:ok'){
        
        }
    },
    
  };
},
})