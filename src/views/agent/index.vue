<template>
  <div class="body_content">
    <div class="agent">
      <p class="agent_hrad"><img :src="user_info"></p>
      <p class="agent_username">{{list.user_name}}</p>
      <p class="agent_position">
       <span  v-if="list.level == '0'"><img src="./img/01.png" /></span>
         <span v-if="list.level == '1'"><img src="./img/05.png" /></span>
         <span v-if="list.level == '2'"><img src="./img/04.png" /></span>
         <span v-if="list.level == '3'"><img src="./img/02.png" /></span>
         <span v-if="list.level == '4'"><img src="./img/03.png" /></span>
      </p>
    </div>
    <div class="agent_box">
      <p class="box_text">升级会员立享权益</p>
      <p class="box_text_go">立即升级，开始赚钱</p>
      <div class="agent_equity">
        <div class="equity_member">
          <p class="equity_img"><img src="./img/img039.png"></p>
          <p class="equity_text">返佣赚钱</p>
          <p class="equity_dj">多渠道收益</p>
        </div>
        <div class="equity_member">
          <p class="equity_img"><img src="./img/img13.png"></p>
          <p class="equity_text">总部授权</p>
          <p class="equity_dj">享官方直通</p>
        </div>
        <div class="equity_member">
          <p class="equity_img"><img src="./img/img037.png"></p>
          <p class="equity_text">会员身份</p>
          <p class="equity_dj">永久有效</p>
        </div>
      </div>
    </div>
    <div class="agent_list">
      <p class="list_name">
        <span class="list_title">晋升任务</span>
        <span class="list_text" @click="showto()">升级说明</span>
      </p>
      <p class="list_num">个人累计净利润达到￥<span>{{list.level_money}}</span></p>
      <p>
        <div class="aui-progress aui-progress-xs">
          <div class="aui-progress-bar" v-bind:style="{ width: sum_money  + '%' }"></div>
        </div>
        <span class="speed ">{{list.sum_money}}/{{list.level_money}}</span>
      </p>
    </div>
    <!-- 公告弹出层 -->
    <!-- <div>
    	<div class="banner" v-if="bannerShow">
          <div class="cancel"><img @click="cancel" src="../../assets/img041.png"></div>
    			<div class="banner_text">等级共分为四级，分别是：分销商，三级代理，二级代理，一级代理。
          </br>升级利润累计按级别分别为10000，70000，200000</div>
    	</div>
    	<div class="mask" v-if="bannerShow"></div>
    </div> -->
    <!-- 公告弹出层 -->
  </div>
</template>
<script type="text/javascript">
  import {
    getlist
  } from '@/api/agent.js';
    import {
    getList,
  } from '@/api/user.js';
  export default {
    data() {
      return {
        list:'',
        sum_money:'',
        user_info:'',
        bannerShow: false
      }
    },
    methods: {
       //获取个人信息
      info() {
        getList({}).then((data) => {
          this.user_info = data.data.user_info.logo;
          // console.log(this.user_info,11)
        }).catch((err) => {
          console.log(err);
        })
      },
      //获取数据
      loadList() {
        getlist({}).then((data) => {
          this.list = data.data;
          let count = data.data.level_money;
          var sum = data.data.sum_money;
          this.sum_money = sum / count;
          //console.log(this.sum_money,22)
          // this.agent();
        }).catch((err) => {
          console.log(err);
        })
      },
      //  agent(){
      //   console.log('a')
      //   console.log(this.list,55)
      //   if(this.list.level == 0){
      //    this.isActive = true;
      //   }
      // },
      showto(){
       this.$router.push({ path: '/explain' });
        // let obj = this;
        // obj.bannerShow = true;
      },
      // cancel(){
      //   let obj = this;
      //   obj.bannerShow = false;
      // }
    },
    created() {
       this.info();
      this.loadList();
    }
  }
