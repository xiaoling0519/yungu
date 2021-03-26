<template>
  <div class="body_content">
    <div class="nodata" v-if="list == '' "><span>————</span><span class="nodata_text">暂时没有数据</span><span>————</span></div>
    <div v-if="list != '' " class="good_box">
      <div v-for="(ls,k) in list" class="good_list" style="margin-top: 0px!important;">
        <input class="check_box" type="checkbox" @click="selectSingle(k)" :checked="checkboxList.indexOf(ls.pid)>=0">
        <div class="content_img"><img :src="'http://api.yunguhc.com/' + ls.goods_img" /></div>
        <div class="content_title">
          <p class="content_name">{{ls.goods_name}}</p>
          <span style="float: right;" @click="del(ls)"><img src="../../assets/img041.png"></span>
          <p style="height: 10px;" v-if="ls.color == null"></p>
          <p class="content_color" v-if="ls.color != null">{{ls.color}}</p>
          <p class="price_box">
            <span class="content_price">￥{{ls.price}}</span>
            <span>
              <el-input-number size="mini" v-model="ls.num" @change="handleChange(ls)" :value="ls.num" :min="1" :max="10"></el-input-number>
            </span>
          </p>
        </div>
      </div>
    </div>
    <div class="good_foot" v-if="list != '' ">
      <p class="all_check"><input type="checkbox" @click="selectAll()" :checked="list.length===checkboxList.length&&list.length"
          style="margin: 0px;margin-top: -5px;"><span class="all_text">全选</span></p>
      <span class="total">合计：￥{{totalPrice}}</span>
      <span class="settlement" @click="settlement(totalPrice)">结算</span>
    </div>
  </div>
</template>
<script>
  import {
    getList,
    del,
    update
  } from '@/api/shopping/index.js';
  import {
    Buy
  } from '@/api/classification/classification.js';
  import {
    Toast,
    MessageBox
  } from 'mint-ui';
  export default {
    data() {
      return {
        isIndeterminate: true,
        list: '',
        //控制全选
        allChecked: true,
        //存放被选择的数据
        checkboxList: [],
        total: '',
        checked: false,
        data: ''
      };
    },
    methods: {
      //获取分类列表
      loadList() {
        let obj = this;
        getList({}).then(({
          data
        }) => {
          this.list = data;
        }).catch((err) => {
          console.log(err);
        })
      },
      //全选
      selectAll() {
        if (this.checked) { //实现反选
          this.checkboxList = [];
        } else { //实现全选
          this.checkboxList = [];
          this.list.forEach((item) => {
            this.checkboxList.push(item.pid);
          });
        }
      },
      //点击单选按钮
      selectSingle(k) {
        if (event.currentTarget.checked) {
          this.checkboxList.push(this.list[k].pid)
        } else {
          for (var i = 0; i < this.checkboxList.length; i++) {
            if (this.list[k].pid === this.checkboxList[i]) {
              this.checkboxList.splice(i, 1);
              this.allChecked = false;
              break;
            }
          }
        }
        console.log(this.checkboxList)
      },
      //删除
      del(ls) {
        del({
          pid: ls.pid
        }).then((data) => {
          this.$message({
            message: data.msg,
            type: 'success',
            offset: 50
          });
          this.loadList()
        }).catch((err) => {
          console.log(err);
        })
      },
      //修改商品数量
      handleChange(ls) {
        update({
          pid: ls.pid,
          num: ls.num
        }).then((data) => {
          this.$message({
            message: data.res,
            type: 'success',
            offset: 50
          });
          // this.loadList()
        }).catch((err) => {
          console.log(err);
        })
      },
      //结算
      settlement(totalPrice) {
        let arr = [];
        this.list.forEach((ls, k) => {
          if (this.checkboxList.indexOf(ls.pid) !== -1) {
            console.log(ls.pid, ls.num)
            arr.push({
              pid: ls.pid,
              num: ls.num
            })
          }
        });
        var money = totalPrice;
        // console.log(money,55);
        Buy({
          data: arr,
          money:money
        }).then((data) => {
          let Url = "?id=" + data.data;
          this.$router.push({
            path: '/order/index' + Url
          })
        }).catch((err) => {
          console.log(err);
        })
      }
    },
    watch: {
      checkboxList: {
        handler: function(val, oldVal) {
          if (this.checkboxList.length === this.list.length) {
            this.checked = true;
          } else {
            this.checked = false;
          }
        },
        deep: true
      }
    },
    computed: {
      //totalPrice计算总价
      totalPrice() {
        var totalprice = 0;
        //加入选择框以后的计算总价
        this.list.forEach((ls, k) => {
          if (this.checkboxList.indexOf(ls.pid) !== -1) {
            totalprice += ls.price * ls.num;
            // console.log(ls.price, ls.num)
          }
        });
        return totalprice
      },
    },
    created() {
      this.loadList();
    }
  };
