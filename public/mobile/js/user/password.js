$(function () {
    //点击修改按钮提交数据
    $(".btn_register").on('tap', function () {
        var data = {
            oldPassword: $.trim($('[name="oldPassword"]').val()),
            newPassword: $.trim($('[name="newPassword"]').val()),
            vCode: $.trim($('[name="vCode"]').val()),
        }
        console.log(data);
        //非空校验
        if(!data.oldPassword) return mui.toast('请输入原密码');
        if(!data.newPassword) return mui.toast('请输入新密码');
        var rePass = $.trim($('[name="rePass"]').val());
        if(!rePass) return mui.toast('请再次输入新密码');

        if(data.newPassword !== rePass){
            return mui.toast("密码需要一致");
        }

        if(!data.vCode) return mui.toast('请输入认证码');

        //请求数据
        $.ajax({
            type:'post',
            url:'/user/updatePassword',
            data: data,
            dataType:'json',
            success: function (data) {
                console.log(data);
                if(data.success){
                    mui.toast("修改密码成功");
                    location.href = "login.html"; //跳转到登录页
                }else {
                    mui.toast(data.message);
                }
            }
        })



    })

    //点击获取验证码
    $(".btn_getCode").on('tap', function () {
        //判断 : 当前如果有btn_disabled类名, 阻止后面的程序
        var btn = $(".btn_getCode");
        if(btn.hasClass("btn_disabled")){
            return false;
        }
        LT.loginAjax({
            url:'/user/vCodeForUpdatePassword',
            success: function (data) {
                console.log("ok");
                $('[name="vCode"]').val(data.vCode);
                var time = 60;
                //禁用
                btn.addClass("btn_disabled").html(60 + "秒之后再获取");
                var timeId = setInterval(function () {
                    time--;
                    btn.html(time + "秒之后再获取");
                    if(time<= 0){
                        clearInterval(timeId);
                        btn.removeClass("btn_disabled").html("获取认证码");
                    }

                },1000)

            }
        })

    })
})