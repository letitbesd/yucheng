	
document.onreadystatechange=subSomething;
function subSomething(){
 if(document.readyState=="complete")
 {	
	$(".loading_all").fadeOut();
	$('body').css("overflow","auto");
	$(".si_b5_con").hide();
 }
};

function do_ajax(data,url,successFunc){
	//data.post_type = "json";
	data.is_ajax = 1;
	$.ajax({
		url : url,
		data : data,
		type : 'Post',
		dataType : 'json',
		success : function(result) {
			eval(successFunc + "(" + JSON.stringify(result) + ")");
		}
	});
}

function toUrl(url){
	window.location.href = url;
}

$(function(){
	$("body").on("click",".to_goods_detail",function(){
		var goods_id = $(this).attr("data");
		var url = "/mobile/goods_detail.php?goods_id=" + goods_id;
		toUrl(url);
	});
});