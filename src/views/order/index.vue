<template>
  <div class="body_content">
    <div class="address_box" v-if="address != null " @click="toUrl()">
      <div class="address_name">{{address.name}}<span>{{address.mobile}}</span></div>
      <div class="address_text">
        <p class="address">{{address.province}}{{address.city}}{{address.area}}{{address.address}}</p>
        <p class="address_img"><img src="./img/zuola.png"></p>
      </div>
    </div>
    <div class="address_box" v-if="address == null" style="height: 100px !important;position: relative;" @click="toUrl()">
      <div class="add"><img src="./img/img54.png" />
        <p>添加收货地址</p>
      </div>
    </div>
    <div class="division"></div>
    <div class="good_box">
      <div class="good_list" style="margin-top: 0px!important;" v-for="(ls,ind) in list" :key="ind">
        <div class="content_img"><img :src="'http://api.yunguhc.com/'+ls.goods_img" /></div>
        <div class="content_title">
          <p class="content_name">{{ls.goods_name}}</p>
          <!-- <p class="content_color">{{ls.color}}</p> -->
          <p style="height: 25px;" v-if="ls.color == null"></p>
          <p class="content_color" v-if="ls.color != null">{{ls.color}}</p>
          <p>
            <span class="content_price">￥{{ls.price}}</span>
            <span class="goods_num">x{{ls.goods_num}}</span>

          </p>
        </div>
      </div>
    </div>
    <div class="goods_box">
      <div class="mail_ship flex" style="padding-bottom: 0px !important;">
        <span class="shipping">买家留言</span><span style="font-size: 14px; flex-grow: 1; padding-left: 20px;"><input style="width: 100%;text-align: right;" type="number" v-model="content"
            placeholder="请输入您的要求" /></span>
      </div>
    </div>
    <div class="goods_box" style="margin-bottom: 60px !important;">
      <div class="mail_ship" style="padding-bottom: 0px !important;">
        <span class="shipping">待返佣</span><span style="font-size: 14px;color: #333333;width: 85%;text-align: right;">￥{{data.price}}</span></div>
    </div>
    <div class="good_foot">
      <span class="total">合计：￥{{data.money}}</span>
      <span class="settlement" @click.stop='show()'>提交订单</span>
    </div>
    <div class="dialog_bg" v-bind:class="{ active: isActive }"></div>
    <div class="dialog-footer" v-bind:class="{ active: isActive }">
      <div class="dialog-top">
        <p class="top_title">选择支付方式</p>
        <p class="top_img" @click.stop='cancel()'><img src="./img/img041.png"></p>
      </div>
      <div class="dialog-content">
        <el-radio-group v-model="radio" @change="onRadioChange">
          <div class="content_list">
            <p class="list_wx"><img src="./img/img28.png"><span>微信支付</span></p>
            <p class="list_check">
              <el-radio :label="2"></el-radio>
            </p>
          </div>
          <div class="content_list" style="border-bottom: none !important;">
            <p class="list_wx"><img src="./img/img29.png"><span>钱包支付</span></p>
            <p class="list_check">
              <el-radio :label="1"></el-radio>
            </p>
          </div>
        </el-radio-group>
      </div>
      <div class="divis"></div>
      <div class="buy_now">
        <p class="buy_total">合计：<span>￥{{data.money}}</span></p>
        <p class="buy_btn" @click="payment">立即支付</p>
      </div>
    </div>
  </div>

</template>

