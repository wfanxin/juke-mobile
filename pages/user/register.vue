<template>
	<view class="content">
		<image class="logo" src="/static/logo.png"></image>
		<view class="title-wrap">
			<view class="title">手机号注册</view>
		</view>
		<view class="register-panel">
			<view class="panel">
				<view class="register-item">
					<text class="item-label">手机号</text>
					<input type="text" v-model="mobile" placeholder="请输入手机号">
				</view>
				<view class="register-item">
					<text class="item-label">姓名</text>
					<input type="text" v-model="name" placeholder="请输入姓名">
				</view>
				<view class="register-item">
					<text class="item-label">验证码</text>
					<input type="text" v-model="captcha_code" placeholder="请输入验证码">
					<image :src="captcha_code_src" class="code-img" @click="refreshCode()"></image>
				</view>
				<!-- <view class="register-item">
					<text class="item-label">动态码</text>
					<input type="text" v-model="mobile_code" placeholder="请输入手机动态码">
					<view class="mobile-code">点击获取</view>
				</view> -->
				<view class="register-item">
					<text class="item-label">密码</text>
					<input type="password" v-model="password" placeholder="请输入密码">
				</view>
				<view class="register-item">
					<text class="item-label">确认密码</text>
					<input type="password" v-model="cfpassword" placeholder="请输入确认密码">
				</view>
				<!-- <view class="register-item">
					<text class="item-label">邀请码</text>
					<input type="text" v-model="invite_code" placeholder="邀请码（必填）">
				</view> -->
				<button class="register-btn" @click="register()">免费注册</button>
				<view class="register" @click="$server.reLaunch('user/login')">已有账号,立即登录！</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				mobile: '',
				name: '',
				captcha_code: '',
				mobile_code: '123456',
				password: '',
				cfpassword: '',
				invite_code: '',
				captcha_code_src: ''
			}
		},
		onLoad(options) {
			this.$server.setTitle()
			if(options.uid != undefined){ // 从邀请链接进入，则记录邀请用户id
				uni.setStorageSync('inviteUserId', options.uid);
			}
			this.refreshCode()
		},
		methods: {
			refreshCode() {
			  this.captcha_code_src = this.$server.apiUrl + 'lv/api/captchas/' + Math.random() + '?mobile_device_id=' + this.$server.setDeviceId()
			},
			register() {
				if (this.mobile === '') {
					uni.showToast({
					   title: '手机号不能为空',
					   image: '/static/show_error.png'
					})
					return false
				}
				
				if (this.name === '') {
					uni.showToast({
					   title: '姓名不能为空',
					   image: '/static/show_error.png'
					})
					return false
				}
				
				if (this.captcha_code === '') {
					uni.showToast({
					   title: '验证码不能为空',
					   image: '/static/show_error.png'
					})
					return false
				}
				
				if (this.mobile_code === '') {
					uni.showToast({
					   title: '动态码不能为空',
					   image: '/static/show_error.png'
					})
					return false
				}
				
				if (this.password === '') {
					uni.showToast({
					   title: '密码不能为空',
					   image: '/static/show_error.png'
					})
					return false
				}
				
				if (this.cfpassword === '') {
					uni.showToast({
					   title: '确认密码不能为空',
					   image: '/static/show_error.png'
					})
					return false
				}
				
				// if (this.invite_code === '') {
				// 	uni.showToast({
				// 	   title: '邀请码不能为空',
				// 	   image: '/static/show_error.png'
				// 	})
				// 	return false
				// }
				
				this.$server.requestPost('captchas/check', {
					mobile_device_id: this.$server.setDeviceId(),
					vcode: this.captcha_code
				}).then((data) => {
					this.$server.requestPost('user/register', {
						inviteUserId: uni.getStorageSync('inviteUserId'),
						mobile: this.mobile,
						name: this.name,
						mobile_code: this.mobile_code,
						password: this.password,
						cfpassword: this.cfpassword,
						invite_code: this.invite_code
					}).then((data) => {
						uni.showToast({
						   title: '注册成功',
						   image: '/static/show_success.png'
						})
						setTimeout(() => {
							this.$server.reLaunch('user/login')
						}, 1000)
					}).catch(() => {

					})
				}).catch(() => {
					this.refreshCode()
				})
			}
		}
	}
</script>

<style lang="scss">
	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		padding: 0 40rpx;
	}
	.logo {
		width: 400rpx;
		height: 400rpx;
		margin: 60rpx auto;
	}
	.title-wrap {
		width: 100%;
		text-align: center;
		font-size: 36rpx;
		line-height: 70rpx;
		border-bottom: 1px solid #efefef;
	}
	.title {
		margin: 20rpx 0;
	}
	.register-panel {
		width: 100%;
	}
	.panel {
	    padding: 30rpx;
	    margin-bottom: 60rpx;
	    margin-top: 30rpx;
	    box-shadow: 0 0 10rpx #ddd;
	    border-radius: 20rpx;
	}
	.register-item {
		display: flex;
		border-bottom: 1px solid #eee;
		margin-bottom: 10rpx;
		padding-bottom: 10rpx;
	}
	.register-item .item-label {
		position: relative;
		top: 24rpx;
		width: 100rpx;
		font-size: 24rpx;
	}
	.register-item input {
		flex: 1;
		height: 80rpx;
		line-height: 80rpx;
		font-size: 28rpx;
		padding-left: 10rpx;
	}
	.register-item .mobile-code {
		position: relative;
		top: 8rpx;
		height: 60rpx;
		line-height: 60rpx;
		font-size: 24rpx;
		padding: 0 20rpx;
		color: #FFC105;
		border: 1px solid #FFC105;
		border-radius: 10rpx;
	}
	.code-img {
		width: 150rpx;
		height: 45rpx;
		margin-top: 20rpx;
	}
	.forget {
		color: #999;
		font-size: 24rpx;
		text-align: right;
		margin-top: 30rpx;
		margin-bottom: 20rpx;
	}
	.register-btn {
		background-color: $juke-main-color;
		color: white;
		height: 80rpx;
		line-height: 80rpx;
		font-size: 28rpx;
	}
	.register {
		font-size: 24rpx;
		color: #34495e;
		text-align: center;
		margin-top: 40rpx;
		margin-bottom: 20rpx;
	}
</style>
