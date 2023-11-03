<template>
	<view class="content">
		<view class="title">{{ article_info.title }}</view>
		<view class="info" v-html="article_info.content"></view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				article_info: {}
			}
		},
		onLoad(options) {
			this.$server.setTitle()
			this.getList(options.id)
		},
		methods: {
			getList(id) {
				this.$server.requestGet('index/detail', { id: id}).then((res) => {
					this.article_info = res.data.data
				})
			}
		}
	}
</script>

<style lang="scss">
	.content {
		border-top: 2px solid #F2F6FC;
	}
	.content .title {
		font-size: 32rpx;
		text-align: center;
		height: 80rpx;
		line-height: 80rpx;
		font-weight: bold;
	}
	.content .info {
		padding: 0 20rpx;
	}
</style>
