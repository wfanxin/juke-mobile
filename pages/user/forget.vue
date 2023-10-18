<template>
	<view class="content">
		<view class="forget-item">
			<text class="item-label">手机号</text>
			<input type="text" v-model="mobile" placeholder="请输入手机号">
		</view>
		<view class="forget-item">
			<text class="item-label">验证码</text>
			<input type="text" v-model="mobile_code" placeholder="请输入验证码">
			<view class="mobile-code">获取验证码</view>
		</view>
		<view class="forget-item">
			<text class="item-label">新密码</text>
			<input type="password" v-model="password" placeholder="请输入新密码">
		</view>
		<view class="forget-item">
			<text class="item-label">确认新密码</text>
			<input type="password" v-model="cfpassword" placeholder="请输入确认新密码">
		</view>
		<button class="forget-btn" @click="forget()">保存</button>
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
			forget() {
				if (this.mobile === '') {
					uni.showToast({
					   title: '手机号不能为空',
					   image: '/static/show_error.png'
					})
					return false
				}
				
				if (this.mobile_code === '') {
					uni.showToast({
					   title: '验证码不能为空',
					   image: '/static/show_error.png'
					})
					return false
				}
				
				if (this.password === '') {
					uni.showToast({
					   title: '新密码不能为空',
					   image: '/static/show_error.png'
					})
					return false
				}
				
				if (this.cfpassword === '') {
					uni.showToast({
					   title: '确认新密码不能为空',
					   image: '/static/show_error.png'
					})
					return false
				}
			}
		}
	}
</script>

<style>
	.content {
		border-top: 1px solid #F2F6FC;
		padding: 0 40rpx;
		padding-top: 10rpx;
	}
	.forget-item {
		display: flex;
		border-bottom: 1px solid #eee;
		margin-bottom: 10rpx;
		padding-bottom: 10rpx;
	}
	.forget-item .item-label {
		position: relative;
		top: 24rpx;
		width: 150rpx;
		font-size: 28rpx;
	}
	.forget-item input {
		flex: 1;
		height: 80rpx;
		line-height: 80rpx;
		font-size: 28rpx;
		padding-left: 10rpx;
	}
	.forget-item .mobile-code {
		position: relative;
		top: 8rpx;
		height: 60rpx;
		line-height: 60rpx;
		font-size: 24rpx;
		padding: 0 20rpx;
		color: #24af8a ;
		border: 1px solid #24af8a ;
		border-radius: 10rpx;
	}
	.forget-btn {
		background-color: #50dab5;
		color: white;
		height: 80rpx;
		line-height: 80rpx;
		font-size: 28rpx;
		margin-top: 60rpx;
	}
</style>
