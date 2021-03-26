import request from '@/utils/request'

export function getList(data) {
	return request({
		url: '/Account/index',
		method: 'post',
		data
	});
}
export function edit(data) {
	return request({
		url: '/Account/edit_logo',
    headers:{'Content-Type':'multipart/form-data'},
		method: 'post',
		data
	});
}
