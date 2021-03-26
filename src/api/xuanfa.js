import request from '@/utils/request'

export function getList(data) {
	return request({
		url: '/News/get_list',
		method: 'post',
		data
	});
}
