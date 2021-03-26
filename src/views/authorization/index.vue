<template>
  <div class="body_content">
    <canvas style="display: none;" id="mycanvas" width="375" height="520" ref="myCanvas" @click="getPosition"></canvas>
    <img ref="conf0" src="./img/img01.png" style="display:none;" />
    <img ref="conf1" src="./img/img01.png" />
    <!-- <div class="upload" @click="downloadFile()">长按图片下载到手机</div> -->
    <!-- <div class="upload">长按图片下载到手机</div> -->
  </div>
</template>

<script>
import { getList } from '@/api/user.js';
import html2canvas from 'html2canvas';
export default {
  data() {
    return {
      user_info: '',
      htmlUrl: '',
      loadingImg: false,
      vip_level: ''
    };
  },
  methods: {
    //获取个人信息
    loadList() {
      let obj = this;
      getList({})
        .then(data => {
          obj.user_info = data.data.user_info;
          //console.log(typeof obj.user_info.vip_level)
          if (obj.user_info.vip_level == 0) {
            obj.vip_level = '分销商';
          } else if (obj.user_info.vip_level == 1) {
            obj.vip_level = '官方总代';
          } else if (obj.user_info.vip_level == 2) {
            obj.vip_level = '一级代理';
          } else if (obj.user_info.vip_level == 3) {
            obj.vip_level = '二级代理';
          }else{
            obj.vip_level = '特约合伙人';
          }
         // console.log( obj.user_info.vip_level);
          //console.log( obj.vip_level);
          obj.loadImg(obj.user_info);
        })
        .catch(err => {
          console.log(err);
        });
    },
    //获得画布上点击的坐标
    getPosition: function(ev) {
      // let x, y
      // if (ev.layerX || ev.layerX === 0) {
      //   x = ev.layerXy = ev.layerY
      // } else if (ev.offsetX || ev.offsetX === 0) {
      //   x = ev.offsetXy = ev.offsetY
      // }
      // console.log(x, y)
    },
    //合成图片
    loadImg(e) {
      try {
        var that = this;
        let myCanvas = this.$refs.myCanvas;
        var ctx = myCanvas.getContext('2d');
        ctx.drawImage(this.$refs.conf0, 0, 0, 375, 520);
        ctx.font = '14px Arial'
        ctx.fillText(e.name, 120, 230);
        ctx.fillText(that.vip_level, 250, 310);
        this.htmlUrl = myCanvas.toDataURL('image/png', 1.0);
        this.$refs.conf1.src = this.htmlUrl;
        this.loadingImg = true;
      } catch (e) {
        alert(e);
        //TODO handle the exception
      }
    },
    // 创建下载图片事件
    downloadFile() {
      //创建一个具有指定的命名空间URI和限定名称的元素
      try {
        console.log('d');
        if (this.loadingImg == true) {
          var save_link = document.createElementNS('http://www.w3.org/1999/xhtml', 'a');
          save_link.href = this.htmlUrl;
          save_link.download = '授权证书.png';
          // 绑定下载事件
          var event = document.createEvent('MouseEvents');
          event.initMouseEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
          save_link.dispatchEvent(event);
          console.log('0');
        } else {
          alert('请等待图片合成完成');
        }
      } catch (e) {
        //TODO handle the exception
      }
    }
  },
  created() {
    this.loadList();
  }
};
</script>

<style scoped>
.body_content {
  width: 100%;
  height: 100%;
}

#mycanvas {
  width: 100%;
}

.box_img {
  width: 100%;
  padding: 30px 30px;
}

.myCanvas img {
  width: 200px;
  height: 200px;
}

.box_img img {
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto;
}
.body_content img {
  width: 100%;
}
.name {
  position: absolute;
  font-size: 12px;
  z-index: 999;
  top: 30.8%;
  left: 35%;
}

.upload {
  width: 80%;
  margin: 30px auto;
  background-color: #cc3a45;
  border-radius: 50px;
  padding: 10px 0px;
  color: white;
  text-align: center;
}
</style>
