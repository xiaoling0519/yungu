import Vue from 'vue'
import Vuex from 'vuex'
import mutations from'./mutations'
import getters from'./getter'
Vue.use(Vuex);
const store = new Vuex.Store({
	state: {
		//是否显示底部导航
		tabbar: true,
		www: 'http://api.yunguhc.com/apis', //默认域名头
		index: 3, //当前导航需要显示的图标
		user:{
			name:'',//昵称
			id:'',
			logo:'',//头像
			money:'0.00',
			vipType:'',//vip类型
      yq_user:'',//邀请人
      token:''
		},
	},
	mutations,
	getters,
})
export default store;
