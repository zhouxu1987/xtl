Page({
  getUser:function(){ 
    //我是用的bindtap事件 也可以放到  生命周期函数--监听页面加载
    // 登录
    wx.login({
      success: function (res) {
        var code = res.code; //获取code
        wx.getUserInfo({ 
          //得到rawData, signatrue, encryptData
          success: function (data) {
            var rawData = data.rawData;
            var signature = data.signature;
            var encryptedData = data.encryptedData;
            var iv = data.iv;
            wx.request({
              url: 'http://admin.hcbainuo.com/api/wxLogin',
              data: {
                "code": code,
                "rawData": rawData,
                "signature": signature,
                'iv': iv,
                'encryptedData': encryptedData
              },
              method: 'GET',
              success: function (info) {
                console.log(info)
                wx.setStorage({
                  key:"token",
                  data:info.data.data.token
                })
                wx.getStorage({
                  key: 'token',
                  success (res) {
                    console.log(res.data)
                  }
                })
              },
              
              fail:function(info){
                console.log(info)
              }
            });
          }
        });
      },
      fail: function (res) {
        console.log(res)
      }
    });
  },
  checklogin(){
    const that=this
    wx.checkSession({
      success () {
        //session_key 未过期，并且在本生命周期一直有效
        console.log("已经登录")
      },
      fail () {
        // session_key 已经失效，需要重新执行登录流程
        //wx.login() //重新登录
        console.log("登录过期")
        getUser.getUser()
      }
    })
  }
  
})