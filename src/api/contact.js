import request from '@/utils/request'
export function getlist(data) {
	return request({
		url: 'User/yq_user',
		method: 'post',
		data
	})
}
