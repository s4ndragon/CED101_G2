$(document).ready(function () {
    // console.log($(".attend_1").text());
    // if ($(".attend_1").text() < $(".require_1").text()) {
    //     $(".tour_status").text() = "未成團";
    // }

    //地址二聯式下拉選單
    // new TwCitySelector();

    //change profile unfinished
    $(".profile-pic").click(function () {
        $("#profile_pic_input").trigger("click");
    });

    function readURL(input) {
        if (input.files && input.files[0]) {
            var reader = new FileReader();
            reader.onload = function (e) {
                //animate profile picture
                var profilePicTL = new TimelineMax();
                profilePicTL
                    .set(".profile-pic", {
                        transformOrigin: "50% 50%",
                    })
                    .to(".profile-pic", 2, {
                        transform: "rotate(-15deg)",
                        ease: Elastic.easeOut,
                    })
                    .to(
                        ".profile-pic",
                        0.8,
                        {
                            transform: "translateY(650px) rotate(20deg)",
                            ease: Back.easeIn,
                            onComplete: function () {
                                $(".profile-pic img").attr("src", e.target.result);
                                $(".profile-pic").css("opacity", "0");
                            },
                        },
                        "-=1.2"
                    )
                    .set(".profile-pic", {
                        transform: "translateY(-200px) rotate(0)",
                        transformOrigin: "50% 50%",
                        onComplete: function () {
                            $(".profile-pic").css("opacity", "1");
                        },
                    })
                    .to(".profile-pic", 0.2, {
                        transform: "translateY(0)",
                        opacity: 1,
                        ease: Power2.easeIn,
                    })
                    .set(".profile-pic", {
                        transformOrigin: "50% 100%",
                    })
                    .to(".profile-pic", 0.1, {
                        transform: "scaleX(1.6) scaleY(.3)",
                        ease: Power4.easeOut,
                    })
                    .to(".profile-pic", 0.8, {
                        transform: "scaleX(1) scaleY(1)",
                        opacity: 1,
                        ease: Elastic.easeOut,
                    });

                //animate card
                var cardTL = new TimelineMax();

                cardTL
                    .set(".card", {
                        transformOrigin: "100% 100%",
                    })
                    .to(".card", 0.7, {
                        transform: "rotate(15deg) skew(0)",
                        ease: Back.easeOut,
                    })
                    .to(".card", 0.2, {
                        transform: "rotate(-5deg) skewY(-10deg)",
                        ease: Back.easeIn,
                    })
                    .to(".card", 1, {
                        transform: "rotate(0) skew(0)",
                        ease: Elastic.easeOut,
                    })
                    .set(".card", {
                        transformOrigin: "50% 100%",
                    })
                    .to(
                        ".card",
                        0.2,
                        {
                            transform: "scaleX(1.1) scaleY(.9)",
                            delay: 0.9,
                            ease: Power4.easeIn,
                        },
                        "-=.7"
                    )
                    .to(".card", 0.8, {
                        transform: "scale(1)",
                        ease: Elastic.easeOut,
                    });
            };
            reader.readAsDataURL(input.files[0]);
        }
    }

    $("#profile_pic_input").change(function () {
        readURL(this);
    });

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
        $(this).addClass("colored").removeClass("unselected");
        $(".fav_article").removeClass("colored").addClass("unselected");
        $(".fav_product").removeClass("colored").addClass("unselected");
        $("#fav_tour").show();
        $("#fav_article").hide();
        $("#fav_product").hide();
    });
    $(".fav_article").click(function () {
        $(this).addClass("colored").removeClass("unselected");
        $(".fav_tour").removeClass("colored").addClass("unselected");
        $(".fav_product").removeClass("colored").addClass("unselected");
        $("#fav_tour").hide();
        $("#fav_article").show();
        $("#fav_product").hide();
    });
    $(".fav_product").click(function () {
        $(this).addClass("colored").removeClass("unselected");
        $(".fav_tour").removeClass("colored").addClass("unselected");
        $(".fav_article").removeClass("colored").addClass("unselected");
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
    //顯示人數
    $(".tour_attendency").click(function () {
        // console.log("hi");
        $("#num_attendency")
            .css({
                display: "flex",
            })
            .addClass("num_attendency");
        // $("main").css({
        //     backgroundColor: "rgba(46, 44, 39, 0.9)",
        // });
    });
    $(".close").click(function () {
        $("#num_attendency")
            .css({
                display: "none",
            })
            .removeClass("num_attendency");
    });

    //取消收藏
    // $(".like").click(function () {
    //     $("#cancel_confirm")
    //         .css({
    //             display: "flex",
    //         })
    //         .addClass("cancel_confirm");
    // });
    //確定取消收藏
    // $("#cancel_confirm_btn").click(function () {
    //     // console.log(this.parentNode.parentNode);
    //     $("#cancel_confirm").css({
    //         display: "none",
    //     });
    //     $(this.parentNode).css({
    //         display: "none",
    //     });
    // });
    //取消 取消收藏
    // $("#recall_cancel").click(function () {
    //     $("#cancel_confirm").css({
    //         display: "none",
    //     });
    //     $("#cancel_confirm").removeClass("cancel_confirm");
    // });

    //文章刪除
    $(".article_check").click(function () {
        $("#delete_confirm")
            .css({
                display: "flex",
            })
            .addClass("delete_confirm");
    });
    //確定刪除
    $("#btn_confirm").click(function () {
        $("#delete_confirm").css({
            display: "none",
        });
        $("#article_brief").css({
            display: "none",
        });
    });
    //取消刪除
    $("#btn_cancel").click(function () {
        $("#delete_confirm").css({
            display: "none",
        });
        $("#delete_confirm").removeClass("delete_confirm");
    });

    //like
    let like = document.getElementsByClassName("like");
    for (var i = 0; i < like.length; i++) {
        like[i].addEventListener("click", changeHeart);
    }
    function changeHeart() {
        if (this.title == "加入收藏") {
            this.title = "取消收藏";
            this.src = "./images/common/heart.png";

            $(this).parent("div").parent("div").css({
                display: "none",
            });
            // $(this).parent(".heart").parent("blog_container").css({
            //     display: "none",
            // });

            // $("#cancel_confirm_btn").click(function () {
            //     $("#cancel_confirm").css({
            //         display: "none",
            //     });
            //     $(this).css({
            //         display: "none",
            //     });
            // });
            // $("#recall_cancel").click(function () {
            //     $("#cancel_confirm").css({
            //         display: "none",
            //     });
            //     $("#cancel_confirm").removeClass("cancel_confirm");
            //     this.src = "./images/common/like.png";
            // });
        } else {
            this.title = "加入收藏";
            this.src = "./images/common/like.png";
        }
    }
});
