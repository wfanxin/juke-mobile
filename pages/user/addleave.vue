<template>
	<view class="content">
		<textarea maxlength="-1" placeholder="请输入留言内容" v-model="remark"></textarea>
		<image :src="image_url" @click="chooseImage()" v-if="image_url !== ''"></image>
		<view v-else class="no-image-url" @click="chooseImage()">+</view>
		<button class="submit-btn" @click="addLeave()">提交</button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				remark: '',
				image_url: ''
			}
		},
		onLoad(options) {
			this.$server.setTitle()
			this.$server.chekLogin((res) => {

			})
		},
		methods: {
			chooseImage() {
				uni.chooseImage({
					count :1,
					success :(res) => {
						this.$server.uploadFile(res.tempFilePaths[0]).then((data) => {
							this.image_url = data
						}).catch(() => {
							uni.showToast({
							   title: '上传失败',
							   image: '/static/show_error.png'
							})
						})
					}
				})
			},
			addLeave() {
				if (this.remark === '') {
					uni.showToast({
					   title: '留言内容不能为空',
					   image: '/static/show_error.png'
					})
					return false
				}
				
				if (this.image_url === '') {
					uni.showToast({
					   title: '图片不能为空',
					   image: '/static/show_error.png'
					})
					return false
				}
				
				this.$server.requestPost('leave/add', {
					remark: this.remark,
					image_url: this.image_url
				}).then((data) => {
					uni.showToast({
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
		// display: flex;
		// flex-direction: column;
		// align-items: center;
		// justify-content: center;
		padding: 20rpx;
	}
	textarea {
		width: 100%;
		border: 1px solid #eee;
		border-radius: 2rpx;
		padding: 20rpx;
		box-sizing: border-box;
		font-size: 28rpx;
	}
	image {
		width: 30vw;
		height: 30vw;
		margin-top: 20rpx;
		border-radius: 2rpx;
	}
	.no-image-url {
		border: 1px solid #eee;
		width: 30vw;
		height: 30vw;
		line-height: 30vw;
		text-align: center;
		color: #eee;
		font-size: 50rpx;
		margin-top: 40rpx;
		border-radius: 2rpx;
	}
	.submit-btn {
		background-color: $juke-main-color;
		color: white;
		height: 80rpx;
		line-height: 80rpx;
		font-size: 28rpx;
		margin-top: 60rpx;
	}
</style>
