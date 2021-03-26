<template>
  <div class="body_content">
    <div class="content_top">
      <div class="top_box">
        <div class="top_name">账户余额</div>
        <div class="top_pay">
          <p class="top_price"><span class="font-18">￥</span>{{list.can_money}}</p>
          <p class="top_cash" @click="toUrl()">提现</p>
        </div>
      </div>
    </div>
    <div class="withdr_box">
      <div class="withdr_content">
        <p class="withdr_price">{{list.withdraw_money}}</p>
        <p>已提现</p>
      </div>
      <div class="withdr_content">
        <p class="withdr_price">{{list.not_send_money}}</p>
        <p>待结算(未确认收货)</p>
      </div>
    </div>
    <!-- <div class="daily">
      <div class="daily_name">今日日报</div>
      <div class="daily_box">
        <p class="daily_price">{{list.exp_sum_money}}</p>
        <p>代理奖励</p>
      </div>
      <div class="daily_box">
        <p class="daily_price">{{list.zt_money}}</p>
        <p>我的奖励</p>
      </div>
      <div class="daily_box">
        <p class="daily_price">{{list.jt_money}}</p>
        <p>直推奖励</p>
      </div>
    </div> -->
    <div class="daily">
      <div class="daily_name">昨日日报</div>
      <div class="daily_box">
        <p class="daily_price">{{list.yesterday_ds_award}}</p>
        <p>代理奖励</p>
      </div>
      <div class="daily_box">
        <p class="daily_price">{{list.yesterday_user_award}}</p>
        <p>我的奖励</p>
      </div>
      <div class="daily_box">
        <p class="daily_price">{{list.yesterday_zt_award}}</p>
        <p>直推奖励</p>
      </div>
    </div>
    <!-- <div class="year_time" @click.stop='show()'>{{yearCheck}}<img src="./img/up.png" /></div> -->
    <!-- <div class="year_list">
      <el-table :data="tableData">
        <el-table-column prop="month" label="月份">
        </el-table-column>
        <el-table-column prop="money" label="收益">
        </el-table-column>
        <el-table-column prop="balance" label="结余">
        </el-table-column>
      </el-table>
    </div> -->
    <!-- <div class="dialog_bg" v-bind:class="{ active: isActive }"></div> -->
    <!-- <div class="dialog-footer" v-bind:class="{ active: isActive }">
      <div class="dialog-top">
        <p class="cancel" @click.stop='cancel()'>取消</p>
        <p class="title">选择年份</p>
        <p class="confirm" @click.stop='confirm()'>确定</p>
      </div>
      <div class="dialog-content">
        <mt-picker :slots="slots" @change="onValuesChange"></mt-picker>
      </div>
    </div> -->
  </div>
</template>

<script type="text/javascript">
  import {
    getlist
  } from '@/api/mywallet.js';
  export default {
    data() {
      return {
        tableData: [],
        isActive: true,
        slots: [{
          // flex: 11,
          defaultIndex: 11,
          values: ['2030', '2029', '2028', '2027', '2026', '2025', '2024', '2023', '2022', '2021', '2020', '2019',
            '2018', '2017', '2016', '2015', '2014', '2013', '2012', '2011', '2010'
          ],
          className: 'slot',
          textAlign: 'center'
        }],
        yearCheck: '2019',
        list: ''
      }
    },
    methods: {
      //获取数据
      loadList() {
        getlist({
          year: this.yearCheck
        }).then((
          data
        ) => {
          this.list = data.data;
          this.tableData = data.data.month_money;
        }).catch((err) => {
          console.log(err);
        })
      },
      onValuesChange(picker, values) {
        this.yearCheck = values[0]
      },
      //跳转去提现界面
      toUrl() {
        this.$router.push({
          path: '/withdraw'
        })
      },
      // 年份选择
      show() {
        // 显示弹窗
        this.isActive = false
      },
      cancel() {
        // 显示弹窗
        this.isActive = true
      },
      confirm() {
        // 显示弹窗
        this.isActive = true
        this.loadList()
      }
    },
    activated(){
      this.loadList()
    }
  }
</script>

<style type="text/css" scoped>
  .body_content {
    width: 100%;
    min-height: 100%;
    position: absolute;
    margin: 0;
    padding: 0;
    background-color: #F8F6F6;
  }

  .content_top {
    width: 100%;
    height: 150px;
    text-align: center;
    line-height: 50px;
  }

  .content_top:after {
    width: 100%;
    height: 150px;
    position: absolute;
    z-index: 1;
    left: 0;
    top: 0;
    content: '';
    border-radius: 0 0 15% 15%;
    background: linear-gradient(#03757A, #03757A);
  }

  .top_box {
    z-index: 2;
    position: absolute;
    color: white;
    padding: 15px 20px;
    width: 100%;
    text-align: left;
  }

  .top_name {
    height: 35px;
    font-size: 12px;
  }

  .top_pay {
    height: 50px;
  }

  p {
    font-size: 12px !important;
  }

  .top_price {
    height: 20px;
    text-align: left;
    color: white !important;
    display: inline-block;
    width: 50px;
    font-size: 30px !important;
  }

  .top_cash {
    height: 20px;
    color: white !important;
    display: inline-block;
    float: right;
    border: 1px solid white;
    border-radius: 50px;
    padding: 18px 25px;
    line-height: 0px;
  }

  .withdr_box {
    width: 90%;
    background-color: white;
    z-index: 3;
    border-radius: 10px;
    margin: 0px auto;
    margin-top: -40px;
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
    font-size: 16px !important;
    color: #333333;
  }

  .daily {
    width: 90%;
    background-color: white;
    border-radius: 10px;
    margin: 15px auto;
    height: 105px;
  }

  .daily_name {
    font-size: 16px;
    padding: 10px 25px;
    border-bottom: 1px solid #F8F6F6;
  }

  .daily_box {
    display: inline-block;
    width: 32%;
    text-align: center;
    padding-top: 10px;
  }

  .daily_price {
    font-size: 14px !important;
    color: #333333;
  }

  .year_time {
    width: 100%;
    text-align: center;
    font-size: 12px;
    color: #666666;
    margin-bottom: 10px;
  }

  .year_time img {
    width: 10px;
    height: 10px;
    margin-left: 5px;

  }

  .year_list {
    width: 100%;
    background-color: white;
    padding: 0px 10px;
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
    height: 250px;
    z-index: 999;
    border-top-left-radius: 7px;
    border-top-right-radius: 7px;
    overflow: hidden;

  }

  .dialog-top {
    width: 100%;
    padding: 15px 15px;
    border-bottom: 1px solid #EEEEEE;


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
    height: 200px;
    overflow-y: auto;
    overflow-x: hidden;

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
</style>
