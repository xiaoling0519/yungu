<template>
  <div class="body_content">
    <div class="login">
      <img src="./img/img12.png" />
      <div class="kefu" v-if="model == 'find' || model == 'register'"><span class="gfkf" @click="erweima">官方客服</span></div>
    </div>
    <div class="cmy-login-box">
      <div class="cmy-login-min-box">
        <div class="aui-content aui-margin-b-15">
          <ul class="aui-list aui-form-list">
            <li class="aui-list-item">
              <div class="aui-list-item-inner">
                <div class="aui-list-item-label-icon"><img src="./img/img1.png" /></div>
                <div class="aui-list-item-input"><input type="number" v-model="userphone" placeholder="请输入手机号" autocomplete="off" /></div>
              </div>
            </li>
            <li class="aui-list-item">
              <div class="aui-list-item-inner">
                <div class="aui-list-item-label-icon"><img src="./img/img2.png" /></div>
                <div class="aui-list-item-input"><input v-model="userpassword" type="password" name="password" placeholder="请输入密码" autocomplete="off" /></div>
              </div>
            </li>
            <div class="forget" v-if="model == 'find' || model == 'login'" @click="forget()"><span>忘记密码</span></div>
            <li class="aui-list-item" v-if="model == 'find' || model == 'register'">
              <div class="aui-list-item-inner">
                <div class="aui-list-item-label-icon"><img src="./img/img2.png" /></div>
                <div class="aui-list-item-input"><input v-model="userpassword1" type="password" placeholder="再次输入密码" autocomplete="off" /></div>
              </div>
            </li>
            <li class="aui-list-item" v-if="model == 'find' || model == 'register'">
              <div class="aui-list-item-inner">
                <div class="aui-list-item-label-icon"><img src="./img/img3.png" /></div>
                <div class="aui-list-item-input"><input v-model="code" type="text" placeholder="请填写邀请码"/></div>
                <div class="aui-list-item-label-icon cmy-yzm-box">
                  <div @click="identification" class="cmy-yzm-none">识别</div>
                </div>
              </div>
            </li>
            <li v-if="model == 'find' || model == 'register'" v-show="show" class="aui-list-item">
              <div class="aui-list-item-inner">
                <div class="aui-list-item-label-icon"><img src="./img/img4.png" /></div>
                <div class="aui-list-item-input"><input type="text" v-model="useryzm" placeholder="验证码" /></div>
                <div class="aui-list-item-label-icon cmy-yzm-box">
                  <div @click="showTime ? yzm() : ''" :class="[!showTime ? 'cmy-yzm-show' : '']" class="cmy-yzm-none">{{ showTime ? '验证码' : time }}</div>
                </div>
              </div>
            </li>
          </ul>
        </div>
        <div class="cmy-login-bottom1 cmy-login-bottom-action " @click="reg(model)">
          {{ model == 'login' ? '登录' : model == 'register' ? '注册账号' : model == 'find' ? '确认' : '' }}
        </div>
        <div v-if="model == 'login' || model == 'register'" @click="link(model)" class="cmy-login-bottom2">{{ model == 'login' ? '注册账号' : '登录' }}</div>
      </div>
    </div>
    <!-- 信息弹出层 -->
    <div>
    	<div class="banner" v-if="bannerShow">
          <div class="cancel"><img @click="cancel" src="../../assets/img041.png"></div>
    			<div class="banner_text">
            <div class="portrait"><img :src="userinfo.logo"></div>
            <div class="name">{{userinfo.name}}</div>
          </div>
    	</div>
    	<div class="mask" v-if="bannerShow"></div>
    </div>
    <!-- 信息弹出层 -->
    <!-- 二维码弹出层 -->
    <div>
    	<div class="banner1" v-if="erweimashow">
          <div class="cancel1"><img @click="cancelewm" src="../../assets/img041.png"></div>
    			<div class="banner_text" style="margin-top: 0px !important;">
            <div class="banner_name" v-if="type == 1">郭总监</div>
             <div class="banner_name" v-if="type == 2">陈总监</div>
            <div class="portrait1" v-if="type == 1"><img src="./img/ewm001.png"></div>
           <div class="portrait1" v-if="type == 2"><img src="./img/ewm002.png"></div>
          </div>
    	</div>
    	<div class="mask" v-if="erweimashow"></div>
    </div>
    <!-- 二维码弹出层 -->
  </div>
