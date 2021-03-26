import request from '@/utils/request'

export function getlist(data) {
	return request({
		url: '/Withdraw/get_wallet',
		method: 'post',
		data
	})
}
export function get_withdraw(data) {
	return request({
		url: '/Withdraw/get_withdraw',
		method: 'post',
		data
	})
}

export function submit_withdraw(data) {
	return request({
		url: '/Withdraw/submit_withdraw',
		method: 'post',
		data
	})
}
