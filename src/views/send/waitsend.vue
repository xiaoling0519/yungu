<template>
	<div class="box">
		<div class="tiaozhuan">
			<router-link :to="{ path: '/waitsend/', query: { status: 0 }}" class="wenzi" replace>
				<div>
					全部
				</div>
				<div class="xiahuaxian" v-if="dianji==0"></div>
			</router-link>
			<router-link :to="{ path: '/waitsend/', query: { status: 1 }}" class="wenzi" replace>
				<div>
					待付款
				</div>
				<div class="xiahuaxian" v-if="dianji==1"></div>
			</router-link>
			<router-link :to="{ path: '/waitsend/', query: { status: 2 }}" class="wenzi" replace>
				<div>
					待发货
				</div>
				<div class="xiahuaxian" v-if="dianji==2"></div>
			</router-link>
      <router-link :to="{ path: '/waitsend/', query: { status: 3 }}" class="wenzi" replace>
      	<div>
      		待收货
      	</div>
      	<div class="xiahuaxian" v-if="dianji==3"></div>
      </router-link>
			<router-link :to="{ path: '/waitsend/', query: { status: 4 }}" class="wenzi" replace>
				<div>
					已完成
				</div>
				<div class="xiahuaxian" v-if="dianji==4"></div>
			</router-link>
		</div>
		<keep-alive>
			<list1 v-if='$route.query.status==0'>
			</list1>
		</keep-alive>
		<keep-alive>
			<list2 v-if='$route.query.status==1'>
			</list2>
		</keep-alive>
		<keep-alive>
			<list3 v-if='$route.query.status==2'>
			</list3>
		</keep-alive>
		<keep-alive>
			<list4 v-if='$route.query.status==3'>
			</list4>
		</keep-alive>
    <keep-alive>
    	<list5 v-if='$route.query.status==4'>
    	</list5>
    </keep-alive>
	</div>
</template>

<script type="text/javascript">
	import list1 from '@/views/send/list1';
	import list2 from '@/views/send/list2';
	import list3 from '@/views/send/list3';
	import list4 from '@/views/send/list4';
  import list5 from '@/views/send/list5';
	export default {
		components: {
			list1,
			list2,
			list3,
			list4,
      list5
		},
		data() {
			return {
				dianji:'',
			}
		},
		watch: {
			$route(i) {
				this.dianji = this.$route.query.status;
			}
		},
		created() {
      // 判断哪个为选中项
      this.dianji = this.$route.query.status;
    }
	}
</script>

<style type="text/css" scoped>
	* {
		padding: 0;
		margin: 0;
	}

	.box {
		min-height: 100%;
		position: relative;
    background-color: #F8F6F6;
	}

	.tiaozhuan {
	display: flex;
    -webkit-box-orient: horizontal;
    -webkit-box-direction: normal;
    -ms-flex-direction: row;
    flex-direction: row;
    width: 100%;
    height: 50px;
    line-height: 50px;
    left: 0;
    background-color: white;
    position: fixed;
    z-index: 999;
	}

	.wenzi {
		width: 25%;
		font-size: 15px;
		color: #3F454B;
		font-weight: 400;
		text-align: center;
	}

	.xiahuaxian {
		width: 35px;
		height: 3px;
		border-radius: 2px;
		background-color: pink;
		margin: -3px auto;
		background: -webkit-linear-gradient(left top, #128E93, #128E93);
		/* Safari 5.1 - 6.0 */
		background: -o-linear-gradient(bottom right, #128E93, #128E93);
		/* Opera 11.1 - 12.0 */
		background: -moz-linear-gradient(bottom right, #128E93, #128E93);
		/* Firefox 3.6 - 15 */
		background: linear-gradient(to bottom right, #128E93, #128E93);
		/* 标准的语法 */
	}
</style>
