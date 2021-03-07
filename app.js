//app.js
App({
/*
 * 全局变量
*/
  globalData:
  {
    userInfo: null,
    list: [],
    url:"",
    img_url:""
  },
/*
 * api地址
*/
  api_root: '',
  //require：获取指定页面通过module.exports导出的数据
  siteInfo: require('siteinfo.js'),

/*
 * 生命周期函数--监听小程序初始化
 */
    onLaunch: function(options) 
    {
      // 设置api地址
      this.setApiRoot();
      //如果城市缓存中没有数据，那么就将天津市做为默认城市
      if (wx.getStorageSync('city') == "")
      {
        wx.setStorageSync('city', '天津市');
      }
      //console.log("启动参数："+options.query.p_id)
      //获取小程序的启动参数
      //判断小程序的启动场景
      /**
       * 1047: 扫码进入
       * 1048：长按图片识别码进入
       * 1049：手机相册选取小程序吗进入
      */
      
      /**
       * 在特定的场景值下或者在有参数的场景值下执行
      */
      if(options.scene === 1047 || options.scene === 1048 || options.scene === 1049 && options.query.scene)
      {
        // console.log("有参数，参数是："+options.query.p_id)
        wx.setStorageSync('p_id',options.query.p_id);
      }
      else
      {
        // 调用小程序启动场景方法
        this.onStartupScene(options.query);
      }
    },
  /*
   * 设置api地址
   */
  setApiRoot: function () 
  {
    //this.api_root = this.siteInfo.siteroot + 'index.php?s=/api/';
    this.api_root = this.siteInfo.siteroot;
    this.globalData.url=this.api_root
    this.globalData.img_url=this.api_root+"uploads/"
  },
    /*
   * 获取api地址
   */
  getApiRoot: function () 
  {
    //this.api_root = this.siteInfo.siteroot + 'index.php?s=/api/';
    var api=this.api_root 
    return api 
  },
  /**
   * 调用小程序启动场景方法
  */
  onStartupScene: function (query) 
  {
    // 获取场景值
    let scene = this.getSceneData(query);
    // 记录推荐人id
    let refereeId = query.user_id ? query.user_id : scene.uid;
    refereeId > 0 && (this.saveRefereeId(refereeId));
  },

/**
  * 获取场景值(scene)
  */
 getSceneData: function (query) {
  return query.scene ? util.scene_decode(query.scene) : {};
},

/**
  * 记录推荐人id
  */
 saveRefereeId: function (user_id) 
 {
   if (!wx.getStorageSync('referee_id'))
   {
     wx.setStorageSync('referee_id', user_id);
   }
   
 },
   /**
   * 获取当前用户,邀请码(推广时使用)
   */
  getUserId: function () {
    console.log(wx.getStorageSync('InvitationCode'))
    return wx.getStorageSync('InvitationCode');
  },

    onShow: function(options) {

    },
    onHide: function() {

    },
    onError: function(msg) {

    },
    //options(path,query,isEntryPage)
    onPageNotFound: function(options) {

    },
  /**************************登录*************************8/
  /**
   * 执行用户登录
   */
  doLogin: function (status) {
    // 保存当前页面
    let pages = getCurrentPages();//获取页面栈
    
    if (pages.length) //如果页面可用
    {
      let currentPage = pages[pages.length - 1];//当前页面
      "pages/login/login" != currentPage.route &&
        wx.setStorageSync("currentPage", currentPage);
    }
    if (status == -1) {
      // 跳转授权页面
      wx.navigateTo({
        url: "/pages/login/login"
      });
      return;
    }
  },
/**********************提交数据****************************/
    /**
   * get请求
   */
  _get: function (url, data, success, fail, complete, check_login) {
    wx.showNavigationBarLoading();
    let App = this;
    // 构造请求参数
    data = data || {};
    //data.wxapp_id = App.siteInfo.uniacid;
    // 构造get请求
    let request = function () {
      data.token = wx.getStorageSync('token');
      wx.request({
        url: App.api_root + url,
        header: {
          'content-type': 'application/json'
        },
        data: data,
        success: function (res) {
          if (res.statusCode !== 200 || typeof res.data !== 'object') {
            App.showError('网络请求出错1' +typeof res.data);
            return false;
          }
          if (res.data.code === -1) {
            // 登录态失效, 重新登录
            wx.hideNavigationBarLoading();
            // 同时发起两次请求，解决跳转两遍授权
            App.doLogin(-1);
            return false;
          } else if (res.data.code === 1) {
            wx.hideLoading();
            App.showError(res.data.msg, function () {
              fail && fail(res);
            });
            return false;
          } else {
            success && success(res.data);
          }
        },
        fail: function (res) {
          App.showError(res.errMsg, function () {
            fail && fail(res);
          });
        },
        complete: function (res) {
          wx.hideNavigationBarLoading();
          complete && complete(res);
        },
      });
    };
    // 判断是否需要验证登录
    check_login ? App.doLogin(request) : request();
  },

  /**
   * post提交
   */
  _post_form: function (url, data, success, fail, complete) {
    let App = this;
    data.wxapp_id = App.siteInfo.uniacid;
    data.token = wx.getStorageSync('token');
    wx.showNavigationBarLoading();
    wx.request({
      url: App.api_root + url,
      header: {
        'content-type': 'application/x-www-form-urlencoded',
      },
      method: 'POST',
      data: data,
      success: function (res) {
        if (res.statusCode !== 200 || typeof res.data !== 'object') {
          App.showError('网络请求出错');
          return false;
        }
        if (res.data.code === -1) {
          // 登录态失效, 重新登录
          wx.hideNavigationBarLoading();
          // 同时发起两次请求，解决跳转两遍授权
          App.doLogin(-1);
          return false;
        } 
        else if (res.data.code === 0) {
          wx.hideLoading();
          App.showError(res.data.msg, function () {
            fail && fail(res);
          });
          return false;
        }
        success && success(res.data);
      },
      fail: function (res) {
        App.showError(res.errMsg, function () {
          fail && fail(res);
        });
      },
      complete: function (res) {
        wx.hideNavigationBarLoading();
        complete && complete(res);
      }
    });
  },

/**********************提示****************************/
    /**
   * 显示失败提示框
   */
  showError: function (msg, callback) {
    wx.showModal({
      title: '友情提示',
      content: msg,
      showCancel: false,
      success: function (res) {
        // callback && (setTimeout(function() {
        //   callback();
        // }, 1500));
        callback && callback();
      }
    });
  },
  /**
  * 显示成功提示框
  */
  showSuccess: function (msg) {
    wx.showToast({
      title: msg,
      icon: 'none',
      mask: true,
      duration: 1500
    });
  },
});
  