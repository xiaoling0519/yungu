import request from '@/utils/request'

export function register(data) {
	return request({
		url: '/Registered/index',
		method: 'post',
		data
	});
}
export function login(data) {
	return request({
		url: '/Login/act_login',
		method: 'post',
		data
	});
}
export function sendSmsCode(data) {
	return request({
		url: '/Send/sendSmsCode',
		method: 'post',
		data
	});
}

export function getUserInfo(data) {
	return request({
		url: 'Wx/getUserInfo',
		method: 'post',
		data
	});
}
export function getOpenid(data) {
	return request({
		url: 'Wx/getOpenid',
		method: 'post',
		data
	});
}
export function out_login(data) {
	return request({
		url: '/Login/out_login',
		method: 'post',
		data
	});
}
export function check_code(data) {
	return request({
		url: '/Registered/check_code',
		method: 'post',
		data
	});
}
export function edit_pass(data) {
	return request({
		url: '/Account/edit_pass',
		method: 'post',
		data
	});
}
