<template>
	<view class="content">
		<image class="logo" src="/static/logo.png"></image>
		<view class="title-wrap">
			<view class="title">聚客登录</view>
		</view>
		<view class="login-panel">
			<view class="panel">
				<view class="login-item">
					<text class="username"></text>
					<input type="text" v-model="mobile" placeholder="请输入手机号">
				</view>
				<view class="login-item">
					<text class="password"></text>
					<input type="password" v-model="password" placeholder="请输入密码">
				</view>
				<view class="login-item">
					<text class="captcha_code"></text>
					<input type="text" v-model="captcha_code" placeholder="请输入验证码">
					<image :src="captcha_code_src" class="code-img" @click="refreshCode()"></image>
				</view>
				<view class="forget"><text @click="$server.enterPage('user/forget')">忘记密码？</text></view>
				<button class="login-btn" @click="login()">登录</button>
				<view class="register" @click="$server.reLaunch('user/register')">立即注册</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				mobile: '',
				password: '',
				captcha_code: '',
				captcha_code_src: ''
			}
		},
		onLoad() {
			this.$server.setTitle()
			this.refreshCode()
		},
		methods: {
			refreshCode() {
			  this.captcha_code_src = this.$server.apiUrl + 'lv/api/captchas/' + Math.random() + '?mobile_device_id=' + this.$server.setDeviceId()
			},
			login() {
				if (this.mobile === '') {
					uni.showToast({
					   title: '手机号不能为空',
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
				
				if (this.captcha_code === '') {
					uni.showToast({
					   title: '验证码不能为空',
					   image: '/static/show_error.png'
					})
					return false
				}
				
				this.$server.requestPost('captchas/check', {
					mobile_device_id: this.$server.setDeviceId(),
					vcode: this.captcha_code
				}).then((data) => {
					this.$server.requestPost('user/login', {
						mobile: this.mobile,
						password: this.password
					}).then((data) => {
						uni.showToast({ // 失败
						    title: '登录成功',
							image: '/static/show_success.png'
						});
						
						uni.setStorageSync('m-token', data.data.token)
						
						setTimeout(() => {
							this.$server.switchTab('index/my')
						}, 1000)
						
					}).catch(() => {
						this.refreshCode()
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
	.login-panel {
		width: 100%;
	}
	.panel {
	    padding: 30rpx;
	    margin-bottom: 60rpx;
	    margin-top: 30rpx;
	    box-shadow: 0 0 10rpx #ddd;
	    border-radius: 20rpx;
	}
	.login-item {
		display: flex;
		border-bottom: 1px solid #eee;
		margin-bottom: 20rpx;
	}
	.login-item .username {
	    width: 60rpx;
	    height: 60rpx;
	    text-indent: -9999px;
	    display: inline-block;
	    background: url("/static/username.png") no-repeat;
	    background-size: 60rpx 60rpx;
	    position: relative;
	    top: 10rpx;
	}
	.login-item .password {
	    width: 60rpx;
	    height: 60rpx;
	    text-indent: -9999px;
	    display: inline-block;
	    background: url("/static/password.png") no-repeat;
	    background-size: 60rpx 60rpx;
	    position: relative;
	    top: 10rpx;
	}
	.login-item .captcha_code {
	    width: 60rpx;
	    height: 60rpx;
	    text-indent: -9999px;
	    display: inline-block;
	    background: url("/static/captcha_code.png") no-repeat;
	    background-size: 60rpx 60rpx;
	    position: relative;
	    top: 10rpx;
	}
	.login-item input {
		flex: 1;
		height: 80rpx;
		line-height: 80rpx;
		font-size: 28rpx;
		padding-left: 10rpx;
	}
	.code-img {
		width: 150rpx;
		height: 45rpx;
		margin-top: 10rpx;
	}
	.forget {
		color: #999;
		font-size: 24rpx;
		text-align: right;
		margin-top: 30rpx;
		margin-bottom: 20rpx;
	}
	.login-btn {
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
