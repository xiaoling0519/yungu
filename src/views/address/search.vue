<template>
  <div class="body_content">
    <div class="search_box">
       <mt-search v-model="seachText" placeholder="请输入收货人手机号码"></mt-search>
    </div>
    <div class="search_history">
      <div class="search_list">
        <span class="list"><img src="./img/img040.png"></span>
        <span class="list_text">1245265852</span>
        <span class="list_img"><img src="./img/img041.png"></span>
      </div>
      <div class="search_list">
        <span class="list"><img src="./img/img040.png"></span>
        <span class="list_text">15042568952</span>
        <span class="list_img"><img src="./img/img041.png"></span>
      </div>
      <div class="search_list">
        <span class="list"><img src="./img/img040.png"></span>
        <span class="list_text">18562351526</span>
        <span class="list_img"><img src="./img/img041.png"></span>
      </div>
      <div class="empty_search">清除搜索历史</div>
    </div>
  </div>
</template>

<script>
   export default {
    data() {
      return {
        seachText: ''
      };
    },
    methods: {

    }
  }
</script>
<style>
  .mint-searchbar-inner .mintui-search {
    font-size: 20px;
    color: #666666;
    margin: 5px 10px 0px 15px;
  }
  .mint-searchbar-cancel{
    color: #666666;
    font-size: 18px !important;
    }
  .mint-searchbar {
    background-color: white;
  }

  .mint-searchbar-inner {
    background-color: #F6F6F6;
    border-radius: 50px;
    height: 40px;
  }

  .mint-searchbar-core {
    background-color: #F6F6F6;
    font-size: 14px;
  }
</style>
<style scoped="scoped">
  .body_content {
    width: 100%;
    position: absolute;
    margin: 0;
    padding: 0;
    height: 100vh;
    background-color: #F2F3F5;
  }
  .search_box{
    height: 60px;
    width: 100%;
  }
    .mint-search{
    height: 60px;
    width: 100%;
  }
  .search_history{
    width: 100%;
    padding: 0px 15px;
    background-color: white;
    margin-top: 5px;
  }
  .search_list{
    padding: 15px 0px;
    border-bottom: 1px solid #F3F3F3;
  }
  .list{
    float: left;
    position: relative;
    margin-top: 3px;
    margin-right: 10px;
  }
  .list_text{
   color: #3F454B;
   font-size: 14px;
  }
  .list_img{
    float: right;
  }
  .empty_search{
    text-align: center;
    padding: 20px 0px;
    color: #CC3A45;
  }
</style>
