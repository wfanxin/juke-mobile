<script>
	export default {
		onLaunch: function() {
			console.log('App Launch')
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style>
	/*每个页面公共css */
	uni-toast .uni-toast__icon {
		width: 50rpx;
		height: 50rpx;
		margin-bottom: 10rpx;
	}
	uni-toast .uni-toast__content {
	    font-size: 28rpx;
	}
	.image-arrow-right {
	    float: right;
	    margin-top: 16px;
	    background: url(/static/icon-ps.png) -55px 0;
	    width: 6px;
	    height: 11px;
	}
</style>
