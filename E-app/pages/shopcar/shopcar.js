// pages/shopcar/shopcar.js
import CheckAuth  from "../../util/auth"
import request from "../../util/request"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    slideButtons:[{
      type:'warn',
      text:'删除',
    }],
    catList:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady:function() {
     
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow:function () {
    CheckAuth(()=>{

      let {nickName}=wx.getStorageSync('token')
      let tel=wx.getStorageSync('tel')
      // console.log(nickName,tel);

      request({
        url:`carts?_expand=good&username=${nickName}&tel=${tel}`
      }).then(res=>{
        console.log(res);
        this.setData({
          cartList:res
        })
      })
    })
  },
  // -
  handleMinus(e){
    var item=e.currentTarget.dataset.item
     item.number--
     if(item.number<1){
      item.number=1
     }
     this.handleUpdate(item)
  
  },
  // +
  handleAdd(e){
    var item=e.currentTarget.dataset.item
    item.number++
    this.handleUpdate(item)
  },
  handleCheck(e){
    // console.log(e.currentTarget.dataset.item);
    var item=e.currentTarget.dataset.item
 
    item.checked=!item.checked
    this.handleUpdate(item)
  },
  handleUpdate(item){
    this.setData({
      cartList:this.data.cartList.map(data=>{
        if(data.id===item.id){
             return item
        }
        return data
    })
  })
  request({
    url:`carts/${item.id}`,
    method:"put",
    data:{
      "username": item.username,
      "tel": item.tel,
      "goodId": item.goodId,
      "number": item.number,
      "checked": item.checked,
    }
  })
   
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
  slideButtonTap(e){
  
    console.log(e.currentTarget.dataset.id);
    var id=e.currentTarget.dataset.id
    this.setData({
      cartList:this.data.cartList.filter(item=>item.id!==id)
    })
    request({
      url:`carts/${id}`,
      method:"delete",
    })
  },
  handleCheckAll(e){
    console.log(e.detail.value);

    if(e.detail.value.length===0){
      this.setData({
        cartList:this.data.cartList.map(item=>({
          ...item,
          checked:false
        }))
      })
    }else{
      this.setData({
        cartList:this.data.cartList.map(item=>({
          ...item,
          checked:true
        }))
      
      })

    }
  },

})