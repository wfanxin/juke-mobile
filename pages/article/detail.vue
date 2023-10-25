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
				article_list: [],
				article_info: {}
			}
		},
		onLoad(options) {
			this.getList(options.id)
		},
		methods: {
			getList(id) {
				this.$server.requestGet('index/list', {}).then((res) => {
					this.article_list = res.data.article_list
					for (let item of this.article_list) {
						if (item.id == id) {
							this.article_info = item
						}
					}
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
