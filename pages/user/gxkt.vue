<template>
	<view class="content">
		<view class="no-data" v-if="loading && (list.length === 0 || level <= 0)">
			<image class="no-image" src="../../static/no_data.png" mode=""></image>
			<view class="no-text">暂无数据</view>
		</view>
		<view v-for="(item, index) in list" :key="item.label" class="video-wrap" v-if="index < level">
			<button>{{item.label}}</button>
			<video :src="item.video"></video>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				level: 0,
				list: [],
				loading: false
			}
		},
		onLoad(options) {
			this.$server.setTitle()
			this.$server.chekLogin((res) => {
				this.getGrade()
				this.level = options.level
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
		padding: 10rpx;
	}
	.video-wrap {
		display: inline-block;
		margin-top: 20rpx;
		width: 50%;
		padding: 0 10rpx;
		box-sizing: border-box;
	}
	.video-wrap button {
		height: 60rpx;
		line-height: 60rpx;
		font-size: 28rpx;
		background-color: $juke-main-color;
		color: #fff;
		border-bottom-left-radius: 0;
		border-bottom-right-radius: 0;
	}
	.video-wrap video {
		width: 100%;
	}
	.no-data {
		margin-top: 30rpx;
	}
	.no-image {
		width: 220rpx;
		height: 220rpx;
		margin: 0 auto;
		display: block;
	}
	.no-text {
		color: #9b9b9b;
		font-size: 28rpx;
		margin-top: 60rpx;
		text-align: center;
	}
</style>
