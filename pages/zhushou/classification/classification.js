Page({
  data: {
    winHeight: '100%',
    to_Id: 'one', //锚点跳转的ID
  },
  onLoad() {
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
  },
  scrollTap: function(e) {
    this.setData({
      to_Id: e.target.dataset.hash
    })
  },
  tolist:function(){

    wx.navigateTo({
    
    url: '/pages/zhushou/ModelList/ModelList',  
    
    })
    
    }
})