$(function(){
    var $ulData=$(".product-details>ul");
	var divPages=$(".product-list");
    function loadProduct(pno,pageSize) {
        $.ajax({
            type: "GET",
            url: "data/products/getProduct.php",
            data: {pno: pno, pageSize: pageSize},
            success: function (data) {
                //console.log(data);
                var rows=data.products;
				var pageCount=parseInt(data.pageCount);
				var pno=parseInt(data.pno);
                var html="";
                html+=`<li class="lend-title">
							<span>项目名称</span>
							<span>年化利率</span>
							<span>期限</span>
							<span>借款金额</span>
							<span>出借截止日期</span>
							<span>进度</span>
							<span>出借</span>
						</li>`;
                $ulData.html(html);
                for(var item of rows){
                    html+=`<li class="lend-details">
							<a href="product_detail.html?lid=${item.lid}">${item.title}</a>
							<span>${item.annual_rate}<em>%</em></span>
							<span>${item.term}天</span>
							<span>${item.loan_amount.replace( /\B(?=(?:\d{3})+$)/g, ',' )}</span>
							<span>${item.dueDate}</span>
							<p>
								<em class="progress">
									<i style="width:${item.progress}"></i>
								</em>
								<span>${item.progress}</span>
							</p>
							<a href="product_detail.html?lid=${item.lid}" data-state="loanState" class="${item.loan_state==1?'loanState':'lend-end'}">${item.loan_state==1?"立即出借":"还款中"}</a>
					</li>`;
                }
                $ulData.html(html);
				/*var $aState=$("[data-state=loanState]");
				if($aState.html()=="还款中"){
					$aState.addClass(" lend-end");
				}else{
						$aState.addClass("loanState");
				} */
                //分页
				/*var html = "";
				pno = parseInt(data.pno);
				pageCount = parseInt(data.pageCount);
				//上上一页
				 if(pno-2>0){
					html += `<a href="#">${pno-2}</a>`;
				 }
				//上一页
				if(pno-1>0){
				 html += `<a href="#">${pno-1}</a>`;
				}
				//当前页
				html += `<a href="#" class="current">${pno}</a>`;
				//下一页 
				if(pno+1<=pageCount){
				html += `<a href="#">${pno+1}</a>`;
				}
				//下下一页
				if(pno+2<=pageCount){
				html += `<a href="#">${pno+2}</a>`
				}
				*/
				var html=`<a href="javascript:;" class="previous">＜</a>`;
				for(var i=1;i<=pageCount;i++){
					if(i!==pno){
						html+=`<a href="javascript:;">${i}</a>`;
					}else{
						html+=`<a href="javascript:;" class="current">${i}</a>`;
					}
				}
				html+=`<a href="javascript:;" class="next">＞</a> `;
				divPages.html(html)
				if(pno==1){divPages.children(":first-child").addClass("previous unable");}
				if(pno==pageCount){divPages.children(":last-child").addClass("next unable");
				}
			},
			 error: function () {
                alert("网络故障请检查");
            }
		});
	}
    loadProduct(1,15);
	divPages.on("click","a",function(e) {
		e.preventDefault();
		if(!$(this).hasClass('unable')){
			var pno;
			if($(this).index() == 0){
				//点击左箭头进入
				$('.current').prev().addClass('current').siblings().removeClass('current');
				pno = $('.current').text();
			}else if($(this).index() == $(this).parent().find('a').length - 1){
				//点击右箭头进入
				$('.current').next().addClass('current').siblings().removeClass('current');
				pno = $('.current').text();
			}else{
				//其他a标签进入
				pno = $(this).text();		
			}	
			loadProduct(pno, 15);
		}			
	});
});