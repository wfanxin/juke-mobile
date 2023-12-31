let apiUrl = 'http://juke-api.com/' // 开发
// let apiUrl = 'http://juke_api.yunju567.cn/' // 生产

// Post请求
function requestPost(url, data = {}) {
	data.token = uni.getStorageSync('m-token')
	return new Promise((resolve, reject) => {
		uni.request({
			header: {
				'Content-Type': 'application/x-www-form-urlencoded'
			},
			url: apiUrl + 'lv/api/' + url,
			data: data,
		    method: 'POST',
			dataType: 'json',
		    success(res) {
		    	if(res.data.code == 0){
		    		resolve(res)
		    	}else{
		    		uni.showToast({ // 失败
		    		    title: res.data.message,
		    			image: '/static/show_error.png',
		    		    duration: 2000
		    		});
					if (res.data.code == 20001) {
						setTimeout(() => {
							uni.removeStorageSync('m-token')
							chekLogin()
						}, 1000)
					}
		    		reject(res.data.message)
		    	}
		    },
		    fail() {
		    	uni.showToast({
		    		title: '网络问题',
		    	    image: '/static/show_error.png',
		    	    duration: 2000
		    	})
		    	reject('网络问题')
		    }
		})
	})
}

// Get请求
function requestGet(url, data = {}) {
	data.token = uni.getStorageSync('m-token')
	return new Promise((resolve, reject) => {
		uni.request({
			url: apiUrl + 'lv/api/' + url,
			data: data,
			success(res) {
				if(res.data.code == 0){
					resolve(res)
				}else{
					uni.showToast({ // 失败
					    title: res.data.message,
						image: '/static/show_error.png',
					    duration: 2000
					});
					if (res.data.code == 20001) {
						setTimeout(() => {
							uni.removeStorageSync('m-token')
							chekLogin()
						}, 1000)
					}
					reject(res.data.message)
				}
			},
			fail() {
				uni.showToast({
					title: '网络问题',
				    image: '/static/show_error.png',
				    duration: 2000
				})
				reject('网络问题')
			}
		})
	})
}

// 缓存
function myCache(key, value, seconds = 3600 * 24) {
	let nowTime = Date.parse(new Date()) / 1000;
	if (key && value) {
		let expire = nowTime + Number(seconds);
		uni.setStorageSync(key, JSON.stringify(value) + '|' + expire)
		console.log('已经把' + key + '存入缓存，过期时间为' + expire)
	} else if (key && !value) {
		let val = uni.getStorageSync(key);
		if (val) {
			// 缓存存在，判断是否过期
			let temp = val.split('|')
			if (!temp[1] || temp[1] <= nowTime) {
				uni.removeStorageSync(key)
				console.log(key + '缓存已失效')
				return '';
			} else {
				return JSON.parse(temp[0]);
			}
		} else {
			return '';
		}
	}
}

// 文件上传
function uploadFile(filePath, name = 'file') {
	return new Promise((resolve, reject) => {
		// 上传服务器
		uni.uploadFile({
			url: apiUrl + 'lv/api/service/uploadFile?token=' + uni.getStorageSync('m-token'), // 仅为示例，非真实的接口地址
			filePath: filePath,
			name: name,
			timeout: 5 * 60 * 1000,
			formData: {
		
			},
			success: (uploadFileRes) => {
				let res_data = JSON.parse(uploadFileRes.data);
				if(res_data.code != 0){
					reject(filePath)
				}else{
					resolve(res_data.file)
				}
			},
			fail: () => {
				reject(filePath)
			}
		});
	})
}

// 设置设备id
function setDeviceId() {
	let deviceId = uni.getStorageSync('mDeviceId')
	if (deviceId) {
		return deviceId
	}

	let len = 32
	let chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678' /** **默认去掉了容易混淆的字符oOLl,9gq,Vv,Uu,I1****/
	let maxPos = chars.length
	let pwd = ''
	for (let i = 0; i < len; i++) {
		pwd += chars.charAt(Math.floor(Math.random() * maxPos))
	}

	let timestamp = new Date().getTime()
	let randomStr = String(Math.random() * timestamp).replace(/\./g, '')
	deviceId = pwd + randomStr

	uni.setStorageSync('mDeviceId', deviceId)
	return deviceId
}

// 设置网站标题
function setTitle() {
	const pages = getCurrentPages()
	const page = pages[pages.length - 1]
	
	let site = uni.getStorageSync('mSite')
	if (site) {
		document.title = site + '-' + page.$holder.navigationBar.titleText
	}
	
	requestGet('config/getSite', {}).then((data) => {
		site = data.data.data
		uni.setStorageSync('mSite', site)
		document.title = site + '-' + page.$holder.navigationBar.titleText
	}).catch(() => {
		document.title = page.$holder.navigationBar.titleText
	})
}

// 登录检查
function chekLogin(callback) {
	let token = uni.getStorageSync('m-token')
	if(!token){
		reLaunch('user/login')
	}else{
		callback && callback(token)
	}
}

// 跳转到 tabBar 页面，并关闭其他所有非 tabBar 页面
function switchTab(url) {
	uni.switchTab({
		url: '/pages/' + url
	});
}

// 关闭所有页面，打开到应用内的某个页面
function reLaunch(url) {
	uni.reLaunch({
		url: '/pages/' + url
	});
}

// 跳转到应用内的某个页面，可使用uni.navigateBack返回
function enterPage(url) {
	uni.navigateTo({
		url: '/pages/' + url
	});
}

// 关闭当前页面，返回上一页面或多级页面
function navigateBack(delta) {
	uni.navigateBack({
	  delta: delta
	});
}

module.exports = {
	apiUrl: apiUrl,
	requestPost: requestPost,
	requestGet: requestGet,
	uploadFile: uploadFile,
	setDeviceId: setDeviceId,
	chekLogin: chekLogin,
	setTitle: setTitle,
	switchTab: switchTab,
	reLaunch: reLaunch,
	enterPage: enterPage,
	navigateBack: navigateBack
}