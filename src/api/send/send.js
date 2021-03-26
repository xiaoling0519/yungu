import request from '@/utils/request'

export function getList(data) {
	return request({
		url: '/Wxsjzx/getMyorder',
		method: 'post',
		data
	})
}

export function getExpress(data) {
	return request({
		url: '/Kdcx/getKdlist',
		method: 'post',
		data
	})
}
export function shipments(data) {
	return request({
		url: '/Wxsjzx/fahuo',
		method: 'post',
		data
	})
}

export function hexiao(data) {
	return request({
		url: '/Wxsjzx/hexiao',
		method: 'post',
		data
	})
}
export function getMyJssdkConfig(data) {
	return request({
		url: '/Wxpay/getMyJssdkConfig',
		method: 'post',
		data
	})
}
export function fahuo(data) {
	return request({
		url: '/Wxsjzx/fahuo',
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
