<template>
	<view class="content">
		<view class="title">升级</view>
		<view class="user-info-wrap">
			<view class="user-info">
				<view class="user-header">
					<image src="/static/logo.png" mode=""></image>
					<text>158666666(普通会员)</text>
				</view>
				<view class="shouyi" @click="$server.enterPage('user/shouyi')">
					<view class="text">累计收益</view>
					<view class="money">0</view>
				</view>
			</view>
		</view>
		<view class="panel-wrap">
			<view class="panel">
				<view class="item-title">升级记录</view>
				<view class="panel-box">
					<view class="item-content">
						<view class="item-header">
							<text class="item-time">提交时间：2023-10-16 22:23:03</text>
							<text class="status">审核中</text>
						</view>
					</view>
					<view class="item-wrap">
						<image src="/static/logo.png"></image>
						<view class="item-info">
							<view class="name">课程一</view>
							<view class="money">付款金额：9.00</view>
						</view>
					</view>
					<view class="item-footer">审核人：妙尚</view>
				</view>
				<view class="panel-box">
					<view class="item-content">
						<view class="item-header">
							<text class="item-time">提交时间：2023-10-16 22:23:03</text>
							<text class="status success">审核通过</text>
						</view>
					</view>
					<view class="item-wrap">
						<image src="/static/logo.png"></image>
						<view class="item-info">
							<view class="name">课程一</view>
							<view class="money">付款金额：9.00</view>
						</view>
					</view>
					<view class="item-footer">
						审核人：妙尚
						<text>审核时间：2023-10-16 22:33:03</text>
					</view>
				</view>
			</view>
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
	.user-info-wrap {
		width: 100%;
	}
	.user-info-wrap .user-info {
		background-color: #2fbb95;
		height: 330rpx;
		border-radius: 20rpx;
		margin: 20rpx;
	}
	.user-info-wrap .user-info .user-header {
		font-size: 28rpx;
	}
	.user-info-wrap .user-info .user-header image {
		position: relative;
		width: 100rpx;
		height: 100rpx;
		border-radius: 50%;
		margin-right: 50rpx;
		top: 40rpx;
		left: 30rpx;
	}
	.shouyi {
		color: #ffffff;
		margin-top: 80rpx;
	}
	.shouyi .text {
		text-align: center;
		font-size: 28rpx;
	}
	.shouyi .money {
		text-align: center;
		font-size: 50rpx;
		margin-top: 10rpx;
	}
	.panel-wrap {
		width: 100%;
	}
	.panel {
	    padding: 0 30rpx;
	    margin-bottom: 60rpx;
	    margin-top: 30rpx;
	    box-shadow: 0 0 10rpx #ddd;
	    border-radius: 20rpx;
		margin: 0 20rpx;
		color: #333333;
	}
	.panel-box {
		border-bottom: 1px solid #eee;
	}
	.panel-box:last-child {
		border-bottom: none;
	}
	.panel .item-title {
		font-size: 28rpx;
		text-align: center;
		font-weight: bold;
		height: 100rpx;
		line-height: 100rpx;
		border-bottom: 1px solid #eee;
	}
	.panel .item-content .item-header {
		display: flex;
		font-size: 24rpx;
		height: 80rpx;
		line-height: 80rpx;
	}
	.panel .item-content .item-header .status {
		flex: 1;
		text-align: right;
	}
	.panel .item-content .item-header .status.success {
		color: #50dab5;
	}
	.panel .item-wrap {
		display: flex;
		color: #666666;
	}
	.panel .item-wrap image {
		width: 80rpx;
		height: 80rpx;
	}
	.panel .item-wrap .item-info {
		padding-left: 20rpx;
	}
	.panel .item-wrap .item-info .name {
		height: 40rpx;
		line-height: 40rpx;
		color: #000000;
		font-size: 28rpx;
	}
	.panel .item-wrap .item-info .money {
		height: 40rpx;
		line-height: 40rpx;
		font-size: 24rpx;
	}
	.panel .item-footer {
		display: flex;
		font-size: 24rpx;
		height: 80rpx;
		line-height: 80rpx;
		padding-bottom: 20rpx;
	}
	.panel .item-footer text {
		flex: 1;
		text-align: right;
	}
</style>
