// pages/detail/detail.js
import request from "../../util/request"
import CheckAuth from "../../util/auth"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    info:null,
    current:0,
    commentList:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    wx.setNavigationBarTitle({
      title:options.name,
    })
    this.getDetailInfo(options.id)
    this.getCommentInfo()
  },
  getDetailInfo(id){
    request({
      url: `goods/${id}`
    }).then(res=>{
      this.setData({
        info:res
      })
    })
  },
  getCommentInfo(){
    request({
      url:'comments'
    }).then(res=>{
      console.log(res);
      this.setData({
        commentList:res
      })
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  },
  handleImg(e){
    wx.previewImage({
      current:e.currentTarget.dataset.current,
      urls:this.data.info.slides.map(item=>`http://localhost:3000/${item}`),
    })
  },
  handleSkip(){
    wx.switchTab({
      url: '/pages/shopcar/shopcar',
    })
  },
  handleCut(e){
    this.setData({
       current:e.currentTarget.dataset.index
    })
  },
  handleAdd(){
    // console.log('add');
    CheckAuth(()=>{
      console.log('准备好加入购物车工作完成');
      let { nickName }= wx.getStorageSync('token')
      let tel=wx.getStorageSync('tel')
      var goodId= this.data.info.id
      console.log(nickName,tel,goodId);

      request({
        url:'carts',
        data:{
          tel,
          goodId,
          nickName
        }
      }).then(res=>{
        console.log(res);

        if(res.length===0){
          return  request({
            url:'carts',
            method:'post',
            data:{
              "username": nickName,
              "tel": tel,
              "goodId": goodId,
              "number": 1,
              "checked": false,
            }
          })
        }else{
          request({
            url:`carts/${res[0].id}`,
            method:'put',
            data:{
             ...res[0],
             number:res[0].number+1
            }
          })
        }
      }).then(res=>{
        wx.showToast({
          title: '加入购物车成功',
        })
      })
    })
  },
})