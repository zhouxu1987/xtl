import { request } from "../../request/index";
// pages/index/index.js
const App = getApp();
Page({
  data: { 
    SwiperList:[],//轮播图数组
    CatesList:[
      {
        name: "保养",
        image_src: "/static/images/index/baoyang.jpg",
        navigator_url:"../baoyang/index"
      },
      {
        name:"洗车",
        image_src: "/static/images/index/xiche.jpg",
        navigator_url:"/pages/xiche/index"
      },
      {
        name:"车证",
        image_src: "/static/images/index/chezheng.jpg",
        navigator_url:"/pages/chezheng/index"
      },
      {
        name:"加油",
        image_src: "/static/images/index/jiayou.jpg",
        navigator_url:"/pages/jiayou/index"
      },

    ],//导航栏数组
    FloorList:[],//产品海报
    good_list1:[]
    
  },
  onLoad: function (options) {
    var _this=this
    _this.get_goods()
    _this.get_goods_1()
    _this.get_goods_10()
  wx.request({
    url: 'https://w.xtlcf.com/api/getBannerList',
    success: (res) => {
      //console.log(res)
      this.setData({
        SwiperList:res.data.data
      })
    },
    fail: (err) => {
      //console.log(err);
    },
    complete: (res) => {
      //console.log(res); 
    },
  })
    this.checkLogin();
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
  get_goods()
  {
    var _this=this
    App._get('api/maintainList', {}, 
    function (result) 
    {
      _this.setData({
        good_list1:result.data
      })
    });
  },
  checkLogin(){
    if (wx.getStorageSync('token') == '') {
      wx.navigateTo({
        url: '../login/login',
      })
      return;
    }
  },
  get_goods_10()
  {
    var _this=this
    App._get('api/getGoodsIndex', {
      type:10
    }, 
    function (result) 
    {
      console.log(result.data)
      _this.setData({
        good_list_10:result.data
      })
    });
  },
  get_goods_1()
  {
    var _this=this
    App._get('api/getGoodsIndex', {
      type:1
    }, 
    function (result) 
    {
      console.log(result.data)

      _this.setData({
        good_list_1:result.data
      })
    });
  },

})