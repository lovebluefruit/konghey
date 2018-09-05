$(function(){
	var ul=$(".product>ul.tabs");
	ul.on("click","[data-toggle=tab]",function(e){
		e.preventDefault();
		var $a=$(this);
			$a.parent().addClass("active").siblings().removeClass("active");
			$($a.attr("href")).addClass("active").siblings().removeClass("active");
	});
});
$(function(){
	var lid=location.search.slice(5);
	var $list=$(".detail-main .title ");
	$.ajax({
		type:"GET",
		url:"data/products/getProductById.php",
		data:{lid},
		dataType:"json",
		success:function(data){
			var rows=data.product;
			//console.log(rows);
			var html="";
			var {title,minLoan,annual_rate,loan_amount,term,loanCondition,valueDate,payMethod,dueDate,minLoan,progress,lent_amout,expected_earnings}=rows
				html+=`<div class="left lf">
					<h1 class="sm-title">
						${title}
						<span >
							最低出借金额：
							<em>${minLoan.replace( /\B(?=(?:\d{3})+$)/g, ',' )}</em>
							元
						</span>
					</h1>
					<div class="row-01 clear">
						<ul>
							<li>
								<p>${annual_rate}<em>%</em></p>
								<p>预期年化利率</p>
							</li>
							<li>
								<p>${loan_amount.replace( /\B(?=(?:\d{3})+$)/g, ',' )}<em>元</em></p>
								<p>总金额</p>
							</li>
							<li>
								<p>${term}<em>天</em></p>
								<p>借款期限</p>
							</li>
						</ul>
					</div>
					<div class="row-02 clear">
						<ul>
							<li>
								<span>出借人条件：</span>
								<span>${loanCondition}</span>
							</li>
							<li>
								<span>起息日：</span>
								<span>${valueDate}</span>
							</li>
							<li>
								<span>还款方式：</span>
								<span>${payMethod}</span>
							</li>
						</ul>
					</div>
					<div class="row-03 clear">
						<ul>
							<li>
								<span>募集到期日：</span>
								<span data-due="time">${dueDate}</span>
							</li>
							<li>
								<span>最低出借金额：</span>
								<span>${minLoan.replace( /\B(?=(?:\d{3})+$)/g, ',' )}元</span>
							</li>
							<li>
								<div class="level-money">
									<span style="width:${progress}"></span>
								</div>
								<span>${progress}</span>
							</li>
						</ul>
					</div>
					<div class="row-04 clear">
						<ul>
							<li>出借截止时间：
								<span data-lent="time"></span>
							</li>
							<li>温馨提示：
								<span>市场有风险，出借需谨慎</span>
							</li>
						</ul>
					</div>
				</div>
				<div class="right rf">
					<div class="lend">
						<span>可出借金额：</span>
						<em>${lent_amout.replace( /\B(?=(?:\d{3})+$)/g, ',' )}</em>
						<span>元</span>
					</div>
					<div class="txt-lend">
						<input type="text" class="txt">
						<em>元</em>
					</div>
					<p  class="get">预计收益：<em>${expected_earnings.replace( /\B(?=(?:\d{3})+$)/g, ',' )}</em>元</p>
					<a href="" class="login-lend">登录出借</a>
				</div>`;
			$list.html(html);
			var time=$("[data-lent=time]")
			var dueTime=$("[data-due=time]").html();
			var end=new Date(dueTime);
			var html="";
			function tasktime(){
				var now=new Date();
				var s=parseInt((end-now)/1000);
				if (s>0)
				{
					var d=parseInt(s/(24*3600));
					var h=parseInt(s%(24*3600)/3600);
					var m=parseInt(s%3600/60);
					var s=s%60;
					html=` ${d}天 ${h}小时 ${m}分 ${s}秒`
					time.html(html);
				}else{
					clearInterval(timer);
				}				
			}
			tasktime();
			var timer=setInterval(tasktime,1000);
		}
	});
});