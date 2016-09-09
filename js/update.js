(function(w){
	

var wgtVer = null;
  function init() {
	// ......
	// 获取本地应用资源版本号
	plus.runtime.getProperty(plus.runtime.appid, function(inf) {
		wgtVer = inf.version;
		plus.nativeUI.toast("当前应用版本：" + wgtVer);
		//checkUpdate();
	});
}

// 检测更新
var checkUrl = "http://h5.chebank.com/mui_app/testupgrade/update/check.php";

var UPDATE_METHOD = 0; //0, whole package update, 1: diff pack update.
function checkUpdate() {
	plus.nativeUI.showWaiting("检测更新...");
	var xhr = new XMLHttpRequest();
	xhr.onreadystatechange = function() {
		switch(xhr.readyState) {
			case 4:
				plus.nativeUI.closeWaiting();
				if(xhr.status == 200) {
					console.log("检测更新成功：" + xhr.responseText);
					//alert("检测更新成功：" + xhr.responseText);
					var obj = JSON.parse(xhr.responseText.trim());
					//alert("新版本" + obj.v + ':\n' + obj.desc);
					var newVer = obj.v;
					UPDATE_METHOD = obj.method;
					if(wgtVer && newVer && (wgtVer != newVer)) {
						plus.nativeUI.confirm("有新版本，是否升级?", function(e) {
							console.log((e.index == 0) ? "Yes!" : "No!");
							if(e.index == 0) {
								if(UPDATE_METHOD == 0) {
									wgtUrl = obj.url;
									downWgt(); // 下载升级包 
								} else {
									var url = obj.versions_diff[wgtVer];

									diff_update(url);
								}
							} else {
								plus.nativeUI.closeWaiting();
							}
						}, "nativeUI", ["Yes", "No"]);

					} else {
						//plus.nativeUI.alert("无新版本可更新！");
					}
				} else {
					console.log("检测更新失败！");
					//plus.nativeUI.alert("检测更新失败！");
				}
				break;
			default:
				break;
		}
	}
	xhr.open('GET', checkUrl + "?v=" + wgtVer);
	xhr.send();
}

// 下载wgt文件
var wgtUrl = "";

function downWgt() {
	plus.nativeUI.showWaiting("下载wgt文件..." + wgtUrl);
	plus.downloader.createDownload(wgtUrl, {
		filename: "_doc/update/"
	}, function(d, status) {
		if(status == 200) {
			console.log("下载wgt成功：" + d.filename);
			installWgt(d.filename); // 安装wgt包
		} else {
			console.log("下载wgt失败！");
			plus.nativeUI.alert("下载wgt失败！");
		}
		plus.nativeUI.closeWaiting();
	}).start();
}

// 更新应用资源
function installWgt(path) {
	plus.nativeUI.showWaiting("安装wgt文件...");
	plus.runtime.install(path, {}, function() {
		plus.nativeUI.closeWaiting();
		console.log("安装wgt文件成功！");
		plus.nativeUI.alert("应用资源更新完成！", function() {
			plus.runtime.restart();
		});
	}, function(e) {
		plus.nativeUI.closeWaiting();
		console.log("安装wgt文件失败[" + e.code + "]：" + e.message);
		plus.nativeUI.alert("安装wgt文件失败[" + e.code + "]：" + e.message);
	});
}

function diff_update(url) {

	plus.nativeUI.showWaiting("升级中..." + url);
	var dtask = plus.downloader.createDownload(url, {
		method: "GET"
	}, function(d, status) {
		if(status == 200) {
			console.log("Download wgtu success: " + d.filename);
			plus.runtime.install(d.filename, {}, function() {
				plus.nativeUI.closeWaiting();
				plus.nativeUI.alert("Update wgtu success, restart now!", function() {
					plus.runtime.restart();
				});
			}, function(e) {
				plus.nativeUI.closeWaiting();
				alert("Update wgtu failed: " + e.message);
			});
		} else {
			plus.nativeUI.closeWaiting();
			alert("Download wgtu failed: " + status);
		}
	});
	dtask.addEventListener('statechanged', function(d, status) {
		console.log("statechanged: " + d.state);
	});
	dtask.start();
} 

if ( w.plus ) {
	init();
} else {
	document.addEventListener("plusready", init, false );
}
})(window);
