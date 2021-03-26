<template>
  <login model="login"></login>
</template>
<script type="text/javascript">
// import { getOpenid } from '@/api/identity/zc.js';
import login from '@/views/identity/zc';
export default {
  data() {
    return {};
  },
  components: {
    login
  },
  methods: {
    // getOpenid() {
    //   getOpenid({}).then((
    //     data
    //   ) => {
    //     console.log(data,11)
    //   }).catch((err) => {
    //     console.log(err);
    //   })
    // }
  },
  created() {
    // this.getOpenid();
    
  }
};
</script>
<style></style>
