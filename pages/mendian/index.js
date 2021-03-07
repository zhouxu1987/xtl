// pages/mendian/index.js
const App = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    array: ['请选择范围','10公里内', '20公里内', '30公里内', ],
    objectArray: [
      {
        id: 0,
        name: '请选择范围'
      },
      {
        id: 1,
        name: '10'
      },
      {
        id: 2,
        name: '20'
      },
      {
        id: 3,
        name: '30'
      },
    ],
    index: 0,
    user_latitude: "",
    user_longitude: "",
    img_url:"http://w.xtlcf.com/uploads/",

  },

  //按距离排序开始
  Distance:function(e){
    var property = e.currentTarget.dataset.property;
    var mdList = this.data.mdList;
    var sortRule = false; // 控制正序倒序
    this.setData({
      mdList: mdList.sort(this.compare(property, sortRule))
    })
    console.log(this.data.mdList)
  },
  compare: function (property, bol) {
    return function (a, b) {
      var value1 = a[property];
      var value2 = b[property];
      if(bol){
        return value1 - value2;
      }else {
        return value2 - value1;
      }
    }
  },
 //按距离排序结束

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    wx.getLocation({
      type: 'wgs84',
      success: function (res) {
        //赋值经纬度 
        wx.setStorageSync('user_latitude', res.latitude)
        wx.setStorageSync('user_longitude', res.longitude)
        that.setData({
          user_latitude:res.latitude,
          user_longitude:res.longitude,
        });
        that.getList(res.latitude,res.longitude)
      }
    })
    //this.getList()
  },
  /**
   * 获取门店信息
   */
  getList: function (a,b) {
    if(!a||!b)
    {
      console.log("无坐标")
      console.log(this.data.user_latitude)
      wx.switchTab({
        url: 'index',
      })
    }
    var user_position=wx.getStorageSync('user_latitude')+','+wx.getStorageSync('user_longitude')
    
    var _this=this
    console.log(user_position)
    console.log(a)
    console.log(b)

    App._get('api/storeList', {
      position:user_position,
    }, 
    function (result) 
    {
      console.log(result.data)
      _this.setData({
        mdList:result.data
      })
    });
    // let _this = this;
    //  App._get('api/storeList', {
    // //   order:1,
    // //   position:_this.data.user_latitude,
    //   // scope:3000,//范围
    //   // shop_type: _this.data.typeid ,//类别
    //   // evaluation:up,//评价
    //   // distance: _this.data.sort,//距离
    //    user_lat: _this.data.latitude,
    //    user_long: _this.data.longitude,
    // }, function (result) 
    //   {
    //    console.log(result)
    //    _this.setData({
    //      mdList=result.data
    //    })
    //   //   if (result.data.nodata != undefined && result.data.nodata == 1) 
    //   //   {
    //   //     _this.setData({
    //   //     showno: true
    //   //     })
    //   //   } 
    //   //   else 
    //   //   {
    //   //     for (var i = 0; i < result.data.categoryList.length; i++) 
    //   //     {
    //   //       result.data.categoryList[i].classname = '';
    //   //     }
    //   //     result.data.categoryList[0].classname = 'active';
    //   //     _this.setData({
    //   //       typeList: result.data.categoryList,
    //   //       typeid: result.data.categoryList[0].id,
    //   //       list: result.data.data,
    //   //       showno: false
    //   //     });
    //   // }
    // });
  },

  //选择范围开始
  bindPickerChange: function(e) {
    var _this = this;
    if(e.detail.value == 0){//e.detail.value为选项角标
      this.onLoad();
    }
    App._get('api/storeList', {
      order:"distance",
      distance:e.detail.value*100 
    }, 
    function (result) 
    {
      console.log(result.data)
      _this.setData({
        mdList:result.data,
        index: e.detail.value
      })
    });
  },
//选择范围结束

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
  toshop(e)
  {
    var id = e.currentTarget.dataset.id;
    wx.navigateTo({
    url: 'shop/index?id='+id,  
    })
  }
})