<template>
  <div id="cmy-user-box">
    <!-- 用户头康部分开始 -->
    <div id="cmy-user-base"></div>
    <div class="cmy-user-img-box ">
      <div class="user_head">
        <div class="user_img"><img :src="user_info.logo" /></div>
        <!-- 'http://api.yunguhc.comhc.com/'+ -->
        <div class="user_name">
          <div class="user_name_text">
            <div class="username">{{ user_info.name }}</div>
           <!-- <span class="user_name_position" v-if="user_info.vip_level == '0'"><img src="./img/01.png" /></span>
            <span class="user_name_position" v-if="user_info.vip_level == '1'"><img src="./img/04.png" /></span>
            <span class="user_name_position" v-if="user_info.vip_level == '3'"><img src="./img/02.png" /></span>
            <span class="user_name_position" v-if="user_info.vip_level == '4'"><img src="./img/05.png" /></span> -->
          </div>
          <p class="user_inviter" v-if="list.yq_user == 0">邀请人：无</p>
          <p class="user_inviter" v-if="list.yq_user != 0">邀请人：{{ list.yq_user }}</p>
        </div>
        <div class="user_setup" @click="tomodify()"><img src="./img/img01.png" /></div>
      </div>
      <div style="margin-top: -15px;z-index: 999;position: relative;margin-left: -0.625rem;">
        <div class="user_name_text">
          <span class="user_name_position" v-if="user_info.vip_level == '0'"><img src="./img/01.png" /></span>
          <span class="user_name_position" v-if="user_info.vip_level == '1'"><img src="./img/05.png" /></span>
          <span class="user_name_position" v-if="user_info.vip_level == '2'"><img src="./img/04.png" /></span>
          <span class="user_name_position" v-if="user_info.vip_level == '3'"><img src="./img/02.png" /></span>
          <span class="user_name_position" v-if="user_info.vip_level == '4'"><img src="./img/03.png" /></span>
        </div>
      </div>
      <div class="user_content">
        <div class="content_text" @click="toUrl()">
          <p class="content_num">{{ list.collCount }}</p>
          <p class="content_name">收藏夹</p>
        </div>
        <div class="content_text" @click="toteam()">
          <p class="content_num">{{ list.user_team }}</p>
          <p class="content_name">我的团队</p>
        </div>
        <div class="content_text">
          <p class="content_num">{{ user_info.yq_code }}</p>
          <p class="content_name">邀请码</p>
        </div>
      </div>
    </div>
    <!-- 用户头像部分结束 -->
    <div class="aui-content cmy-item-box aui-margin-t-15 aui-margin-l-10 aui-margin-r-10">
      <router-link to="/waitsend?status=0">
        <ul class="aui-list aui-list-in cmy-margin-b-1">
          <li class="aui-list-item">
            <div class="aui-list-item-inner aui-list-item-arrow">
              <div class="my_oder">我的订单</div>
              <div class="aui-list-item-right">全部订单</div>
            </div>
          </li>
        </ul>
      </router-link>
      <section class="aui-grid">
        <div id="cmy-order-box" class="aui-row">
          <router-link :to="{ path: '/waitsend/', query: { status: 1 } }">
            <div class="aui-col-xs-3">
              <div v-if="dfk_count" class="aui-badge">{{dfk_count}}</div>
              <div class="cmy-iconfont" :style="'background-image: url(' + orderImg.icon1 + ')'"></div>
              <div class="aui-grid-label">待付款</div>
            </div>
          </router-link>
          <router-link :to="{ path: '/waitsend/', query: { status: 2 } }">
            <div class="aui-col-xs-3">
              <div v-if="dfh_count" class="aui-badge">{{dfh_count}}</div>
              <div class="cmy-iconfont" :style="'background-image: url(' + orderImg.icon2 + ')'"></div>
              <div class="aui-grid-label">待发货</div>
            </div>
          </router-link>
          <router-link :to="{ path: '/waitsend/', query: { status: 3 } }">
            <div class="aui-col-xs-3">
              <div v-if="dsh_count" class="aui-badge">{{dsh_count}}</div>
              <div class="cmy-iconfont" :style="'background-image: url(' + orderImg.icon3 + ')'"></div>
              <div class="aui-grid-label">待收货</div>
            </div>
          </router-link>
          <router-link :to="{ path: '/waitsend/', query: { status: 4 } }">
            <div class="aui-col-xs-3">
              <div class="cmy-iconfont" :style="'background-image: url(' + orderImg.icon4 + ')'"></div>
              <div class="aui-grid-label">已完成</div>
            </div>
          </router-link>
        </div>
      </section>
      <div id="cmy-apps-list" class="aui-content aui-margin-t-10">
        <ul class="aui-list aui-list-in cmy-list cmy-list-font-color">
          <router-link to="/mywallet">
            <li class="aui-list-item">
              <div class="aui-list-item-inner aui-list-item-arrow cmy-border-b-1">
                <div class="aui-list-item-title cmy-list-item  cmy-padding-left-25 cmy-list-icon1">我的钱包</div>
                <div class="aui-list-item-right">{{ user_info.money || '0.00' }}</div>
              </div>
            </li>
          </router-link>
          <router-link to="/team">
            <li class="aui-list-item">
              <div class="aui-list-item-inner aui-list-item-arrow cmy-border-b-1">
                <div class="aui-list-item-title cmy-list-item  cmy-padding-left-25 cmy-list-icon2">我的团队</div>
                <div class="aui-list-item-right">{{ list.user_team || '0' }}</div>
              </div>
            </li>
          </router-link>
          <router-link to="/agent">
            <li class="aui-list-item">
              <div class="aui-list-item-inner aui-list-item-arrow cmy-border-b-1">
                <div class="aui-list-item-title cmy-list-item  cmy-padding-left-25 cmy-list-icon3">升级代理</div>
              </div>
            </li>
          </router-link>
          <router-link to="/income">
            <li class="aui-list-item">
              <div class="aui-list-item-inner aui-list-item-arrow cmy-border-b-1">
                <div class="aui-list-item-title cmy-list-item  cmy-padding-left-25 cmy-list-icon4">收益明细</div>
                <div class="aui-list-item-right"></div>
              </div>
            </li>
          </router-link>
          <router-link to="/authorization">
            <li class="aui-list-item">
              <div class="aui-list-item-inner aui-list-item-arrow cmy-border-b-1">
                <div class="aui-list-item-title cmy-list-item  cmy-padding-left-25 cmy-list-icon5">授权证书</div>
                <div class="aui-list-item-right"></div>
              </div>
            </li>
          </router-link>
          <router-link to="/contact">
            <li class="aui-list-item">
              <div class="aui-list-item-inner aui-list-item-arrow">
                <div class="aui-list-item-title cmy-list-item  cmy-padding-left-25 cmy-list-icon6">联系邀请人</div>
                <div class="aui-list-item-right"></div>
              </div>
            </li>
          </router-link>
        </ul>
      </div>
    </div>
  </div>
