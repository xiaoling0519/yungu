import router from './router'
import store from './store'
import {
  getToken
} from './utils/auth';
router.beforeEach((to, from, next) => {
  // console.log(getToken());
  // console.log('jingwu');
  // console.log(to);
  // console.log(location.href);
  // console.log("----",location.href.indexOf("wx_id"))
  if (getToken()) {
    // 判断是否需要显示底部导航栏
    if (to.name == '首页' || to.name == '分类' || to.name == '宣发' || to.name == '个人中心') {
      // console.log(to.name);
      // 保存当前选中的目录
      switch (to.name) {
        case '首页':
          store.commit(
            "reStype", {
              stype: "index",
              value: 0
            }
          )
          break;
        case '分类':
          store.commit(
            "reStype", {
              stype: "index",
              value: 1
            }
          )
          break;
        case '宣发':
          store.commit(
            "reStype", {
              stype: "index",
              value: 2
            }
          )
          break;
        case '个人中心':
          store.commit(
            "reStype", {
              stype: "index",
              value: 3
            }
          )
          break;
        default:
          break;
      }
      store.commit(
        "reStype", {
          stype: "tabbar",
          value: true
        }
      )
    } else {
      store.commit(
        "reStype", {
          stype: "tabbar",
          value: false
        }
      )
    }
    next()
  } else {
    // console.log("====")
    // if(location.href.indexOf("wx_id")==-1){
    //      location.href = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxeffa464bc28f6a03&redirect_uri=http%3A%2F%2Fapi.yunguhc.com%2Fapis%2FWx%2FgetUserInfo&response_type=code&scope=snsapi_userinfo&state=#wechat_redirect`
    // }
    if (to.name == '登录' || to.name == "注册账号"|| to.name == "忘记密码") {
      store.commit(
        "reStype", {
          stype: "tabbar",
          value: false
        }
      )
      next()
    } else {
      // console.log(to.name);

      router.push('/login')
      store.commit(
        "reStype", {
          stype: "tabbar",
          value: false
        }
      )

    }
  }
  //判断是否已经登录
  if (to.name) {
    document.title = to.name
  };
})
