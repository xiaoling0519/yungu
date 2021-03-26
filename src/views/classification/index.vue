<template>
  <div class="body_content">
     <div class="shop_car" @click="toshopping()">
      <img src="./img/img068.png">
      <p class="car_num" style="font-size: 0.6rem !important;">{{house_num}}</p>
    </div>
    <div class="good_box">
      <div class="good_name">
        <div class="good_list" v-for="(ls,ind) in sort_list" :key="ind" v-on:click="clickTopUp(ls.id,ls.name)"  v-bind:class='{active:ls.id==checkid}'>
          <p v-bind:class='{active_span:ls.id==checkid}'>{{ls.name}}</p>
        </div>
      </div>
      <div class="good_class">
        <div>{{checkname}}</div>
        <div class="good_content" v-for="(ls,ind) in pro_list"  :key="ind" @click="toUrl(ls)">
          <div class="content_img"><img :src="'http://api.yunguhc.com/'+ ls.img1" /></div>
          <div class="content_title">
            <p class="content_name">{{ls.goods_name}}</p>
            <p class="content_sold">已售{{ls.sales}}件</p>
            <p class="content_price">￥{{ls.yh_price}}</p>
           <!-- <span class="content_jia">+</span> -->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {
    getList
  } from '@/api/classification/index.js';
  export default {
    data() {
      return {
        checkid: "1",
        checkname:'',
        value: '',
        pro_list: '',
        sort_list: [],
        house_num:''
      };
    },
    methods: {
      //获取分类列表
      loadList() {
        let obj = this;
        getList({
          fid: 5
        }).then(({
          data
        }) => {
          // console.log(data,55)
          obj.pro_list = data.pro_list;
          // console.log(obj.pro_list)
          obj.sort_list = data.sort_list;
          obj.house_num = data.house_num;
          //console.log(obj.house_num,11)
          obj.checkname = data.sort_list[0].name;
        }).catch((err) => {
          console.log(err);
        })
      },
      //切换
       List() {
        let obj = this;
        getList({
          fid: this.checkid
        }).then(({
          data
        }) => {
          console.log(data,55)
          obj.pro_list = data.pro_list;
          console.log(obj.pro_list)
          obj.sort_list = data.sort_list;
        }).catch((err) => {
          console.log(err);
        })
      },
      //切换分类
      clickTopUp(id,name) {
       this.checkid = id;
       console.log(this.checkid)
       this.checkname = name;
       console.log(this.checkname)
       this.List();
      },
      //跳转到商品详情
      toUrl(ls) {
        let Url ="?id=" + ls.id;
        this.$router.push({ path: '/classification/classification'+Url})
      },
      //跳转到购物车页面
      toshopping() {
        this.$router.push({
          path: '/shopping'
        })
      },
    },
    activated() {
      this.loadList();
    },
  }
</script>

<style>
  .mint-searchbar-inner .mintui-search {
    font-size: 20px;
    color: #666666;
    margin: 5px 10px 0px 5px;
  }

  .mint-searchbar {
    background-color: white;
  }

  .mint-searchbar-inner {
    background-color: #F6F6F6;
    border-radius: 50px;
    height: 35px;
  }

  .mint-searchbar-core {
    background-color: #F6F6F6;
    font-size: 14px;
  }
</style>
<style scoped>
  .body_content {
    width: 100%;
    position: absolute;
    margin: 0;
    padding: 0;
  }

  .seach_box {
    height: 50px;
  }

  .seach {
    width: 85%;
    height: 50px;
    display: inline-block;
    float: left;
    padding-left: 10px;
  }

  .mint-search {
    width: 100%;
    height: 50px;
    padding-left: 10px;
  }

  .shop_car {
    width: 15%;
    height: 50px;
    float: right;
    padding: 15px 5px;
    padding-right: 5px;
  }
  .shop_car img{
    height: 30px;
    height: 30px;
  }

  .car_num {
    width: 18px;
    height: 18px;
    position: absolute;
    right: 0;
    background-color: #CC3A45;
    border-radius: 100px;
    text-align: center;
    line-height: 18px;
    color: white !important;
    margin-right: 3%;
    margin-top: -0.3125rem;
    z-index: 999;
    display: inline-block;

  }

  .good_box {
    width: 100%;
    position: absolute;
    margin: 0;
    padding: 0;
  }

  .good_name {
    width: 22%;
    background-color: #F6F6F6;
    float: left;
    margin: 0;
    padding: 0;
    height: 100vh;
    position: absolute;
  }

  .good_list {
    text-align: center;
    color: #444444;
    padding: 15px 0px;
  }

  p {
    color: #333333 !important;
  }

  .active {
    background-color: white;
  }

  .active_span {
    border-left: 3px solid #03757A;
    padding: 5px 0px;
  }

  .good_class {
    float: right;
    width: 78%;
    height: 100%;
    padding: 20px 10px;
    font-size: 0.7rem;
    color: #444444;
    margin-bottom: 50px;
  }

  .good_content {
    width: 100%;
    padding-top: 18px;
    position: relative;
  }

  .content_img {
    display: inline-block;
    width: 30%;
    height: 100%;
    /* border: 1px solid #F0F0F0; */
  }

  .content_img img {
    width: 100%;
    height: 100%;
  }

  .content_title {
    display: inline-block;
    width: 69%;
    position: absolute;
    padding-left: 10px;
  }

  .content_name {
    font-size: 15px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;

  }

  .content_sold {
    font-size: 12px;
    color: #999999 !important;
    padding: 5px 0px;
  }

  .content_price {
    color: #CC3A45 !important;
    font-size: 15px;
    font-weight: bold;
    float: left;
  }

  .content_jia {
    width: 20px;
    height: 20px;
    float: right;
    background-color: #128E93;
    text-align: center;
    line-height: 18px;
    color: white !important;
    border-radius: 100px;
  }

  .content_jian {
    width: 20px;
    height: 20px;
    float: right;
    background-color: white;
    text-align: center;
    line-height: 18px;
    color: #AAAAAA !important;
    border-radius: 100px;
    border: 1px solid #AAAAAA;
  }

  .content_num {
    width: 30px;
    height: 20px;
    float: right;
    text-align: center;
    line-height: 18px;
    color: #666666 !important;
  }
</style>
