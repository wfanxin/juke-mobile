<template>
	<view class="content">
		<view class="select-wrap">
			<view class="select-item">
				<view class="select-label">收款方式</view>
				<picker @change="bindPickerChange" :value="pay_method" :range="pay_method_list">
					<view class="uni-input">{{pay_method_list[pay_method]}}</view>
				</picker>
			</view>
		</view>
		<view class="pay-wrap" v-if="pay_method === 0 || pay_method === 2 || pay_method === 3">
			<view class="payment-code">收款码</view>
			<view class="image-wrap">
				<view class="image-box">
					<image :src="pay_url" mode="aspectFit"></image>
				</view>
			</view>
			<button class="upload" @click="chooseImage()">点击上传收款二维码</button>
			<view class="code-item">
				<text class="item-label">图形验证码</text>
				<input type="text" v-model="captcha_code" placeholder="请输入图形验证码">
				<image :src="captcha_code_src" class="code-img" @click="refreshCode()"></image>
			</view>
			<button class="submit" @click="submit()">提交</button>
		</view>
		<view class="pay-wrap" v-if="pay_method === 1">
			<view class="code-item">
				<text class="item-label">银行名称</text>
				<input type="text" v-model="bank_name" placeholder="请输入银行名称">
			</view>
			<view class="code-item">
				<text class="item-label">支行名称</text>
				<input type="text" v-model="branch_name" placeholder="请输入支行名称">
			</view>
			<view class="code-item">
				<text class="item-label">银行账号</text>
				<input type="text" v-model="account" placeholder="请输入银行账号">
			</view>
			<view class="code-item">
				<text class="item-label">账号姓名</text>
				<input type="text" v-model="account_name" placeholder="请输入账号姓名">
			</view>
			<view class="code-item">
				<text class="item-label">联系方式</text>
				<input type="text" v-model="contact" placeholder="请输入联系方式">
			</view>
			<view class="code-item">
				<text class="item-label">图形验证码</text>
				<input type="text" v-model="captcha_code" placeholder="请输入图形验证码">
				<image :src="captcha_code_src" class="code-img" @click="refreshCode()"></image>
			</view>
			<button class="submit" @click="submit()">提交</button>
		</view>
		<view class="panel-wrap">
			<view class="panel">
				<view class="panel-item">
					<view class="panel-title">钱包下载信息</view>
					<view class="panel-info">
						<image src="/static/logo.png"></image>
						<view class="bag">钱包名称：TP钱包</view>
						<view class="download">下载地址：</view>
						<view class="url">
							<text class="url-text">{{ walletUrl }}</text>
							<view class="copy" @click="copy()">复制</view>
						</view>
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
				pay_method_list: ['请选择收款渠道', '银行卡', '微信', '支付宝'],
				pay_method: 0,
				captcha_code: '',
				captcha_code_src: '',
				walletUrl: 'https://www.tpwallet.io/',
				pay_url: '',
				bank_name: '',
				branch_name: '',
				account: '',
				account_name: '',
				contact: '',
				paymentData: []
			}
		},
		onLoad() {
			this.refreshCode()
			this.getPayment()
		},
		methods: {
			refreshCode() {
			  this.captcha_code_src = this.$server.apiUrl + 'lv/api/captchas/' + Math.random() + '?mobile_device_id=' + this.$server.setDeviceId()
			},
			getPayment() {
				this.$server.requestGet('user/getPayment', {}).then((data) => {
					this.pay_method = data.data.pay_method
					this.paymentData = data.data.list
					this.initData()
				}).catch(() => {
					
				})
			},
			initData() {
				this.bank_name = ''
				this.branch_name = ''
				this.account = ''
				this.account_name = ''
				this.contact = ''
				this.pay_url = ''
				if (this.pay_method === 1) {
					if (this.paymentData[this.pay_method]) {
						this.bank_name = this.paymentData[this.pay_method].bank_name
						this.branch_name = this.paymentData[this.pay_method].branch_name
						this.account = this.paymentData[this.pay_method].account
						this.account_name = this.paymentData[this.pay_method].account_name
						this.contact = this.paymentData[this.pay_method].contact
					}
				} else if (this.pay_method === 2 || this.pay_method === 3) {
					if (this.paymentData[this.pay_method]) {
						this.pay_url = this.paymentData[this.pay_method].pay_url
					}
				}
			},
			bindPickerChange(e) {
				this.pay_method = e.detail.value
				this.initData()
			},
			chooseImage() {
				uni.chooseImage({
					count :1,
					success :(res) => {
						this.$server.uploadFile(res.tempFilePaths[0]).then((data) => {
							this.pay_url = data
						}).catch(() => {
							uni.showToast({
							   title: '上传失败',
							   image: '/static/show_error.png'
							})
						})
					}
				})
			},
			copy() {
				uni.setClipboardData({
				    data: this.walletUrl,
				    success: function () {
				        uni.showToast({
				            title: '复制成功',
				            image: '/static/show_success.png'
				        })
				    }
				});
			},
			submit() {
				if (this.pay_method === 0) {
					uni.showToast({
					   title: '请选择收款渠道',
					   image: '/static/show_error.png'
					})
					return false
				}
				
				const params = {}
				params.pay_method = this.pay_method
				if (this.pay_method === 1) {
					if (this.bank_name === '') {
						uni.showToast({
						   title: '请输入银行名称',
						   image: '/static/show_error.png'
						})
						return false
					}
					if (this.branch_name === '') {
						uni.showToast({
						   title: '请输入支行名称',
						   image: '/static/show_error.png'
						})
						return false
					}
					if (this.account === '') {
						uni.showToast({
						   title: '请输入银行账号',
						   image: '/static/show_error.png'
						})
						return false
					}
					if (this.account_name === '') {
						uni.showToast({
						   title: '请输入账号姓名',
						   image: '/static/show_error.png'
						})
						return false
					}
					if (this.contact === '') {
						uni.showToast({
						   title: '请输入联系方式',
						   image: '/static/show_error.png'
						})
						return false
					}
					params.bank_name = this.bank_name
					params.branch_name = this.branch_name
					params.account = this.account
					params.account_name = this.account_name
					params.contact = this.contact
				} else if (this.pay_method === 2 || this.pay_method === 3) {
					if (this.pay_url === '') {
						uni.showToast({
						   title: '请上传收款码',
						   image: '/static/show_error.png'
						})
						return false
					}
					params.pay_url = this.pay_url
				}
				
				this.$server.requestPost('captchas/check', {
					mobile_device_id: this.$server.setDeviceId(),
					vcode: this.captcha_code
				}).then((data) => {
					this.$server.requestPost('user/payment', params).then((data) => {
						uni.showToast({ // 失败
						    title: '操作成功',
							image: '/static/show_success.png'
						});
						
						setTimeout(() => {
							this.$server.navigateBack(1)
						}, 1000)
					}).catch(() => {
				
					})
				}).catch(() => {
					this.refreshCode()
				})
			}
		}
	}
