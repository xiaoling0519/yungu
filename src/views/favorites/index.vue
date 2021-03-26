<template>
  <div class="body_content">
    <div class="nodata" v-if="list == ''">
      <span>————</span>
      <span class="nodata_text">暂时没有数据</span>
      <span>————</span>
    </div>
    <div class="good_box" v-if="list != ''" v-for="ls in list">
      <div class="good_list" style="margin-top: 0px!important;">
        <router-link class="good-list-box" :to="'/classification/classification?id=' + ls.pid">
          <div class="content_img"><img :src="'http://api.yunguhc.com/' + ls.img" /></div>
          <div class="content_title">
            <p class="content_name">{{ ls.title }}</p>
            <p class="content_price">{{ ls.money }}</p>
          </div>
        </router-link>
        <span class="cancel" @click="del(ls)"><img src="./img/img51.png" /></span>
      </div>
    </div>
  </div>
</template>
<script>
import { getList, add } from '@/api/favorites/index.js';
export default {
  data() {
    return {
      list: '',
      img: ''
    };
  },
  methods: {
    //获取分类列表
    loadList() {
      getList({})
        .then(data => {
          this.list = data.data;
          console.log(this.list, 11);
        })
        .catch(err => {
          console.log(err);
        });
    },
    del(ls) {
      console.log(ls, 11);
      add({
        pid: ls.pid
      })
        .then(data => {
          this.loadList();
          this.$message({
            message: '删除成功',
            type: 'success',
            offset: 50
          });
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  created() {
    this.loadList();
  }
};
</script>
<style scoped="scoped">
.body_content {
  width: 100%;
  background-color: #f8f6f6;
  position: absolute;
  margin: 0;
  padding: 0;
  min-height: 100vh;
}
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
.good_box {
  width: 95%;
  background: white;
  margin: 15px auto;
  border-radius: 5px;
  padding: 15px 15px;
  margin-bottom: 15px;
}
.good_list {
  width: 100%;
  display: flex;
  margin-top: 15px;
  position: relative;
  justify-content: space-between;
}
.good_list:last-child {
  margin-bottom: 0px;
}
.good-list-box{
  display: flex;
  flex-grow: 1;
}
.content_img {
  width: 25%;
  height: 100%;
  /* border: 1px solid #F0F0F0; */
}

.content_img img {
  width: 100%;
  height: 100%;
}

.content_title {
  padding-left: 10px;
  flex-grow: 1;
}
.cancel {
  flex-shrink: 0;
}
.cancel img {
  width: 18px;
  height: 18px;
}
.content_name {
  font-size: 15px;
  height: 45px;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  overflow: hidden;
  text-overflow: ellipsis;
}

.content_price {
  color: #cc3a45 !important;
  font-size: 15px;
  font-weight: bold;
}
</style>
