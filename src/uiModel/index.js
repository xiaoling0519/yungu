import Vue from 'vue'
//aui引入
import '@/assets/lib/aui/css/aui.css'
// 基础样式引入
import '@/assets/lib/base/css/base.css'
//引入MintUI开始
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
Vue.use(MintUI)
// 引入MintUI结束
// //引入饿了么开始
// import {
// 	Button,
// 	Select,
// 	Dialog,
// 	Input ,
// 	Form ,
// 	FormItem,
//   Table,
// } from 'element-ui';
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI)
// Vue.use(Button);
// Vue.use(Select);
// Vue.use(Dialog);
// Vue.use(Input);
// Vue.use(Form);
// Vue.use(FormItem);
// Vue.use(Table);
//引入饿了么结束AA
// 引入骨架图
import skeleton from 'vue-skeleton-component'
Vue.use(skeleton)
