<template>
  <div class="body_content">
    <div class="login"><img src="./img/img12.png" /></div>
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
                <div class="aui-list-item-input"><input v-model="userpassword" type="password" name="password" placeholder="请输入新密码" autocomplete="off" /></div>
              </div>
            </li>
            <li class="aui-list-item">
              <div class="aui-list-item-inner">
                <div class="aui-list-item-label-icon"><img src="./img/img2.png" /></div>
                <div class="aui-list-item-input"><input v-model="userpassword1" type="password" placeholder="再次输入新密码" autocomplete="off" /></div>
              </div>
            </li>
            <li class="aui-list-item">
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
        <div class="cmy-login-bottom1 cmy-login-bottom-action" @click="forget()">确认找回</div>
        <div class="cmy-login-bottom2" @click="login()">返回登录</div>
      </div>
    </div>
  </div>
</template>
<script>
import { edit_pass,sendSmsCode } from '@/api/identity/zc.js';
import { Toast, MessageBox } from 'mint-ui';
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
      code: ''
    };
  },
  computed: {
    //验证码发送后倒计时
    showTime() {
      if (!this.time) {
        clearInterval(this.myyzm);
        return true;
      } else {
        return false;
      }
    }
  },
  methods: {
    //跳转忘记密码页面
    login() {
      let obj = this;
      obj.$router.push({ path: '/login' });
    },
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
    //找回密码
    forget() {
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
      edit_pass({
        phone:obj.userphone,
        code: obj.useryzm,
        password: obj.userpassword1,
      })
        .then(data => {
          if (data.code == 200) {
            this.$message({
              message: '修改成功',
              type: 'success',
              duration: 1000,
              offset: 50
            });
            setTimeout(function() {
              obj.$router.push('/login');
            }, 1000);
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
  created() {}
};
</script>
<style type="text/css" scoped>
.body_content {
  width: 100%;
  background-color: #ffffff;
  position: absolute;
  margin: 0;
  padding: 0;
  min-height: 100vh;
}

.login {
  width: 100%;
}
.forget {
  width: 100%;
  text-align: right;
  padding-top: 10px;
}
.forget span {
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
.kefu {
  width: 100%;
  text-align: right;
  padding: 0px 35px;
  color: white;
  position: absolute;
  z-index: 999;
  margin-top: -50px;
}
.gfkf {
  margin-top: -150px;
}
.kefu span {
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
.banner_name {
  margin-bottom: 15px;
}
.banner {
  padding: 48rpx 35rpx;
  background: #ffffff;
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
  background: #ffffff;
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
.cancel img {
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
.cancel1 img {
  text-align: right;
  margin-top: 10px;
  margin-right: 10px;
  /* 	width: 20px;
  	height: 20px; */
}
.portrait {
  width: 80%;
  height: 80%;
  margin: 0px auto;
}
.portrait img {
  width: 100%;
  height: 100%;
}
.portrait1 {
  width: 95%;
  height: 95%;
  margin: 0px auto;
}
.portrait1 img {
  width: 100%;
  height: 100%;
}
.name {
  width: 100%;
  text-align: center;
  margin-top: 15px;
}
</style>
