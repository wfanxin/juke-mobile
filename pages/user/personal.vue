<template>
	<view class="content">
		<view class="view-item">
			<image class="user-image" src="../../static/logo.png" mode=""></image>
		</view>
		<view class="view-item">
			<text class="item-label">手机</text>
			<text class="item-value">158666666</text>
			<text class="image-arrow-right"></text>
		</view>
		<view class="view-item">
			<text class="item-label">姓名</text>
			<text class="item-value">测试</text>
			<text class="image-arrow-right"></text>
		</view>
		<view class="view-item">
			<text class="item-label">密码</text>
			<text class="item-value active">修改</text>
			<text class="image-arrow-right"></text>
		</view>
		<button class="logout-btn" @click="logout()">退出登录</button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				mobile: '',
				mobile_code: '',
				password: '',
				cfpassword: ''
			}
		},
		methods: {
			enterPage(url) {
				uni.navigateTo({
					url: '/pages/' + url
				});
			},
			logout() {
				
			}
		}
	}
</script>

<style>
	.content {
		border-top: 1px solid #F2F6FC;
		padding: 0 40rpx;
		padding-top: 30rpx;
		color: #333333;
	}
	.view-item {
		display: flex;
		border-bottom: 1px solid #eee;
		margin-bottom: 10rpx;
		padding-bottom: 10rpx;
	}
	.view-item .user-image {
		width: 80rpx;
		height: 80rpx;
	}
	.view-item .item-label {
		position: relative;
		top: 24rpx;
		width: 150rpx;
		font-size: 28rpx;
		color: #999999;
	}
	.view-item .item-value {
		flex: 1;
		height: 80rpx;
		line-height: 80rpx;
		font-size: 28rpx;
		padding-left: 10rpx;
		text-align: right;
		padding-right: 20rpx;
	}
	.view-item .item-value.active {
		color: #29afe4;
	}
	.logout-btn {
		background-color: #50dab5;
		color: white;
		height: 80rpx;
		line-height: 80rpx;
		font-size: 28rpx;
		margin-top: 100rpx;
	}
</style>
