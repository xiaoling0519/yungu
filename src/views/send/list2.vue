<template>
  <div class="body_content">
     <div class="nodata" v-if="list == '' "><span>————</span><span class="nodata_text">暂时没有数据</span><span>————</span></div>
    <div class="goods_box"  v-for="ls in list">
      <div @click="tuorder(ls)">
        <div class="goods_status">
          <span class="order_number">订单编号：{{ls.order_sn}}</span>
          <span class="status_order" v-if="ls.status=='1'">待付款</span>
          <span class="status_order" v-if="ls.status=='2'">待发货</span>
          <span class="status_order" v-if="ls.status=='3'">待收货</span>
          <span class="status_order" v-if="ls.status=='4'">已完成</span>
        </div>
        <div class="goods" @click="toUrl(ls)">
          <div class="goods_img"><img :src="'http://api.yunguhc.com/'+ls.product_list.img"></div>
          <div class="goods_name">
            <p class="name">{{ls.product_list.title}}</p>
            <!-- <p class="text">自然系列；209</p> -->
          </div>
          <div class="goods_pay">
            <p class="money">￥{{ls.product_list.money}}</p>
            <p class="num">x{{ls.product_list.num}}</p>
          </div>
        </div>
        <div class="goods_total">共{{ls.product_list.num}}件商品 合计：￥{{ls.product_list.sum_money}}</div>
      </div>
   <div class="quxiao">
     <span class="goods_cancel" @click="toUrl(ls)"><span>立即付款</span></span>
     <span class="goods_cancel2" @click="goods_cancel(ls.id)"><span>取消订单</span></span>
   </div>
    </div>
  </div>
</template>

<script type="text/javascript">
    import {
    getList,del_order
  } from '@/api/send.js';
  export default {
    data() {
      return {
        status:'',
        list:'',
      };
    },
    methods: {
       //获取分类列表
      loadList() {
        getList({
          status:this.status
        }).then((
          data
        ) => {
          this.list = data.data;
        }).catch((err) => {
          console.log(err);
        })
      },
      //取消订单
      goods_cancel(item){
        console.log(111)
        let id = item;
       del_order({
         oid:id
       })
         .then(data => {
           if (data.code == 200) {
             this.$message({
               message: '取消成功',
               type: 'success',
               duration: 1000,
               offset: 50
             });
             this.loadList();
           } else {
             this.$message({
               message: data.msg,
               duration: 1000,
               offset: 50
             });
           }
         })
         .catch(err => {
           console.log(err);
         });
      },
      //立即付款跳转
       toUrl(ls){
         //console.log(ls,55)
         let Url = "?id=" + ls.id;
         this.$router.push({path: '/order/index' + Url})
       },
       tuorder(ls){
         console.log(111)
           let Url = "?id=" + ls.id;
           this.$router.push({path: '/order/order' + Url})
       }
    },
    created() {
      this.status = this.$route.query.status;
      this.loadList()
    },

  }
</script>

<style type="text/css" scoped>
  .body_content {
    width: 100%;
    background-color: #F8F6F6;
    position: absolute;
    margin: 0;
    padding: 0;
    margin-top: 3.3rem;
  }
  .nodata span{
    color: gainsboro;
    }
  .nodata{
    font-size: 12px;
    text-align: center;
  }
   .nodata_text{
    padding: 0px 10px;
    color: #333333 !important;
  }

  .goods_box {
    width: 90%;
    margin: 0px auto;
    padding: 15px 15px;
    background-color: white;
    border-radius: 5px;
    font-size: 12px;
    margin-bottom: 15px;
  }

  p {
    font-size: 12px !important;
  }

  .order_number {
    color: #999999;
    font-size: 13px;
  }

  .status_order {
    float: right;
    color: #CC3A45;
    font-size: 14px !important;
  }

  .goods {
    width: 100%;
    padding-top: 15px;
    position: relative;
  }

  .goods_img {
    display: inline-block;
    width: 25%;
    height: 100%;
   /* border: 1px solid #F0F0F0; */
  }
   .goods_img img{
    width: 100%;
    height:100%;
  }

  .goods_name {
    display: inline-block;
    width: 50%;
    position: absolute;
    padding-left: 10px;
  }

  .goods_pay {
    display: inline-block;
    width: 20%;
    float: right;
    text-align: right;
  }

  .name {
    font-size: 13px !important;
    color: #333333;
    font-weight: 520;
    max-height: 40px;
    min-height: 20px;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
  }

  .text {
    background-color: #F6F6F6;
    color: #606972;
    display: inline-block;
    padding: 2px 10px;
    border-radius: 10px;
    margin-top: 10px;
  }

  .money {
    color: #282828 !important;
    font-size: 14px !important;
  }

  .goods_total {
    text-align: right;
    color: #333333 !important;
    padding: 10px 0px;
   /* border-bottom: 1px solid #F0F0F0; */
    font-size: 14px !important;
  }

  .goods_cancel {
    text-align: right;
    padding-top: 15px;
    display: inline-block;
  }

  .goods_cancel span {
    border: 1px solid #CC3A45;
    padding: 5px 20px;
    border-radius: 25px;
    color: #CC3A45;
  }
  .goods_cancel2 {
    text-align: right;
    padding-top: 15px;
    display: inline-block;
  }

  .goods_cancel2 span {
    border: 1px solid #333333;
    padding: 5px 20px;
    border-radius: 25px;
    color: #333333;
  }
.quxiao{
  text-align: right;
}
  .go_buy {
    border: 1px solid #CC3A45 !important;
    color: #CC3A45 !important;
  }
</style>
