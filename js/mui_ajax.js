
;mui.web_sever = "http://yucheng.chebank.com/";
;mui.need_login = false;
;mui.web_query = function(func_url, params, onSuccess, onError, retry){
	var url = "http://yucheng.chebank.com/mapi/";
    var onSuccess = arguments[2]?arguments[2]:function(){};
    var onError = arguments[3]?arguments[3]:function(){console.log('error');};
    var retry = arguments[4]?arguments[4]:3;
    if (func_url.indexOf('http') < 0)
    	func_url = url + func_url;
    
    //console.log('ajax');
    //before get data. show a loading gif
    /*var ele =document.getElementById('loading');
    if (!ele)
    {
    	ele = parseDom('<div id="loading" class="loading_all" style="display: none;"><div class="waiting"></div></div>');
    	document.body.appendChild(ele);
    };
    ele.style.display = 'block';*/
    //console.log('cookie is '+ JSON.stringify(document.cookie));
//  var esc_id = plus.storage.getItem('token');
	plus.nativeUI.showWaiting();
    //console.log('esc_id: ' + esc_id);
    mui.ajax(func_url, {
        data:params,
        dataType:params.data_type || 'json',
        type:'post',
        timeout:3000,
      	//header:{'Cookie':"ECS_ID="+esc_id},
        success:function(data){  
          	//console.log(typeof(data));
        	if (typeof(data) == 'string'){
        		data = JSON.parse(data.trim());
        	}
            if(data){
            	if(data.login_status === 0)
            	{
            		need_login = true;
            		//mui.toast('login in please!');
	            }
	            console.log(JSON.stringify(data));
	            onSuccess(data); 
	             plus.nativeUI.closeWaiting(); //after a small delay
	            //todo: close nativeUI waiting ; plus.nativeUI.closeWaiting(); after a small delay
            }
            else{
              	//console.log(JSON.stringify(data));
            	//console.log(data.Message);
            	mui.toast("无数据");
                onError(data.code);
            }
        },
        error:function(xhr,type,errorThrown){
            retry--;
            if(retry > 0) return mui.web_query(func_url, params, onSuccess, onError, retry);
            onError('FAILED_NETWORK');
            plus.nativeUI.closeWaiting(); //after a small delay
            mui.toast("网络异常"); 
        }
    })
};

var onError = function(errcode){
    switch(errcode){
	    case 'FAILED_NETWORK':
	        mui.toast('网络不佳');
	        break;
	    case 'INVALID_TOKEN':
	    	mui.toast('please login in first');
	        //wv_login.show();
	        break;
	    default:
	        console.log(errcode);
    }
};
