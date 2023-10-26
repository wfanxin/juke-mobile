<template>
	<view class="content">
		<view class="forget-item">
			<text class="item-label">当前密码</text>
			<input type="password" v-model="oldPassword" placeholder="原始密码">
		</view>
		<view class="forget-item">
			<text class="item-label">新密码</text>
			<input type="password" v-model="password" placeholder="新密码">
		</view>
		<view class="forget-item">
			<text class="item-label">确认新密码</text>
			<input type="password" v-model="cfpassword" placeholder="确认新密码">
		</view>
		<button class="forget-btn" @click="edit()">保存</button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				oldPassword: '',
				password: '',
				cfpassword: ''
			}
		},
		onLoad() {
			this.$server.setTitle()
		},
		methods: {
			edit() {
				if (this.oldPassword === '') {
					uni.showToast({
					   title: '原始密码不能为空',
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
				
				this.$server.requestPost('user/editMember', {
					method: 'password',
					oldPassword: this.oldPassword,
					password: this.password,
					cfpassword: this.cfpassword
				}).then((data) => {
					uni.showToast({ // 失败
					    title: '操作成功',
						image: '/static/show_success.png'
					});
					
					setTimeout(() => {
						this.$server.navigateBack(1)
					}, 1000)
				}).catch(() => {

				})
			}
		}
	}
</script>

<style lang="scss">
	.content {
		border-top: 2px solid #F2F6FC;
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
		width: 200rpx;
		font-size: 28rpx;
		color: #999999;
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
		color: $juke-main-dark-color ;
		border: 1px solid $juke-main-dark-color ;
		border-radius: 10rpx;
	}
	.forget-btn {
		background-color: $juke-main-color;
		color: white;
		height: 80rpx;
		line-height: 80rpx;
		font-size: 28rpx;
		margin-top: 60rpx;
	}
</style>
