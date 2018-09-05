/*function task(){
	var ul=document.getElementById("ul-img");
	var li=document.querySelector("#ul-img>li.show");
	//console.log(img);
	li.className="";
	if(li.nextElementSibling!=null){
		li.nextElementSibling.className="show";
	}else{
		ul.children[0].className="show";
	}
}
setInterval(task,3000);*/
$(function(){
	var $ulImg=$("#ul-img");
	var $ulPoint=$("ul.point");
	var LIWIDTH=1920;
	var timer=null,interval=500,wait=3000,moved=0;
	$.ajax({
		type:"get",
		url:"data/index/getCarousel.php",
		dataType:"json",
		success:function(products){
			var html="";
			for( var {img,href,title} of products ){
				html+=`<li>
								<a href="javascript:;" href="${href}" title="${title}">
									<img src="${img}">
								</a>
				</li>`;
			}
			html+=`<li>
								<a href="javascript:;" href="${products[0].href}" title="${products[0].title}">
									<img src="${products[0].img}">
								</a>
			</li>`;
			$ulImg.html(html).css("width",LIWIDTH*(products.length+1));
			$ulPoint.html("<li></li>".repeat(products.length)).children(":first-child").addClass("hover").siblings().removeClass("hover");
			$ulPoint.on("click","li",function(){
					var $li=$(this);
					moved=$li.index();
					$ulImg.stop(true).animate({
						left:-moved*LIWIDTH
					},interval,function(){
							$li.addClass("hover").siblings().removeClass("hover");
					})
			})
			function move(){
				moved++;
				$ulImg.animate({left:-moved*LIWIDTH},interval,function(){
					if(moved==products.length){
					moved=0;
					$ulImg.css("left",0);
				}
				$ulPoint.children(":eq("+moved+")").addClass("hover").siblings().removeClass("hover");			
				});				
			}
			function autoMove(){
				timer=setInterval(function(){
					move();
				},wait+interval)
			}
			autoMove();
			/**鼠标移入暂停**/
			$("#ul-img,.point,.ck-left,.ck-right").hover(
				function(){
					clearInterval(timer);
					timer=null;
				},
				function(){
				autoMove();
				}
			);
			/**点击箭头播放下一张**/
			var $cLeft=$(".ck-left");
			var $cRight=$(".ck-right");
			$cRight.click(function(){
				if(!$ulImg.is(":animated")){
					move();
				}				
			});
			$cLeft.click(function(){
				if(!$ulImg.is(":animated")){
					if(moved==0){
						moved=products.length;
						$ulImg.css("left",-moved*LIWIDTH);
					}
					moved--;
					$ulImg.animate({left:-moved*LIWIDTH},interval,function(){
						$ulPoint.children(":eq("+moved+")").addClass("hover").siblings().removeClass("hover");	
					});
				}
			});			
		}
	});
})
$(function(){
	$.ajax({
		type:"Get",
		url:"data/index/getIndexProduct.php",
		dataType:"json",
		success:function(data){
			//console.log(data);
			var html="";
			data.forEach(function(p,i){
				var {pid,title,annual_rate,term,loan_amount,progress,loan_state,seq_recommended}=p;
					html+=`<tr>
						<td><a href="product_detail.html?lid=${pid}">${title}</a></td>
						<td>${annual_rate}<span>%</span></td>
						<td>${term}天</td>
						<td>${loan_amount.replace( /\B(?=(?:\d{3})+$)/g, ',' )}</td>
						<td><i class="icon-progress" style="background-position:0px -${progress*38+"px"}">${progress+"%"}</i></td>
						<td><a href="product_detail.html?lid=${pid}" class="${loan_state==1?'loanState':'lend-end'}">${loan_state==1?"立即出借":"还款中"}</a></td>
					</tr>`;
				$("#myTbody").html(html);
			});
		}

	});
	//document.onselectstart=new Function("return false");屏幕滚动
	var $lastLi=$("div.aside-right>ul>li:last-child");
	$(document).on('scroll',function(){
		// console.log($(this),$(this).scrollTop());
		var $scorll=$(this);
		if($scorll.scrollTop()>=428){
			$lastLi.show();
		}else{
			$lastLi.hide();
		}
	})
	$lastLi.click(function(){
		var $li=$(this);
		$("body").scrollTop(0);
		//$li.children("a").prop({href:"index.html"}); 强制刷新
	});
});


