<template>
	<view class="content">
		<view class="user-info">
			<image class="user-image" :src="avatar" @click="$server.enterPage('user/personal')"></image>
			<view class="user-content">
				<view><text class="bold">【{{ userData.name }}】</text>{{ userData.mobile }}</view>
				<view>{{ userData.level_name }}</view>
			</view>
			<view class="shouyi" @click="$server.enterPage('user/shouyi')">
				<image src="/static/shouyi1.png" mode=""></image>
				<view class="shouyi-text">累计收益</view>
			</view>
		</view>
		<view class="user-panel-wrap">
			<view class="user-panel">
				<view class="panel">
					<view class="user-item" @click="$server.enterPage('user/payinfo')">
						<text class="bank"></text>
						<text class="item-value">收款方式</text>
						<text class="item-value-right">已设置</text>
						<text class="image-arrow-right image-arrow-right-change"></text>
					</view>
					<!-- <view class="user-item" @click="$server.enterPage('user/friends')">
						<text class="friend"></text>
						<text class="item-value">我的密友</text>
						<text class="image-arrow-right image-arrow-right-change"></text>
					</view> -->
					<view class="user-item" @click="$server.enterPage('user/invite')" v-if="userData.level >= 4">
						<text class="invite"></text>
						<text class="item-value">邀请好友</text>
						<text class="image-arrow-right image-arrow-right-change"></text>
					</view>
					<view class="user-item" @click="$server.enterPage('user/apply')" v-if="userData.level >= 4">
						<text class="apply"></text>
						<text class="item-value">申请列表</text>
						<text class="image-arrow-right image-arrow-right-change"></text>
					</view>
					<view class="user-item" @click="$server.enterPage('user/gxkt')" v-if="userData.level >= 4">
						<text class="gxkt"></text>
						<text class="item-value">国学课堂</text>
						<text class="image-arrow-right image-arrow-right-change"></text>
					</view>
					<view class="user-item" @click="$server.enterPage('user/personal')">
						<text class="lock"></text>
						<text class="item-value">个人信息</text>
						<text class="image-arrow-right image-arrow-right-change"></text>
					</view>
				</view>
				<button class="logout-btn" @click="logout()">退出登录</button>
			</view>
		</view>
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
			this.$server.setTitle()
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
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}
	.user-info {
		display: flex;
		position: relative;
		width: 100%;
		height: 210rpx;
		background-color: $juke-main-color;
	}
	.user-info .user-image {
		width: 128rpx;
		height: 128rpx;
		border-radius: 50%;
		margin-top: 40rpx;
		margin-left: 30rpx;
	}
	.user-info .user-content {
		color: #ffffff;
		font-size: 28rpx;
		line-height: 60rpx;
		margin-top: 40rpx;
		margin-left: 20rpx;
	}
	.user-info .user-content .bold {
		font-weight: bold;
	}
	.user-info .shouyi {
		position: absolute;
		right: 60rpx;
		bottom: 30rpx;
	}
	.user-info .shouyi image {
		width: 50rpx;
		height: 50rpx;
		margin-left: 30rpx;
	}
	.user-info .shouyi .shouyi-text {
		color: #ffffff;
		font-size: 28rpx;
	}
	.user-panel-wrap {
		width: 100%;
	}
	.user-panel {
		margin: 0 25rpx;
	}
	.panel {
	    padding: 0 30rpx;
	    margin-bottom: 40rpx;
	    margin-top: 20rpx;
	    box-shadow: 0 0 10rpx #ddd;
	    border-radius: 20rpx;
	}
	.user-item {
		display: flex;
		border-bottom: 1px solid #eee;
	}
	.user-item:last-child {
		border-bottom: none;
	}
	.user-item .bank {
	    width: 40rpx;
	    height: 40rpx;
	    text-indent: -9999px;
	    display: inline-block;
	    background: url("/static/bank.png") no-repeat;
	    background-size: 40rpx 40rpx;
	    position: relative;
	    top: 30rpx;
	}
	.user-item .invite {
	    width: 40rpx;
	    height: 40rpx;
	    text-indent: -9999px;
	    display: inline-block;
	    background: url("/static/friend.png") no-repeat;
	    background-size: 40rpx 40rpx;
	    position: relative;
	    top: 30rpx;
	}
	.user-item .apply {
	    width: 40rpx;
	    height: 40rpx;
	    text-indent: -9999px;
	    display: inline-block;
	    background: url("/static/our.png") no-repeat;
	    background-size: 40rpx 40rpx;
	    position: relative;
	    top: 30rpx;
	}
	.user-item .friend {
	    width: 40rpx;
	    height: 40rpx;
	    text-indent: -9999px;
	    display: inline-block;
	    background: url("/static/friend.png") no-repeat;
	    background-size: 40rpx 40rpx;
	    position: relative;
	    top: 30rpx;
	}
	.user-item .gxkt {
	    width: 40rpx;
	    height: 40rpx;
	    text-indent: -9999px;
	    display: inline-block;
	    background: url("/static/gxkt.png") no-repeat;
	    background-size: 40rpx 40rpx;
	    position: relative;
	    top: 30rpx;
	}
	.user-item .lock {
	    width: 40rpx;
	    height: 40rpx;
	    text-indent: -9999px;
	    display: inline-block;
	    background: url("/static/lock.png") no-repeat;
	    background-size: 40rpx 40rpx;
	    position: relative;
	    top: 30rpx;
	}
	.user-item .item-value {
		flex: 1;
		height: 100rpx;
		line-height: 100rpx;
		font-size: 28rpx;
		padding-left: 10rpx;
		text-align: left;
		padding-left: 30rpx;
		color: #333333;
		font-size: 24rpx;
	}
	.user-item .item-value-right {
		height: 100rpx;
		line-height: 100rpx;
		font-size: 24rpx;
		padding-right: 20rpx;
	}
	.image-arrow-right-change {
		position: relative;
		top: 10rpx;
	}
	.logout-btn {
		background-color: $juke-main-color;
		color: white;
		height: 80rpx;
		line-height: 80rpx;
		font-size: 28rpx;
	}
</style>
