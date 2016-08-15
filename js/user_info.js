;function UserInfo(){
};

//清除登录信息
UserInfo.clear = function(){
    plus.storage.removeItem('username');//save userid 
    plus.storage.removeItem('headimage');
    plus.storage.removeItem('wxinfo'); 
    plus.storage.removeItem('autologinstr'); 
}
 

UserInfo.username = function(){
    if(arguments.length == 0){
        return plus.storage.getItem('username');        
    }
    if(arguments[0] === ''){
        plus.storage.removeItem('username');
        return;
    }
    plus.storage.setItem('username', arguments[0]);
    console.log(plus.storage.getItem('username'));
     
};

//save a object json string, return a string.
UserInfo.autologinstr = function(){
	if(arguments.length == 0){
        var obj = plus.storage.getItem('autologinstr');
        obj = JSON.parse(obj);
        if (obj){
        	var ds = "ER21Ha26jIu89SHI02sa45Shou11MEI";
        	var str = ds + obj.mobile + obj.userid + obj.autocode;
        	return str;
        }
        else
        	return "";
    }
	
	var p = arguments[0];
    if (typeof (p) == "object")
    {
    	console.log("saving autologinstr :" + p.mobile + p.userid + p.autocode);
    	plus.storage.setItem('autologinstr', JSON.stringify(p));
    }
    
}

//argument is object 
UserInfo.wxinfo = function(){
	if(arguments.length == 0){
        var tmp = plus.storage.getItem('wxinfo');
        return JSON.parse(tmp);
    }
    
    var tmp = arguments[0];
    if (typeof(tmp) == "object")
    	tmp = JSON.stringify(tmp);
    plus.storage.setItem('wxinfo', tmp);
    console.log(plus.storage.getItem('wxinfo'));
}



UserInfo.headimage = function(){
    if(arguments.length == 0){
        return plus.storage.getItem('headimage');        
    }
    if(arguments[0] === ''){
        plus.storage.removeItem('headimage');
        return;
    }
    plus.storage.setItem('headimage', arguments[0]);
    console.log(plus.storage.getItem('headimage'));
    
};
 
 