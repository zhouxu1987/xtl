//10.引入用来发送请求的方法,一定要把路径补全
import { request } from "../../../request/index";
const App = getApp();
Page({
  data: { 
    SwiperList:[],//轮播图数组
    shop_info:[],
    shop_name:"",
    img_url:"http://admin.hcbainuo.com/uploads/"
  },
  /**
   * 生命周期函数--监听页面加载(当页面加载的时候执行)
   */
  onLoad: function (options) {
    let _this = this;
    this.setData({
      shop_id:options.id
    })
    
    App._get('api/getStoreinfo', {
      id: _this.data.shop_id
    }, function (result) {
      // 初始化商品详情数据
      var SwiperList=[
        _this.data.img_url+result.data.info.business_pic,
        _this.data.img_url+result.data.info.environment_pic_one,
        _this.data.img_url+result.data.info.environment_pic_two,
        
      ]
      _this.setData({
        SwiperList:SwiperList,
        shop_info:result.data.info,
        shop_name:result.data.info.shop_name,
        shop_coordinate:result.data.info.coordinate,//门店坐标
        environment_pic_one: _this.data.img_url+result.data.info.environment_pic_one,
        environment_pic_two: _this.data.img_url+result.data.info.environment_pic_two,

      })
      console.log(SwiperList)
      console.log(result)

      console.log(result.data.info.nick)
      console.log("联系电话："+result.data.info.phone)
      console.log(result.data.info.pic)
      console.log("门店名称："+result.data.info.shop_name)
      console.log("门店地址："+result.data.info.store_address)
      console.log("门店坐标"+result.data.info.coordinate)
      console.log(_this.data.shop_info)
      console.log(_this.data.shop_name)
    });

  // wx.request({
  //   url: 'https://api-hmugo-web.itheima.net/api/public/v1/home/swiperdata',
  //   success: (res) => {
  //     this.setData({
  //       SwiperList:res.data.message
  //     })
  //   },
  //   /**
  //    ** 接口调用失败的回调函数
  //   **/
  //   fail: (err) => {
  //     console.log(err);
  //   },

  //   /**
  //    ** 接口调用结束的回调函数（调用成功、失败都会执行）
  //   **/
  //   complete: (res) => {
  //     //console.log(res); 
  //   },
  // })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },
  freeTell: function(){
    wx.makePhoneCall({
      phoneNumber: '15042280121',
    })
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
  toMap(e)
  {
    var shop_coordinate = e.currentTarget.dataset.shop_coordinate;
    wx.navigateTo({
      url: '/pages/map/map?shop_coordinate='+shop_coordinate,  
    })
  }
})