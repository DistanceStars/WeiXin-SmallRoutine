import request from "../../util/request"
// pages/home/home.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    loopList:[],
    goodList:[],
  },
  current:1,
  total:0,

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {
    this.renderSwiper()
    this.renderGoods()
  },
  renderSwiper(){
    request({
      url:"recommends"
    }).then(res=>{
       this.setData({
        loopList:res
       })
    })
  },
  renderGoods(){
    request({
      url:`goods?_page=${this.current}&_limit=4`
    },true).then(res=>{
      this.total=Number(res.total)
       this.setData({
        goodList:[...this.data.goodList,...res.list]
       })
    })
  },
  handleEvent(){
    console.log('点击搜索咯');
    wx.navigateTo({
      url: '/pages/search/search',
    })
  },
  handleChangePage(e){
    var id=e.currentTarget.dataset.id
    var name=e.currentTarget.dataset.name
    wx.navigateTo({
      url: `/pages/detail/detail?id=${id}&name=${name}`
    })
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
  onPullDownRefresh: function() {
    console.log("下拉");
    setTimeout(()=>{
       wx.stopPullDownRefresh({
        
       })
    },1000)

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {
    if(this.data.goodList.length===this.total){
      return 
    }

    this.current++
    this.renderGoods()
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  },
  handleGet(){
    

  },
  handlePost(){

  },
  handlePut(){

  },
  handleDelete(){
    
  }
})