
;mui.web_sever = "http://www.jadechina.cn/";
;mui.web_query = function(func_url, params, onSuccess, onError, retry){
	var url = "http://www.jadechina.cn/mapi/";
    var onSuccess = arguments[2]?arguments[2]:function(){};
    var onError = arguments[3]?arguments[3]:function(){console.log('error');};
    var retry = arguments[4]?arguments[4]:3;
    if (func_url.indexOf('http') < 0)
    	func_url = url + func_url;
    
	if (!(params.waitingUI == false))
		plus.nativeUI.showWaiting();
    mui.ajax(func_url, {
        data:params,
        dataType:params.data_type || 'json',
        type:'post',
        timeout:3000,
      	//header:{'Cookie':"ECS_ID="+esc_id},
        success:function(data){  
          	//console.log(typeof(data));
        	if (typeof(data) == 'string'){
        		console.log(data);
        		data = JSON.parse(data.trim()); 
        	}
            if(data){
            	if(data.login_status === 0)
            	{
            		need_login = true;
	            }
	            console.log(JSON.stringify(data));
	            onSuccess(data); 
            }
            else{
            	mui.toast("无数据");
                onError(data.code);
            }
             plus.nativeUI.closeWaiting(); //after a small delay
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
