<template>
	<view class="content">
		<image class="avatar-image" :src="avatar" @click="chooseImage()"></image>
		<button class="avatar-btn" @click="edit()">保存</button>
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
		onLoad() {
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
			chooseImage() {
				uni.chooseImage({
					count :1,
					success :(res) => {
						this.$server.uploadFile(res.tempFilePaths[0]).then((data) => {
							this.avatar = data
						}).catch(() => {
							uni.showToast({
							   title: '上传失败',
							   image: '/static/show_error.png'
							})
						})
					}
				})
			},
			edit() {
				if (this.avatar === '') {
					uni.showToast({
					   title: '头像不能为空',
					   image: '/static/show_error.png'
					})
					return false
				}
				
				this.$server.requestPost('user/editMember', {
					method: 'avatar',
					avatar: this.avatar
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
	page {
		background-color: #272822;
	}
	.content {

	}
	.avatar-image {
		width: 90vw;
		height: 90vw;
		margin-top: 150rpx;
		margin-left: 5vw;
	}

	.avatar-btn {
		background-color: #E03115;
		color: white;
		height: 80rpx;
		line-height: 80rpx;
		font-size: 28rpx;
		margin-top: 200rpx;
	}
</style>
