<template>
	<view class="content">
		<view class="no-data">
			<image class="no-image" src="../../static/no_data.png" mode=""></image>
			<view class="no-text">暂无数据</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {

			}
		},
		methods: {
			enterPage(url) {
				uni.navigateTo({
					url: '/pages/' + url
				});
			}
		}
	}
</script>

<style>
	.content {
		border-top: 1px solid #F2F6FC;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
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
