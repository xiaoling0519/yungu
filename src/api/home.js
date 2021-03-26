import request from '@/utils/request'
export function banner(data) {
	return request({
		url: 'index/banner',
		method: 'post',
		data
	})
}
