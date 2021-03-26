import request from '@/utils/request'


export function getlist(data) {
	return request({
		url: '/Withdraw/money_detail',
		method: 'post',
		data
	})
}
