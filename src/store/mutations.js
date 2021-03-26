let mutations = {
	//修改属性
	reStype(state, obj) {
		state[obj.stype] = obj.value;
		//console.log(obj); //查看调用修改的对象方便后续调试
	},
	// 修改用户信息
	alter(state, value) {
		console.log(value);
		state.user = value;
		console.log(state);
	},
}

export default mutations
