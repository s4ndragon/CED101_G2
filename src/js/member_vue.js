//抓抓抓
let memRows;
//============去server端拿資料
let xhr = new XMLHttpRequest();
xhr.onload = function () {
    app.memRows = JSON.parse(xhr.responseText);
    console.log(app.memRows);
};
xhr.open("get", "./phps/member.php", true);
xhr.send(null);

//========== content ==========//
Vue.component("tour", {
    mounted() {
        $(".arrow").click(function () {
            $(this).toggleClass("down").toggleClass("up");
            $(this).parent().toggleClass("extend");
            $(this).siblings(".tour_date").toggle();
            $(this).siblings(".tour_status_bar").toggle().css("width", "80%");
            $(this).siblings(".tour_status_bar").children().toggle();
            $(this).siblings(".tour_attendency").toggle().css("width", "80%");
        });
    },
    data() {
        return {
            // mine_tour: "",
            memTours: "",
        };
    },
    methods: {
        get_mine_tour: async function () {
            const res = await fetch("./phps/get_mine_tour.php", {
                method: "POST",
                mode: "same-origin",
                credentials: "same-origin",
                headers: {
                    "Content-Type": "application/json",
                },
            }).then(function (data) {
                return data.json();
            });
            // console.log(res);
            this.memTours = res;
        },
        cancel: async function (TOUR_ID) {
            console.log(TOUR_ID);
            const res = await fetch("./phps/cancel_tour.php", {
                method: "POST",
                mode: "same-origin",
                credentials: "same-origin",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    TOUR_ID: TOUR_ID,
                }),
            });
            //重新撈取一次細項列表
            this.get_mine_tour(this.TOUR_ID);
        },
        quit: async function (TOUR_ID) {
            // console.log(TOUR_ID);
            const res = await fetch("./phps/quit_tour.php", {
                method: "POST",
                mode: "same-origin",
                credentials: "same-origin",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    TOUR_ID: TOUR_ID,
                }),
            });
            //重新撈取一次細項列表
            this.get_mine_tour(this.TOUR_ID);
        },
    },
});

Vue.component("mine_fav", {
    template: `
                
                `,
    mounted() {
        //分頁切換
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
            } else {
                this.title = "加入收藏";
                this.src = "./images/common/like.png";
            }
        }
    },
});

Vue.component("mine_order", {
    template: `
                `,
});

Vue.component("mine_article", {
    template: `
                
                `,
});

Vue.component("mine_profile", {
    template: ``,
    mounted() {
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
    },
});
// export default {
//     name: "imgError",
//     data() {
//         return {
//             defaultImg: 'this.src="' + require("images/common/user.png") + '"', //默认图地址
//         };
//     },
// };
//========== lightbox ==========//

var app = new Vue({
    el: "#app",
    data: {
        memRows: [],
        memTours: "",
        lightboxAttendency: false,
    },
});

//==========  sub menu分頁  ==========//
$(".tour").click(function () {
    $(this).toggleClass("bg-color").toggleClass("select-color");
    $(this).siblings().removeClass("bg-color").addClass("select-color");
});
$(".mine_fav").click(function () {
    $(this).addClass("bg-color").removeClass("select-color");
    $(this).siblings().removeClass("bg-color").addClass("select-color");
});
$(".mine_order").click(function () {
    $(this).addClass("bg-color").removeClass("select-color");
    $(this).siblings().removeClass("bg-color").addClass("select-color");
});
$(".mine_article").click(function () {
    $(this).addClass("bg-color").removeClass("select-color");
    $(this).siblings().removeClass("bg-color").addClass("select-color");
});
$(".mine_profile").click(function () {
    $(this).addClass("bg-color").removeClass("select-color");
    $(this).siblings().removeClass("bg-color").addClass("select-color");
    $(this).parent().parent().siblings("#main_container").children("#sub_menu").children("h3").removeClass("bg-color");
});
