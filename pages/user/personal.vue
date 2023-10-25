<template>
	<view class="content">
		<view class="view-item">
			<image class="user-image" :src="avatar" @click="$server.enterPage('user/avatar')"></image>
		</view>
		<view class="view-item">
			<text class="item-label">手机</text>
			<text class="item-value">{{ userData.mobile }}</text>
			<!-- <text class="image-arrow-right"></text> -->
		</view>
		<view class="view-item">
			<text class="item-label">姓名</text>
			<text class="item-value" @click="$server.enterPage('user/name')">{{ userData.name }}</text>
			<text class="image-arrow-right"></text>
		</view>
		<view class="view-item">
			<text class="item-label">密码</text>
			<text class="item-value active" @click="$server.enterPage('user/password')">修改</text>
			<text class="image-arrow-right"></text>
		</view>
		<button class="logout-btn" @click="logout()">退出登录</button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				userData: {},
				avatar: ''
			}
		},
		onShow() {
			this.$server.chekLogin((res) => {
				this.getMember()
			})
		},
		methods: {
			getMember() {
				this.$server.requestGet('user/getMember', {}).then((data) => {
					this.userData = data.data.data
					if (this.userData.avatar) {
						this.avatar = this.userData.avatar
					} else {
						this.avatar = '/static/logo.png'
					}
				}).catch(() => {
					
				})
			},
			logout() {
				uni.showModal({
					title: '提示',
					content: '确认退出登录',
					success: (res) => {
						if (res.confirm) {
							this.$server.requestPost('user/logout', {}).then((data) => {
								uni.showToast({
								   title: '退出成功',
								   image: '/static/show_success.png'
								})
								uni.removeStorageSync('m-token')
								setTimeout(() => {
									this.$server.reLaunch('user/login')
								}, 1000)
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
		border-radius: 50%;
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
		background-color: $juke-main-color;
		color: white;
		height: 80rpx;
		line-height: 80rpx;
		font-size: 28rpx;
		margin-top: 100rpx;
	}
</style>
