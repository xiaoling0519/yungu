import request from '@/utils/request'

export function getlist(data) {
	return request({
		url: '/Team/index',
		method: 'post',
		data
	})
}
