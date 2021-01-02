
//  DOM 載入完成後執行
$(function () {
    // 點擊按鈕，頁面滑到最上方
    $(".pagetop").on("click", function (e) {
        e.preventDefault();
        $('html, body').animate({
            scrollTop: 0
        }, 750);
    });

    if ($(window).scrollTop() >= 300) {
        $("nav").addClass("upup");
        $(".menu a").css("color", "#7baa17");
        $(".menu a").addClass("gr");
        $(".hamburger>div").css("background", "black");
    } else {
        $("nav").removeClass("upup");
        $(".menu a").css("color", "white");
        $(".menu a").removeClass("gr");
        $(".hamburger>div").css("background", "white");
    }

});

$(window).on("DOMContentLoaded", function () {
    parallaxInstance = new Parallax(document.getElementById("index_background"), {
    });
});


