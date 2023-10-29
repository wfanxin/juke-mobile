<template>
	<view class="content">
		<view class="no-data" v-if="loading && list.length === 0">
			<image class="no-image" src="../../static/no_data.png" mode=""></image>
			<view class="no-text">暂无数据</view>
		</view>
		<view class="list-item" v-for="item in list" :key="item.id">
			<image :src="item.image_url"></image>
			<view class="info-wrap">
				<view class="info">{{ item.remark }}</view>
				<view class="footer">
					<view class="time">{{ item.created_at }}</view>
					<view class="status pedding" v-if="item.status === 0">未处理</view>
					<view class="status success" v-else-if="item.status === 1">已处理</view>
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
				list: [],
				loading: false
			}
		},
		onShow() {
			this.$server.setTitle()
			this.$server.chekLogin((res) => {
				this.getGrade()
			})
		},
		methods: {
			onNavigationBarButtonTap() {
				this.$server.enterPage('user/addleave')
			},
			getGrade() {
				this.loading = false
				this.$server.requestGet('leave/list', {}).then((data) => {
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
		padding: 0 20rpx;
	}
	.list-item {
		display: flex;
		border-bottom: 1px solid #eee;
		padding: 10rpx 0;
	}
	.list-item image {
		width: 80rpx;
		height: 80rpx;
		border: 1px solid #eee;
		position: relative;
		top: 8rpx;
	}
	.list-item .info-wrap {
		flex: 1;
		font-size: 26rpx;
		line-height: 40rpx;
		margin-left: 20rpx;
	}
	.list-item .info-wrap .footer {
		display: flex;
		height: 60rpx;
		line-height: 60rpx;
	}
	.list-item .info-wrap .footer .time {
		flex: 1;
		font-size: 24rpx;
		color: #666;
		text-align: left;
	}
	.list-item .info-wrap .footer .status {
		flex: 1;
		text-align: right;
	}
	.list-item .info-wrap .footer .status.success {
		color: royalblue;
	}
	.list-item .info-wrap .footer .status.pedding {
		color: darkgray;
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
