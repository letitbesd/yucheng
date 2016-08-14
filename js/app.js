(function($,owner){
	owner.isInstalled = function(id) {
		if (id === 'qihoo' && mui.os.plus) {
			return true;
		}
		if (mui.os.android) {
			var main = plus.android.runtimeMainActivity();
			var packageManager = main.getPackageManager();
			var PackageManager = plus.android.importClass(packageManager)
			var packageName = {
				"qq": "com.tencent.mobileqq",
				"weixin": "com.tencent.mm",
				"sinaweibo": "com.sina.weibo"
			}
			try {
				return packageManager.getPackageInfo(packageName[id], PackageManager.GET_ACTIVITIES);
			} catch (e) {}
		} else {
			switch (id) {
				case "qq":
					var TencentOAuth = plus.ios.import("TencentOAuth");
					return TencentOAuth.iphoneQQInstalled();
				case "weixin":
					var WXApi = plus.ios.import("WXApi");
					return WXApi.isWXAppInstalled()
				case "sinaweibo":
					var SinaAPI = plus.ios.import("WeiboSDK");
					return SinaAPI.isWeiboAppInstalled()
				default:
					break;
			}
		}
	}
	
	 owner.showThirdPartLogin = function(onsuccess){
			 	//第三方登录 党还没有登录的时候显示
//						var authBtns = ['qihoo', 'weixin', 'sinaweibo', 'qq']; //配置业务支持的第三方登录
						var authBtns = ['weixin']; //配置业务支持的第三方登录
						var auths = {};
						var doc = document;
						var oauthArea = doc.querySelector('.oauth-area');
						plus.oauth.getServices(function(services) {
							for (var i in services) {
								var service = services[i];
								console.log("service : "+service.id)
								auths[service.id] = service;//
								if (~authBtns.indexOf(service.id)) {
									var isInstalled = app.isInstalled(service.id);
									var btn = document.createElement('div');
									//如果微信未安装，则为不启用状态
									btn.setAttribute('class', 'oauth-btn' + (!isInstalled && service.id === 'weixin' ? (' disabled') : ''));
									btn.authId = service.id;
									btn.style.backgroundImage = 'url("../images/thirdpartylogin/' + service.id + '.png")'
									oauthArea.appendChild(btn);
								}
							}
							$(oauthArea).on('tap', '.oauth-btn', function() {
								if (this.classList.contains('disabled')) {
									plus.nativeUI.toast('您尚未安装微信客户端');
									return;
								}
								var auth = auths[this.authId];
								var waiting = plus.nativeUI.showWaiting();
								auth.login(function() {
									waiting.close();
									plus.nativeUI.toast("登录认证成功");
									auth.getUserInfo(function() {
										plus.nativeUI.toast("获取用户信息成功");
										console.log(JSON.stringify(auth));
										
										if (onsuccess) onsuccess(auth);
									}, function(e) {
										plus.nativeUI.toast("获取用户信息失败：" + e.message);
									});
								}, function(e) {
									waiting.close();
									plus.nativeUI.toast("登录认证失败：" + e.message);
								});
							});
						}, function(e) {
							oauthArea.style.display = 'none';
							plus.nativeUI.toast("获取登录认证失败：" + e.message);
						});
			 },
			 
	owner.autologin = function (){  
				var str = UserInfo.autologinstr();
				if (str)
				{
					str = $.md5(str);				
					console.log('autologin:auto_code:' + str);
					mui.web_query("mobileAutoLogin.php", {auto_code:str}, function(data){
							if (data.status == 1)
							{
								UserInfo.autocode(String(data.auto_code));
								mui.toast('autologin success!');  
							}else
							{
								mui.toast('autologin fail!'); 
							}
					})
				}
				else
				{
					mui.toast('autologin fail!--no autologinstr'); 
				}
				
			}
}(mui, window.app = {}))