</template>
<script type="text/javascript">
import { getList, edit } from '@/api/user.js';
import { Toast, MessageBox } from 'mint-ui';
export default {
  data() {
    return {
      list: '',
      user_info: '',
      dfk_count:'',
      dsh_count:'',
      dfh_count:'',
      orderImg: {
        icon1: require('@/views/merchant_apps/img/img027.png'),
        icon2: require('@/views/merchant_apps/img/img028.png'),
        icon3: require('@/views/merchant_apps/img/img029.png'),
        icon4: require('@/views/merchant_apps/img/img030.png')
      }
    };
  },
  methods: {
    //获取个人信息
    loadList() {
      getList({})
        .then(data => {
          //console.log(data,11)
          this.list = data.data;
          this.dsh_count = data.data.dsh_count;
          this.dfk_count = data.data.dfk_count;
          this.dfh_count = data.data.dfh_count
          this.user_info = data.data.user_info;
        })
        .catch(err => {
          console.log(err);
        });
    },
    //跳转到收藏夹
    toUrl() {
      this.$router.push({ path: '/favorites' });
    },
    //跳转到我的团队
    toteam() {
      this.$router.push({ path: '/team' });
    },
    //修改资料
    tomodify() {
      this.$router.push({ path: '/modify' });
    }
  },
  activated() {
    this.loadList();
  }
};
</script>