</script>
<style>
  .el-checkbox__label {
    width: 100% !important;
    height: 100%;
  }

  .el-message {
    min-width: 90%;
  }
</style>
<style scoped="scoped">
  .nodata span {
    color: gainsboro;
  }

  .nodata {
    font-size: 12px;
    text-align: center;
    margin-top: 15px;
  }

  .nodata_text {
    padding: 0px 10px;
    color: #333333 !important;
  }

  li {
    width: 100%;
  }

  li:before {
    display: inline-block;
    width: 10px;
    height: 10px;
    line-height: 10px;
    content: "";
    border: 1px #000 solid;
    margin-right: 2px;
    transition: all 0.3s linear;
  }

  li.checked:before {
    background-color: #0CF;
    border: 1px #fff solid;
  }

  li.checked {
    color: #0CF;
  }

  .body_content {
    width: 100%;
    background-color: #F8F6F6;
    position: absolute;
    margin: 0;
    padding: 0;
    min-height: 100vh;
  }

  .good_box {
    width: 95%;
    background: white;
    margin: 15px auto;
    border-radius: 5px;
    padding: 15px 10px;
    margin-bottom: 60px;
  }

  .good_list {
    width: 100%;
    margin-bottom: 25px;
    position: relative;
    /*  height: 85px; */
  }

  .good_list:last-child {
    margin-bottom: 0px;
  }

  .content_img {
    display: inline-block;
    width: 28%;
    height: 100%;
    margin-left: 10px;
    /* border: 1px solid #F0F0F0; */
  }

  .content_img img {
    width: 100%;
    height: 100%;
  }

  .content_title {
    display: inline-block;
    width: 60%;
    margin-left: 10px;
    position: absolute;

  }

  .check_box {
    display: inline-block;
    width: 10%;
    float: left;
    align-items: center;
    padding: 1.5rem 0px;
  }

  .content_name {
    font-size: 15px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    display: inline-block;
    width: 85%;


  }

  .price_box {
    height: 30px;
    position: relative;
  }

  .content_price {
    color: #CC3A45 !important;
    font-size: 15px;
    font-weight: bold;
    position: absolute;
    margin-top: 10px;
  }

  .goos_check {
    display: inline-block;
    float: left;
    margin-top: 20px;
    margin-right: 8px;
  }

  .all_check {
    display: inline-block;
    position: relative;
    width: 20%;
  }

  .all_text {
    margin-left: 10px;
    position: absolute;
  }

  .goos_check img {
    width: 15px;
    height: 15px;
  }

  .content_color {
    background-color: #F6F6F6;
    color: #606972 !important;
    display: inline-block;
    padding: 2px 8px;
    border-radius: 5px;
    font-size: 12px !important;
  }

  .el-input-number--mini {
    width: 90px;
    float: right;
  }

  .good_foot {
    position: fixed;
    bottom: 0;
    z-index: 999;
    height: 50px;
    width: 100%;
    background-color: white;
    padding: 0rem 10px;
    line-height: 50px;
  }

  .total {
    font-size: 14px;
    position: absolute;
    right: 32%;

  }

  .settlement {
    background-color: #CC3A45;
    padding: 1% 8%;
    float: right;
    border-radius: 15px;
    color: white;
    margin-top: -2%;
    line-height: 30px;
    font-size: 16px;
    margin-top: 7px;

  }

  input[type="checkbox"] {
    text-indent: 0;
    margin: 1.5rem 0px;
    width: 10px;
    height: 10px;
    text-align: center;
    display: inline-block;
    vertical-align: middle;
    line-height: 15px;
    position: relative;
    border-radius: 100%;
  }

  input[type="checkbox"]::before {
    content: "";
    position: absolute;
    top: -2px;
    left: -2px;
    background: #fff;
    width: 15px;
    height: 15px;
    border: 1px solid #bdbfc2;
    border-radius: 100%;
  }

  input[type="checkbox"]:checked::before {
    content: "\2713";
    background-color: #CC3A45;
    color: #fff;
    position: absolute;
    top: -2px;
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
</style>
