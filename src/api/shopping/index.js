import request from '@/utils/request'

export function getList(data) {
	return request({
		url: '/Shopping/index',
		method: 'post',
		data
	});
}
export function del(data) {
	return request({
		url: '/Shopping/del_house_pro',
		method: 'post',
		data
	});
}
export function update(data) {
	return request({
		url: '/Shopping/update_house_pro_num',
		method: 'post',
		data
	});
}
