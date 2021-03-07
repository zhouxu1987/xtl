var WxParse = require('../../wxParse/wxParse.js');
const App = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: { 
    goods_img:"",
    goods_id:"",
    SwiperList:[],//轮播图数组
    goods_info:[],
    num_ok:0,
    num_title:"请选择",
    num_pay:""
  },
  /**
   * 生命周期函数--监听页面加载(当页面加载的时候执行)
   */
  onLoad: function (options) {
    let _this=this;
    if(options.id!="")
    {
      this.setData({
        goods_id:options.id
      })
    }
      _this.get_goods()
    },
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

  /**
   * 获取首页商品信息
  */
  get_goods()
  {
    var _this=this
    App._get('api/getGoodsInfo', {
      gid:_this.data.goods_id
    }, 
    function (result) 
    {
      var article = result.data[0].goods_info;
      WxParse.wxParse('article', 'html', article, _this,5);
      //传递过来的参数中，如果有相对路径，那么就在
      //wxparse/html2json.js中的代码做如下修改
      // var imgUrl = node.attr.src;
      // var imgUrl = "http://admin.hcbainuo.com"+node.attr.src;

      _this.setData({
        goods_info:result.data[0],
        goods_img:App.globalData.img_url+result.data[0].goods_pic,
        price:result.data[0].price,
        num_pay:result.data[0].price
      })
    });
  },
  // 跳转
  goUrl:function(e){
    // 判断授权   
    if(!this.data.goods_num)
    {
      App.showSuccess('请选择购买数量');
      return;
    }
    if (wx.getStorageSync('token') == '') {
      wx.navigateTo({
        url: '../../login/login',
      })
      return;
    }
    wx.navigateTo({
      url: e.currentTarget.dataset.url,
    })
   },
   Num:function(e){
   this.setData({
     num_ok:1
   })
   },
   specsTap(e)
   {
      var num_pay=e.target.dataset.id*this.data.price
      this.setData({
        goods_num:e.target.dataset.id,
        num_title:"您选择了"+e.target.dataset.id+"升",
        num_pay:num_pay
      })
   },
   emptyActive()
   {
     this.setData({
      num_ok:0
     })
   }

})