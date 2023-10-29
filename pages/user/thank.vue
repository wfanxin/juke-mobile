<template>
	<view class="content">
		<view class="no-data" v-if="list.length === 0 && loading">
			<image class="no-image" src="/static/no_data.png" mode=""></image>
			<view class="no-text">暂无数据</view>
		</view>
		<view class="list-item" v-for="item in list" :key="item.id">
			<image src="/static/logo.png" v-if="item.pay_avatar === ''"></image>
			<image :src="item.pay_avatar" v-else></image>
			<view class="info">
				<view class="title">{{item.pay_method_name}}付款感恩奖-给{{item.pay_name}}</view>
				<view class="time">
					{{ item.created_at }}
				</view>
			</view>
			<view>
				<view class="money">{{ item.money }}</view>
				<view class="gray" v-if="item.status === 0">待确认</view>
				<view class="success" v-else-if="item.status === 1">已收到</view>
				<view  class="fail" v-else-if="item.status === 2">未收到</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				list: [],
				loading: false
			}
		},
		onShow() {
			this.$server.setTitle()
			this.$server.chekLogin((res) => {
				this.getThankList()
			})
		},
		methods: {
			onNavigationBarButtonTap() {
				this.$server.enterPage('user/addthank')
			},
			getThankList() {
				this.loading = false
				this.$server.requestGet('thank/getThankList', {}).then((data) => {
					this.list = data.data.data
					this.loading = true
				}).catch(() => {
					this.loading = true
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
	.list-item {
		display: flex;
		width: 100vw;
		padding: 20rpx 20rpx;
		border-bottom: 1px solid #eee;
	}
	.list-item image {
		width: 80rpx;
		height: 80rpx;
		border-radius: 50%;
		margin-top: 10rpx;
		margin-left: 20rpx;
	}
	.list-item .info {
		flex: 1;
		margin-left: 20rpx;
	}
	.list-item .info .title {
		height: 40rpx;
		line-height: 40rpx;
		font-size: 28rpx;
		margin-top: 10rpx;
	}
	.list-item .info .time {
		height: 40rpx;
		line-height: 40rpx;
		font-size: 24rpx;
		color: #666;
	}
	.list-item .money {
		margin-top: 10rpx;
		height: 40rpx;
		line-height: 40rpx;
		font-size: 28rpx;
		font-weight: bold;
		margin-right: 20rpx;
	}
	.gray {
		font-size: 24rpx;
		color: gray;
		height: 40rpx;
		line-height: 40rpx;
	}
	.fail {
		font-size: 24rpx;
		color: orangered;
		height: 40rpx;
		line-height: 40rpx;
	}
	.success {
		font-size: 24rpx;
		color: seagreen;
		height: 40rpx;
		line-height: 40rpx;
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
