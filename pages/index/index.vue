<template>
	<view class="content">
		<image class="logo" src="/static/logo.png"></image>
		<view class="text-area">
			<text class="title">{{ title }}</text>
		</view>
		<view>{{ url }}</view>
		<button @click="$server.reLaunch('user/login')">登录</button>
		<button @click="$server.enterPage('user/register')">注册</button>
		<button @click="login">接口请求</button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				title: 'Hello',
				url: this.$server.apiUrl
			}
		},
		onLoad() {
			this.$server.chekLogin((res) => {
				console.log('lai')
			})
		},
		methods: {
			login() {
				this.$server.requestPost('user/login', {
					user_name: 'xueg',
					password: '123456'
				}).then((res) => {
					console.log(res)
				})
			}
		}
	}
</script>

<style>
	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.logo {
		height: 200rpx;
		width: 200rpx;
		margin-top: 200rpx;
		margin-left: auto;
		margin-right: auto;
		margin-bottom: 50rpx;
	}

	.text-area {
		display: flex;
		justify-content: center;
	}

	.title {
		font-size: 36rpx;
		color: #8f8f94;
	}
</style>
