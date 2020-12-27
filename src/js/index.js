
//  DOM 載入完成後執行
$(function () {
    // 點擊按鈕，頁面滑到最上方
    $(".pagetop").on("click", function (e) {
        e.preventDefault();
        $('html, body').animate({
            scrollTop: 0
        }, 750);
    });


});

$(window).on('load', function () {
    parallaxInstance = new Parallax(document.getElementById("index_background"), {
    });
});