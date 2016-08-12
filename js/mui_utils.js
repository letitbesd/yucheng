mui_utils = (function(){
	//console.log("www");
	
	var nw=null;
	// 监听Webview窗口事件
	function openMuiPage(path, evt_name, evt_data) {
		if(nw){return;} 
		var w=plus.nativeUI.showWaiting();
		// 打开新窗口
		nw=plus.webview.create( path );
		nw.addEventListener( "loaded", function(){
			//console.log( "New Window loaded!" );
			nw.show("slide-in-right"); // 显示窗口
			w.close();
			w=null;
			nw = null;
		}, false );
		if (evt_name)
		{
			mui.fire(nw, evt_name, evt_data);
		}
	}
	function trimString(str, len, ending)
	{
		ending = ending? ending : "";
		if (ending)
			var slen = len - ending.length;
		else
			var slen = len;
		return str.slice(0, slen) + ending;
	
	}
	
	 function parseDom(arg) {
	　　 var objE = document.createElement("div");
	
	　　 objE.innerHTML = arg;
	
	　　 return objE.childNodes[0];
	
	};
	
	return {
		openMuiPage:openMuiPage,
		trimString:trimString,
		parseDom:parseDom
	}
})();

 