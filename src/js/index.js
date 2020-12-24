
//  DOM 載入完成後執行
$(function () {
    // 點擊按鈕，頁面滑到最上方
    $(".pagetop").on("click", function (e) {
        e.preventDefault();
        $('html, body').animate({
            scrollTop: 0
        }, 750);
    });

    //偵測滾輪事件 下滑超過300導覽列就變色
    $(window).scroll(function () {
        if ($(window).scrollTop() >= 300) {
            $('nav').addClass('upup');
            $('.menu a').css("color", "green");
            $('.menu a').addClass('gr');
            $('.hamburger>div').css('background', 'black');
        } else {
            $('nav').removeClass('upup');
            $('.menu a').css("color", "white");
            $('.menu a').removeClass('gr');
            $('.hamburger>div').css('background', 'white');
        }
    });
});