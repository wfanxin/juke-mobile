<template>
	<view class="content">
		收款方式
	</view>
</template>

<script>
	export default {
		data() {
			return {

			}
		},
		methods: {
			enterPage(url) {
				uni.navigateTo({
					url: '/pages/' + url
				});
			}
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
</style>
