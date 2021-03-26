<template>
  <div class="content">
    <div class="zanwu" v-if="error == 201">——— 暂无物流消息 ———</div>
    <div class="block">
      <div class="radio" v-show="false">
        排序：
        <el-radio-group v-model="reverse">
          <el-radio :label="true">倒序</el-radio>
          <el-radio :label="false">正序</el-radio>
        </el-radio-group>
      </div>
      <div class="order_name">物流号:{{order_number}}</div>
       <div class="order_name">物流名称:{{order_name}}</div>
       <div class="order_name" style="margin-bottom: 15px;">备注:{{beizhu}}</div>
      <el-timeline :reverse="reverse">
        <el-timeline-item v-for="(activity, index) in activities" :size="activity.size" :type = 'activity.type' :icon="activity.icon" :key="index" :timestamp="activity.AcceptTime">{{ activity.AcceptStation }}</el-timeline-item>
      </el-timeline>
    </div>
  </div>
</template>

<script>
import { get_info } from '@/api/order.js';
export default {
  data() {
    return {
      reverse: true,
      activities:'',
      state:'',
      error:'',
      order_number:'',
      beizhu:'',
      order_name:''
    };
  },
   methods: {
     //获取物流信息
     loadList() {
       let obj = this;
       get_info({
         oid: obj.oid
       })
         .then((data) => {
           //console.log(data.data,88)
           let e = JSON.parse(data.data.kd_info);
           obj.activities = e.Traces;
           obj.order_name =data.data.kd_name;
           obj.order_number = data.data.kd_num;
           obj.beizhu = data.data.content;
          // console.log(obj.order_name,obj.order_number, obj.beizhu)
           // let arr=[{a:1},{a:1}];
           // arr[arr.length-1].b = 2;
           // console.log(arr);
           obj.state =e.State;
          if(obj.state == 3){
            e.Traces[e.Traces.length-1].icon = 'el-icon-circle-check';
            e.Traces[e.Traces.length-1].type = 'primary';
            e.Traces[e.Traces.length-1].size = 'large';
          }
           console.log(obj.activities)
         })
         .catch(data => {
           console.log(data)
           obj.error =data.code;
         });
     },
   },
  created() {
    this.oid = this.$route.query.id;
    this.loadList();
  }
};
</script>

<style scoped="scoped">
.content {
  width: 80%;
  height: 100%;
  padding: 25px 0px;
  margin: 0px auto;
}
.el-timeline-item__node--normal {
    left: -1px;
    width: 13px !important;
    height: 13px !important;
}
.zanwu{
  width: 100%;
  text-align: center;
  font-size: 12px;
  color:#797272 ;
}
.order_name{
  font-size: 13px;
  margin-bottom: 5px;
}
</style>
