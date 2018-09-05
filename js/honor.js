$(function(){
    var ul=$("#box1>ul");
    //console.log(ul);
    ul.on("click",".title",function(){
        var p=$(this);
            p.next().slideToggle();
    });
});
