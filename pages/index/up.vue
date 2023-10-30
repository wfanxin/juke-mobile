<template>
	<view class="content">
		<view class="title">升级</view>
		<view class="user-info-wrap">
			<view class="user-info">
				<view class="user-header">
					<image :src="avatar"></image>
					<text>{{ userData.mobile }}({{ userData.level_name }})</text>
				</view>
				<view class="shouyi" @click="$server.enterPage('user/shouyi')">
					<view class="text">累计收益</view>
					<view class="money">{{ userData.money }}</view>
				</view>
			</view>
		</view>
		<view class="up-wrap" v-if="userData.level < 20 && (payRecordList.length === 0 || payRecordList[0].status === 1)">
			<button class="up-btn" @click="$server.enterPage('up/levelup')">立即升级</button>
		</view>
		<view class="panel-wrap" v-if="payRecordList.length > 0">
			<view class="panel">
				<view class="item-title">升级记录</view>
				<view class="panel-box" @click="$server.enterPage('up/levelupdetail?id=' + item.id)" v-for="item in payRecordList" :key="item.id">
					<view class="item-content">
						<view class="item-header">
							<text class="item-time">提交时间：{{item.created_at}}</text>
							<text class="status" v-if="item.status === 0">审核中</text>
							<text class="status success" v-else-if="item.status === 1">审核通过</text>
							<text class="status fail" v-else-if="item.status === 2">审核失败</text>
						</view>
					</view>
					<view class="item-wrap">
						<image src="/static/logo.png" v-if="item.pay_avatar === ''"></image>
						<image :src="item.pay_avatar" v-else></image>
						<view class="item-info">
							<view class="name">升级{{item.up_level_name}}</view>
							<view class="money">付款金额：{{item.money}}</view>
						</view>
					</view>
					<view class="item-footer">
						审核人：{{item.pay_name}}
						<text v-if="item.status !== 0">审核时间：{{item.updated_at}}</text>
					</view>
				</view>
			</view>
		</view>
		<view class="footer"></view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				userData: {},
				avatar: '',
				payRecordList: []
			}
		},
		onShow() {
			this.$server.setTitle()
			this.$server.chekLogin((res) => {
				this.getMember()
				this.getPayRecordList()
			})
		},
		methods: {
			getMember() {
				this.$server.requestGet('user/getMember', {}).then((data) => {
					this.userData = data.data.data
					if (this.userData.avatar) {
						this.avatar = this.userData.avatar
					} else {
						this.avatar = '/static/logo.png'
					}
				}).catch(() => {
					
				})
			},
			getPayRecordList() {
				this.$server.requestGet('up/getPayRecordList', {}).then((data) => {
					this.payRecordList = data.data.data
				}).catch(() => {
					
				})
			}
		}
	}
</script>

<style lang="scss">
	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}
	.title {
		position: fixed;
		z-index: 99;
		top: 0;
		width: 100%;
		height: 88rpx;
		line-height: 88rpx;
		text-align: center;
		border-bottom: 2px solid #F2F6FC;
		background-color: #ffffff;
	}
	.user-info-wrap {
		width: 100%;
		margin-top: 90rpx;
	}
	.user-info-wrap .user-info {
		background-color: $juke-main-dark-color;
		height: 330rpx;
		border-radius: 20rpx;
		margin: 20rpx;
	}
	.user-info-wrap .user-info .user-header {
		font-size: 28rpx;
		color: #fff;
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
	.up-wrap {
		margin-bottom: 20rpx;
	}
	.up-btn {
		background-color: $juke-main-color;
		color: white;
		height: 60rpx;
		line-height: 60rpx;
		font-size: 28rpx;
		margin: 20rpx 0;
		width: 80vw;
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
		color: $juke-main-color;
	}
	.panel .item-content .item-header .status.fail {
		color: red;
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
	.footer {
		height: 100rpx;
	}
</style>