</script>
<style scoped="scoped">
  .body_content {
    width: 100%;
    height: 100%;
    background-color: #F8F6F6;
  }

  .agent {
    width: 100%;
    height: 230px;
    background-image: url(./img/bj.png);
    background-repeat: no-repeat;
    background-size: 100% 100%;
    -moz-background-size: 100% 100%;
    padding: 15px 0px;
  }

  .agent_hrad {
    width: 60px;
    height: 60px;
    margin: 0px auto;
    background-color: #878787;
    border-radius: 100px;
    position: relative
  }

  .agent_hrad img {
    width: 90%;
    height: 90%;
    border-radius: 100px;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    margin: auto;
  }

  .agent_username {
    text-align: center;
    color: white !important;
    font-size: 16px;
    padding: 10px 0px;
  }

  .agent_position {
    margin: 0px auto;
    width: 25%;
    height: 9%;
  }

  .agent_position img {
    width: 100%;
    height: 100%;

  }

  .agent_box {
    width: 95%;
    margin: 0px auto;
    background-color: white;
    margin-top: -70px;
    border-radius: 5px;
    z-index: 100;
    padding: 20px 20px;
    text-align: center;
  }

  .agent_equity {
    width: 100%;
    padding-top: 25px;
  }

  .equity_member {
    display: inline-block;
    width: 32%;
  }

  .box_text {
    font-size: 16px;
    color: #474747 !important;
  }

  .box_text_go {
    color: #CDB381;
  }

  .equity_img {
    width: 40%;
    height: 100%;
    margin: 0px auto;
  }

  .equity_img img {
    height: 100%;
    width: 100%;
  }

  .equity_text {
    color: #737372 !important;
    font-size: 12px !important;
  }

  .equity_dj {
    font-size: 14px !important;
    color: #444444 !important;
  }

  .agent_list {
    width: 100%;
    background-color: white;
    margin-top: 15px;
    padding: 15px 15px;
  }

  .list_title {
    font-size: 18px;
    color: #333333;
  }

  .list_text {
    float: right;
    background-color: #E6D4A8;
    padding: 2px 10px;
    border-radius: 15px;
    background: linear-gradient(left top, #E6D4A8, #CCB379);
    color: white;
  }

  .list_num {
    color: #333333 !important;
    padding-top: 15px;
    font-size: 14px;
  }

  .list_num span {
    color: #CDB57B;
  }
  .speed{
    font-size: 14px;
    color: #666666 !important;
    margin-left: 10px;
  }

  .aui-progress {
    width: 70%;
    display: inline-block;
  }

  .aui-progress-bar {
    background: linear-gradient(left top, #E6D4A8, #CCB379);
    border-radius: 100px;
  }
  .aui-progress-xs {
    border-radius: 100px;
  }
  .active{
    height: 200px !important;
  }
  /* 遮罩层 */
  .mask {
  	background: rgba(0, 0, 0, 0.6);
  	position: fixed;
  	width: 100%;
  	height: 100%;
  	left: 0;
  	top: 0;
  	z-index: 9998;
  }

  /* 弹出层形式的广告 */
  .banner {
    padding: 15px 15px;
  	width: 80%;
  	position: fixed;
  	left: 50%;
  	top: 50%;
  	border-radius: 10rpx;
  	color: #ffffff;
  	z-index: 9999;
  	font-size: 28rpx;
  	transform: translate(-50%, -50%);
  }
  .banner {
  	padding: 48rpx 35rpx;
  	background: #FFFFFF;
  	border-radius: 10rpx;
    font-size: 14px;
  }
  .banner_name {
  	font-size: 40rpx;
  	text-align: center;
  	margin-bottom: 25rpx;
  }
  .banner_text {
  	color: #333333;
  	max-height: 380rpx;
  	min-height: 100rpx;
  	overflow: hidden;
  	text-overflow: ellipsis;
  	display: -webkit-box;
  	-webkit-box-orient: vertical;
  	-webkit-line-clamp: 8;
    margin-top: 10px;
  }
  .cancel {
  	width: 100%;
  	text-align: right;
  	margin-top: 70rpx;
   /* border-bottom: 1px solid #F0F0F0; */
  }
  .cancel img{
    text-align: right;
  /* 	width: 20px;
  	height: 20px; */
  }
  .banner_tip {
  	margin-top: 35rpx;
  	text-align: center;
  	color: #478ff0;
  }
</style>
