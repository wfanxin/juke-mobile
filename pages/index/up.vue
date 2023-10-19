<template>
	<view class="content">
		up
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
