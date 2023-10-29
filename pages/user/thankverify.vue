<template>
	<view class="content">
		<view class="no-data" v-if="applyList.length === 0 && loading">
			<image class="no-image" src="../../static/no_data.png" mode=""></image>
			<view class="no-text">暂无数据</view>
		</view>
		<view class="panel-wrap" v-else>
			<view class="panel">
				<view class="panel-box" v-for="item in applyList" :key="item.id">
					<view class="item-content">
						<view class="item-header">
							<text class="item-time">提交时间：{{item.created_at}}</text>
							<text class="status success"></text>
						</view>
					</view>
					<view class="item-wrap">
						<image src="/static/logo.png" v-if="item.apply_avatar === ''"></image>
						<image :src="item.apply_avatar" v-else></image>
						<view class="item-info">
							<view class="name">{{item.apply_name}}</view>
							<view class="money">付款金额：{{item.money}}</view>
						</view>
					</view>
					<image class="pay-iamge" :src="item.pay_url" @click="previewImage(item.pay_url)"></image>
					<view class="pass-wrap" v-if="item.status === 0">
						<view class="pass-left">感恩奖</view>
						<button class="fail" @click="verify(item, 2)">审核失败</button>
						<button class="success" @click="verify(item, 1)">审核通过</button>
					</view>
					<view class="item-footer" v-else>
						感恩奖
						<text v-if="item.status === 1" class="success">审核通过</text>
						<text v-else-if="item.status === 2" class="fail">审核失败</text>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				applyList: [],
				loading: false
			}
		},
		onLoad() {
			this.$server.setTitle()
			this.$server.chekLogin((res) => {
				this.getApplyList()
			})
		},
		methods: {
			getApplyList() {
				this.loading = false
				this.$server.requestGet('thank/getApplyList', {}).then((data) => {
					this.applyList = data.data.data
					this.loading = true
				}).catch(() => {
					this.loading = true
				})
			},
			previewImage(url) {
				uni.previewImage({
					urls: [url]
				});
			},
			verify(item, status) {
				let message = ''
				if (status === 1) {
					message = '确认审核通过'
				} else if (status === 2) {
					message = '确认审核失败'
				}
				uni.showModal({
					title: '提示',
					content: message,
					success: (res) => {
						if (res.confirm) {
							const params = {
								id: item.id,
								status : status
							}
							this.$server.requestPost('thank/thankVerify', params).then((data) => {
								uni.showToast({
								   title: '操作成功',
								   image: '/static/show_success.png'
								})
								item.status = status
							}).catch(() => {
							
							})
						}
					}
				})
			}
		}
	}
</script>

<style lang="scss">
	.content {
		border-top: 2px solid #F2F6FC;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}
	.panel-wrap {
		width: 100%;
	}
	.panel {
		// padding: 0 30rpx;
		// margin-bottom: 60rpx;
		// margin-top: 30rpx;
		// box-shadow: 0 0 10rpx #ddd;
		// border-radius: 20rpx;
		// margin: 0 20rpx;
		// color: #333333;
	}
	.panel-box {
		position: relative;
		border-bottom: 1px solid #eee;
		padding: 0 30rpx;
	}
	.panel-box:last-child {
		// border-bottom: none;
	}
	.panel .item-title {
		font-size: 28rpx;
		text-align: center;
		font-weight: bold;
		height: 100rpx;
		line-height: 100rpx;
		border-bottom: 1px solid #eee;
	}
	.panel .item-content .item-header {
		display: flex;
		font-size: 24rpx;
		height: 80rpx;
		line-height: 80rpx;
	}
	.panel .item-content .item-header .status {
		flex: 1;
		text-align: right;
	}
	.panel .item-content .item-header .status.success {
		color: $juke-main-color;
	}
	.panel .item-wrap {
		display: flex;
		color: #666666;
	}
	.panel .item-wrap image {
		width: 80rpx;
		height: 80rpx;
	}
	.panel .item-wrap .item-info {
		padding-left: 20rpx;
	}
	.panel .item-wrap .item-info .name {
		height: 40rpx;
		line-height: 40rpx;
		color: #000000;
		font-size: 28rpx;
	}
	.panel .item-wrap .item-info .money {
		height: 40rpx;
		line-height: 40rpx;
		font-size: 24rpx;
	}
	.panel .item-footer {
		display: flex;
		font-size: 28rpx;
		height: 80rpx;
		line-height: 80rpx;
		padding-bottom: 20rpx;
		color: #666;
	}
	.panel .item-footer .fail {
		color: orangered;
	}
	.panel .item-footer .success {
		color: seagreen;
	}
	.panel .item-footer text {
		flex: 1;
		text-align: right;
	}
	.panel .pay-iamge {
		position: absolute;
		top: 20rpx;
		right: 30rpx;
		width: 200rpx;
		height: 150rpx;
	}
	.pass-wrap {
		display: flex;
		margin: 20rpx 0;
		margin-top: 30rpx;
	}
	.pass-wrap .pass-left {
		flex: 1;
		font-size: 28rpx;
		color: #666;
	}
	.pass-wrap button {
		height: 60rpx;
		line-height: 60rpx;
		margin-left: 20rpx;
		font-size: 24rpx;
		color: #fff;
	}
	.pass-wrap button.success {
		background-color: seagreen;
	}
	.pass-wrap button.fail {
		background-color: orangered;
	}
	.no-data {
		margin-top: 30rpx;
	}
	.no-image {
		width: 220rpx;
		height: 220rpx;
	}
	.no-text {
		color: #9b9b9b;
		font-size: 28rpx;
		margin-top: 60rpx;
		text-align: center;
	}
</style>
