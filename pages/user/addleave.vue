<template>
	<view class="content">
		<textarea maxlength="-1" placeholder="请输入留言内容" />
		<image :src="image_url" @click="chooseImage()" v-if="image_url !== ''"></image>
		<view v-else class="no-image-url" @click="chooseImage()">+</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				level: 0,
				list: [],
				image_url: '',
				loading: false
			}
		},
		onLoad(options) {
			this.$server.setTitle()
			this.$server.chekLogin((res) => {
				this.getGrade()
			})
		},
		methods: {
			getGrade() {
				this.loading = false
				this.$server.requestGet('config/getGrade', {}).then((data) => {
					this.list = data.data.list
					this.loading = true
				}).catch(() => {
					this.loading = true
				})
			},
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
		margin-top: 20rpx;
		border-radius: 2rpx;
	}
</style>
