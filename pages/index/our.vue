<template>
	<view class="content">
		<view class="title">我的同修</view>
		<view class="our-info-wrap">
			<view class="our-info">
				<view class="our-header">
					<image src="/static/team.png" mode=""></image>
					<view class="info">同修总数：<text>{{total_num}}</text></view>
					<view class="look-wrap">
						<button class="look" @click="open()">查看推荐人</button>
					</view>
				</view>
				<view class="out-content">
					<view class="left">
						<view>左区人数<text>0</text></view>
						<view>尚未激活人数<text>0</text></view>
						<view>累计激活<text>0</text></view>
					</view>
					<view class="right">
						<view>右区人数<text>0</text></view>
						<view>结构完整人数<text>0</text></view>
						<view>今日激活<text>0</text></view>
					</view>
				</view>
			</view>
		</view>
		<view class="list-title">
			<view class="left">星级名称</view>
			<view class="right">已有人数/满位人数</view>
		</view>
		<view class="list-wrap">
			<view class="list-item" v-for="item in level_list" :key="item.level">
				<view class="left">第&nbsp;{{ item.level }}&nbsp;层</view>
				<view class="right" @click="$server.enterPage('our/group?level=' + item.level)">{{item.num}}/{{ getNum(item.level) }}<view class="image-arrow-right image-arrow-right-change"></view></view>
			</view>
			<view class="footer"></view>
		</view>
		<uni-popup class="popup" ref="popup" type="bottom">
			<view class="popup-wrap">
				<view class="popup-content">
					<view class="popup-title">我的推荐人</view>
					<image :src="inviteData.avatar" mode=""></image>
					<view class="name">{{ inviteData.name }}</view>
					<view class="mobile">
						电话:{{ inviteData.mobile }}
						<a class="text" :href="'tel:' + inviteData.mobile">拨打电话</a>
					</view>
				</view>
				<view class="popup-btn-wrap">
					<button class="popup-btn" @click="close()">取消</button>
				</view>
			</view>
		</uni-popup>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				total_num: 0,
				level_list: [],
				inviteData: {}
			}
		},
		onShow() {
			this.$server.setTitle()
			this.$server.chekLogin((res) => {
				this.getOurLevelNum()
			})
		},
		methods: {
			getOurLevelNum() {
				this.$server.requestGet('our/getOurLevelNum', {}).then((data) => {
					this.level_list = data.data.data
					this.total_num = data.data.total_num
				}).catch(() => {
					
				})
			},
			open() {
				this.$server.requestGet('user/getInvite', {}).then((data) => {
					this.inviteData = data.data.data
					if (!this.inviteData.avatar) {
						this.inviteData.avatar = '/static/logo.png'
					}
					this.$refs.popup.open('bottom')
				}).catch(() => {
					
				})
			},
			close() {
				this.$refs.popup.close()
			},
			getNum(count) {
				let num = 1
				for (var i = 0; i < count; i++) {
					num = num * 2
				}
				return num
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
	.our-info-wrap {
		width: 100%;
		background-color: #efeff4;
		margin-top: 90rpx;
	}
	.our-info-wrap .our-info {
		background-color: $juke-main-color;
		// height: 350rpx;
		border-radius: 20rpx;
		margin: 20rpx;
		margin-bottom: 30rpx;
	}
	.our-header {
		display: flex;
		height: 80rpx;
		line-height: 80rpx;
		padding: 30rpx;
	}
	.our-header image {
		width: 50rpx;
		height: 50rpx;
		position: relative;
		top: 18rpx;
		margin-right: 10rpx;
	}
	.our-header .info {
		font-size: 28rpx;
		color: #ffffff;
	}
	.our-header .info text {
		font-size: 36rpx;
		font-weight: bold;
	}
	.our-header .look-wrap {
		flex: 1;
	}
	.our-header .look-wrap .look {
		background-color: #fff;
		color: #333;
		width: 180rpx;
		border-radius: 60rpx;
		height: 50rpx;
		line-height: 50rpx;
		font-size: 24rpx;
		float: right;
		margin-top: 20rpx;
	}
	.out-content {
		display: flex;
		font-size: 24rpx;
		color: #d7fff4;
		line-height: 40rpx;
		margin-top: 50rpx;
		padding-bottom: 30rpx;
	}
	.out-content .left {
		flex: 1;
		padding-left: 30rpx;
	}
	.out-content .right {
		flex: 1;
	}
	.out-content text {
		margin-left: 10rpx;
		font-size: 36rpx;
		font-weight: bold;
		color: #ffffff;
	}
	.list-title {
		display: flex;
		width: 100%;
		height: 83rpx;
		line-height: 83rpx;
		background-color: $juke-main-dark-color;
		color: #ffffff;
		font-size: 26rpx;
	}
	.list-title .left {
		flex: 1;
		padding-left: 30rpx;
	}
	.list-title .right {
		flex: 1;
		padding-right: 30rpx;
		text-align: right;
	}
	.list-wrap {
		height: 140rpx;
		line-height: 140rpx;
		color: #333;
		font-size: 28rpx;
	}
	.list-wrap .list-item {
		display: flex;
		width: 100vw;
		border-bottom: 1px solid #eee;
	}
	.list-wrap .list-item .left {
		flex: 1;
		padding-left: 30rpx;
	}
	.list-wrap .list-item .right {
		padding-right: 40rpx;
	}
	.image-arrow-right-change {
		position: relative;
		top: 25rpx;
		left: 10rpx;
	}
	.footer {
		height: 200rpx;
	}
	.popup {
		z-index: 999;
	}
	.popup-wrap {
		width: 100%;
	}
	.popup-content {
		width: 100%;
		height: 400rpx;
		background-color: #ffffff;
		padding: 0 20rpx;
		font-size: 28rpx;
	}
	.popup-content image {
		width: 100rpx;
		height: 100rpx;
		margin-left: calc(50vw - 50rpx);
		border: 1px solid #eee;
		border-radius: 50%;
		margin-top: 20rpx;
	}
	.popup-content .name {
		text-align: center;
		height: 60rpx;
		line-height: 60rpx;
	}
	.popup-content .mobile {
		height: 80rpx;
		line-height: 80rpx;
		text-align: center;
	}
	.popup-content .mobile .text {
		background-color: $juke-main-color;
		font-size: 24rpx;
		color: #fff;
		padding: 3rpx 20rpx;
		border-radius: 60rpx;
		margin-left: 20rpx;
		text-decoration: none;
	}
	.popup-title {
		height: 100rpx;
		line-height: 100rpx;
		border-bottom: 1px solid #eee;
		font-size: 28rpx;
		text-align: center;
	}
	.popup-btn-wrap {
		padding: 15rpx;
	}
	.popup-btn {
		color: rgb(0, 122, 255);
		font-size: 28rpx;
		font-weight: bold;
		height: 86rpx;
		line-height: 86rpx;
	}
</style>
