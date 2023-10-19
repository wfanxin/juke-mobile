<template>
	<view class="content">
		<view class="title">我的同修</view>
		<view class="our-info-wrap">
			<view class="our-info"></view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				title: 'Hello',
				url: this.$server.apiUrl
			}
		},
		onLoad() {
			this.$server.chekLogin((res) => {
				console.log('lai')
			})
		},
		methods: {

		}
	}
</script>

<style>
	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}
	.title {
		width: 100%;
		height: 88rpx;
		line-height: 88rpx;
		text-align: center;
		border-bottom: 2px solid #F2F6FC;
	}
	.our-info-wrap {
		width: 100%;
	}
	.our-info-wrap .our-info {
		background-color: #50dab5;
		height: 350rpx;
		border-radius: 20rpx;
		margin: 20rpx;
	}
</style>
