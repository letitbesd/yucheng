var page = parseInt($("#page_input").val());
page = page?page:1;
var refresh_end_flag = 0;
var refresh_url = $("#refresh_url_input").val();
if(!refresh_url){
	refresh_url = getRefreshUrl();
}
refresher.init({
	id:"wrapper",//<------------------------------------------------------------------------------------┐
	pullDownAction:Refresh,                                                            
	pullUpAction:Load,																			
});																																							
function Refresh() {																
	setTimeout(function () {
		var el, li, i;																		
		el =document.querySelector("#wrapper ul");					
		//这里写你的刷新代码				
		document.getElementById("wrapper").querySelector(".pullDownIcon").style.display="none";		
		document.getElementById("wrapper").querySelector(".pullDownLabel").innerHTML="<img src='./css/ok.png' class='ok'/>刷新成功";																					 
		setTimeout(function () {
			wrapper.refresh();
			document.getElementById("wrapper").querySelector(".pullDownLabel").innerHTML="";								
			},1000);//模拟qq下拉刷新显示成功效果
	}, 1000);
}
function Load() {
	if(!refresh_end_flag){
		var url = refresh_url;
		var data = new Object();
		data.page = page + 1;
		do_ajax(data,url,"add_list");
	}
		setTimeout(function () {
			wrapper.refresh();
			document.getElementById("wrapper").querySelector(".pullDownLabel").innerHTML="";								
			},1000);//模拟qq下拉刷新显示成功效果
}
function refresh_end(){
	$(".pullUpLabel").html("没有更多了！");
	$(".pullUpIcon").hide();
}