import request from '@/utils/request'

export function getlist(data) {
	return request({
		url: 'Vip/index',
		method: 'post',
		data
	})
}
