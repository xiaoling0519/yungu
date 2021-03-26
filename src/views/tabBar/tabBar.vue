<template>
	<div class="sn-tabBar">
		<div class="ul pl10 pr10">
			<div v-for="n in nav" class="li" :key='n.index'>
				<router-link :to="n.url" :style="{'display':n.index==index.index?'block':'none'}">
					<div class="dl bcf">
						<div class="dt h30">
							<img :src="n.checkImg">
						</div>
						<div class="dd">{{n.name}}</div>
					</div>
				</router-link>
				<router-link :style="{'display':n.index!=index.index?'block':'block'}"  :to="n.url">
					<div @click="tabList(n.index)" class="dl bcf">
						<div class="dt h30 foot_img">
							<img :src="n.img" style="height: 22px;">
						</div>
						<div class="dd">{{n.name}}</div>
					</div>
				</router-link>
				<!-- 提前缓存图片列表 -->
			</div>
		</div>
	</div>
</template>
<script type="text/javascript">
  import request from '@/utils/request'
	const navColor = {
		on: "color:#",
		non: "color:#",
	}
	const nav = [{
			img: "../../../static/img020.png",
			name: "首页",
			checkImg: "../../../static/img013.png",
			index: 0,
			url: "/home",
		},
		{
			img: "../../../static/img014.png",
			name: "分类",
			checkImg: "../../../static/img017.png",
			index: 1,
			url: "/classification",
		},
		{
			img: "../../../static/img015.png",
			name: "宣发",
			checkImg: "../../../static/img019.png",
			index: 2,
			url: "/xuanfa",
		},
		{
			img: "../../../static/img016.png",
			name: "个人中心",
			checkImg: "../../../static/img018.png",
			index: 3,
			url: "/index",
		},
	]
	export default {
		name: "tabBar",
		data() {
			return {
				nav: nav.slice(0),
				navColor: Object.assign({}, navColor),
				index: this.$store.state
			}
		},
		created() {
			// console.log(this.$route)
		},
		methods: {
			// 绑定切换底部图标
			tabList: function(e) {
				this.$store.commit('reStype', {
					link: '/make/make',
					stype: "index",
					value: e
				})
			},
      share(config){
        console.log(config,99)
        wx.config({
          debug: false,
          appId:config.appid,
          timestamp:config.timetamp,
          nonceStr:config.nonceStr,
          signature:config.signature,
          jsApiList: ["updateAppMessageShareData","updateTimelineShareData"]
        });
        let title = "蕴古",
          desc = "我是分享简介",
          link = "http://www.yunguhc.com",
          imgUrl = ""
        wx.ready(function () {   //需在用户可能点击分享按钮前就先调用
          wx.updateAppMessageShareData({
            title, // 分享标题
            desc,
            link,
            imgUrl, // 分享图标
            success: function () {
              // 设置成功
            }
          })
          wx.updateTimelineShareData({
              title, // 分享标题
              link, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
              imgUrl, // 分享图标
              success: function () {
                // 设置成功
              }
          })
        });

      },
      ajax(){
        let data = {
          url:location.href
        },_self = this
        // console.log(data)
        // return
        request.post("/wx/wxconfigs",data)
        .then(r=>{
          if(r.code==200){
              r = r.data
              _self.share(r)
              // console.log(r)
          }

        })
        .catch()
      }
		},
    watch:{
      $route(e){
        this.ajax()
      }
    }
	};
</script>
<style type="text/css" scoped>
	.sn-tabBar {
		position: fixed;
		left: 0;
		right: 0;
		bottom: 0;
		height: 49px;
		font-size: 10px;
		color: #606972;
		background-color: #fff;
		border-top: 1px solid #eee;
		text-align: center;
	}

	.sn-tabBar .ul {
		display: flex;
	}

	.sn-tabBar .ul .li {
		flex: 1;
		line-height: 1.2;
	}

	.sn-tabBar .dl img {
		width: 22px;
    height: 24px;
		margin-top: 8px
	}
	.sn-tabBar .dl {
		color: #606972;
		height: 50px;
	}
  .foot_img img{
    width: 22px;
    height: 22px;
  }

	/*	.sn-tabBar .active:after{
		position:absolute;
		content:"";
		width:55px;height:55px;
		left:50%;top:-15px;
		transform:translateX(-50%);
		box-shadow:0 0 3px rgba(0,0,0,.4);
		z-index:-2;
		border-radius:50%;
		background-color:#fff
	}*/
</style>
