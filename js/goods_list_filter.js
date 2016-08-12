
	 
			$(".sx_tab_one").on("click", function() {
				$(".sx_down").show();
				$(".sx_up").hide();
				$(this).find(".sx_down").toggle();
				$(this).find(".sx_up").toggle();
				$(this).addClass("hd_select");
				$(".sx_tab_two").removeClass("hd_select");
				$(".sx_tab_three").removeClass("hd_select");
				$(".sx_con_one").toggle();
				$(".sx_con_two").hide();
				$(".sx_con_three").hide();				
			});
			
			$(".sx_con_one").on("tap", 'p', function(e){
				$(this).parent().find('p').removeClass('sx_select');
				$(this).addClass('sx_select');
				setTimeout(function(){
					$('.category_div').hide();//click event is not triggered if hide immediatly
				}, 500);
//				
			});

			$(".sx_tab_two").on("click", function() {
				$(".sx_down").show();
				$(".sx_up").hide();
				$(this).find(".sx_down").toggle();
				$(this).find(".sx_up").toggle();
				$(this).addClass("hd_select");
				$(".sx_tab_one").removeClass("hd_select");
				$(".sx_tab_three").removeClass("hd_select");
				$(".sx_con_two").toggle();
				$(".sx_con_one").hide();
				$(".sx_con_three").hide();				
			});
			
			$(".sort_div").on("tap", 'p', function(e){
				$('.sort_div').find('p').removeClass('sx_select');
				$(this).addClass('sx_select');
				
				setTimeout(function(){
					$('.sort_div').hide(); //click event is not triggered if hide immediatly
				}, 500);
			});

			$(".sx_tab_three").on("tap", function() {
				$(".sx_down").show();
				$(".sx_up").hide();
				$(this).find(".sx_down").toggle();
				$(this).find(".sx_up").toggle();
				$(this).addClass("hd_select");
				$(".sx_tab_one").removeClass("hd_select");
				$(".sx_tab_two").removeClass("hd_select");
				$(".sx_con_three").toggle();
				$(".sx_con_one").hide();
				$(".sx_con_two").hide();
			});
			
			$(".attr_div").on("tap", 'b', function(e){
				$(this).parent().find('b').removeClass('sx_select');
				$(this).addClass('sx_select');
				
			});
			
			 
		 