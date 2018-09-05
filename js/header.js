(function(){
	var link=document.createElement("link");
	link.rel="stylesheet";
	link.href="css/header.css";
	document.head.appendChild(link);
	ajax({
		type:"get",
		url:"header.html",
		success:function(html){
			document.getElementById("header").innerHTML=html;
		}
	});
})()