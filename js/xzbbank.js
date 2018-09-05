$(function(){
	$(".recordInfor>ul.taps").on("click","[data-toggle=tap]",function(e){
		e.preventDefault();
		var $a=$(this);
		$a.parent().addClass("on").siblings().removeClass("on");
		$($a.attr("href")).addClass("on").siblings().removeClass("on");
		
	}); 	
});