</script>

<style>
	.content {
		border-top: 2px solid #F2F6FC;
		background-color: #efeff4;
		padding-bottom: 10rpx;
		padding-top: 30rpx;
	}
	.select-wrap {
		padding: 0 40rpx;
		color: #333333;
		font-size: 28rpx;
	}
	.select-item {
		display: flex;
		background-color: #ffffff;
		border-radius: 5rpx;
		height: 80rpx;
		line-height: 80rpx;
		padding: 0 20rpx;
	}
	.select-item .select-label {
		width: 160rpx;
	}
	.select-item picker {
		flex: 1;
	}
	.pay-wrap {
		padding: 0 40rpx;
		font-size: 28rpx;
		margin: 0 auto;
	}
	.pay-wrap .payment-code {
		margin-top: 30rpx;
	}
	.pay-wrap .image-wrap {
		display: flex;
	    background: rgba(82,93,149,0.15);
	    border-radius: 20rpx;
	    width: 40vw;
		margin: 0 30vw;
		position: relative;
		left: -60rpx;
	    padding: 20rpx;
		margin-top: 40rpx;
	}
	.pay-wrap .image-wrap .image-box {
		background-color: #2fbb95;
		width: 100%;
		height: 100%;
		border-radius: 20rpx;
		padding: 50rpx 0;
	}
	.pay-wrap .image-wrap .image-box image {
		width: 20vw;
		height: 30vw;
		margin-left: 10vw;
	}
	.pay-wrap .upload {
		background-color: #50dab5;
		color: white;
		height: 80rpx;
		line-height: 80rpx;
		font-size: 28rpx;
		color: #333333;
		width: 50vw;
		margin: 40rpx auto;
	}
	.pay-wrap .submit {
		background-color: #50dab5;
		color: white;
		height: 80rpx;
		line-height: 80rpx;
		font-size: 28rpx;
		margin-top: 60rpx;
		margin-bottom: 60rpx;
	}
	.code-item {
		display: flex;
		border-bottom: 1px solid #eee;
		margin-bottom: 10rpx;
		padding-bottom: 10rpx;
		background-color: #ffffff;
		margin-top: 30rpx;
	}
	.code-item .item-label {
		position: relative;
		top: 24rpx;
		width: 160rpx;
		font-size: 28rpx;
		padding-left: 20rpx;
	}
	.code-item input {
		flex: 1;
		height: 80rpx;
		line-height: 80rpx;
		font-size: 28rpx;
		padding-left: 10rpx;
		margin-top: 3rpx;
	}
	.code-img {
		width: 90rpx;
		height: 36rpx;
		margin-top: 25rpx;
	}
	.panel-wrap {
		position: relative;
		top:30rpx;
		width: 100%;
	}
	.panel {
		margin: 0rpx 25rpx;
	}
	.panel-item {
	    padding: 0 30rpx;
	    margin-bottom: 40rpx;
	    margin-top: 20rpx;
	    box-shadow: 0 0 10rpx #ddd;
	    border-radius: 20rpx;
		background-color: #ffffff;
	}
	.panel-title {
		font-weight: bold;
		padding: 20rpx 0;
		border-bottom: 1px #999 solid;
		font-size: 28rpx;
		color: #24af8a;
	}
	.panel-info {
		padding: 20rpx 0;
		text-align: center;
	}
	.panel-info image {
		width: 160rpx;
		height: 160rpx;
	}
	.panel-info .bag {
		font-size: 28rpx;
		margin-top: 0;
		margin-bottom: 20rpx;
		color: #8f8f94;
	}
	.panel-info .download {
		font-size: 28rpx;
		margin-top: 0;
		margin-bottom: 20rpx;
		color: #8f8f94;
		position: relative;
		top: 10rpx;
	}
	.panel-info .url {
		display: flex;
		border: 1px solid #cccccc;
		height: 80rpx;
		line-height: 80rpx;
		color: #8f8f94;
		font-size: 24rpx;
		text-align: left;
		padding: 0 30rpx;
		border-radius: 10rpx;
		margin-bottom: 50rpx;
	}
	.panel-info .url .url-text {
		flex: 1;
	}
	.panel-info .url .copy {
		border: 1px solid #24af8a;
		color: #24af8a;
		padding: 0 20rpx;
		height: 40rpx;
		line-height: 40rpx;
		margin-top: 20rpx;
		border-radius: 30rpx;
	}
</style>
