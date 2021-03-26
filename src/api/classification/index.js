import request from '@/utils/request'

export function getList(data) {
	return request({
		url: '/Sort/get_sort_list',
		method: 'post',
		data
	});
}
