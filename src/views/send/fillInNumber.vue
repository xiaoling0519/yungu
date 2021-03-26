<template>
	<div class="alert-box">
		<!-- 待发货-填单号 -->
		<div class="erty" @click='exit'>
		</div>
		<div class="SetUpDeliveryWindow">
			<div class="SetUpDeliveryBox">
				<div class="SetUpDeliveryBoxtop">
					<div class="SetUpDeliverytitleBox">
						<div class="SetUpDeliverytitle">设置发货</div>
						<div class="del" @click='exit'>×</div>
					</div>
					<!-- <div class="SetUpDeliveryBoxtop-center">
						<div class="OrderNumber RightNumber">订单编号</div>
						<input type="text" class="LeftNumber" v-model="Data.ddinfo_id" name="OrderNumber" placeholder="请输入订单编号">
					</div> -->
					<div class="aui-content aui-margin-b-15">
						<ul class="aui-list aui-form-list">
							<li class="aui-list-item">
								<div class="aui-list-item-inner">
									<div class="aui-list-item-label">
										运单编号
									</div>
									<div class="aui-list-item-input">
										<input v-model="Data.kddh" type="text" class="LeftNumber" name="WaybillNumber" placeholder="请输入运单编号">
									</div>
								</div>
							</li>
							<li class="aui-list-item">
								<div class="aui-list-item-inner">
									<div class="aui-list-item-label">
										选择快递
									</div>
									<div class="aui-list-item-input">
										<select v-model="Data.kdgs_id" class="LeftNumber" placeholder='请选择快递'>
											<option :value="ls.kdgs_id" v-for="ls in express" :key='ls.kdgs_id'>
												{{ls.kdgs_name}}
											</option>
										</select>
									</div>
								</div>
							</li>
						</ul>
					</div>
				</div>
			</div>
			<div class="SetUpDeliveryBoxDibu">
				<div class="Cancel">取消</div>
				<div class="Determine" @click="shipments">确定</div>
			</div>
		</div>
	</div>
</template>

<script type="text/javascript">
	import {
		getExpress,
		shipments
	} from '@/api/send/send.js';
	import {
		Toast
	} from 'mint-ui'

	export default {
		data() {
			return {
				Data: {
					ddinfo_id: this.upData.ddinfo_id,
					kdgs_id: 88,
					kddh: '',
				},
				express: [],
			}
		},
		props: {
			upData: {
				type: Object
			},
			// 关闭窗口
			exit: {
				type: Function,
				default () {
					return false;
				}
			}
		},
		created() {
			// 加载快递列表
			this.getExpress()
		},
		methods: {
			// 获取快递
			getExpress() {
				getExpress({}).then(({
					data
				}) => {
					this.express = data;
				})
			},
			// 发货功能
			shipments() {
				let obj = this
				shipments(obj.Data).then((data) => {
					Toast({
						message: '发货成功',
						iconClass: 'cmy-icon cmy-icon-hook',
						duration: 1000
					});
				})
			}

		}
	}
</script>

<style type="text/css" scoped>
	/* 待发货-填单号 */
	.alert-box {
		height: 100%;
		width: 100%;
		position: fixed;
		bottom: 0;
		left: 0
			/* opacity: 0.35; */

	}

	.erty {
		position: absolute;
		height: 100%;
		width: 100%;
		opacity: 0.35;
		background-color: #000000;


	}

	.SetUpDeliveryWindow {
		position: fixed;
		bottom: 0;
		width: 100%;
		background-color: #23d323;
		background-color: #FFFFFF;
		border-radius: 5px 5px 0px 0px;
	}

	.SetUpDeliveryBox {
		padding: 0px 12px 0px 12px;
	}

	.SetUpDeliveryBoxtop {
		width: 100%;
		display: flex;
		flex-direction: column;
	}

	.SetUpDeliverytitleBox {
		height: 100%;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
	}

	.SetUpDeliverytitle {
		color: #3F454B;
		font-size: 14px;
		font-weight: bold;
		height: 38px;
		line-height: 38px;
	}

	.del {
		color: #999999;
		height: 38px;
		line-height: 38px;
		font-size: 20px;
	}

	.LeftNumber {
		height: 43px;
		color: #999999;
		font-size: 14px;
		line-height: 43px;
		width: 100%;
		/* width:calc( 100% + 20px );
	background:transparent ; */
	}

	.SetUpDeliveryBoxDibu {
		height: 37px;
		width: 100%;
		display: flex;
	}

	.Cancel {
		height: 37px;
		width: 50%;
		background-color: #AEAFB4;
		color: #FFFFFF;
		font-size: 16px;
		font-weight: bold;
		text-align: center;
		line-height: 37px;
	}

	.Determine {
		height: 37px;
		width: 50%;
		background-color: #6D8BFE;
		color: #FFFFFF;
		font-size: 16px;
		font-weight: bold;
		text-align: center;
		line-height: 37px;
	}

	.select-kd {
		overflow: hidden;
		width: 100%;
		width: calc(100%);
		overflow: hidden;
		background-size: 20px 20px;
		background-position: center right;
		background-image: url(/static/jiantou9.png);
		background-repeat: no-repeat;

	}
</style>
