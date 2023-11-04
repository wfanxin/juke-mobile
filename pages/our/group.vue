<template>
	<view class="content">
		<view class="no-data" v-if="group_list.length === 0 && loading">
			<image class="no-image" src="../../static/no_data.png" mode=""></image>
			<view class="no-text">暂无数据</view>
		</view>
		<view class="panel-wrap" v-else>
			<view class="panel">
				<view class="panel-box" v-for="item in group_list" :key="item.id">
					<view class="item-content">
						<view class="item-header">
							<text class="item-time">注册时间：{{item.created_at}}</text>
							<text class="status">{{item.level_name}}</text>
						</view>
					</view>
					<view class="item-wrap">
						<image src="/static/logo.png" v-if="item.avatar === ''"></image>
						<image :src="item.avatar" v-else></image>
						<view class="item-info">
							<view class="name">{{item.name}}</view>
							<view class="money">收益：{{item.money}}</view>
						</view>
					</view>
					<view class="item-footer">
						手机号：{{item.mobile}}
						<text>邀请人：{{item.invite_name}}</text>
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
				level: 0,
				group_list: [],
				loading: false
			}
		},
		onLoad(options) {
			this.$server.setTitle()
			this.level = options.level
			this.$server.chekLogin((res) => {
				this.getGroupList()
			})
		},
		methods: {
			getGroupList() {
				this.loading = false
				this.$server.requestGet('our/getGroupList', {
					level: this.level
				}).then((data) => {
					this.group_list = data.data.data
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
	.panel-wrap {
		width: 100%;
	}
	.panel {
		// padding: 0 30rpx;
		// margin-bottom: 60rpx;
		// margin-top: 30rpx;
		// box-shadow: 0 0 10rpx #ddd;
		// border-radius: 20rpx;
		// margin: 0 20rpx;
		// color: #333333;
	}
	.panel-box {
		border-bottom: 1px solid #eee;
		padding: 0 30rpx;
	}
	.panel-box:last-child {
		// border-bottom: none;
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
