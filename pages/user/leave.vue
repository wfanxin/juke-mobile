<template>
	<view class="content">
		<view class="no-data" v-if="loading && list.length === 0">
			<image class="no-image" src="../../static/no_data.png" mode=""></image>
			<view class="no-text">暂无数据</view>
		</view>
		<view class="list-item">
			<image src="../../static/logo.png"></image>
			<view class="info-wrap">
				<view class="info">几点几分了打发发打发离开家离开可奖励奖励啊打发法啊打发法的可奖励奖励尽快解决 会计理论界打发发打发</view>
				<view class="time">12:34</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				level: 0,
				list: [],
				loading: false
			}
		},
		onLoad(options) {
			this.$server.setTitle()
			this.$server.chekLogin((res) => {
				this.getGrade()
			})
		},
		methods: {
			onNavigationBarButtonTap() {
				this.$server.enterPage('user/addleave')
			},
			getGrade() {
				this.loading = false
				this.$server.requestGet('config/getGrade', {}).then((data) => {
					this.list = data.data.list
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
		// display: flex;
		// flex-direction: column;
		// align-items: center;
		// justify-content: center;
		padding: 20rpx;
	}
	.list-item {
		display: flex;
		border-bottom: 1px solid #eee;
		padding-bottom: 10rpx;
	}
	.list-item image {
		width: 80rpx;
		height: 80rpx;
		border: 1px solid #eee;
	}
	.list-item .info-wrap {
		flex: 1;
		font-size: 26rpx;
		line-height: 40rpx;
		margin-left: 20rpx;
	}
	.list-item .info-wrap .time {
		font-size: 24rpx;
		color: #666;
		text-align: right;
	}
	.no-data {
		margin-top: 30rpx;
	}
	.no-image {
		width: 220rpx;
		height: 220rpx;
		margin: 0 auto;
		display: block;
	}
	.no-text {
		color: #9b9b9b;
		font-size: 28rpx;
		margin-top: 60rpx;
		text-align: center;
	}
</style>
