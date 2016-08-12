wxpay = (function(){
	
	var iap=null;
	function init(){
		plus.payment.getChannels(function(channels){
			for(var i in channels){
				var channel=channels[i];
				console.log(channel.id);
				if(channel.id==='wxpay'){
					iap=channel;
				}
			}
			//requestOrder();//IAP支付
		},function(e){
			console.log("获取支付通道失败："+e.message);
		}); 
	}
	var success_cb = null;
	
	function pay(data){
            //获取微信支付参数的url
            //var basic_url="http://microtivo.chinacloudapp.cn:9202/";
            console.log(data.order_id);
            success_cb = data.on_success || null;
            if (!iap )
            	return console.log('no valid paychannel yet');
        	var basic_url='http://yucheng.chebank.com/mapi/apppay.php';
            mui.ajax(basic_url,{
                data:data,
                dataType:"json",
                type:"get",
                success:ajax_success_callback,
                error:ajax_error_callback
            })
        }
	

	 function ajax_success_callback(resObj)
	    {
	    	if ( typeof(resObj)  == 'string')
	    	{

	    		resObj = JSON.parse(resObj.trim());
	    		console.log(resObj);
	    		
	    	}
	        console.log("请求微信支付参数成功,返回的json:");
	        var res_str=JSON.stringify(resObj);
	        console.log(res_str);
	        console.log(resObj.retcode);
	        //用返回参数 发起微信支付请求
	        if (resObj.retcode == 'SUCCESS')
	        {
	       		plus.payment.request(iap,res_str,wxpay_success,wxpay_error);
	        	
	        }

	    }
	    //获取微信支付参数失败的回调函数
	    function ajax_error_callback(e){
	        console.log("ajax获取参数失败");
	    }
	    //微信支付成功回调
	    function wxpay_success(result){
	        plus.ui.alert("支付成功!",function()
	        {
	            console.log("success");
	            back();
	            if (success_cb)
	            {
					success_cb();	            	
	            }

	        })
	    }
	    //微信支付失败回调
	    function wxpay_error(error){
	        plus.ui.alert("支付失败!"); 
			console.log(JSON.stringify(error));
	    }
	    return {
	    	init:init,
	    	pay:pay
	    }
})(); 
