const App = getApp();
Page({
  data: {
    winHeight: '100%',
    to_Id: 'one', //锚点跳转的ID
    CarList:{},
    HotList:{},
    AllList:{},
    list:['A','B','C','D','F','G','H','J','K','L','M','N','O','P','Q','R','S','T','W','X','Y','Z']
  },
  onLoad() {
    wx.showLoading({
      title: '加载中...',
    })
   console.log(this.to_Id)
    let that = this;
    wx.getSystemInfo({
      success: function(res) {
        console.log(res)
        //屏幕的宽度/屏幕的高度 = 微信固定宽度(750)/微信高度
        that.setData({
          // 80是上面导航条的高度
          winHeight: res.windowHeight - (res.windowWidth * 80 / 750) + 'px'
        })
      }
    });
    App._get('api/Carmodel/brands', {}, function (result) {
      // 初始化商品详情数据
      that.setData({
        HotList:result.data[0].list,
        AllList:result.data[1].list
      }) 
      
      wx.hideLoading()
    });
    

//     /*
//  *一、发送异步请求获取数据,基本方法（首页轮播图）
//  */
//   wx.request({
    
//     //01.HTTP 请求的网络地址，地址中不能有端口
//     url: 'https://admin.hcbainuo.com/api/Carmodel/brands',
//     /**↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓默认值可省略↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓ */
//     //02.设置请求头（header）,header中不能设置 Referer。
//     //content-type 默认为application/json
//     header: {'content-type': 'application/json'},
//     //03.HTTP 请求方法（GET|HEAD|POST|PUT|DELETE|TRACE|CONNECT）必须大写
//     method: 'GET',
//     //04.返回的数据格式（json,返回后会对返回的数据进行一次 JSON.parse）
//     dataType: 'json',
//     //05.响应的数据类型（text|arraybuffer）
//     responseType: 'text',
//     data: {x:"",y:""},   //请求的参数
//     enableCache: true,//开启 cache（flase|true）
//     enableHttp2: true,//开启 http2（flase|true）
//     enableQuic: true,//开启 quic（flase|true）
//     timeout: '6000',//超时时间，单位为毫秒,的默认超时时间和最大超时时间都是 60s
//     /**↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑默认值可省略↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑ */
//     /**
//      * 接口调用成功的回调函数 success: (res) =>{}
//      * 1、res = {data:"开发者服务器返回的内容"}
//      * 2、可以在控制台中打印服务器返回的内容进行查看校验
//      * 3、console.log() 在调试控制台打印内容
//      * 4、console.log(res)  在调试控制台打印（res）中的内容
//     * */
//     success: (res) => {
      
//       /**
//        * setData
//        * 1、仅支持设置可 JSON 化的数据。
//        * 2、setData函数主要用于将逻辑层数据发送到视图层，同时对应的改变this.data.x的值
//        * 3、单次设置的数据不能超过1024kB，请尽量避免一次设置过多的数据。
//        * 4、修改this.data而不调用this.setData是无法改变页面的状态的，还会造成数据不一致。
//        * 5、this.data是用来获取页面data对象的，而this.setData是用来更新界面的
//        * 6、不要把data中的value设为undefined，否则这一项将不被设置并可能遗留一些潜在问题。
//        * */
//       this.setData({
//         /**
//          * SwiperList|在data中已经声明其为数组 
//          * res.data.message|指向服务器返回的res中的data中的message数据
//          * 将其放入（SwiperList）数组 
//          * 在调试器中的AppData中查看数据是否正确
//          * 最后在wxml页面循环显示出数组中的内容
//          */
//         CarList:res.data.message
        
//       })
//     },
//     /**
//      ** 接口调用失败的回调函数
//     **/
//     fail: (err) => {
//       console.log(err);
//     },

//     /**
//      ** 接口调用结束的回调函数（调用成功、失败都会执行）
//     **/
//     complete: (res) => {
//       //console.log(res); 
//     },
//   })
// /*
//  *一、发送异步请求获取数据，基本方法结束（首页轮播图）
//  */
  },
  scrollTap: function(e) {
    this.setData({
      to_Id: e.target.dataset.hash
    })
  },
  tolist:function(e){
    var cm_brand_letter=e.currentTarget.dataset.cm_brand_letter
    var cm_brand=e.currentTarget.id
    wx.navigateTo({
      
    url: '/pages/zhushou/ModelList/ModelList?cm_brand='+cm_brand+'&cm_brand_letter='+cm_brand_letter,  
    })
    }
})