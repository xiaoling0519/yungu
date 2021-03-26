<template>
	<div id="app" >
		<div :class="(tabbar.tabbar?'sn-main-on':'sn-main')">
			<transition name="left">
				<keep-alive max="8">
					<router-view v-if='$route.meta.keepAlive' />
				</keep-alive>
			</transition>
			<transition name="left">
				<router-view v-if='!$route.meta.keepAlive' />
			</transition>
		</div>
		<tab-bar v-if="tabbar.tabbar"></tab-bar>
	</div>
</template>
<style type="text/css">
	.sn-main,
	.sn-main-on {
		height: 0;
		min-height: 100%;
	}
	#app {
		position: absolute;
		left: 0;
		right: 0;
		top: 0;
		min-height: 100%;
		width: 100%;
		height: 0;
	}

	.left-enter-active{
		position: absolute;
		width: 100%;
		transition: opacity 0.5s;
	}
	.left-enter-to {
		opacity: 1;
	}
	.left-enter {
		opacity: 0;
	}
</style>
<script>
	////////////////////////////////////////////////////////////////////
	//                          _ooOoo_                               //
	//                         o8888888o                              //
	//                         88" . "88                              //
	//                         (| ^_^ |)                              //
	//                         O\  =  /O                              //
	//                      ____/`---'\____                           //
	//                    .'  \\|     |//  `.                         //
	//                   /  \\|||  :  |||//  \                        //
	//                  /  _||||| -:- |||||-  \                       //
	//                  |   | \\\  -  /// |   |                       //
	//                  | \_|  ''\---/''  |   |                       //
	//                  \  .-\__  `-`  ___/-. /                       //
	//                ___`. .'  /--.--\  `. . ___                     //
	//              ."" '<  `.___\_<|>_/___.'  >'"".                  //
	//            | | :  `- \`.;`\ _ /`;.`/ - ` : | |                 //
	//            \  \ `-.   \_ __\ /__ _/   .-` /  /                 //
	//      ========`-.____`-.___\_____/___.-`____.-'========         //
	//                           `=---='                              //
	//      ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^        //
	//              佛祖保佑       永无BUG     永不修改                //
	////////////////////////////////////////////////////////////////////
	import TabBar from "@/views/tabBar/tabBar"
	export default {
		name: 'App',
		data() {
			return {
				transitionName: 'left',
				tname:'left',
				//必须指向对象如果直接指向基本类型则无法触发vue的动态渲染页面效果
				tabbar: this.$store.state,
				height: 0,
			}
		},
		watch: {},
		components: {
			TabBar
		},
		created() {},
	};
</script>
