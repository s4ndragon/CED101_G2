function getLoginInfo() {
    //取回使用者的登入資訊
    let xhr = new XMLHttpRequest();
    xhr.onload = function () {
        member = JSON.parse(xhr.responseText);
        if (member.MEM_ID) {
            //如果有登入
            // document.getElementById("MEM_NICKNAME").innerText = member.MEM_NICKNAME;
            document.getElementById("spanLogin").innerText = "登出";
        }
    };
    xhr.open("get", "getLoginInfo.php", true);
    xhr.send(null);
}

$(document).ready(function () {
    $("p").on("click", function () {
        $("#login").css("display", "none");
        $("#forget_pw").css("display", "block").fadeIn(600);
        $("#signup").css("display", "none");
        $(".tab-group > li").removeClass("active");
    });

    $(".form")
        .find("input, textarea")
        .on("keyup blur focus", function (e) {
            var $this = $(this),
                label = $this.prev("label");

            if (e.type === "keyup") {
                if ($this.val() === "") {
                    label.removeClass("active highlight");
                } else {
                    label.addClass("active highlight");
                }
            } else if (e.type === "blur") {
                if ($this.val() === "") {
                    label.removeClass("active highlight");
                } else {
                    label.removeClass("highlight");
                }
            } else if (e.type === "focus") {
                if ($this.val() === "") {
                    label.removeClass("highlight");
                } else if ($this.val() !== "") {
                    label.addClass("highlight");
                }
            }
        });

    $(".tab a").on("click", function (e) {
        e.preventDefault();

        $(this).parent().addClass("active");
        $(this).parent().siblings().removeClass("active");

        target = $(this).attr("href");

        $(".tab-content > div").not(target).hide();

        $(target).fadeIn(600);
    });
    getLoginInfo();
});
