import request from '@/utils/request'

export function getList(data) {
	return request({
		url: '/Sort/get_pro_read',
		method: 'post',
		data
	});
}
export function Buy(data) {
	return request({
		url: '/Buy/index',
		method: 'post',
		data
	});
}
export function add_car(data) {
	return request({
		url: '/Shopping/update_house_pro_num',
		method: 'post',
		data
	});
}
