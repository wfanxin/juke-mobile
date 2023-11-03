<template>
	<view class="content">
		<view class="title">{{ title }}</view>
		<view class="uni-margin-wrap">
			<swiper class="swiper" circular :indicator-dots="indicatorDots" :autoplay="autoplay" :interval="interval" :duration="duration">
				<swiper-item v-for="item in slide_list" :key="item.id">
					<view class="swiper-item">
						<image :src="item.image" ></image>
					</view>
				</swiper-item>
			</swiper>
		</view>
		
		<view class="panel">
			<view class="shouming">
				<image src="/static/shuoming.jpg" mode=""></image>
				<view>平台说明</view>
			</view>
			<view class="panel-list">
				<view class="panel-item" v-for="item in article_list" :key="item.id" @click="$server.enterPage('article/detail?id=' + item.id)">
					<image :src="item.image"></image>
					<view class="text">{{ item.title }}</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				title: '',
				indicatorDots: true,
				autoplay: true,
				interval: 2000,
				duration: 500,
				slide_list: [],
				article_list: []
			}
		},
		onShow() {
			this.$server.setTitle()
			this.getSite()
			this.$server.chekLogin((res) => {
				this.getList()
			})
		},
		methods: {
			getSite() {
				this.title = uni.getStorageSync('mSite')
				this.$server.requestGet('config/getSite', {}).then((data) => {
					this.title = data.data.data
				}).catch(() => {

				})
			},
			getList() {
				this.$server.requestGet('index/list', {}).then((res) => {
					this.slide_list = res.data.slide_list
					this.article_list = res.data.article_list
				})
			}
		}
	}
</script>

<style lang="scss">
	page {
		background-color: #efeff4;
	}
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
	.uni-margin-wrap {
		width: calc(100vw - 40rpx);
		margin: 15rpx 0;
		margin-top: 105rpx;
	}
	.swiper {
		height: 400rpx;
		border: 1px solid #eee;
	}
	.swiper-item {
		display: block;
		width: 100%;
		height: 100%;
		text-align: center;
		border-radius: 10rpx;
	}
	.swiper-item image {
		width: 100%;
		height: 100%;
		border-radius: 10rpx;
	}
	.panel {
		width: calc(100vw - 40rpx);
	    box-shadow: 0 0 5rpx #ddd;
	    border-radius: 20rpx;
		background-color: #ffffff;
		margin-top: 20rpx;
	}
	.panel .shouming {
		display: flex;
		font-size: 28rpx;
		height: 80rpx;
		line-height: 80rpx;
		font-weight: bold;
	}
	.panel .shouming image {
		position: relative;
		width: 50rpx;
		height: 50rpx;
		margin: 0 10rpx;
		top: 16rpx;
	}
	.panel-list {
		padding: 0 20rpx;
		padding-bottom: 5rpx;
	}
	.panel-list .panel-item {
		display: inline-block;
		width: 50%;
		box-sizing: border-box;
		padding: 0 10rpx;
		position: relative;
	}
	.panel-list .panel-item image {
		width: 100%;
		height: 26vw;
		border: 1px solid #eeeeee;
		border-radius: 10rpx;
		margin: 5rpx 0;
	}
	.panel-list .panel-item .text {
		width: calc(100% - 18rpx);
		background-color: rgba(0,0,0,0.3);
		color: #ffffff;
		font-size: 30rpx;
		font-weight: bold;
		text-align: center;
		height: 50rpx;
		line-height: 50rpx;
		position: absolute;
		bottom: 15rpx;
		border-bottom-left-radius: 10rpx;
		border-bottom-right-radius: 10rpx;
	}
</style>
