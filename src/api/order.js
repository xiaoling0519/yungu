import request from '@/utils/request'

export function check_order(data) {
	return request({
		url: 'Buy/check_order',
		method: 'post',
		data
	})
}
export function sub_order(data) {
	return request({
		url: '/Buy/sub_order',
		method: 'post',
		data
	})
}
export function read(data) {
	return request({
		url: '/order/read',
		method: 'post',
		data
	})
}
export function Wxpay(data) {
	return request({
		url: '/Wxpay/pay',
		method: 'post',
		data
	})
}
export function get_info(data) {
	return request({
		url: '/order/get_info',
		method: 'post',
		data
	})
}
