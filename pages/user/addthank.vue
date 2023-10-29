<template>
	<view class="content">
		<view class="view-item-wrap">
			<view class="view-item">
				<text class="item-label">收款会员</text>
				<text class="item-value">{{pmember.name}}</text>
			</view>
			<view class="view-item">
				<text class="item-label">联系电话</text>
				<text class="item-value">{{pmember.mobile}}</text>
			</view>
			<view class="view-item">
				<text class="item-label">感恩金额</text>
				<text class="item-value">￥{{pmember.money}}</text>
			</view>
		</view>
		<view class="selelct-payment-wrap">
			<view class="selelct-payment">收款方式</view>
			<button v-for="item in paymentList" :key="item.id" :class="{active: pay_method === item.pay_method}" @click="selectPayment(item)">
				<text v-if="item.pay_method === 1">银行卡</text>
				<text v-else-if="item.pay_method === 2">微信</text>
				<text v-else-if="item.pay_method === 3">支付宝</text>
			</button>
		</view>
		<view class="pay-wrap" v-if="pay_method === 2 || pay_method === 3">
			<view class="payment-code-wrap">
				<view class="payment-code">收款码</view>
				<image :src="payUrl" mode="widthFix"></image>
			</view>
			<view class="payment-code-wrap">
				<view class="payment-code">上传付款凭证</view>
				<image :src="pay_url" mode="widthFix" @click="chooseImage()" v-if="pay_url !== ''"></image>
				<view v-else class="no-pay-url" @click="chooseImage()">+</view>
			</view>
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
				<view class="input">{{bankData.bank_name}}</view>
			</view>
			<view class="code-item">
				<text class="item-label">支行名称</text>
				<view class="input">{{bankData.branch_name}}</view>
			</view>
			<view class="code-item">
				<text class="item-label">银行账号</text>
				<view class="input">{{bankData.account}}</view>
			</view>
			<view class="code-item">
				<text class="item-label">账号姓名</text>
				<view class="input">{{bankData.account_name}}</view>
			</view>
			<view class="code-item">
				<text class="item-label">联系方式</text>
				<view class="input">{{bankData.contact}}</view>
			</view>
			<view class="payment-code-wrap">
				<view class="payment-code">上传付款凭证</view>
				<image :src="pay_url" mode="widthFix" @click="chooseImage()" v-if="pay_url !== ''"></image>
				<view v-else class="no-pay-url" @click="chooseImage()">+</view>
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
				pay_method: 0,
				captcha_code: '',
				captcha_code_src: '',
				walletUrl: 'https://www.tpwallet.io/',
				pay_url: '',
				pmember: {},
				paymentList: [],
				payUrl: '',
				bankData: {}
			}
		},
		onLoad() {
			this.$server.setTitle()
			this.refreshCode()
			this.getThankUpMember()
		},
		methods: {
			refreshCode() {
			  this.captcha_code_src = this.$server.apiUrl + 'lv/api/captchas/' + Math.random() + '?mobile_device_id=' + this.$server.setDeviceId()
			},
			getThankUpMember() {
				this.$server.requestGet('thank/getThankUpMember', {}).then((data) => {
					this.pmember = data.data.pmember
					this.paymentList = data.data.paymentList
				}).catch(() => {
					
				})
			},
			selectPayment(item) {
				this.pay_method = item.pay_method
				this.payUrl = ''
				if (this.pay_method === 2 || this.pay_method === 3) {
					this.payUrl = item.content.pay_url
				} else if (this.pay_method === 1) {
					this.bankData = item.content
				}
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
					   title: '请选择收款方式',
					   image: '/static/show_error.png'
					})
					return false
				}
				
				if (this.pay_url === '') {
					uni.showToast({
					   title: '请上传付款凭证',
					   image: '/static/show_error.png'
					})
					return false
				}
				
				if (this.captcha_code === '') {
					uni.showToast({
					   title: '请输入验证码',
					   image: '/static/show_error.png'
					})
					return false
				}
				
				const params = {
					pay_uid: this.pmember.id,
					pay_method: this.pay_method,
					pay_url: this.pay_url,
					money: this.pmember.money
				}
				
				this.$server.requestPost('captchas/check', {
					mobile_device_id: this.$server.setDeviceId(),
					vcode: this.captcha_code
				}).then((data) => {
					this.$server.requestPost('thank/thankUp', params).then((data) => {
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

<style lang="scss">
	.content {
		border-top: 2px solid #F2F6FC;
		background-color: #efeff4;
		padding-bottom: 10rpx;
		padding-top: 30rpx;
		background-color: #ffffff;
	}
	.view-item-wrap {
		padding: 0 40rpx;
	}
	.view-item {
		display: flex;
		border-bottom: 1px solid #eee;
		margin-bottom: 10rpx;
		padding-bottom: 10rpx;
		
	}
	.view-item .item-label {
		position: relative;
		top: 24rpx;
		width: 150rpx;
		font-size: 26rpx;
		color: #999999;
	}
	.view-item .item-value {
		flex: 1;
		height: 80rpx;
		line-height: 80rpx;
		font-size: 26rpx;
		padding-left: 10rpx;
		text-align: left;
		padding-right: 20rpx;
	}
	.selelct-payment-wrap {
		margin-top: 30rpx;
	}
	.selelct-payment {
		font-size: 28rpx;
		padding-left: 40rpx;
		display: inline-block;
		margin-right: 40rpx;
		position: relative;
		top: -20rpx;
		font-size: 26rpx;
	}
	.selelct-payment-wrap button {
		display: inline-block;
		font-size: 26rpx;
		height: 60rpx;
		line-height: 60rpx;
		margin-right: 20rpx;
	}
	.selelct-payment-wrap button.active {
		background-color: $juke-main-color;
		color: #ffffff;
	}
	.pay-wrap {
		padding: 0 40rpx;
		font-size: 26rpx;
		margin: 0 auto;
	}
	.pay-wrap .payment-code-wrap {
		display: flex;
		margin-top: 30rpx;
	}
	.pay-wrap .payment-code-wrap .payment-code {
		margin-right: 70rpx;
	}
	.pay-wrap .payment-code-wrap image {
		flex: 1;
	}
	.pay-wrap .upload {
		background-color: $juke-main-color;
		color: white;
		height: 80rpx;
		line-height: 80rpx;
		font-size: 28rpx;
		color: #333333;
		width: 50vw;
		margin: 40rpx auto;
	}
	.pay-wrap .submit {
		background-color: $juke-main-color;
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
		font-size: 26rpx;
	}
	.code-item .input, .code-item input {
		flex: 1;
		height: 80rpx;
		line-height: 80rpx;
		font-size: 26rpx;
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
		color: $juke-main-dark-color;
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
		border: 1px solid $juke-main-dark-color;
		color: $juke-main-dark-color;
		padding: 0 20rpx;
		height: 40rpx;
		line-height: 40rpx;
		margin-top: 20rpx;
		border-radius: 30rpx;
	}
	.no-pay-url {
		border: 1px solid #eee;
		width: 50vw;
		height: 30vw;
		line-height: 30vw;
		text-align: center;
		color: #eee;
		font-size: 50rpx;
	}
</style>
