import Vue from 'vue'
import Router from 'vue-router'
//加载路由
Vue.use(Router)
export default new Router({
  //	mode: 'history',
  routes: [{
      path: '/',
      redirect: '/index'
    },
    {
      path: '/home',
      name: '首页',
      component: (resolve) => {
        return require(['@/views/home/index'], resolve)
      },
      meta: {
        title: "首页",
        keepAlive: true
      }
    },
    {
      path: '/classification',
      name: '分类',
      component: (resolve) => {
        return require(['@/views/classification/index'], resolve)
      },
      meta: {
        title: "分类",
        keepAlive: true
      },

    },
    {
      path: '/xuanfa',
      name: '宣发',
      component: (resolve) => {
        return require(['@/views/xuanfa/index'], resolve)
      },
      meta: {
        title: "宣发",
        keepAlive: true
      }
    },
    {
      path: '/index',
      name: '个人中心',
      component: (resolve) => {
        return require(["@/views/merchant_apps/merchant_apps"], resolve)
      },
      meta: {
        keepAlive: true
      }
    },
    {
      path: '/modify',
      name: "个人资料",
      component: (resolve) => {
        return require(['@/views/merchant_apps/modify'], resolve)
      },
      meta: {
        title: "个人资料",
        keepAlive: true
      }
    },
    {
      path: '/mywallet',
      name: "我的钱包",
      component: (resolve) => {
        return require(['@/views/mywallet/index'], resolve)
      },
      meta: {
        title: "我的钱包",
        keepAlive: true
      }
    },
    {
      path: '/withdraw',
      name: "我要提现",
      component: (resolve) => {
        return require(['@/views/mywallet/withdraw'], resolve)
      },
      meta: {
        title: "我要提现",
        keepAlive: true
      }
    },
    {
      path: '/team',
      name: "我的团队",
      component: (resolve) => {
        return require(['@/views/team/index'], resolve)
      },
      meta: {
        title: "我的团队",
        keepAlive: true
      }
    },
    {
      path: '/agent',
      name: "我要升级",
      component: (resolve) => {
        return require(['@/views/agent/index'], resolve)
      },
      meta: {
        title: "我要升级",
        keepAlive: true
      }
    },
    {
      path: '/explain',
      name: "升级说明",
      component: (resolve) => {
        return require(['@/views/agent/explain'], resolve)
      }
    },
    {
      path: '/forget',
      name: "忘记密码",
      component: (resolve) => {
        return require(['@/views/identity/forget'], resolve)
      }
    },
    {
      path: '/income',
      name: "收益明细",
      component: (resolve) => {
        return require(['@/views/income/index'], resolve)
      },
      meta: {
        title: "收益明细",
        keepAlive: true
      }
    },
    {
      path: '/authorization',
      name: '授权证书',
      component: (resolve) => {
        return require(["@/views/authorization/index"], resolve)
      },
      meta: {
        title: "授权证书"
      }
    },
    {
      path: '/contact',
      name: "联系邀请人",
      component: (resolve) => {
        return require(['@/views/contact/index'], resolve)
      },
      meta: {
        title: "联系邀请人",
        keepAlive: true
      }
    },
    {
      path: '/register',
      name: "注册账号",
      component: (resolve) => {
        return require(['@/views/identity/Register'], resolve)
      }
    },
    {
      path: '/login',
      name: "登录",
      component: (resolve) => {
        return require(['@/views/identity/Login'], resolve)
      }
    },
    // {
    // 	path: '/forget',
    // 	name: "找回密码",
    // 	component: (resolve) => {
    // 		return require(['@/views/identity/forget'], resolve)
    // 	}
    // },
    // {
    // 	path: '/retrievepassword',
    // 	name: "找回密码",
    // 	component: (resolve) => {
    // 		return require(['@/views/identity/RetrievePassword'], resolve)
    // 	}
    // },
    {
      path: '/waitsend',
      name: "订单状态",
      component: (resolve) => {
        return require(['@/views/send/waitsend'], resolve)
      },
    },
    {
      path: '/list2',
      name: "待付款",
      component: (resolve) => {
        return require(['@/views/send/list2'], resolve)
      },
    },
    {
      path: '/fillInNumber',
      name: "填单号",
      component: (resolve) => {
        return require(['@/views/send/fillInNumber'], resolve)
      }
    },
    {
      path: '/classification/classification',
      name: "商品详情",
      component: (resolve) => {
        return require(['@/views/classification/classification'], resolve)
      },
    },
    {
      path: '/address/search',
      name: "搜索收货人",
      component: (resolve) => {
        return require(['@/views/address/search'], resolve)
      },
    },
    {
      path: '/favorites',
      name: "收藏夹",
      component: (resolve) => {
        return require(['@/views/favorites/index'], resolve)
      },
    },
    {
      path: '/classification/index',
      name: "分类",
      component: (resolve) => {
        return require(['@/views/classification/index'], resolve)
      },
    },
    {
      path: '/shopping',
      name: "购物车",
      component: (resolve) => {
        return require(['@/views/shopping/index'], resolve)
      },
    },
    {
      path: '/order/index',
      name: "确认订单",
      component: (resolve) => {
        return require(['@/views/order/index'], resolve)
      },
    },
    {
      path: '/order/logistics',
      name: "物流信息",
      component: (resolve) => {
        return require(['@/views/order/logistics'], resolve)
      },
    },
    {
      path: '/address/index',
      name: "确认订单",
      component: (resolve) => {
        return require(['@/views/address/index'], resolve)
      },
    },
    {
      path: '/address/edit',
      name: "编辑收货地址",
      component: (resolve) => {
        return require(['@/views/address/edit'], resolve)
      },
    },
    {
      path: '/address/add',
      name: "新增收货地址",
      component: (resolve) => {
        return require(['@/views/address/add'], resolve)
      },
    },
    {
      path: '/order/order',
      name: "订单详情",
      component: (resolve) => {
        return require(['@/views/order/order'], resolve)
      },
    },
    {
      path: '/404',
      name: "404",
      component: (resolve) => {
        return require(['@/views/404.vue'], resolve)
      },
      meta: {
        keepAlive: true
      }
    },
    {
      // 用于页面跳转
      path: '/redirectPage/:path*',
      component: (resolve) => {
        return require(['@/views/redirectPage/index.vue'], resolve)
      },
    },
    {
      path: '*',
      redirect: '/404',
      hidden: true
    },
  ]
})
