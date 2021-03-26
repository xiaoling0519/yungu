<template>
  <div class="body_content">
	 <el-carousel trigger="click" height="350px" :interval="4000">
	   <el-carousel-item v-for="(ls, ind) in img" :key="ind" v-if="ls"><img :src="'http://api.yunguhc.com'+ls.img" /></el-carousel-item>
	  </el-carousel>
    <img src="./img/img005.jpg" />
    <router-link to="/classification/classification?id=3">
    <img src="./img/img006.jpg" />
    </router-link>
  </div>

</template>

<script type="text/javascript">
	import { banner } from '@/api/home.js';
export default {
  data() {
    return {
      img:[]
    };
  },
methods: {
          //获取轮播图
          loadList() {
            banner({})
              .then(data => {
                this.img = data.data;
                console.log(this.img, 11);
              })
              .catch(err => {
                console.log(err);
              });
          },
},
created() {
    this.loadList();
  }
  }
</script>

<style type="text/css" scoped>
.body_content{
  padding-bottom: 45px;
  width: 100%;
  height: 0;
  min-height: 100%;
}
.el-carousel__item img {
  width: 100%;
  height: 100%;
}
.body_content img{
  width: 100%;
}
</style>
