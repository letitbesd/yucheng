	
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
function show_dialog(content, type, confirmFunc){
	var dialog = 
		"<div class='warning_ts'>"+
			"<div class='wa_head'><img src='/mobile/themesmobile/self_themes/img/icon/warning.png'><i class='wa_title'>付款提示</i></div>"+
			"<div class='wa_con'>"+
				"<p class='wa_font'>" + content + "</p>"+
			"</div>";
	if(!type){
		dialog += 
			"<div class='wa_bun_2'>"+
				"<p class='wa_go_go' id='dialog_cancel'>确认</p>"+
			"</div>";
	}else{
		dialog += 
			"<div class='wa_bun_1'>"+
				"<p class='wa_cancel' id='dialog_cancel'>取消</p><p class='wa_go' id='dialog_confirm'>确认</p>"+
			"</div>";
		//绑定确定函数
		$("#dialog_confirm").on("click",function(){
			if(confirmFunc){
				eval(confirmFunc + "()");
			}
			$('.warning_ts').remove();
		});
	}	
	dialog += "</div>";
	$("body").append(dialog);
	
	$('#dialog_cancel').on('click',function(){
		$('.warning_ts').remove();
	});
}

var loading = 
	"<div class='loading_all'>"+
	"<div class='waiting'></div>"+
	"</div>";
	
$("body").append(loading);