$(document).ready(function () {
    //change profile
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

    //========  arrow up & down
    $(".arrow").click(function () {
        $(this).toggleClass("down").toggleClass("up").toggleClass("extend");
        $(this).siblings().toggleClass("block");
        // $().();
    });

    //========  sub menu分頁
    $(".tour").click(function () {
        $(this).toggleClass("bg-color").toggleClass("select-color");
        $(this).siblings().removeClass("bg-color").addClass("select-color");
        $(this).parent("div").siblings("div").hide();
        $(this).parent("div").siblings("#tour").show();
    });
    $(".mine_fav").click(function () {
        $(this).addClass("bg-color").removeClass("select-color");
        $(this).siblings().removeClass("bg-color").addClass("select-color");
        $(this).parent("div").siblings("div").hide();
        $(this).parent("div").siblings("#mine_fav").show();
    });
    $(".mine_order").click(function () {
        $(this).addClass("bg-color").removeClass("select-color");
        $(this).siblings().removeClass("bg-color").addClass("select-color");
        $(this).parent("div").siblings("div").hide();
        $(this).parent("div").siblings("#mine_order").show();
    });
    $(".mine_article").click(function () {
        $(this).addClass("bg-color").removeClass("select-color");
        $(this).siblings().removeClass("bg-color").addClass("select-color");
        $(this).parent("div").siblings("div").hide();
        $(this).parent("div").siblings("#mine_article").show();
    });
    $(".mine_profile").click(function () {
        $(this).addClass("bg-color").removeClass("select-color");
        $(this).siblings().removeClass("bg-color").addClass("select-color");
        // $(this).parent("div").siblings("div").hide();
        // $("#mine_profile").css({
        //     display: "flex",
        // });
        $("#tour").hide();
        $("#mine_fav").hide();
        $("#mine_order").hide();
        $("#mine_article").hide();
        $("#mine_profile").show();
    });

    //收藏內分頁
    $(".fav_tour").click(function () {
        // console.log($(this).parent("#mine_fav_bar").siblings("#fav_container").children("#fav_tour"));
        $(this).addClass("colored").removeClass("unselected");
        $(this).siblings().removeClass("colored").addClass("unselected");
        $(this).parent("#mine_fav_bar").siblings("#fav_container").children().hide();
        $(this).parent("#mine_fav_bar").siblings("#fav_container").children("#fav_tour").show();
    });
    $(".fav_article").click(function () {
        $(this).addClass("colored").removeClass("unselected");
        $(this).siblings().removeClass("colored").addClass("unselected");
        $(this).parent("#mine_fav_bar").siblings("#fav_container").children().hide();
        $(this).parent("#mine_fav_bar").siblings("#fav_container").children("#fav_article").show();
    });
    $(".fav_product").click(function () {
        $(this).addClass("colored").removeClass("unselected");
        $(this).siblings().removeClass("colored").addClass("unselected");
        $(this).parent("#mine_fav_bar").siblings("#fav_container").children().hide();
        $(this).parent("#mine_fav_bar").siblings("#fav_container").children("#fav_product").show();
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
