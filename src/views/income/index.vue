<template>
  <div class="body_content">
    <div class="head_box">
      <div class="user_head">
        <div class="user_img"><img :src="info.logo" /></div>
        <div class="user_name">
          <p class="user_name_text">
           <span class="username"> {{ info.name }}</span>
           <span class="user_name_position" v-if="info.vip_level == '0'"><img src="./img/01.png" /></span>
           <span class="user_name_position" v-if="info.vip_level == '1'"><img src="./img/05.png" /></span>
           <span class="user_name_position" v-if="info.vip_level == '2'"><img src="./img/04.png" /></span>
           <span class="user_name_position" v-if="info.vip_level == '3'"><img src="./img/02.png" /></span>
           <span class="user_name_position" v-if="info.vip_level == '4'"><img src="./img/03.png" /></span>
          </p>
          <p class="user_inviter" v-if="yq_user == 0">邀请人：无</p>
          <p class="user_inviter" v-if="yq_user != 0">邀请人：{{ yq_user }}</p>
        </div>
      </div>
      <div class="user_content">
        <div class="content_text" @click="toUrl()">
          <p class="content_num">{{ list.sum_money }}</p>
          <p class="content_name">总收益(元)</p>
        </div>
        <div class="content_text">
          <p class="content_num">{{ list.ds_money }}</p>
          <p class="content_name">代理收益(元)</p>
        </div>
        <div class="content_text">
          <p class="content_num">{{ list.user_money }}</p>
          <p class="content_name">我的收益(元)</p>
        </div>
        <div class="content_text" @click="toteam()">
          <p class="content_num">{{ list.zt_money }}</p>
          <p class="content_name">直推收益(元)</p>
        </div>
      </div>
    </div>
    <div class="invitation">
      <div class="invitation_head">
        <p class="invitation_name" v-for="(ls, ind) in invitation" :key="ind">
          <span @click="dianji(ls.id)" v-bind:class="{ active: ls.id == checkid }">{{ ls.invitation_name }}</span>
        </p>
      </div>
      <p class="line"></p>
      <div class="invitation_list">
        <div class="list" v-for="(ls, ind) in detail" :key="ind">
          <p class="list_img"><img :src="ls.logo" /></p>
          <p class="list_content">您团队的成员【{{ ls.user_name }}】在【{{ ls.pay_time }}】下单【{{ '￥'+  ls.money }}】。</p>
          <p class="list_text">
            获得奖励:
            <span>￥{{ ls.fy_money }}</span>
          </p>
          <p class="list_text">结算时间: {{ ls.end_time }}</p>
        </div>
      </div>
    </div>
  </div>
</template>
<script type="text/javascript">
import { getlist } from '@/api/income.js';
import { getList } from '@/api/user.js';
export default {
  data() {
    return {
      info: '',
      checkid: 3,
      list: '',
      yq_user: '',
      zt_detail: [],
      jt_detail: [],
      ds_detail:[],
      detail: [],
      invitation: [
        {
          invitation_name: '代理奖励',
          id: 3
        },
        {
          invitation_name: '我的奖励',
          id: 2
        },
        {
          invitation_name: '直推奖励',
          id: 1
        },
      ]
    };
  },
  methods: {
    //获取用户信息列表
    user_info() {
      getList({})
        .then(data => {
          this.info = data.data.user_info;
          this.yq_user = data.data.yq_user;
        })
        .catch(err => {
          console.log(err);
        });
    },
    //获取数据
    loadList() {
      getlist({})
        .then(data => {
          this.list = data.data;
          this.zt_detail = data.data.zt_detail;
          this.jt_detail = data.data.user_detail;
          this.ds_detail = data.data.ds_detail;
          this.detail = data.data.ds_detail;
          // console.log(this.zt_detail,11)
        })
        .catch(err => {
          console.log(err);
        });
    },
    dianji(id) {
      this.checkid = id;
      console.log(this.checkid, 11);
      if (this.checkid == 1) {
        this.detail = this.zt_detail;
      }
      if (this.checkid == 2){
        this.detail = this.jt_detail;
      }
       if (this.checkid == 3){
        this.detail = this.ds_detail;
      }
    }
  },
  created() {
    this.user_info();
    this.loadList();
    // this.user = this.$store.state.user;
    // console.log(this.user,99)
  }
};
</script>
<style scoped="scoped">
.body_content {
  width: 100%;
  height: 100%;
  background-color: #f8f6f6;
}

.head_box {
  background-color: white;
  height: 150px;
  width: 100%;
}

.user_head {
  width: 100%;
  height: 65%;
  padding: 20px 30px;
}
.username{
display: inline-block;
  width: 100px;
  overflow: hidden;   /*超出隐藏*/
      white-space: nowrap; /*强制在同一行显示*/
      text-overflow: ellipsis; /*省略号*/
}
.user_img {
  width: 60px;
  display: inline-block;
  height: 60px;
}

.user_img img {
  width: 100%;
  height: 100%;
  border-radius: 100px;
}

.user_name {
  display: inline-block;
  padding: 10px 10px;
  position: absolute;
}

.user_name_text {
  color: #333333;
  font-size: 18px !important;
  height: 30px;
}

.user_name_position {
  margin-left: 10px;
}

.user_name_position img {
  width: 65px;
  height: 18px;
}

.user_content {
  display: flex;
  align-items: center;
  width: 100%;
  height: 35%;
  padding-bottom: 20px !important;
  padding: 0px 10px;
}

.content_text {
  height: 100%;
  position: relative;
  flex-grow: 1;
  text-align: center;
  border-right: 1px solid #eeeeee;
}

.content_text:hover {
  cursor: pointer;
}

.content_text:last-child {
  border-right: none;
}

.content_num {
  font-size: 14px !important;
  font-weight: bold;
  color: #333333 !important;
}

.content_name {
  font-size: 12px !important;
}

.invitation {
  width: 100%;
  background-color: white;
  margin-top: 15px;
}

.invitation_head {
  height: 40px;
  width: 100%;
  display: flex;
  margin: 0px auto;
}

.line {
  width: 100%;
  height: 1px;
  background: #eeeeee;
  margin-top: -1px;
}

.invitation_name {
  flex-grow: 1;
  text-align: center;
  float: left;
  line-height: 40px;
}

.active {
  padding: 9px 0px;
  border-bottom: 2px solid #128e93;
}

.invitation_list {
  width: 100%;
  padding: 0px 15px;
  height: 100%;
}

.list {
  border-bottom: 1px solid #eeeeee;
  width: 100%;
  padding: 10px 0px;
}

.list:last-child {
  border-bottom: none;
}

.list_img {
  display: inline-block;
  width: 50px;
  height: 50px;
}

.list_img img {
  height: 100%;
  width: 100%;
  border-radius: 100px;
}

p {
  font-size: 12px !important;
}

.list_content {
  display: inline-block;
  float: right;
  font-size: 14px !important;
  color: #3f454b;
  width: 80%;
}

.list_text {
  font-size: 14px !important;
  padding-left: 60px;
}

.list_text span {
  color: #cc3a45;
}
</style>
