<template>
	<div></div>
</template>

<script>
	export default {
		name: 'RedirectPage',
		created() {
			const {
				params,
				query
			} = this.$route
			let {
				path
			} = params
			path = '/'+path;
			// console.log(path);
			// console.log(query);
			this.$router.replace({
				path: path,
				query
			})
			// console.log('跳转成功');
		},
		render(h) {
			return h()
		}
	}
</script>

<style>
</style>
