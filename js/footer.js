(()=>{
	//document.onselectstart=new Function("return false");
	var link=document.createElement("link");
	link.rel="stylesheet";
	link.href="css/footer.css";
	document.head.appendChild(link);
	ajax({
		type:"get",
		url:"footer.html",
		success:function(html){			
			var footer=document.getElementById("footer");
			footer.innerHTML=html;
		}
	});
})()