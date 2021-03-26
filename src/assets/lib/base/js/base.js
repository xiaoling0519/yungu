import {
	Toast,
	Indicator
} from 'mint-ui'
import * as qiniu from 'qiniu-js'
import request from '@/request.js'
export function getQueryString(name) {
	let reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
	let href = window.location.href;
	let str = href.slice(href.indexOf("?"));
	let r = str.substr(1).match(reg);
	if (r != null) {
		return unescape(r[2]);
	} else {
		return null;
	}
}
