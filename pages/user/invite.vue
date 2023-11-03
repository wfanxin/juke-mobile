<template>
	<view class="content">
		<canvas id="qrcode" canvas-id="qrcode" style="width: 50vw; height: 50vw; margin-top: 20vw;"></canvas>
		<view class="info-title">
			邀请好友
		</view>
		<view class="info">
			邀请好友扫描二维码或复制链接
		</view>
		<view class="info-url">
			{{inviteUrl}}
		</view>
		<view class="copy" @click="copy">
			复制链接
		</view>
	</view>
</template>

<script>
	import UQRCode from 'uqrcodejs'
	export default {
		data() {
			return {
				userData: {},
				inviteUrl: ''
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
					let href = location.href
					let arr = href.split('/')
					arr[arr.length - 1] = 'register'
					this.inviteUrl = arr.join('/') + '?uid=' + this.userData.id
					this.showqrcode()
				}).catch(() => {
					
				})
			},
			showqrcode() {
				// 获取uQRCode实例
				var qr = new UQRCode();
				// 设置二维码内容
				qr.data = this.inviteUrl;
				// 设置二维码大小，必须与canvas设置的宽高一致
				qr.size = 200;
				// 调用制作二维码方法
				qr.make();
				// 获取canvas上下文
				var canvasContext = uni.createCanvasContext('qrcode', this); // 如果是组件，this必须传入
				// 设置uQRCode实例的canvas上下文
				qr.canvasContext = canvasContext;
				// 调用绘制方法将二维码图案绘制到canvas上
				qr.drawCanvas();
			},
			copy() {
				uni.setClipboardData({
				    data: this.inviteUrl,
				    success: function () {
				        uni.showToast({
				            title: '复制成功',
				            image: '/static/show_success.png'
				        })
				    }
				});
			},
		}
	}
</script>

<style lang="scss">
	.content {
		border-top: 2px solid #F2F6FC;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}
	.info-title {
		font-size: 30rpx;
		font-weight: bold;
		margin-top: 20rpx;
	}
	.info {
		font-size: 28rpx;
		color: gray;
		margin-top: 20rpx;
	}
	.info-url {
		font-size: 24rpx;
		color: gray;
		margin-top: 10rpx;
	}
	.copy {
		font-size: 26rpx;
		width: 30vw;
		line-height: 50rpx;
		text-align: center;
		border-radius: 10rpx;
		background-color: $juke-main-color;
		color: #fff;
		margin-top: 40rpx;
	}
</style>
