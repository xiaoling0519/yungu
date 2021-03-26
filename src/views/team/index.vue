<template>
  <div class="body_content">
    <div class="head_box">
      <div class="user_head">
        <div class="user_img"><img :src="user_info" /></div>
        <div class="user_name">
          <p class="user_name_text">
            <span class="username">{{ list.user_name }}</span>
            <span class="user_name_position" v-if="in_fo.vip_level == '0'"><img src="./img/01.png" /></span>
            <span class="user_name_position" v-if="in_fo.vip_level == '1'"><img src="./img/05.png" /></span>
            <span class="user_name_position" v-if="in_fo.vip_level == '2'"><img src="./img/04.png" /></span>
            <span class="user_name_position" v-if="in_fo.vip_level == '3'"><img src="./img/02.png" /></span>
            <span class="user_name_position" v-if="in_fo.vip_level == '4'"><img src="./img/03.png" /></span>
          </p>
          <p class="user_inviter" v-if="list.yq_user == null">邀请人：无</p>
          <p class="user_inviter" v-if="list.yq_user != null">邀请人：{{ list.yq_user }}</p>
        </div>
      </div>
      <div class="user_content">
        <div class="content_text">
          <p class="content_num">{{ list.ds_yq_count }}</p>
          <p class="content_name">代理团队(人)</p>
        </div>
        <div class="content_text">
          <p class="content_num">{{ list.zj_yq_count }}</p>
          <p class="content_name">直接邀请(人)</p>
        </div>
        <div class="content_text">
          <p class="content_num">{{ list.sum_money }}</p>
          <p class="content_name">总业绩</p>
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
          <div class="list_img"><img :src="ls.logo" /></div>
          <div class="list_content">
            <p class="conten_name">
              {{ ls.name }}
              <!-- <span>{{ ls.level }}</span> -->
            </p>
            <p class="conten_time">{{ ls.yq_time }}</p>
          </div>
          <div class="list_achievement">
            <p class="achievement_num">
              团队
              <span>{{ ls.team_count }}</span>
              人
            </p>
            <p class="achievement_pay">
              总业绩
              <span>{{ ls.sum_money }}</span>
              元
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script type="text/javascript">
import { getlist } from '@/api/team.js';
import { getList } from '@/api/user.js';
export default {
  data() {
    return {
      checkid: 3,
      list: '',
      user_info: '',
      in_fo:'',
      zj_yq_list: [],
      ds_yq_list: [],
      detail: [],
      invitation: [
        {
          invitation_name: '代理团队',
          id: 3
        },
        {
          invitation_name: '直推邀请',
          id: 1
        }
      ]
    };
  },
  methods: {
    //获取个人信息
    info() {
      getList({})
        .then(data => {
          this.user_info = data.data.user_info.logo;
          this.in_fo = data.data.user_info;
         // console.log(this.in_fo,11)
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
         // console.log(this.list, 22);
          this.zj_yq_list = data.data.zj_yq_list;
          this.ds_yq_list = data.data.ds_yq_list;
          this.detail = data.data.ds_yq_list;
          //console.log(this.zj_yq_list, 11)
        })
        .catch(err => {
          console.log(err);
        });
    },
    dianji(id) {
      this.checkid = id;
      if (this.checkid == 1) {
        this.detail = this.zj_yq_list;
      } else if (this.checkid == 2) {
        this.detail = this.jj_yq_list;
      } else if (this.checkid == 3) {
        this.detail = this.ds_yq_list;
      }
    }
  },
  activated() {
    this.loadList();
    this.info();
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
.username {
  display: inline-block;
  width: 100px;
  overflow: hidden; /*超出隐藏*/
  white-space: nowrap; /*强制在同一行显示*/
  text-overflow: ellipsis; /*省略号*/
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
  width: 100%;
  height: 35%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 20px !important;
  padding: 0px 10px;
}

.content_text {
  height: 100%;
  text-align: center;
  border-right: 1px solid #eeeeee;
  flex-grow: 1;
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
  margin: 0px auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.line {
  width: 100%;
  height: 1px;
  background: #eeeeee;
  margin-top: -1px;
}

.invitation_name {
  display: block;
  text-align: center;
  float: left;
  line-height: 40px;
  flex-grow: 1;
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
  height: 70px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.list:last-child {
  border-bottom: none;
}

.list_img {
  display: inline-block;
  width: 50px;
  height: 50px;
  float: left;
  margin-right: 10px;
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
  flex-grow: 1;
}

.conten_name {
  font-size: 16px !important;
  color: #3f454b;
}

.conten_name span {
  font-size: 12px !important;
  color: #128e93;
  border: 1px solid #128e93;
  border-radius: 25px;
  padding: 0px 10px;
  margin-left: 10px;
}

.conten_time {
  padding-top: 5px;
}

.list_achievement {
  display: inline-block;
  text-align: right;
}

.achievement_num span {
  color: #cc3a45;
}

.achievement_pay {
  padding-top: 10px;
}
</style>
