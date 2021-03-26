import axios from 'axios'
import router from '@/router';
import {
	MessageBox,
	Toast
} from 'mint-ui'
import {
	Message
} from 'element-ui';
import {
	getToken
} from './auth';
import store from '../store'

const service = axios.create({
	baseURL: store.state.www, // url = base url + request url
	// withCredentials: true, // 当跨域请求时发送cookie
	timeout: 5000 // request timeout
})

// 请求拦截器
service.interceptors.request.use(
	config => {
		// 请求之前拦截
		// 每次请求都带token
		// ['X-Token'] 自定义请求头
		config.headers['X-Token'] = getToken()
		if (config.method == 'get') {
			if (!config.params) {
				config.params = {};
			}
			config.params.token = getToken();
		}
		if (config.method == 'post') {

			config.data.token = getToken();
		}

		return config
	},
	error => {
		// 错误处理
		console.log(error)
		return Promise.reject(error)
	}
)

service.interceptors.response.use(
	response => {
		const res = response.data
		// 解析字符串为数字
		res.errcode = parseInt(res.code); //code值对象
    // console.log(res.errcode,22)
		 res.message = res.msg; //提示语
     //console.log(res.message,33)
		if (res.errcode !== 200) {
			if (res.message === "用户token已失效") {
				router.push('/login');
			};
			if (res.errcode === 2000) {
				let url = res.data.wxurl + '?url=' + encodeURIComponent(window.location.href);
				window.location.href = url;
			} else if (res.errcode === 2002) {
				router.push("/login");
			} else if (res.errcode === 201){
        return Promise.reject(res || 'Error')
      }else {
				Message({
					message: res.message || 'Error',
					duration: 1 * 1000
				})
			}
			return Promise.reject(new Error(res.message || 'Error'))
		} else {
			return res
		}
	},
	error => {
		console.log('err' + error) // for debug
		Message({
			message: '加载错误请刷新重试！',
			duration: 1 * 1000
		})
		return Promise.reject(error)
	}
)

export default service
