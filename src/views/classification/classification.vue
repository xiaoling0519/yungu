<template>
  <div class="body_content" id="info-box">
    <div v-for="(ls, ind) in list" :key="ind">
      <div class="block">
        <el-carousel trigger="click" height="350px" :interval="5000">
          <el-carousel-item v-for="(s, ind) in ls.img" :key="ind" v-if="s"><img :src="'http://api.yunguhc.com/' + s" /></el-carousel-item>
        </el-carousel>
      </div>
      <div class="goods_box">
        <div class="goods_title">{{ ls.goods_name }}</div>
        <div class="goods_price">
          <div v-if="ls.yh_price != ls.price && ls.yh_price">
            ￥{{ ls.yh_price }}
            <span v-if="ls.yh_price">￥{{ ls.price }}</span>
          </div>
          <div v-if="ls.yh_price == ls.price || !ls.yh_price">￥{{ ls.price }}</div>
          <span></span>
        </div>
        <div class="goos_info">
          <div class="goos_info_text">快递费：包邮</div>
          <div class="goos_info_text">销量：{{ ls.sales }}件</div>
          <div class="goos_info_text">浙江省 台州市</div>
        </div>
      </div>
      <!-- <div class="goods_box">
        <div class="mail_ship">
          <span class="shipping">包邮</span>
          单品满
          <span class="mail_price">128</span>
          包邮；全场满
          <span class="mail_price">128</span>
          包邮
        </div>
        <div class="mail_ship" style="padding-bottom: 0px !important;"><span class="shipping">积分</span>最高抵扣<span class="mail_price">48</span>元</div>
      </div> -->
      <div class="goods_box" @click.stop="show()">
        <div class="mail_ship" style="padding-bottom: 0px !important;">
          <span class="shipping">选择</span>
          {{ num + '件' }}
          <p class="ship_img"><img src="./img/zuola.png" /></p>
        </div>
      </div>
      <div class="goods_detail">
        <span>——</span>
        &nbsp;商品详情 &nbsp;
        <span>——</span>
      </div>
      <div class="detail_box" v-html="ls.content"></div>
      <div class="goods_buttom">
        <div class="foot_plan">
          <span class="foot_plan_detail" @click="toUrl()">
            <p class="foot_plan_img"><img src="./img/img01.png" /></p>
            <p class="foot_plan_text">首页</p>
          </span>
          <span class="foot_plan_detail" @click="addfavorites(ls)">
            <p class="foot_plan_img" v-if="ls.status == 0"><img src="./img/img02.png" /></p>
            <p class="foot_plan_img" v-if="ls.status == 1"><img src="./img/img52.png" /></p>
            <p class="foot_plan_text">收藏</p>
          </span>
          <span class="foot_plan_detail" @click="toshipping()">
            <p class="foot_plan_img"><img src="./img/img04.png" /></p>
            <p class="foot_plan_text">购物车</p>
          </span>
        </div>
        <div class="foot_plan">
          <div class="foot_plan_button add_to" @click.stop="show()">加入购物车</div>
          <div class="foot_plan_button buy_now" @click.stop="show()">立即购买</div>
        </div>
      </div>
      <div class="top_go" @click="toclassification"><img src="./img/img03.png" /></div>
      <div class="dialog_bg" v-bind:class="{ active: isActive }" v-bind:style="{ height: clientHeight + 'px' }"></div>
      <div class="dialog-footer" v-bind:class="{ active: isActive }">
        <div class="dialog-top">
          <p class="top_img" @click.stop="cancel()"><img src="./img/img041.png" /></p>
        </div>
        <div class="dialog-content">
          <div class="content_list" style="padding-top: 0px !important;">
            <p class="goods_tup"><img :src="'http://api.yunguhc.com/' + list[0].img[0]" /></p>
            <div class="list_text">
              <p class="list_name">{{ ls.goods_name }}</p>
              <p class="list_money">
                ￥
                <span>{{ ls.yh_price }}</span>
              </p>
            </div>
          </div>
          <div class="content_list" style="margin-bottom: 20px;border-bottom: none !important;">
            <p class="num_name">购买数量</p>
            <p class="goods_num"><el-input-number size="small" v-model="num" @change="handleChange" :min="1" :max="10"></el-input-number></p>
          </div>
        </div>
        <div class="pay_now">
          <p class="add_car" @click="toshopping()">加入购物车</p>
          <p class="buy_btn" @click="to_order(ls)">立即购买</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getList, Buy, add_car } from '@/api/classification/classification.js';
