;function UserInfo(){
};

//清除登录信息
UserInfo.clear = function(){
    plus.storage.removeItem('username');//save userid
    plus.storage.removeItem('password');
    plus.storage.removeItem('token');
    plus.storage.removeItem('mobile_number');
    plus.storage.removeItem('autocode');
    plus.storage.removeItem('extra');
    
}

/*//检查是否包含自动登录的信息
UserInfo.auto_login = function(){
    var username = UserInfo.username();
    var pwd = UserInfo.password();
    if(!username || !pwd){
        return false;
    }
    return true;
}

//检查是否已登录
UserInfo.has_login = function(){	
    var username = UserInfo.username();
    var pwd = UserInfo.password();
    var token = UserInfo.token();
    if(!username || !pwd || !token){
        return false;
    }
    return true;
};*/

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

UserInfo.extra = function(){
    if(arguments.length == 0){
        return plus.storage.getItem('extra');        
    }
    if(arguments[0] === ''){
        plus.storage.removeItem('extra');
        return;
    }
    plus.storage.setItem('extra', arguments[0]);
    console.log(plus.storage.getItem('extra'));
     
};

UserInfo.mb = function(){
    if(arguments.length == 0){
        return plus.storage.getItem('mobile_number');        
    }
    if(arguments[0] === ''){
        plus.storage.removeItem('mobile_number');
        return;
    }
    plus.storage.setItem('mobile_number', arguments[0]);
    console.log(plus.storage.getItem('mobile_number'));
    
};
UserInfo.autocode = function(){
    if(arguments.length == 0){
        return plus.storage.getItem('autocode');        
    }
    if(arguments[0] === ''){
        plus.storage.removeItem('autocode');
        return;
    }
    //console.log("saving token as " + arguments[0]);
    plus.storage.setItem('autocode', arguments[0]); 
     console.log(plus.storage.getItem('autocode'));
};

UserInfo.password = function(){
    if(arguments.length == 0){
        return plus.storage.getItem('password');        
    }
    if(arguments[0] === ''){
        plus.storage.removeItem('password');
        return;
    }
    plus.storage.setItem('password', arguments[0]);
     console.log(plus.storage.getItem('password'));
};

UserInfo.token = function(){
    if(arguments.length == 0){
        return plus.storage.getItem('token');       
    }
    if(arguments[0] === ''){
        plus.storage.removeItem('token');
        return;
    }

    plus.storage.setItem('token', arguments[0]);
     console.log(plus.storage.getItem('token'));
     
};