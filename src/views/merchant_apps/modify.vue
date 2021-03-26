<template>
  <div class="body_content">
    <div class="modify_head">
      <p class="modify_name">头像</p>
      <p class="modify_img" ref="userImg">
        <!-- <img :src="'http://api.yunguhc.com'+ user_info.logo"> -->
        <el-upload action="#" :show-file-list="false" list-type="picture-card" :auto-upload="false" :on-change="addImg" :multiple="false">
          <img v-if="dialogImageUrl" ref="imgus" @load="imgshow" :src="dialogImageUrl" />
        </el-upload>
      </p>
    </div>
    <ul class="aui-list aui-list-in cmy-list cmy-list-font-color">
      <li class="aui-list-item">
        <div class="aui-list-item-inner cmy-border-b-1">
          <div class="aui-list-item-title cmy-list-item cmy-list-icon1">用户名</div>
          <div class="aui-list-item-right"><input v-model="list.name" class="name" @change="edit()" /></div>
        </div>
      </li>
      <li class="aui-list-item">
        <div class="aui-list-item-inner aui-list-item-arrow cmy-border-b-1" @click.stop="show()">
          <div class="aui-list-item-title cmy-list-item cmy-list-icon2">性别</div>
          <div class="aui-list-item-right"><input v-model="list.sex" class="name" /></div>
        </div>
      </li>
    </ul>
    <div class="submission" @click="loginout()">退出登录</div>
      <div class="cmy-login-bottom2"  @click="update()">修改密码</div>
    <div class="dialog_bg" v-bind:class="{ active: isActive }"></div>
    <div class="dialog-footer" v-bind:class="{ active: isActive }">
      <div class="dialog-top">
        <p class="cancel" @click.stop="cancel()">取消</p>
        <p class="title">选择性别</p>
        <p class="confirm" @click.stop="confirm()">确定</p>
      </div>
      <div class="dialog-content"><mt-picker :slots="slots" @change="onValuesChange"></mt-picker></div>
    </div>
  </div>
</template>

