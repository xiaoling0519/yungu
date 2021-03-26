<template>
  <div class="body_content">
    <div class="bj"><img src="./img/img14.png"></div>
    <div class="explain">
      <img src="./img/img15.png" />
    </div>

  </div>
</template>
<script type="text/javascript">
  export default {
    data() {
      return {}
    },
    methods: {
    },
    created() { }
  }
</script>
<style scoped="scoped">
  .body_content {
    width: 100%;
    min-height: 100%;
    background-color: #000000;
    padding-bottom: 15px;
  }
  .bj{
    width: 100%;
    height: 350px;
  }
  .bj img{
    width: 100%;
    height: 100%;
  }
  .explain{
    width: 95%;
    margin: 0px auto;
    background-color: #FFFFFF;
    height: 100%;
    margin-top: -80px;
    z-index: 999;
    position: relative;
    border-radius: 15px;
    padding: 15px 15px;
  }
</style>