<script>
  import {
    check_order,
    sub_order,
    Wxpay
  } from '@/api/order.js';
  export default {
    data() {
      return {
        address: '',
        data: '',
        isActive: true,
        oid: '',
        num: '',
        radio: 1, //选择支付方式
        list: '',
        content: ''
      };
    },
    methods: {
      //获取分类列表
      loadList() {
        check_order({
          oid: this.oid
        }).then((
          data
        ) => {
          // console.log(data,5)
          this.list = data.data;
          this.address = data.address;
          this.data = data;
        }).catch((err) => {
          console.log(err);
        })
      },
      //立即支付
      payment() {
        //console.log(1)
        if (this.radio == 1) {
          sub_order({
            oid: this.oid,
            pay_status: 1,
            money: this.data.money,
            content: this.content
          }).then((
            data
          ) => {
            if (data.code == 200) {
              this.$message({
                message: data.msg,
                type: "success",
                offset: 50
              });
              let Url = "?id=" + this.oid;
              //console.log(Url, 11)
              this.$router.push({
                path: '/order/order' + Url
              })
            } else {
              this.$message({
                message: data.msg,
                type: "error",
                offset: 50
              });
            }
          }).catch((err) => {
            console.log(err);
          })
        } else {
          sub_order({
            oid: this.oid,
            pay_status: 2,
            money: this.data.money,
            content: this.content
          }).then((data) => {
            console.log(data, 11)
            let content = JSON.parse(data.data.content);
            let orderSn = data.data.order_sn;
            console.log(content);
            console.log(orderSn );
            this.wxPay(content,orderSn);
          }).catch((err) => {
            console.log(err);
          })
        }
      },
      //获取微信配置
      wxPay(config,orderSn) {
       // console.log("支付")
        let self = this;
				wx.config({
					debug: false, //
					appId: config.appId, // 必填，公众号的唯一标识
					timestamp:config.timeStamp, // 必填，生成签名的时间戳
					nonceStr:config.nonceStr, // 必填，生成签名的随机串
					signature:config.paySign,// 必填，签名
					jsApiList: ["chooseWXPay"] // 必填，需要使用的JS接口列表
				});
				wx.ready(function(){
         // console.log("选择")
					wx.chooseWXPay({
						timestamp:config.timeStamp, // 支付签名时间戳，
						nonceStr:config.nonceStr, // 支付签名随机串，不长于 32 位
						package:config.package, //
						signType: 'MD5', // 签名方式，默认为'SHA1'，使用新版支付需传入'MD5'
						paySign:config.paySign, // 支付签名
						success: function (res) {
               let Url = "?id=" + self.oid;
               //console.log(Url, 11)
               self.$router.push({
                 path: '/order/order' + Url
               })
              console.log(r)
              	// 支付失败后的回调函数
              	// this.$router.push('/');
						},
						cancel(r){
						 let Url = "?id=" + self.oid;
						 //console.log(Url, 11)
						 self.$router.push({
						   path: '/order/order' + Url
						 })
            console.log(r)
							// 支付失败后的回调函数
							// this.$router.push('/');
						}
					});
				});
        },
      //调用支付接口
      // playStart: function(msg) {
      //   let obj = this
      //   //注册微信
      //   doCharge(msg).then(({
      //     data
      //   }) => {
      //     obj.store.playAction = false;
      //     //微信支付调用
      //     let da = JSON.parse(data.data);
      //     wx.chooseWXPay({
      //       timestamp: da.timeStamp,
      //       nonceStr: da.nonceStr,
      //       package: da.package,
      //       signType: da.signType,
      //       paySign: da.paySign,
      //       success: function(res) {
      //         obj.store.play = false;
      //         Toast({
      //           message: '支付成功',
      //           iconClass: 'cmy-icon cmy-icon-hook',
      //           duration: 1000
      //         });
      //       }
      //     });
      //   }).catch(function(error) {
      //     obj.store.playAction = false;
      //     console.log(error);
      //   });
      // },
      handleChange(value) {
        this.num = value
        //console.log(this.num, 88);
      },
      onRadioChange(item) {
        this.radio = item;
        //console.log(this.radio, 11)
      },
      toUrl() {
        let Url = "?id=" + this.oid;
        //console.log(Url, 11)
        this.$router.push({
          path: '/address/add' + Url
        })
      },
      cancel() {
        //取消弹窗
        this.isActive = true
      },
      show() {
        // 显示弹窗
        this.isActive = false
      },
    },
    created() {
      this.oid = this.$route.query.id;
      this.loadList();
      //获取微信配置
      // this.loadWxConfig()
    }
  };
</script>
<style>
  .el-radio__label {
    display: none;
  }