</template>
<script>
import { register, login, sendSmsCode, getUserInfo,check_code } from '@/api/identity/zc.js';
import { getList } from '@/api/user.js';
import { Toast, MessageBox } from 'mint-ui';
import { setToken } from '@/utils/auth.js';
export default {
  data() {
    return {
      bottomAction: false, //当前是否已经点击
      userphone: '', //用户手机号保存
      useryzm: '', //用户验证码
      userpassword: '', //用户输入密码
      userpassword1: '', //用户输入保存密码
      myyzm: '', //我的验证码
      time: '', //验证码倒计时
      code: '',
      wx_id:'',
      show:false,
      bannerShow:false,
      erweimashow:false,
      userinfo:{},
      type:1
    };
  },
  props: {
    model: {
      type: String,
      default: 'login' //login 为登录 register 为注册 find 为找回密码
    }
  },
  computed: {
    //验证码发送后倒计时
    showTime() {
      if (!this.time) {
        clearInterval(this.myyzm);
        return true;
      }else{
        return false
      }
    }
  },
  methods: {
    //授权
    getUserInfo() {
      getUserInfo({})
        .then(data => {
          //console.log(data, 11);
        })
        .catch(err => {
          //console.log(err);
        });
    },
    // 页面跳转
    link(model) {
      if (model == 'login') {
        this.$router.push('/register');
        return false;
      }
      if (model == 'register') {
        this.$router.push('/login');
        return false;
      }
    },
    //跳转忘记密码页面
    forget(){
      let obj = this;
      console.log(11)
      obj.$router.push({ path: '/forget' });
      console.log(21)
    },
    //获取当前小时
   getNowFormatDate() {
     let time = 6;//多少小时修改一次显示二维码
      let h = new Date().getHours();//创建当前时间对象获取小时数
      let ys = h%time;//获取间隔时间的余数
      let b = (time-ys+h)/6;
      //console.log(b,88)
      if(b%2==1){
       // console.log(1);
       this.type =1;
      }
      if(b%2==0){
        //console.log(0);
        this.type =2;
      }
      //console.log(this.type)
      // return currentdate;
    },
    //官方二维码
    erweima(){
         this.erweimashow = true;
    },
    cancelewm(){
         this.erweimashow = false;
    },
    //登录注册
    reg(model) {
      let obj = this;
      if (model == 'register') {
        console.log('注册');
        if (obj.userphone == '') {
          obj.$message({
            message: '请填写手机号',
            type: 'error',
            duration: 1000,
            offset: 50
          });
          return;
        }
        if (obj.userphone.length != 11) {
          obj.$message({
            message: '请填写正确的手机号',
            type: 'error',
            duration: 1000,
            offset: 50
          });
          return;
        }
        if (obj.userpassword == '') {
          obj.$message({
            message: '请输入密码',
            type: 'error',
            duration: 1000,
            offset: 50
          });
          return;
        }
        if (obj.userpassword1 == '') {
          obj.$message({
            message: '请再次输入密码',
            type: 'error',
            duration: 1000,
            offset: 50
          });
          return;
        }
        if (obj.userpassword1 != obj.userpassword) {
          obj.$message({
            message: '两次输入的密码不符',
            type: 'error',
            duration: 1000,
            offset: 50
          });
          return;
        }
        if (obj.useryzm == '') {
          obj.$message({
            message: '请输入验证码',
            type: 'error',
            duration: 1000,
            offset: 50
          });
          return;
        }
        register({
          phone: obj.userphone,
          verify_code: obj.useryzm,
          password: obj.userpassword1,
          invite_code: obj.code,
          wx_id:obj.wx_id
        })
          .then(data => {
            if (data.code == 200) {
              this.$message({
                message: '注册成功',
                type: 'success',
                duration: 1000,
                offset: 50
              });
              setToken(data.data);
              //重新读取用户数据
              // obj.upData();
              setTimeout(function() {
                obj.$router.push('/login');
              }, 0);
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
      } else {
        console.log('登录');
        if (obj.userphone == '') {
          obj.$message({
            message: '请填写手机号',
            type: 'error',
            duration: 1000,
            offset: 50
          });
          return;
        }
        if (obj.userphone.length != 11) {
          obj.$message({
            message: '请填写正确的手机号',
            type: 'error',
            duration: 1000,
            offset: 50
          });
          return;
        }
        if (obj.userpassword == '') {
          obj.$message({
            message: '请输入密码',
            type: 'error',
            duration: 1000,
            offset: 50
          });
          return;
        }
        obj.$router.push('/');
        // login({
        //   phone: this.userphone,
        //   password: this.userpassword
        // })
        //   .then(data => {
        //     // setToken(data.data);
        //     // if (data.code == 200) {
        //     //    obj.$router.push('/');
        //     //   // this.$message({
        //     //   //   message: '登陆成功！正在跳转....',
        //     //   //   type: 'success',
        //     //   //   offset: 50
        //     //   // });
        //     //   // setTimeout(function() {
        //     //   //   obj.$router.push('/');
        //     //   // }, 1000);
        //     // } else {
        //     //   this.$message({
        //     //     message: data.msg,
        //     //     offset: 50
        //     //   });
        //     // }
        //   })
        //   .catch(err => {
        //     console.log(err);
        //   });
      }
    },
    //自动识别邀请码
    identification() {
      let obj = this;
      if (obj.code == '') {
        obj.$message({
          message: '请填写邀请码',
          type: 'error',
          duration: 1000,
          offset: 50
        });
        return;
      }
        check_code({
          yq_code:obj.code
        })
          .then(data => {
            obj.userinfo = data.data;
            obj.show = true;
            obj.bannerShow = true;
          })
          .catch(err => {
            console.log(err);
          });
    },
    //隐藏弹出窗
    cancel(){
      let obj = this;
      obj.bannerShow = false;
    },
    //输入手机号码的正则
    // phoneyz(yz) {
    // 	let yzn = yz.target.value
    // 	let reg = /^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/;
    // 	if(yzn !== "") {
    // 		if(yzn === "") {
    // 			this.$message({
    // 				message: '请输入手机号',
    // 				type: 'error',
    // 				duration: 1000,
    // 				offset: 50
    // 			});
    // 		} else if(yzn.length == 11 && reg.test(yzn)) {
    // 		} else {
    // 			console.log(yzn)
    // 			this.$message({
    // 				message: '请输入正确的手机号',
    // 				type: 'error',
    // 				duration: 1000,
    // 				offset: 50
    // 			});
    // 		}
    // 	} else {
    // 		this.$message({
    // 			message: '请输入手机号',
    // 			type: 'error',
    // 			duration: 1000,
    // 			offset: 50
    // 		});
    // 	}
    // },
    //获取验证码
    yzm() {
      let obj = this;
      if (obj.userphone == '') {
        obj.$message({
          message: '请填写手机号',
          type: 'error',
          duration: 1000,
          offset: 50
        });
        return;
      }
      if (obj.userphone.length != 11) {
        obj.$message({
          message: '请填写正确的手机号',
          type: 'error',
          duration: 1000,
          offset: 50
        });
        return;
      }

      obj.time = 60;
      obj.myyzm = setInterval(function() {
        obj.time--;
      }, 1000);
      sendSmsCode({
        phone: obj.userphone
      })
        .then(({ data }) => {
          obj.$message({
            message: '验证码已发送',
            type: 'success',
            duration: 1000,
            offset: 50
          });
        })
        .catch(err => {
          console.log(err);
        });
    },
    //输入密码的正则
    pawyz(pawy) {
      let pawyn = pawy.target.value;
      let reg = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,16}$/;
      if (pawyn !== '') {
        if (pawyn === '') {
          MessageBox.alert('请输入密码');
        } else if (pawyn.length >= 6 && reg.test(pawyn)) {
          console.log(pawyn);
        } else {
          console.log(pawyn);
          MessageBox.alert('密码至少6位，同时含有数字和字母');
        }
      } else {
        MessageBox.alert('请输入至少6位密码,同时含有数字和字母');
      }
    }
  },
  created() {
    let id =window.location.href.match(/\?wx_id=([0-9]*)#\/register/g)[0].replace(/\?wx_id=([0-9]*)#\/register/g,'$1');
    this.wx_id = id;
    console.log(this.wx_id,11)
    this.getUserInfo();
    this.getNowFormatDate();
     // console.log(loginToken,88)
  }
};
</script>
<style type="text/css" scoped>
.body_content {
  width: 100%;
  background-color: #FFFFFF;
  position: absolute;
  margin: 0;
  padding: 0;
  min-height: 100vh;
}

.login {
  width: 100%;
}
.forget{
  width: 100%;
  text-align: right;
  padding-top: 10px;
}
.forget span{
  font-size: 12px;
  color: #999999;
}
.cmy-login-bottom1,
.cmy-login-bottom2 {
  font-size: 0.8rem;
  padding: 0.7rem 0;
  text-align: center;
  line-height: 1;
  border-radius: 100px;
  margin-top: 0.75rem;
}

.cmy-login-bottom-action {
  background-color: #128e93;
}

.cmy-login-bottom1 {
  color: white;
  margin-top: 1.2rem;
}

.cmy-login-bottom2 {
  border: 1px solid #128e93;
  color: #128e93;
}

/*最外层包裹框*/

.cmy-recharge-box {
  background-color: white;
  height: 100%;
  margin-top: 0.5rem;
  padding-right: 0.5rem;
  padding-top: 0.75rem;
}

/*验证码*/

.cmy-yzm-show {
  background: white !important;
}

.cmy-yzm-none {
  width: 3rem;
  padding: 5px 0px;
  text-align: center;
  height: auto;
  line-height: 1;
  font-size: 0.6rem;
  color: #128e93;
  border-left: 1px solid #eeeeee;
}

.cmy-yzm-box {
  flex-shrink: 0;
}

.aui-list-item-inner input {
  font-size: 0.7rem;
  background-color: white !important;
}

/*包裹框*/

.cmy-login-box {
  width: 100%;
  margin: 0px auto;
  margin-top: -10px;
}

.cmy-login-min-box {
  height: 100%;
  background-color: white;
  padding-top: 0.75rem;
 /* border-radius: 10px; */
  padding: 10% 9%;
  margin-bottom: 15px;
}

/*找回密码*/

.cmy-login-wj {
  color: #999999;
  font-size: 0.6rem;
  float: right;
  margin-right: 2rem;
  margin-top: 0.5rem;
}

/* 清除aui自带默认样式s删除后部分手机会出现列表中多余横线的情况 */

.aui-list {
  background-image: none;
}

.aui-list-item {
  background-image: none !important;
}

.aui-list .aui-list-item-label-icon {
  padding-right: 0.6rem;
}

.aui-list-item {
  padding-top: 15px;
  padding-left: 0px !important;
  border-bottom: 1px solid #f0f0f0;
}

.aui-list .aui-list-item-input {
  padding-right: 0px !important;
}

input:-webkit-autofill {
  box-shadow: 0 0 0px 1000px white inset;
}
.kefu{
  width: 100%;
  text-align: right;
  padding: 0px 35px;
  color: white;
  position: absolute;
  z-index: 999;
 margin-top: -50px;


}
.gfkf{
  margin-top: -150px;
}
.kefu span{
  padding: 3px 15px;
  line-height: 1;
  border: 1px solid white;
  border-radius: 15px;
  font-size: 12px;

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
  	width: 70%;
  	position: fixed;
  	left: 50%;
  	top: 50%;
  	border-radius: 10rpx;
  	color: #ffffff;
  	z-index: 9999;
  	font-size: 28rpx;
  	transform: translate(-50%, -50%);

  }
  .banner_name{
    margin-bottom: 15px;
  }
  .banner {
  	padding: 48rpx 35rpx;
  	background: #FFFFFF;
  	border-radius: 10rpx;
    font-size: 14px;
  }
  .banner1 {
  	width: 70%;
  	position: fixed;
  	left: 50%;
  	top: 50%;
  	border-radius: 10rpx;
  	color: #ffffff;
  	z-index: 9999;
  	font-size: 28rpx;
  	transform: translate(-50%, -50%);

  }
  .banner1 {
  	background: #FFFFFF;
  	border-radius: 10rpx;
    font-size: 14px;
  }
  .banner_name {
  	font-size: 40rpx;
  	text-align: center;
  	margin-bottom: 10px;
  }
  .banner_text {
  	color: #333333;
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
  .cancel1 {
  	width: 100%;
  	text-align: right;
  	margin-top: 70rpx;
   /* border-bottom: 1px solid #F0F0F0; */
  }
  .cancel1 img{
    text-align: right;
    margin-top: 10px;
    margin-right: 10px;
  /* 	width: 20px;
  	height: 20px; */
  }
 .portrait{
   width: 80%;
   height: 80%;
   margin: 0px auto;
 }
 .portrait img{
   width: 100%;
   height: 100%;
 }
 .portrait1{
   width: 95%;
   height: 95%;
   margin: 0px auto;
 }
 .portrait1 img{
   width: 100%;
   height: 100%;
 }
 .name{
   width: 100%;
   text-align: center;
   margin-top: 15px;
 }
</style>
