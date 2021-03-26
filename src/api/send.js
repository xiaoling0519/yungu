import request from '@/utils/request'

export function getList(data) {
	return request({
		url: '/order/list',
		method: 'post',
		data
	})
}
export function receipt(data) {
	return request({
		url: '/order/is_receipt',
		method: 'post',
		data
	})
}
export function del_order(data) {
	return request({
		url: '/Order/del_order',
		method: 'post',
		data
	})
}
