<template>
  <div class="body_content">
    <div class="withdr_box">
      <div class="withdr_content">
        <p class="withdr_price">{{list.can_money}}</p>
        <p>可提现金额</p>
      </div>
      <div class="withdr_content">
        <p class="withdr_price">{{list.review_money}}</p>
        <p>待审核提现金额</p>
      </div>
    </div>
    <div class="withdr">
      <p class="cash_withdr">提现金额</p>
      <p class="cash_num">￥
      <input type="number" v-model="money" placeholder="请填写提现金额">
      <span class="all_cash">全部提现</span>
      </p>
      <p></p>
    </div>
    <div class="submission" @click="submit_withdraw">提交申请</div>
  </div>

</template>
<script type="text/javascript">
  import {
    get_withdraw,
    submit_withdraw
  } from '@/api/mywallet.js';
  export default {
    data() {
      return {
        money: '',
        list: ''
      };
    },
    methods: {
      //获取数据
      loadList() {
        get_withdraw({
        }).then((
          data
        ) => {
          this.list = data.data;
        }).catch((err) => {
          console.log(err);
        })
      },
      //提交提现信息
      submit_withdraw() {
        submit_withdraw({
          money: this.money
        }).then((
          data
        ) => {
          this.loadList()
          if(data.code == 200){
            this.$message({
              message: data.msg,
              type:"success",
              offset: 50
            });
          }else{
             this.$message({
              message: data.msg,
              offset: 50
            });
            }
        }).catch((err) => {
          console.log(err);
        })
      },
    },
    created() {
      this.loadList()
    }
  }
</script>

<style type="text/css" scoped>
  .body_content {
    width: 100%;
    height: 100%;
    background-color: white;
  }

  .withdr_box {
    width: 100%;
    background-color: white;
    margin: 0px auto;
    position: relative;
    padding: 15px 10px;
  }

  .withdr_content {
    display: inline-block;
    width: 49%;
    text-align: center;
    border-right: 1px solid #EEEEEE;
  }

  .withdr_content:last-child {
    border-right: none;
  }

  .withdr_price {
    font-size: 18px !important;
    color: #333333;
    font-weight: bold;
  }

  .withdr {
    border-top: 15px solid #F2F3F5;
    width: 100%;
    padding: 20px 15px;
    margin-bottom: 25px;
  }

  .cash_withdr {
    font-size: 17px;
    color: #333333 !important;
  }

  .cash_num {
    padding-top: 10px;
    color: #333333;
  }

  .cash_num input {
    padding: 0px 5px;
  }

  .all_cash {
    float: right;
    color: #128E93;
    font-size: 16px;
  }

  .submission {
    width: 70%;
    margin: 0px auto;
    background-color: #128E93;
    color: white;
    text-align: center;
    border-radius: 25px;
    padding: 10px 0px;
  }
</style>
