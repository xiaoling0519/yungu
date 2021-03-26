<template>
  <div class="body_content">
   <div @click="logistics">
     <div class="order_status" v-if="list.status ==1">待付款（查看物流信息）</div>
     <div class="order_status" v-if="list.status ==2">待发货（查看物流信息）</div>
     <div class="order_status" v-if="list.status ==3">待收货（查看物流信息）</div>
     <div class="order_status" v-if="list.status ==4">已完成（查看物流信息）</div>
   </div>
    <div class="address_box">
      <div class="address_name">
        <span class="name">{{receipt_info.name}}</span>
        <span class="phone">{{receipt_info.phone}}</span>
      </div>
      <div class="address_text">
        <p class="address">{{receipt_info.address}}</p>
      </div>
    </div>
    <div class="division"></div>
    <div class="good_box">
      <div class="good_list" style="margin-top: 0px!important;">
        <div class="goods_order" v-for="ls in pro_list">
          <div class="content_img"><img :src="'http://api.yunguhc.com/'+ ls.img " /></div>
          <div class="content_title">
            <p class="content_name">{{ls.title}}</p>
            <div class="content_num">
              <p>￥{{ls.money}}</p>
              <p>x{{ls.num}}</p>
            </div>
            <p class="content_color">下单时间：{{list.create_time}}</p>
          </div>
        </div>
        <div class="order_total">
          <span>订单总价</span>
          <span style="float: right;">￥{{list.sum_money}}</span>
        </div>
        <div class="order_pay">
          <span>待返佣</span>
          <span style="float: right;font-size: 14px !important;">￥{{list.award_money}}</span>
        </div>
        <!-- <div class="order_pay">
          <span>实付</span>
          <span style="float: right;color: #CC3A45;">￥48.8</span>
        </div> -->
      </div>
    </div>
    <div class="order_info">
      <div class="info_name">
        <p></p>订单信息
      </div>
     <!-- <p style="position: relative;">订单编号：{{list.order_num}}<span class="copy" @click="copy()">复制单号</span></p> -->
     <!-- <input type="text" v-model="list.order_num" hidden="hidden" /> -->
      <p>创建时间：{{list.create_time}}</p>
      <p>付款时间：{{list.pay_time}}</p>
      <p>发货时间：{{list.ship_time}}</p>
      <p>完成时间：{{list.end_time}}</p>
    </div>
  </div>
</template>

<script>
  import {
    read
  } from '@/api/order.js';
  export default {
    data() {
      return {
        list: '',
        oid: '',
        pro_list: '',
        receipt_info:''
      };
    },
    methods: {
      //获取商品详细信息
      loadList() {
        let obj = this;
        read({
          oid: this.oid
        }).then((data) => {
          this.list = data.data;
          this.pro_list = data.data.pro_list;
          this.receipt_info = data.data.receipt_info
        }).catch((err) => {
          console.log(err);
        })
      },
      logistics() {
        let Url = "?id=" + this.oid;
        this.$router.push({
          path: '/order/logistics' + Url
        })
      },
      // copy() {
      // 	const input = document.createElement('input');
      // 	document.body.appendChild(input);
      // 	input.setAttribute('value', this.list.order_num);
      // 	input.select();
      // 	if (document.execCommand('copy')) {
      // 		document.execCommand('copy');
      // 		this.$message({
      // 			message: '复制成功',
      // 			type: 'success',
      //       offset:50
      // 		});
      // 	}

      // },
    },
    created() {
      this.oid = this.$route.query.id;
      this.loadList();
    }
  };
</script>

<style scoped="scoped">
  .body_content {
    width: 100%;
    background-color: #F2F3F5;
    position: absolute;
    margin: 0;
    padding: 0;
    min-height: 100vh;
  }

  .address_box {
    background-color: white;
    width: 100%;
    padding: 15px 15px;
  }

  .address_name {
   /* margin-bottom: 10px; */
  }

  .name {
    font-size: 18px;
    font-weight: 530;
  }

  .phone {
    color: #999999;
    font-size: 15px;
    float: right;
  }

  .address {
    width: 90%;
    display: inline-block;
    color: #333333;
    font-size: 14px;
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
    margin: 15px auto;
    padding: 15px 15px;
  }

  .good_list {
    width: 100%;
    margin-top: 15px;
    margin-bottom: 15px;

  }

  .goods_box {
    width: 100%;
    background-color: white;
    padding: 10px 15px;
    margin-bottom: 15px;
  }

  .goods_order {
    margin-bottom: 15px;
    position: relative;
    width: 100%;
  }

  .good_list:last-child {
    margin-bottom: 0px;
  }

  .content_img {
    display: inline-block;
    width: 27%;
    height: 80px;
    /* border: 1px solid #F0F0F0; */
    /* float: left; */
  }

  .content_img img {
    width: 100%;
    height: 100%;
  }

  .content_title {
    display: inline-block;
    width: 74%;
    padding-left: 10px;
    position: absolute;
  }

  .content_num {
    display: inline-block;
    float: right;
    width: 30%;
    text-align: right;
    color: #666666 !important;
  }

  .content_name {
    font-size: 14px;
    height: 42px;
    display: inline-block;
    -webkit-line-clamp: 2;
    overflow: hidden;
    text-overflow: ellipsis;
    color: #1D2023;
    width: 70%;

  }

  .content_color {
    font-size: 12px !important;
    margin-top: 10px;
  }

  .order_status {
    width: 100%;
    padding: 15px 15px;
    background-color: white;
    margin-bottom: 15px;
    color: #CC3A45;
  }

  .order_total {
    margin-top: 15px;
    color: #333333;
    border-bottom: 1px solid #F0F0F0;
    padding-bottom: 5px;
  }

  .order_pay {
    margin-top: 15px;
    color: #333333;
    padding-bottom: 5px;
  }

  .order_info {
    width: 100%;
    background-color: white;
    padding: 15px 15px;
  }

  .info_name {
    font-size: 16px;
    color: #333333 !important;
    margin-bottom: 15px;
  }

  .info_name p {
    display: inline-block;
    background-color: #128E93;
    width: 3px;
    height: 15px;
    float: left;
    margin-top: 5px;
    margin-right: 10px;
    border-radius: 100px;
  }

  .order_info p {
    color: #666666;
    font-size: 14px;
    padding: 8px 0px;

  }

  .copy {
    border: 1px solid #DDDDDD;
    padding: 3px 15px;
    border-radius: 15px;
    position: absolute;
    margin-top: -5px;
    right: 0;
  }
</style>
