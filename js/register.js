$(function(){
    var div=$(".content-title");
    div.on("click","[data-register=register],[data-register=comregister]",function(e){
        e.preventDefault();
        var $a=$(this);
        $a.addClass("active").siblings().removeClass("active");
        if(!$a.is("[data-register=register]")){
            $($a.attr("href")).addClass("active");
        }else{
            $($a.attr("href")).siblings().removeClass("active");
        }
    });
});
//当鼠标获取焦点时，提示请输入手机号或密码
//当鼠标失去焦点时，验证输入的是否符合要求
    //若为空则提示，不能为空，若不符合正则要求，则提示输入正确的用户名
    //若为空则提示，不能为空，若不符合正则要求，则提示输入正确的密码

$(function(){
    var uname=$("[name=phone]");
    var upwd=$("[name=upwd]");
    var cpwd=$("[name=cpwd]");
    var checkbox=$("[name=agree]");
    var btn=$("#btn");
    function vali(reg,txt,msg1,msg2,msg3){
        if(txt.val()==""){
            txt.next().addClass("vali_fail").html(msg1);
            return false;
        }else if(!reg.test(txt.val())){
             txt.next().addClass("vali_fail").html(msg2);
             return false;
        }else{
            txt.next().removeClass("vali_fail").addClass("vali_success").html(msg3);
            return true;
        }
    }
    var reguname=/^1[3-8]\d{9}$/;
    uname.blur(function(){
        var $uname=$(this);

        vali(reguname,$uname,"手机号不能为空","请输入正确的手机号","该手机号可以使用");
//           $.ajax({
//               type:"POST",
//               url:"data/users/checkUname.php",
//               data:{phone:uname.val()},
//               success:function(data){
//                    console.log(data);
//               },
//               error:function(){
//                   alert("网络故障请检查");
//               }
//           });
       })
        var regupwd=/^\d{6,8}$/;
       upwd.blur(function(){
            var $upwd=$(this);
            vali(regupwd,$upwd,"密码不能为空","密码必须介于6~8位","通过");
       });
       cpwd.blur(function(){
            var $cpwd=$(this);
            if($cpwd.val()!=upwd.val()){
                $cpwd.next().addClass("vali_fail").html("两次密码不一致")
            }else if($cpwd.val()!==""){
                $cpwd.next().removeClass("vali_fail").addClass("vali_success").html("通过");
            }
       });
       btn.click(function(e){
            if(!vali(reguname,uname.val())||!vali(regupwd,upwd.val())){
                e.preventDefault();
            }else if(checkbox.is(":checked")){
                 $.ajax({
                     type:"GET",
                     url:"data/users/checkUname.php",
                     data:{phone:uname.val()},
                      success:function(data){
                        if(data.code>0){
                              vali(reguname,uname,"手机号不能为空","请输入正确的手机号","该手机号已被占用");
                        }else{
                            $("form").submit();
                        }
                     },
                     error:function(){
                        alert("网络故障请检查");
                     }
                  });
            }

       });

});
