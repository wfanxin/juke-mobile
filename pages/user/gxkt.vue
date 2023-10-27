<template>
	<view class="content">
		<view class="no-data" v-if="loading && (list.length === 0 && level <= 0)">
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
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}
	.video-wrap {
		margin-top: 20rpx;
	}
	.video-wrap button {
		background-color: $juke-main-color;
		color: #fff;
	}
	.video-wrap video {
		width: calc(100vw - 40rpx);
	}
	.no-data {
		margin-top: 30rpx;
	}
	.no-image {
		width: 220rpx;
		height: 220rpx;
	}
	.no-text {
		color: #9b9b9b;
		font-size: 28rpx;
		margin-top: 60rpx;
		text-align: center;
	}
</style>