<script>
import { getList, edit } from '@/api/user.js';
import { out_login } from '@/api/identity/zc.js';
import { Toast, MessageBox } from 'mint-ui';
import { removeToken } from '@/utils/auth';
export default {
  data() {
    return {
      list: {
        name: '',
        img: '',
        sex: ''
      },
      dialogImageUrl: '',
      slots: [
        {
          defaultIndex: 2,
          values: ['男', '女', '保密'],
          className: 'slot',
          textAlign: 'center'
        }
      ],
      isActive: true
    };
  },
  methods: {
    //
    imgshow(e) {
      let obj = this;
      // alert(e.target.src);
      // console.log(this.$refs.userImg.clientHeight);
      // alert("图片地址"+this.$refs.imgus.src);
      // setTimeout(function() {
      //   alert("高度："+obj.$refs.userImg.clientHeight);
      // }, 6000);
      // console.log(this.$refs.imgus);
    },
    //获取个人信息
    loadList() {
      getList({})
        .then(data => {
          var user_info = data.data.user_info;
          this.dialogImageUrl =  user_info.logo;
          this.list.img = user_info.logo;
          this.list.name = user_info.name;
          if (user_info.sex == 1) {
            this.list.sex = '男';
          } else {
            this.list.sex = '女';
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    //退出登录
    loginout(){
      out_login({})
        .then(data => {
        removeToken()
       this.$router.push({path: '/login'})
        })
        .catch(err => {
          console.log(err);
        });
    },
    //修改密码
    update(){
      this.$router.push({path: '/forget'})
      },
    //修改
    edit() {
      // 创建上传实例
      let forms = new FormData();
      let arr = this.list;
      for (let i in arr) {
        forms.append(i, arr[i]);
      }
      // 添加token
      forms.append('token', getToken());
      edit(forms)
        .then(data => {
          this.$message({
            message: data.msg,
            offset: 50
          });
        })
        .catch(err => {
          console.log(err);
        });
    },
    //选择性别
    onValuesChange(picker, value) {
      this.list.sex = value[0];
    },
    // 改变图片
    addImg(file, list) {
      this.dialogImageUrl = file.url;
      this.list.img = file.raw.name;
      this.edit();
    },
    // 性别选择
    show() {
      // 显示弹窗
      this.isActive = false;
    },
    //取消
    cancel() {
      this.isActive = true;
    },
    confirm() {
      // 显示弹窗
      this.isActive = true;
      this.edit();
    }
  },
  created() {
    this.loadList();
  }
};
</script>
<style>
.modify_img .el-upload--picture-card {
  background: none !important;
  border: none !important;
  width: 50px !important;
  height: 50px !important;
  line-height: 50px !important;
}

.aui-list .aui-list-item:active {
  background-color: white;
}
/* .picker-slot-wrapper {
    height: 40px !important;
    transform: translate(0px, 72px) translateZ(0px);
  }
  .picker-slot {
    font-size: 18px;
    overflow: hidden;
    position: relative;
   height: 140px !important;
} */
</style>
<style scoped="scoped">
  .cmy-login-bottom2 {

      border: 1px solid #128e93;
      color: #128e93;
    width: 70%;
    margin: 35px auto;
    font-size: 0.8rem;
    padding: 0.6rem 0;
    text-align: center;
    line-height: 1;
    border-radius: 100px;
    margin-top: 0.75rem;

  }
.aui-list {
  background-image: none;
}

.aui-list .aui-list-item {
  padding-left: 0px !important;
}

.aui-list-item-right {
  font-size: 13px !important;
}

.aui-list-item-right img {
  width: 50px;
  height: 50px;
}

.cmy-list-item {
  padding-left: 15px !important;
}

.body_content {
  width: 100%;
  height: 100%;
  background-color: #f8f6f6;
}

.modify_head {
  width: 100%;
  background-color: white;
  margin-bottom: 15px;
  padding: 10px 15px;
  height: 70px;
}

.modify_name {
  float: left;
  display: inline-block;
  line-height: 50px;
  color: #212121;
  font-size: 0.8rem;
}

.name {
  text-align: right;
}

.modify_img {
  float: right;
  display: inline-block;
  height: 50px;
  width: 50px;
}

.modify_img img {
  width: 100%;
  height: 100%;
  border-radius: 100px;
  /* margin-top: -50px; */
}

.dialog_bg {
  background-color: #000000;
  z-index: 99;
  width: 100%;
  height: 100%;
  opacity: 0.5;
  position: absolute;
  top: 0px;
}

.dialog-footer {
  position: fixed;
  bottom: 0px;
  background-color: white;
  width: 100%;
  height: 200px;
  z-index: 999;
  border-top-left-radius: 7px;
  border-top-right-radius: 7px;
  overflow: hidden;
}

.dialog-top {
  width: 100%;
  padding: 15px 15px;
  border-bottom: 1px solid #eeeeee;
}

p {
  color: #333333 !important;
  font-size: 14px !important;
}

.cancel {
  display: inline-block;
  width: 20%;
  float: left;
}

.title {
  display: inline-block;
  width: 60%;
  text-align: center;
  font-size: 16px !important;
  font-weight: bold;
}

.confirm {
  display: inline-block;
  width: 20%;
  float: right;
  text-align: right;
}

.dialog-content {
  width: 100%;
  padding: 10px 0px;
  text-align: center;
  height: 120px;
  /* overflow-y: auto;
    overflow-x: hidden; */
}

.dialog-content p {
  padding: 5px 0px;
  font-size: 15px !important;
  color: #999999 !important;
}

.dialog-content p:hover {
  color: #333333 !important;
}

.active {
  display: none;
}
.submission {
  width: 70%;
  margin: 35px auto;
  background-color: #128e93;
  color: white;
  text-align: center;
  border-radius: 25px;
  padding: 10px 0px;
  margin-bottom: 15px !important;
}
</style>