import { add } from '@/api/favorites/index.js';
import { Toast, MessageBox } from 'mint-ui';
export default {
  data() {
    return {
      isActive: true,
      list: '',
      num: 1,
      totalprice: '',
      clientHeight: '',
      data: [
        {
          pid: '',
          num: ''
        }
      ]
    };
  },
  methods: {
    //获取商品详细信息
    loadList() {
      let obj = this;
      getList({
        pid: this.pid
      })
        .then(data => {
          this.list = (data.data || []).map(function(i) {
            i.content = i.content.replace(/<img\ssrc="\S*(uploads)/g, '<img src="http://api.yunguhc.com/$1');
            //console.log(i.content);
            return i;
          });
        })
        .catch(err => {
          console.log(err);
        });
    },
    //添加到收藏夹
    addfavorites(ls) {
      add({
        pid: ls.id
      })
        .then(data => {
          if (data.msg == '取消收藏成功') {
            this.$message({
              message: data.msg,
              type: 'warning',
              offset: 50
            });
          }
          if (data.msg == '收藏成功') {
            this.$message({
              message: data.msg,
              type: 'success',
              offset: 50
            });
          }
          this.loadList();
        })
        .catch(err => {
          console.log(err);
        });
    },
    handleChange(value) {
      this.num = value;
      // console.log(this.num, 88);
    },
    //跳转到首页
    toUrl() {
      this.$router.push({
        path: '/home'
      });
    },
    //返回商品分类页
    toclassification() {
      this.$router.push({
        path: '/classification'
      });
    },
    //加入购物车
    toshopping(ls) {
      add_car({
        pid: this.pid,
        num: this.num
      })
        .then(({ data }) => {
          this.$message({
            message: '加入购物车成功',
            type: 'success',
            offset: 50
          });
          //取消弹窗
          this.isActive = true;
        })
        .catch(err => {
          console.log(err);
        });
    },
    //跳转到购物车
    toshipping() {
      this.$router.push({
        path: '/shopping'
      });
    },
    //立即购买
    to_order(ls) {
      var data = {
        pid: this.pid,
        num: this.num
      };
      var price = this.list[0].yh_price;
      var num = this.num;
      //console.log(price,num)
      this.totalprice += price * num;
      // console.log(this.totalprice, 11)
      Buy({
        data: [data],
        money: this.totalprice
      })
        .then(({ data }) => {
          var oid = data;
          let Url = '?id=' + oid;
          this.$router.push({
            path: '/order/index' + Url
          });
        })
        .catch(err => {
          console.log(err);
        });
    },
    cancel() {
      //取消弹窗
      this.isActive = true;
    },
    show() {
      // 显示弹窗
      this.isActive = false;
      this.clientHeight = document.getElementById('info-box').clientHeight;
      //console.log(this.clientHeight)
    }
  },
  created() {
    this.pid = this.$route.query.id;
    this.loadList();
  }
};
</script>
<style scoped>
.body_content {
  width: 100%;
  background-color: #f9f9f9;
}

.el-carousel__item img {
  width: 100%;
  height: 100%;
}

.goods_box {
  width: 100%;
  background-color: white;
  padding: 15px 15px;
  margin-bottom: 15px;
}

a {
  color: white;
}

.goods_title {
  color: #333333;
  font-size: 16px;
  font-weight: bold;
  padding-bottom: 5px;
}

.goods_price {
  color: #cc3a45;
  font-size: 20px;
  font-weight: bolder;
}

.goods_price span {
  color: #999999;
  font-size: 16px;
  font-weight: normal;
  padding-left: 10px;
  text-decoration: line-through;
}

.goos_info {
  width: 100%;
  padding-top: 5px;
}

.goos_info_text {
  display: inline-block;
  width: 32%;
  font-size: 13px;
  color: #999999;
}

.goos_info_text:last-child {
  text-align: right;
}

.mail_ship {
  /* padding-bottom: 15px; */
  color: #333333;
}

.shipping {
  color: #666666;
  padding-right: 5%;
}

.mail_price {
  color: #cc3a45;
}

.ship_img {
  float: right;
}

.ship_img img {
  width: 18px;
  height: 18px;
  margin-top: 3px;
}

.goods_detail {
  color: #1d2023;
  text-align: center;
  margin-bottom: 15px;
  font-size: 18px;
}

.goods_detail span {
  color: #cccccc;
}

.detail_box {
  width: 100%;
  padding-bottom: 60px !important;
  position: relative;
}

.detail_box img {
  width: 100%;
  height: 100%;
}

.goods_buttom {
  width: 100%;
  position: fixed;
  bottom: 0;
  z-index: 999;
  background-color: white;
}

.foot_plan {
  display: inline-block;
  width: 50%;
  height: 100%;
  float: left;
}

.foot_plan_detail {
  display: inline-block;
  width: 30%;
  height: 100%;
  padding-top: 10px;
}

.foot_plan_img {
  width: 21px;
  height: 22px;
  margin: 0px auto;
}

.foot_plan_text {
  text-align: center;
  font-size: 12px;
}

.foot_plan_button {
  display: inline-block;
  width: 50%;
  float: left;
  line-height: 50px;
}

.add_to {
  background: #f2ab3c;
  color: white;
  font-size: 13px;
  text-align: center;
}

.buy_now {
  background: #cc3a45;
  color: white;
  font-size: 13px;
  text-align: center;
}

.top_go {
  position: fixed;
  top: 15px;
  left: 15px;
  width: 30px;
  height: 30px;
  z-index: 99;
}

.dialog_bg {
  background-color: #000000;
  z-index: 99;
  width: 100%;
  opacity: 0.5;
  position: absolute;
  top: 0px;
  margin: 0;
  padding: 0;
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
  width: 100%;
  height: 60px;
}

.top_img {
  float: right;
}

.dialog-content {
  padding: 0px 15px;
}

.content_list {
  border-bottom: 1px solid #eeeeee;
  padding: 15px 0px;
  position: relative;
}

.goods_tup {
  display: inline-block;
  width: 25%;
  height: 100%;
}

.goods_tup img {
  width: 100%;
  height: 100%;
}

.list_text {
  display: inline-block;
  width: 75%;
  padding-left: 10px;
  position: absolute;
}

.list_name {
  height: 45px;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  overflow: hidden;
  text-overflow: ellipsis;
}

.list_money {
  color: #cc3a45;
}

.list_money span {
  font-size: 18px !important;
  font-weight: bold;
}

.num_name {
  display: inline-block;
}

.goods_num {
  display: inline-block;
  float: right;
}

.pay_now {
  background: white;
  width: 100%;
  height: 50px;
  line-height: 50px;
}

.add_car {
  width: 50%;
  display: inline-block;
  float: left;
  text-align: center;
  background-color: #f2ab3c;
  color: white;
  height: 50px;
  font-size: 16px !important;
}

.buy_btn {
  width: 50%;
  display: inline-block;
  float: right;
  text-align: center;
  background-color: #cc3a45;
  color: white;
  height: 50px;
  font-size: 16px !important;
}

.active {
  display: none;
}
</style>
