
import {
	Toast
} from 'mint-ui'

// 页面初始化
export const lodingInit = (obj) => {
	obj.pid = obj.$route.query.id; //获取对应活动id
}
// 加载分享
// export const share = (obj) => {
// 	getMyJssdkConfig({}).then(({
// 		data
// 	}) => {
// 		wx.config({
// 			// debug: true,
// 			appId: data.appId, // 必填，企业号的唯一标识，此处填写企业号corpid
// 			timestamp: data.timestamp, // 必填，生成签名的时间戳
// 			nonceStr: data.nonceStr, // 必填，生成签名的随机串
// 			signature: data.signature, // 必填，签名，见附录1
// 			jsApiList: [
// 				"updateAppMessageShareData", 'updateTimelineShareData'
// 			] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
// 		});
// 		wx.ready(function() {
// 			// 保存分享说明
// 			let desc = '';
// 			let ls = obj.activity.data
// 			for (let i in ls) {
// 				if (ls[i].type == 2 && ls[i].style == 1) {
// 					desc = ls[i].meta.text.replace(/<[^>]*[/]{0,1}>/, '');
// 					break
// 				}
// 			}
// 			// 设置分享链接
// 			let url = window.location.href.replace('admin', 'user').replace("?from=singlemessage", "") + "&userId=" + obj.$store
// 				.state.user.id;
// 			let data = {
// 				title: obj.title, // 分享标题
// 				desc: desc, // 分享描述
// 				link: url, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
// 				imgUrl: obj.picurl[0].url, // 分享图标
// 				success: function() {}
// 			}
// 			wx.updateAppMessageShareData(data);
// 			wx.updateTimelineShareData(data)
// 		})
// 	}).catch(function(error) {
// 		console.log(error);
// 		//判断是否登录
// 	});
// }

export default {
	lodingInit
};
