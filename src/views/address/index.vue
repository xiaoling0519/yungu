<template>
  <div class="body_content">
    <div class="address" v-for="ls in list">
      <div class="address_img">
        <input type="radio" name="name" value="" :class="{checked:ls.id==checked}" @click="change(ls.id)"></div>
      <div class="address_box" @click="toedit(ls.id)">
        <p class="address_name">{{ls.name}}</p>
        <p class="address_number">{{ls.mobile}}</p>
        <p class="address_text">{{ls.province}}{{ls.city}}{{ls.area}}{{ls.address}}</p>
      </div>
    </div>
    <div class="confirm" @click="confirm" v-if="list != '' ">确认</div>
  </div>
</template>
<script>
  import {
    // address_list,
    set_address,
    // del_address,
    search_address,
	sz
  } from '@/api/address.js';
  export default {
    data() {
      return {
        list: '',
        checked: '',
        oid: '',
        keyword:''
      };
    },
    methods: {
      //搜索收货地址
      tosearch(){
          search_address({
            keyword: this.keyword
          }).then((
            data
          ) => {
            this.list = data.data
            console.log(data)
          }).catch((err) => {
            console.log(err);
          })
      },
      //选中收货地址
      confirm() {
        sz({
          res_id: this.checked,
          oid:this.oid
        }).then((
          data
        ) => {
          let Url ="?id=" + this.oid;
          this.$router.push({path: '/order/index' + Url})
          console.log(Url,11)
        }).catch((err) => {
          console.log(err);
        })
      },
      change(id) {
        this.checked = id;
        console.log(this.checked, 55)
      },
    },
    created() {
      this.keyword = this.$route.query.value;
     this.oid = this.$route.query.oid;
      //encodeURI(encodeURI())
      console.log(this.keyword,11)
      this.tosearch();
    }
  };
</script>
<style>
  .el-radio__label {
    display: none;
  }

  .el-radio__inner {
    width: 20px;
    height: 20px;
  }

  .el-radio__input.is-checked .el-radio__inner {
    background-image: url('img/img045.png');
    background-size: 100% 100%;
    border: none;
    background-position: center;
    background-color: white;
  }

  .el-radio__inner::after {
    display: none;
  }
</style>
<style scoped="scoped">
  .body_content {
    width: 100%;
    background-color: #F8F6F6;
    position: absolute;
    margin: 0;
    padding: 0;
    min-height: 100vh;
  }

  .address {
    width: 90%;
    margin: 15px auto;
    background-color: white;
    height: 100px;
    border-radius: 10px;
    padding: 15px 0.9375rem;
  }

  .address_box {
    height: 100%;
    width: 87%;
    float: right;
    display: inline-block;
  }

  .address_name {
    font-size: 18px;
    color: #1D2023;
    width: 50%;
    display: inline-block;
  }

  .address_img {
    float: left;
    width: 10%;
    height: 100%;
  }

  .address_img img {
    width: 18px;
    height: 18px;
  }

  .address_number {
    color: #333333 !important;
    width: 50%;
    display: inline-block;
    float: right;
  }

  .confirm {
    width: 70%;
    margin: 30px auto;
    background: #128E93;
    color: white;
    padding: 10px 20px;
    text-align: center;
    border-radius: 50px;
  }

  .add_address {
    width: 70%;
    margin: 30px auto;
    background: white;
    color: #128E93;
    border: 1px solid #128E93;
    padding: 10px 20px;
    text-align: center;
    border-radius: 50px;
  }

  .address_text {
    margin-top: 10px;
    line-height: 20px;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;

  }

  .el-radio-group {
    width: 100%;
  }

  input[type="radio"] {
    text-indent: 0;
    width: 10px;
    height: 10px;
    text-align: center;
    display: inline-block;
    vertical-align: middle;
    line-height: 15px;
    position: relative;
    border-radius: 100%;
  }

  input[type="radio"]::before {
    content: "";
    position: absolute;
    top: -3px;
    left: -2px;
    background: #fff;
    width: 15px;
    height: 15px;
    border: 1px solid #bdbfc2;
    border-radius: 100%;
  }

  input[type="radio"]:checked::before {
    content: "\2713";
    background-color: #CC3A45;
    color: #fff;
    position: absolute;
    top: -3px;
    left: -2px;
    width: 15px;
    height: 15px;
    font-size: 12px;
    font-weight: bold;
    outline: none;
    border-color: #ccc;
    border: none;
    border-radius: 100%;
  }

  .del {
    position: absolute;
    right: 10px;
    margin-top: -25px;

  }

  .del img {
    width: 18px;
    height: 18px;
  }

  .el-message {
    width: 80% !important;
  }
</style>
