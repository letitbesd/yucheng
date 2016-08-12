	
(function($){
    
    $.fn.downCount = function(dur){
        var self = this;
        var initDiff = dur;
        
        var countdown = function(){
            var day=0,
                hour=0,
                minute=0,
                second=0;//时间默认值		
            if(initDiff > 0){
                day = Math.floor(initDiff / (60 * 60 * 24));
                hour = Math.floor(initDiff / (60 * 60)) - (day * 24);
                minute = Math.floor(initDiff / 60) - (day * 24 * 60) - (hour * 60);
                second = Math.floor(initDiff) - (day * 24 * 60 * 60) - (hour * 60 * 60) - (minute * 60);
            }
            else{
                window.clearInterval(interval);
            }
            if (minute <= 9) minute = '0' + minute;
            if (second <= 9) second = '0' + second;
            
            $(self).find('.days').html(day);
            $(self).find('.hours').html('<s id="h"></s>'+hour);
            $(self).find('.minutes').html('<s></s>'+minute);
            $(self).find('.seconds').html('<s></s>'+second);
            initDiff--;
        }
        
        var interval = window.setInterval(countdown, 1000);
        
    } 
    
})(Zepto);

