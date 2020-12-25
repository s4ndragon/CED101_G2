$(document).ready(function () {
    // console.log($(".attend_1").text());
    // if ($(".attend_1").text() < $(".require_1").text()) {
    //     $(".tour_status").text() = "未成團";
    // }

    //地址二聯式下拉選單
    new TwCitySelector();

    //sub menu分頁
    $(".tour").click(function () {
        $(".tour").addClass("bg-color").removeClass("select-color");
        $(".mine_fav").removeClass("bg-color").addClass("select-color");
        $(".mine_order").removeClass("bg-color").addClass("select-color");
        $(".mine_article").removeClass("bg-color").addClass("select-color");
        $(".mine_profile").removeClass("bg-color").addClass("select-color");
        $("#tour").show();
        $("#mine_fav").hide();
        $("#mine_order").hide();
        $("#mine_article").hide();
        $("#mine_profile").hide();
    });
    $(".mine_fav").click(function () {
        $(".tour").removeClass("bg-color").addClass("select-color");
        $(".mine_fav").addClass("bg-color").removeClass("select-color");
        $(".mine_order").removeClass("bg-color").addClass("select-color");
        $(".mine_article").removeClass("bg-color").addClass("select-color");
        $(".mine_profile").removeClass("bg-color").addClass("select-color");
        $("#tour").hide();
        $("#mine_fav").show();
        $("#mine_order").hide();
        $("#mine_article").hide();
        $("#mine_profile").hide();
    });
    $(".mine_order").click(function () {
        $(".tour").removeClass("bg-color").addClass("select-color");
        $(".mine_fav").removeClass("bg-color").addClass("select-color");
        $(".mine_order").addClass("bg-color").removeClass("select-color");
        $(".mine_article").removeClass("bg-color").addClass("select-color");
        $(".mine_profile").removeClass("bg-color").addClass("select-color");
        $("#tour").hide();
        $("#mine_fav").hide();
        $("#mine_order").show();
        $("#mine_article").hide();
        $("#mine_profile").hide();
    });
    $(".mine_article").click(function () {
        $(".tour").removeClass("bg-color").addClass("select-color");
        $(".mine_fav").removeClass("bg-color").addClass("select-color");
        $(".mine_order").removeClass("bg-color").addClass("select-color");
        $(".mine_article").addClass("bg-color").removeClass("select-color");
        $(".mine_profile").removeClass("bg-color").addClass("select-color");
        $("#tour").hide();
        $("#mine_fav").hide();
        $("#mine_order").hide();
        $("#mine_article").show();
        $("#mine_profile").hide();
    });
    $(".mine_profile").click(function () {
        $(".tour").removeClass("bg-color").addClass("select-color");
        $(".mine_fav").removeClass("bg-color").addClass("select-color");
        $(".mine_order").removeClass("bg-color").addClass("select-color");
        $(".mine_article").removeClass("bg-color").addClass("select-color");
        $(".mine_profile").addClass("bg-color").removeClass("select-color");
        $("#tour").hide();
        $("#mine_fav").hide();
        $("#mine_order").hide();
        $("#mine_article").hide();
        $("#mine_profile").css({
            display: "flex",
        });
    });

    //收藏內分頁
    $(".fav_tour").click(function () {
        $(this).addClass("colored");
        $(".fav_article").removeClass("colored");
        $(".fav_product").removeClass("colored");
        $("#fav_tour").show();
        $("#fav_article").hide();
        $("#fav_product").hide();
    });
    $(".fav_article").click(function () {
        $(this).addClass("colored");
        $(".fav_tour").removeClass("colored");
        $(".fav_product").removeClass("colored");
        $("#fav_tour").hide();
        $("#fav_article").show();
        $("#fav_product").hide();
    });
    $(".fav_product").click(function () {
        $(this).addClass("colored");
        $(".fav_tour").removeClass("colored");
        $(".fav_article").removeClass("colored");
        $("#fav_tour").hide();
        $("#fav_article").hide();
        $("#fav_product").show();
    });

    //個人資料分頁
    $("form")
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
});
