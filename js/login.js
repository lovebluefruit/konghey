	//验证登录时，
	//1.用户名和密码获取焦点时，左侧小图标背景颜色变暗; 
	//2.开始键入内容时，右侧出现×图标，点击时重置内容，回到初始登录状态; 
(function(){
	var $inputs=$("input");
			$inputs.on("focus",function(){
					$(this).prev().css("backgroundColor","#ddd");
			});
			$inputs.on("blur",function(){
				$(this).prev().css("backgroundColor","#f0f0f0");
			});

			$inputs.on("input",function(){
				if($(this).val()!==""){
					$(this).next().css("display","block");
				}else{
					$(this).next().hide();
				}
			});
			var $divLogin=$("div.login-value");
			$divLogin.on("click","[class=ck-reset]",function(){
				$(this).prev().val("");
				$(this).hide();
			});
	//3.用户名或密码不填写点击登录时，提示请输入账户名、请输入密码、两者都空时提示：请输入用户名和密码
	//4.用户名和密码不正确时，提示：手机号与密码不匹配，请重新输入
	//5.错误框失去焦点时，高亮显示
	var $a=$("[class=login-login]");
	var $input=$("input:visible");
	$a.click(function(){
			if( $("#phone").val()==""&&$("#upwd").val()=="" ){
				$("div.txt-empty").text("请输入用户名和密码");
				$("div.txt-msg").show();
			}else if($("#phone").val()==""){
				$("div.txt-empty").text("请输入手机号");
				$("div.txt-msg").show();
			}else if($("#upwd").val()==""){
				$("div.txt-empty").text("请输入密码");
				$("div.txt-msg").show();
			}else{
				$.ajax({
					type:"get",
					url:"../konghey/data/users/signin.php",
					dataType:"json",
					data:{
						phone:$("#phone").val(),
						upwd:$("#upwd").val()
					},
					success:function(data){
								//var dataFalse = {"resault":false,"userTel":""};
								//var dataTrue = {"resault":true,"userTel":"18514582040"};
								var {result,userTel}=data;
							if(result == false){
								$("div.txt-empty").text("手机号与密码不匹配，请重新输入");
								$("div.txt-msg").show();
							}else{
								location.href="index.html?phone="+userTel;
							}
						}
				});
			}
	});
})();


