<template>
	<view class="content">
		<view class="shouyi-info">
			<view class="money">{{ money }}</view>
			<view class="text">累计收益</view>
		</view>
		<view class="list-item" v-for="item in list" :key="item.id">
			<image src="/static/logo.png" v-if="item.user_avatar === ''"></image>
			<image :src="item.user_avatar" v-else></image>
			<view class="info">
				<view class="title">{{item.pay_method_name}}支付升级{{item.up_level_name}}</view>
				<view class="time">
					{{ item.created_at }}
				</view>
			</view>
			<view class="money">{{ item.money }}</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				money: 0,
				list: []
			}
		},
		onLoad() {
			this.$server.setTitle()
			this.$server.chekLogin((res) => {
				this.getMoneyList()
			})
		},
		methods: {
			getMoneyList() {
				this.$server.requestGet('user/getMoneyList', {}).then((data) => {
					this.money = data.data.money
					this.list = data.data.data
				}).catch(() => {
				
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
	.shouyi-info {
		width: 100%;
		height: 260rpx;
		background-color: $juke-main-color;
	}
	.shouyi-info .money {
		font-size: 85rpx;
		color: #ffffff;
		text-align: center;
		margin-top: 40rpx;
	}
	.shouyi-info .text {
		font-size: 28rpx;
		color: #ffffff;
		text-align: center;
		margin-top: 10rpx;
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
		height: 100rpx;
		line-height: 100rpx;
		font-size: 28rpx;
		font-weight: bold;
		margin-right: 20rpx;
	}
</style>
