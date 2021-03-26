<template>
  <div class="body_content">
    <div class="xuanfa" v-for="ls in list">
      <div class="xuanfa_box">
        <div class="box_head"><img :src="'http://api.yunguhc.com'+ls.avatar"></div>
        <div class="box_text">
          <p class="box_text_title">{{ls.name}}</p>
          <p>{{ls.time}}</p>
        </div>
        <div class="xuanfa_share" v-if="num != 0"><img src="https://limg.liuniu946.com/img021.png"><span>{{num}}</span></div>
      </div>
      <div class="xuanfa_text" v-html="ls.content"></div>
       <!-- <video class="video_img" src="/static/ship.mov" controls="controls"></video> -->
      <!-- <video poster="/static/ship.mov" controls="controls" width="100%" height="auto">
        <source src="/static/ship.mov"/>
       </video> -->
    </div>
  </div>
</template>
<script>
  import {
    getList
  } from '@/api/xuanfa.js';
 export default {
   data() {
     return {
       list:'',
       num:0,
	   content:''
     };
   },
   methods: {
     //获取分类列表
     loadList() {
       getList({}).then((data) => {
         this.list = data.data;
         this.list = (data.data || []).map(function(i) {
           i.content = i.content.replace(/<img\ssrc="\S*(uploads|static)/g, '<img src="http://api.yunguhc.com/$1');
           i.content = i.content.replace(/<video\ssrc="\S*(uploads|static)/g, '<video class="video_img" src="http://api.yunguhc.com/$1');
           console.log(i.content,88);
           return i;
         });
         console.log(this.list, 11)
       }).catch((err) => {
         console.log(err);
       })
     },
   },
   created() {
     this.loadList();
   }
 }
</script>
<style scoped>
  .body_content {
    width: 100%;
    position: absolute;
    margin: 0;
    padding: 0;
    background-color: #F2F3F5;
    height: 100%;
  }
  .video{
    width: 100%;
  }
  /deep/ .video_img{
   width: 100%;
  }
  .xuanfa {
    width: 100%;
    background-color: white;
    padding: 20px 15px;
    margin-bottom: 15px;
  }
  .xuanfa:last-child{
    margin-bottom: 50px;
  }
  .xuanfa_box{
    width: 100%;
    height:50px ;
    padding-bottom: 15px;
  }
  .box_head{
    display: inline-block;
    width: 50px;
    height: 50px;
    border-radius: 100px;
     position: relative;
     float: left;
     margin-right: 8px;
  }
  .box_head img{
    width: 100%;
    height: 100%;
     border-radius: 100px;
  }
  .box_text{
    display: inline-block;
  }
  .box_text_title{
    font-size: 18px;
    color: #444444!important;
  }
  .xuanfa_share{
    display: inline-block;
    float: right;
  }
  .xuanfa_text{
    line-height: 30px;
    color: #666666;
    font-size: 15px;
    margin-top: 15px;
  }
  .xuanfa_text >>> img {/*
  	max-width: 150px;
    max-height: 150px;
    margin-right: 10px;
  */}
  .xuanfa_share{
    background-color: #EEEEEE;
    border-radius: 50px;
    padding: 0px 10px;
    line-height: 25px;
    margin: 10px 0px;


  }
  .xuanfa_share img{
   width: 15px;
   height: 15px;
   margin-top: 6px;
  }
  .xuanfa_share span{
    font-size: 16px;
    float: right;
    margin-left: 5px;
    color: #AAAAAA;
  }
  .xuanfa_img{
    width: 100%;
  }
  .img_box{
    display: inline-block;
    width: 29%;
    border: 1px solid #EEEEEE;
    margin-right: 10px;
    border-radius: 10px;
    padding: 5px 5px;
    margin-top: 10px;
  }
  .img_box img{
  width: 100%;
  height: 100%;
  }
  /* .img_box:nth-child(even){
    margin-right: 0px;
  } */

</style>