<style scoped>
#cmy-user-box {
  padding-bottom: 3rem;
  background-color: #f8f6f6;
}

/*用户图片框*/

.cmy-user-img-box {
  width: 95%;
  height: 100%;
  background-color: white;
  border-radius: 10px;
  margin: 0px auto;
  margin-top: -15%;
  padding: 10px 15px;
}
.username{
  display: inline-block;
  float: left;
  width: 150px;
  overflow: hidden;   /*超出隐藏*/
      white-space: nowrap; /*强制在同一行显示*/
      text-overflow: ellipsis; /*省略号*/
}
/*用户信息框*/

#cmy-user-base {
  display: flex;
  background-image: url(./img/img11.png);
  background-size: 100% 100%;
  color: white;
  height: 110px;
}

.cmy-user-right {
  flex-grow: 1;
}
.aui-grid {
  border-bottom-right-radius: 10px;
  border-bottom-left-radius: 10px;
}
.aui-content {
  border-radius: 10px;
}

/*用户图片大小*/

#cmy-user-img {
  padding-left: 100%;
  padding-bottom: 100%;
  background-size: 100%;
}

/*会员卡样式*/

#cmy-user-member {
  background-size: 100% 100%;
  margin: 0 5% auto;
  height: 25%;
  width: 90%;
  position: absolute;
  bottom: 0px;
  box-shadow: 3px 2px 5px #5470da;
}
/*设置订单框*/

.cmy-item-box {
  border-radius: 5px;
}

/*设置订单名字体颜色*/

#cmy-order-box .aui-grid-label {
  color: #3f454b;
  font-size: 12px;
}

/*设置图片大小*/

.cmy-iconfont {
  width: 25px;
  height: 25px;
  margin: 0 auto;
  background-position: center center;
  background-repeat: no-repeat;
  background-size: 100%;
}

/* 设置列表功能字体样式 */

.cmy-list-font-color {
  color: #3f454b;
}

/*设置列表右侧箭头旁字体颜色*/

.cmy-list-font-color .aui-list-item-right {
  color: #888888;
}

/*设置列表左侧图标样式*/

.cmy-list-icon1 {
  background-image: url(img/list1.png);
}

.cmy-list-icon2 {
  background-image: url(img/list2.png);
}

.cmy-list-icon3 {
  background-image: url(img/list3.png);
}

.cmy-list-icon4 {
  background-image: url(img/list4.png);
}

.cmy-list-icon5 {
  background-image: url(img/list5.png);
}

.cmy-list-icon6 {
  background-image: url(img/list6.png);
}

/* 清除aui自带默认样式s删除后部分手机会出现列表中多余横线的情况 */

.aui-list {
  background-image: none;
}

.aui-list-item {
  background-image: none !important;
}
.user_head {
  width: 100%;
  height: 65%;
}
.user_img {
  width: 60px;
  position: relative;
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
  font-size: 18px;
  height: 25px;
  width: 20rpx;
}
.user_name_position {
  margin-left: 11px;
}
.user_name_position img {
 width: 60px;
  height: 15px;
}
.user_setup {
  float: right;
  padding: 10px 0px;
}
.user_setup img {
  width: 25px;
  height: 25px;
}
.user_inviter {
  padding: 5px 0px;
  font-size: 12px;
}
.user_content {
  width: 100%;
  height: 35%;
}
.content_text {
  display: inline-block;
  width: 32%;
  height: 100%;
  position: relative;
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
.aui-list .aui-list-item-title {
  font-size: 0.7rem !important;
}
</style>
