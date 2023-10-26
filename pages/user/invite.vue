<template>
	<view class="content">
		<view class="copy" @click="copy">
			复制链接
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				userData: {}
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
				}).catch(() => {
					
				})
			},
			copy() {
				let href = location.href
				let arr = href.split('/')
				arr[arr.length - 1] = 'register'
				let inviteUrl = arr.join('/') + '?uid=' + this.userData.id
				console.log(inviteUrl)
				uni.setClipboardData({
				    data: inviteUrl,
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
	.copy {
		width: 30vw;
		height: 30vw;
		line-height: 30vw;
		text-align: center;
		border-radius: 50%;
		background-color: $juke-main-color;
		color: #fff;
		margin-top: 20vw;
	}
</style>
