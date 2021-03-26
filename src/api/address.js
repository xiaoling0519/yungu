import request from '@/utils/request'
export function add_address(data) {
	return request({
		url: 'Buy/add_address',
		method: 'post',
		data
	})
}
export function address_list(data) {
	return request({
		url: 'Buy/address_list',
		method: 'post',
		data
	})
}
export function set_address(data) {
	return request({
		url: 'Buy/default_add',
		method: 'post',
		data
	})
}
export function del_address(data) {
	return request({
		url: 'Buy/del_address',
		method: 'post',
		data
	})
}
export function address_info(data) {
	return request({
		url: 'Buy/address_info',
		method: 'post',
		data
	})
}
export function upd_address(data) {
	return request({
		url: 'Buy/upd_address',
		method: 'post',
		data
	})
}
export function search_address(data) {
	return request({
		url: 'Buy/search_address',
		method: 'post',
		data
	})
}
export function sz(data) {
	return request({
		url: 'Buy/set_address',
		method: 'post',
		data
	})
}
