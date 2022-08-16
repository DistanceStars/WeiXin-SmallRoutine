// pages/listing/listing.js
import request from '../../util/request'
Page({

  /**
   * 页面的初始数据
   */
  data: {
   goodListing:[]
  },
  pricreOrder:true,
  CommentOrder:true,

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad:function (options) {

    wx.setNavigationBarTitle({
      title:options.name
    })
    this.getList(options.id)
  },
  getList(id){
    request({
      url: `categories/${id}?_embed=goods`,
    }).then(res=>{
      
      this.setData({
        goodListing:res.goods
      })
    })
  },
  handleChangePage(e){
    wx.navigateTo({
      url: `/pages/detail/detail?id=${e.currentTarget.dataset.id}&name=${e.currentTarget.dataset.name}`,
    })
  },
  handlePrice(){
    this.pricreOrder=!this.pricreOrder
   console.log(this.data);
    this.setData({
     goodListing:this.pricreOrder?this.data.goodListing.sort((item1,item2)=>parseInt(item1.goodcomment)-parseInt(item2.goodcomment)):this.data.goodListing.sort((item1,item2)=>parseInt(item2.goodcomment)-parseInt(item1.goodcomment))
    })
  },
  handleComment(){
    this.CommentOrder=!this.CommentOrder
    
     this.setData({
      goodListing:this.CommentOrder?this.data.goodListing.sort((item1,item2)=>item1.price-item2.price):this.data.goodListing.sort((item1,item2)=>item2.price-item1.price)
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

  }
})