</style>
<style scoped="scoped">
  .body_content {
    width: 100%;
    background-color: #F2F3F5;
    position: absolute;
    margin: 0;
    padding: 0;
    min-height: 100vh;
  }

  .add {
    width: 40%;
    padding-top: 15px;
    margin: 0px auto;
  }

  .add p {
    display: inline-block;
    position: absolute;
    margin-top: -2px !important;
    margin-left: 5px;
    color: #333333;
  }

  .address_box {
    background-color: white;
    width: 100%;
    padding: 20px 20px;
  }

  .address_name {
    font-size: 20px;
    padding-bottom: 15px;
    font-weight: 530;
  }

  .address_name span {
    color: #999999;
    padding-left: 15px;
    font-size: 14px;
  }

  .goods_num {
    float: right;
  }

  .address {
    width: 90%;
    display: inline-block;
    color: #333333;
    font-size: 14px;
    overflow: hidden;
    text-overflow: ellipsis;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
  }

  .address_img {
    display: inline-block;
    float: right;
  }

  .address_img img {
    width: 20px;
    height: 18px;
  }

  .division {
    width: 100%;
    height: 8px;
    background: url(./img/img032.png) no-repeat 4px 5px;
    margin-top: -5px;

  }

  .good_box {
    width: 100%;
    background: white;
    margin: 10px auto;
    padding: 20px 20px;
  }

  .good_list {
    width: 100%;
    margin-top: 15px;
    margin-bottom: 15px;
    position: relative;

  }

  .goods_box {
    width: 100%;
    background-color: white;
    padding: 10px 15px;
    margin-bottom: 10px;
  }

  .good_list:last-child {
    margin-bottom: 0px;
  }

  .content_img {
    display: inline-block;
    width: 25%;
    height: 100%;
    /* border: 1px solid #F0F0F0; */
  }

  .content_img img {
    width: 100%;
    height: 100%;
  }

  .content_title {
    display: inline-block;
    width: 75%;
    position: absolute;
    padding-left: 10px;

  }

  .content_name {
    font-size: 15px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;

  }

  .content_price {
    color: #333333 !important;
    font-size: 15px;
    font-weight: bold;
  }

  .el-input-number--mini {
    width: 100px;
    float: right;
  }

  .content_color {
    background-color: #F6F6F6;
    color: #606972 !important;
    display: inline-block;
    padding: 2px 8px;
    border-radius: 5px;
    margin: 5px 0px;
    font-size: 12px !important;
    margin-bottom: 10px !important;
  }

  .mail_ship {
    padding-bottom: 15px;
    color: #333333;
    display: flex;
  }

  .shipping {
    color: #666666;
    font-size: 14px;
    float: right;
    text-align: right;
  }

  .good_foot {
    position: fixed;
    bottom: 0;
    z-index: 999;
    height: 50px;
    width: 100%;
    background-color: white;
    padding: 0rem 10px;
    line-height: 50px;
  }

  .total {
    font-size: 14px;
    position: absolute;

  }

  .settlement {
    background-color: #CC3A45;
    padding: 1% 10%;
    float: right;
    border-radius: 50px;
    color: white;
    margin-top: -2%;
    line-height: 30px;
    font-size: 16px;
    margin-top: 7px;

  }

  .dialog_bg {
    background-color: #000000;
    z-index: 99;
    width: 100%;
    height: 100%;
    opacity: 0.5;
    position: absolute;
    top: 0px;
  }

  .dialog-footer {
    position: fixed;
    bottom: 0px;
    background-color: white;
    width: 100%;
    z-index: 999;
    border-top-left-radius: 7px;
    border-top-right-radius: 7px;

  }

  .dialog-top {
    padding: 20px 15px;
    border-bottom: 1px solid #EEEEEE;
    width: 100%;
    height: 60px
  }

  .top_title {
    display: inline-block;
    float: left;
    font-size: 16px;
    font-weight: bold;
    color: #333333 !important;
  }

  .top_img {
    display: inline-block;
    float: right;
  }

  .dialog-content {
    padding: 0px 15px;
  }

  .content_list {
    border-bottom: 1px solid #EEEEEE;
    padding: 15px 0px;

  }

  .list_wx {
    display: inline-block;

  }

  .list_wx img {
    float: left;
    position: relative;
    margin-right: 10px;
    /* width: 25px;
    height: 25px; */
  }

  .list_check {
    display: inline-block;
    float: right;
  }

  .list_check {
    position: relative;
    margin-top: 5px;
  }

  .divis {
    width: 100%;
    height: 10px;
    background: #F6F6F6;
  }

  .buy_now {
    background: white;
    width: 100%;
    height: 50px;
    line-height: 50px;
  }

  .buy_total {
    width: 50%;
    display: inline-block;
    float: left;
    padding-left: 15px;
  }

  .buy_total span {
    color: #333333 !important;
    font-size: 16px;
  }

  .buy_btn {
    width: 50%;
    display: inline-block;
    float: right;
    text-align: center;
    background-color: #CC3A45;
    color: white;
    height: 50px;
  }

  .active {
    display: none;

  }

  .el-radio-group {
    width: 100%;
  }
</style>
