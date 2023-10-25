<template>
	<view class="content">
		<view class="shouyi-info">
			<view class="money">0</view>
			<view class="text">累计收益</view>
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
	.shouyi-info {
		width: 100%;
		height: 260rpx;
		background-color: $juke-main-color;
	}
	.shouyi-info .money {
		font-size: 85rpx;
		color: #ffffff;
		text-align: center;
		margin-top: 40rpx;
	}
	.shouyi-info .text {
		font-size: 28rpx;
		color: #ffffff;
		text-align: center;
		margin-top: 10rpx;
	}
</style>
