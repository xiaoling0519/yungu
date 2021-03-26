import request from '@/utils/request'

export function getList(data) {
	return request({
		url: '/Collection/set_coll',
		method: 'post',
		data
	});
}

export function add(data) {
	return request({
		url: '/Collection/add_coll',
		method: 'post',
		data
	});
}
