//抓抓抓
let memRows;
//============去server端拿資料
let xhr = new XMLHttpRequest();
xhr.onload = function () {
    app.memRows = JSON.parse(xhr.responseText);
    // console.log(app.memRows);
};
xhr.open("get", "./phps/member.php", true);
xhr.send(null);
//========== content ==========//
Vue.component("tour", {
    template: `
                <div id="tour">
                <div id="mine_tour">
                    <h3>我主揪</h3>
                    <div id="mine_on_going">
                        <h4>揪團中的團</h4> 
                        <div class="tour_detail" v-for="memTour in memTours">
                            <div class="tour_title">{{memTour.TOUR_TITLE}}</div>
                            <div class="arrow down"></div>
                            <div class="tour_date">{{memTour.TOUR_SETOFFTIME}}</div>
                            <div class="tour_attendency">人數：<span class="attend attend_1">{{memTour.NUM_OF_PARTICIPANTS}}</span>／<span class="require require_1">{{memTour.TOUR_PEOPLE}}</span></div>
                            <div class="tour_status_bar">
                                <div class="tour_status">未成團</div>
                                <div class="tour_join" @click="cancel(memTour.TOUR_ID, memTour.TOUR_STATUS)">取消</div>
                                <div class="tour_check">
                                    <a v-bind:href="'https://tibamef2e.com/ced101/project/g2/02_tour_more.html?TOUR_ID=' + memTour.tour_id">
                                    查看
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div id="mine_out_of_date">
                        <h4>過往的揪團</h4>
                        <div class="tour_detail outdated" v-for="mineTourOut in mineTourOuts">
                            <div class="tour_title">{{mineTourOut.TOUR_TITLE}}</div>
                            <div class="arrow down"></div>
                            <div class="tour_date">{{mineTourOut.TOUR_SETOFFTIME}}</div>
                            <div class="tour_attendency">人數：<span class="attend attend_1">{{mineTourOut.NUM_OF_PARTICIPANTS}}</span>／<span class="require require_1">{{mineTourOut.TOUR_PEOPLE}}</span></div>
                            <div class="tour_status_bar">
                                <div class="tour_status">已過期</div>
                                <div class="tour_join"></div>
                                <div class="tour_check">
                                    <a :href="'https://tibamef2e.com/ced101/project/g2/02_tour_more.html?TOUR_ID=' + mineTourOut.tour_id">
                                    查看
                                    </a>
                                </div>
                                
                            </div>
                        </div>
                    </div>
                    <div id="mine_cancel">
                        <h4>取消的揪團</h4>
                        <div class="tour_detail outdated" v-for="mineTourCancel in mineTourCancels">
                            <div class="tour_title">{{mineTourCancel.TOUR_TITLE}}</div>
                            <div class="arrow down"></div>
                            <div class="tour_date">{{mineTourCancel.TOUR_SETOFFTIME}}</div>
                            <div class="tour_attendency" @click="lightboxAttendency = true">人數：<span class="attend attend_1">{{mineTourCancel.NUM_OF_PARTICIPANTS}}</span>／<span class="require require_1">{{mineTourCancel.TOUR_PEOPLE}}</span></div>
                            <div class="tour_status_bar">
                                <div class="tour_status">已取消</div>
                                <div class="tour_join"></div>
                                <div class="tour_check">
                                    <a :href="'https://tibamef2e.com/ced101/project/g2/02_tour_more.html?TOUR_ID=' + mineTourCancel.tour_no">
                                    查看
                                    </a>
                                </div>
                                
                            </div>
                        </div>
                    </div>
                </div>
                <div id="i_join">
                    <h3>我參加</h3>
                    <div id="join_on_going">
                        <h4>揪團中的團</h4>
                        <div class="tour_detail" v-for="joinTour in joinTours">
                            <div class="tour_title">{{joinTour.TOUR_TITLE}}</div>
                            <div class="arrow down"></div>
                            <div class="tour_date">{{joinTour.TOUR_SETOFFTIME}}</div>
                            <div class="tour_attendency">人數：<span class="attend attend_1">{{joinTour.NUM_OF_PARTICIPANTS}}</span>／<span class="require require_1">{{joinTour.TOUR_PEOPLE}}</span></div>
                            <div class="tour_status_bar">
                                <div class="tour_status">未成團</div>
                                <div class="tour_join" @click="quit(joinTour.TOUR_ID, joinTour.MEM_NO)">退出</div>
                                <div class="tour_check">
                                    <a :href="'https://tibamef2e.com/ced101/project/g2/02_tour_more.html?TOUR_ID=' + joinTour.tour_no">
                                    查看</a>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div id="join_out_of_date">
                        <h4>過往的揪團</h4>
                        <div class="tour_detail outdated" v-for="joinTourOut in joinTourOuts">
                            <div class="tour_title">{{joinTourOut.TOUR_TITLE}}</div>
                            <div class="arrow down"></div>
                            <div class="tour_date">{{joinTourOut.TOUR_SETOFFTIME}}</div>
                            <div class="tour_attendency">人數：<span class="attend attend_1">{{joinTourOut.NUM_OF_PARTICIPANTS}}</span>／<span class="require require_1">{{joinTourOut.TOUR_PEOPLE}}</span></div>
                            <div class="tour_status_bar">
                                <div class="tour_status">已過期</div>
                                <div class="tour_join"></div>
                                <div class="tour_check">
                                <a :href="'https://tibamef2e.com/ced101/project/g2/02_tour_more.html?TOUR_ID=' + joinTourOut.tour_no">
                                查看</a>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div id="join_cancel">
                        <h4>取消的揪團</h4>
                        <div class="tour_detail outdated" v-for="joinTourCancel in joinTourCancels">
                            <div class="tour_title">{{joinTourCancel.TOUR_TITLE}}</div>
                            <div class="arrow down"></div>
                            <div class="tour_date">{{joinTourCancel.TOUR_SETOFFTIME}}</div>
                            <div class="tour_attendency">人數：<span class="attend attend_1">{{joinTourCancel.NUM_OF_PARTICIPANTS}}</span>／<span class="require require_1">{{joinTourCancel.TOUR_PEOPLE}}</span></div>
                            <div class="tour_status_bar">
                                <div class="tour_status">已取消</div>
                                <div class="tour_join"></div>
                                <div class="tour_check">
                                <a :href="'https://tibamef2e.com/ced101/project/g2/02_tour_more.html?TOUR_ID=' + joinTourCancel.tour_no">
                                查看</a>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div id="join_quit">
                        <h4>退出的揪團</h4>
                        <div class="tour_detail outdated" v-for="joinTourQuit in joinTourQuits">
                            <div class="tour_title">{{joinTourQuit.TOUR_TITLE}}</div>
                            <div class="arrow down"></div>
                            <div class="tour_date">{{joinTourQuit.TOUR_SETOFFTIME}}</div>
                            <div class="tour_attendency">人數：<span class="attend attend_1">{{joinTourQuit.NUM_OF_PARTICIPANTS}}</span>／<span class="require require_1">{{joinTourQuit.TOUR_PEOPLE}}</span></div>
                            <div class="tour_status_bar">
                                <div class="tour_status">已退出</div>
                                <div class="tour_join"></div>
                                <div class="tour_check">
                                <a :href="'https://tibamef2e.com/ced101/project/g2/02_tour_more.html?TOUR_ID=' + joinTourQuit.tour_no">
                                    查看
                                </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- 取消揪團燈箱 -->
                <div v-if="cancel_lightbox" class="delete_confirm">
                    是否確認取消？
                    <div class="btn">
                        <input type="button" @click="cancel(TOUR_ID, TOUR_STATUS)" id="btn_confirm" value="確認" />
                        <input type="button"  @click="cancel_lightbox = false" id="btn_cancel" value="取消" />
                    </div>
                </div>
                <!-- 退出揪團燈箱 -->
                <div v-if="quit_lightbox" class="cancel_confirm">
                    是否確認退出？
                    <div class="btn">
                        <input type="button" @click="quit(TOUR_ID, TOUR_STATUS, MEM_NO)" id="cancel_confirm_btn" value="確認" />
                        <input type="button" @click="quit_lightbox = false" id="recall_cancel" value="取消" />
                    </div>
                </div>
            </div>
            </div>
            
                `,
    data() {
        return {
            memTours: "",
            mineTourOuts: "",
            mineTourCancels: "",
            joinTours: "",
            joinTourOuts: "",
            joinTourCancels: "",
            joinTourQuits: "",
            cancel_lightbox: false,
            quit_lightbox: false,
        };
    },
    methods: {
        // 取得我主揪 揪團中的團
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
        // 取得我主揪 過往的揪團
        get_mine_past: async function () {
            const res = await fetch("./phps/get_mine_past.php", {
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
            this.mineTourOuts = res;
        },

        // 取得我主揪 取消的揪團
        get_mine_cancel: async function () {
            const res = await fetch("./phps/get_mine_cancel.php", {
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
            this.mineTourCancels = res;
        },

        // 取得我參加 揪團中的團
        get_mine_join: async function () {
            const res = await fetch("./phps/get_mine_join.php", {
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
            this.joinTours = res;
        },
        // 取得我參加 過往的揪團
        get_join_past: async function () {
            const res = await fetch("./phps/get_join_past.php", {
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
            this.joinTourOuts = res;
        },
        // 取得我參加 取消的揪團
        get_join_cancel: async function () {
            const res = await fetch("./phps/get_join_cancel.php", {
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
            this.joinTourCancels = res;
        },
        // 取得我參加 退出的揪團
        get_join_quit: async function () {
            const res = await fetch("./phps/get_join_quit.php", {
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
            this.joinTourQuits = res;
        },

        cancel: async function (TOUR_ID, TOUR_STATUS) {
            const res = await fetch("./phps/cancel_tour.php", {
                method: "POST",
                mode: "same-origin",
                credentials: "same-origin",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    TOUR_ID: TOUR_ID,
                    TOUR_STATUS: TOUR_STATUS,
                }),
            });
            this.cancel_lightbox = true;
            //重新撈取一次細項列表
            this.get_mine_tour();
        },
        quit: async function (TOUR_ID, MEM_NO) {
            const res = await fetch("./phps/quit_tour.php", {
                method: "POST",
                mode: "same-origin",
                credentials: "same-origin",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    TOUR_ID: TOUR_ID,
                    MEM_NO: MEM_NO,
                }),
            });
            this.quit_lightbox = true;
            //重新撈取一次細項列表
            this.get_mine_join();
        },
    },
    mounted() {
        this.get_mine_tour();
        this.get_mine_past();
        this.get_mine_cancel();

        this.get_mine_join();
        this.get_join_past();
        this.get_join_cancel();
        this.get_join_quit();

        $(".arrow").click(function () {
            // console.log('hihi')
            $(this).toggleClass("down").toggleClass("up");
            $(this).parent().toggleClass("extend");
            $(this).siblings(".tour_date").toggle();
            $(this).siblings(".tour_status_bar").toggle().css("width", "80%");
            $(this).siblings(".tour_status_bar").children().toggle();
            $(this).siblings(".tour_attendency").toggle().css("width", "80%");
        });
    },
});

Vue.component("mine_fav", {
    template: `
                <!-- 收藏管理 -->
                <div id="mine_fav">
                    <!-- 收藏管理選單列 -->
                    <div id="mine_fav_bar">
                        <h4 class="fav_tour colored">揪團</h4>
                        <h4 class="fav_article unselected">文章</h4>
                        <h4 class="fav_product unselected">商品</h4>
                    </div>
                    <!-- 收藏管理主內容 -->
                    <div id="fav_container">
                        <!-- 收藏的揪團 -->
                        <div id="fav_tour">
                            <div id="tour_list" class="fav_content">
                                <div class="blog_container tour_blog" v-for="favTour in favTours">
                                    <img class="banner_img" :src="favTour.TOUR_IMG">
                                    <div class="heart">
                                        <img class="like" src="./images/common/like.png" title="加入收藏" alt="">
                                    </div>
                                    <div class="blog_content_container">
                                        <div class="blog_title">
                                            <a v-bind:href="'https://tibamef2e.com/ced101/project/g2/02_tour_more.html?TOUR_ID=' + favTour.tour_no">
                                            {{favTour.TOUR_TITLE}}
                                            </a>
                                        </div>
                                        <div class="blog_content">{{favTour.TOUR_INFRO}}</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <!-- 收藏的文章 -->
                        <div id="fav_article">
                            <div id="article_list" class="fav_content">
                                <div class="blog_container article_blog" v-for="favArt in favArts">
                                    <img class="banner_img" :src="favArt.art_img">
                                    <div class="heart">
                                        <img class="like" src="./images/common/like.png" title="加入收藏" alt="">
                                    </div>
                                    <div class="blog_content_container">
                                        <div class="blog_title">
                                            <a v-bind:href="'https://tibamef2e.com/ced101/project/g2/03_discuss_article.php?ART_NO=' + favArt.art_no">
                                                {{favArt.art_title}}
                                            </a>
                                        </div>
                                        <div class="blog_content">{{favArt.art_content}}</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <!-- 收藏的商品 -->
                        <div id="fav_product">
                            <div id="product_list" class="fav_content">
                                <div class="blog_container product_blog" v-for="favProd in favProds">
                                    <img class="banner_img" v-bind:src="'./images/shopping/' + favProd.img">
                                    <div class="heart">
                                        <img class="like" src="./images/common/like.png" title="加入收藏" alt="">
                                    </div>
                                    <div class="blog_content_container">
                                        <div class="blog_title">
                                            <a v-bind:href="'https://tibamef2e.com/ced101/project/g2/04_product.html?psn=' + favProd.psn">
                                                {{favProd.name}}
                                            </a>
                                        </div>
                                        <div class="blog_content">{{favProd.info}}</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                `,
    data() {
        return {
            favTours: "",
            favArts: "",
            favProds: "",
        };
    },
    methods: {
        get_fav_tour: async function () {
            const fav_tour = await fetch("./phps/get_fav_tour.php", {
                method: "POST",
                mode: "same-origin",
                credentials: "same-origin",
                headers: {
                    "Content-Type": "application/json",
                },
            }).then(function (data) {
                return data.json();
            });
            // console.log(fav_tour);
            this.favTours = fav_tour;
        },
        get_fav_art: async function () {
            const fav_art = await fetch("./phps/get_fav_art.php", {
                method: "POST",
                mode: "same-origin",
                credentials: "same-origin",
                headers: {
                    "Content-Type": "application/json",
                },
            }).then(function (data) {
                return data.json();
            });
            // console.log(fav_art);
            this.favArts = fav_art;
        },
        get_fav_prod: async function () {
            const fav_prod = await fetch("./phps/get_fav_prod.php", {
                method: "POST",
                mode: "same-origin",
                credentials: "same-origin",
                headers: {
                    "Content-Type": "application/json",
                },
            }).then(function (data) {
                return data.json();
            });
            // console.log(fav_prod);
            this.favProds = fav_prod;
        },
    },
    mounted() {
        this.get_fav_tour();
        this.get_fav_art();
        this.get_fav_prod();
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
                <div id="mine_order">
                                <div id="list">
                                    <div class="order">
                                        <h5 class="order_no">訂單編號</h5>
                                        <h5 class="order_status">訂單狀態</h5>
                                        <h5 class="order_payment">支付方式</h5>
                                        <h5 class="order_total">訂單金額</h5>
                                        <h5 class="order_date">下單時間</h5>
                                    </div> 
                                    <div class="order list_title" v-for="ordList in ordLists">
                                        <h5 class="order_no">{{ordList.ORDERS_NO}}</h5>
                                        <h5 class="order_status">{{ordList.DEL_STATE}}</h5>
                                        <h5 class="order_payment">{{ordList.PAY}}</h5>
                                        <h5 class="order_total">NT {{ordList.TOTAL}}</h5>
                                        <h5 class="order_date">{{ordList.ORD_DATE}}</h5>
                                    </div>                                 
                                </div>
                            </div>
                `,
    data() {
        return {
            ordLists: "",
        };
    },
    methods: {
        get_ord_list: async function () {
            const order_list = await fetch("./phps/get_ord_list.php", {
                method: "POST",
                mode: "same-origin",
                credentials: "same-origin",
                headers: {
                    "Content-Type": "application/json",
                },
            }).then(function (data) {
                return data.json();
            });
            // console.log(order_list);
            this.ordLists = order_list;
        },
    },
    mounted() {
        this.get_ord_list();
    },
});

Vue.component("mine_article", {
    template: `
                <div id="mine_article">
                                <div class="article_brief" id="article_brief" v-for = "mineArt in mineArts">
                                    <div class="article_detail">
                                        <div class="article_title">{{mineArt.ART_TITLE}}</div>
                                        <div class="article_date">{{mineArt.ART_DATE}}</div>
                                        <div class="article_status_bar">
                                            <!-- <div class="article_status">分享</div> -->
                                            <div class="article_join">查看</div>
                                            <div class="article_check">刪除</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                `,
    data() {
        return {
            mineArts: "",
        };
    },
    methods: {
        get_mine_art: async function () {
            const mine_art = await fetch("./phps/get_mine_art.php", {
                method: "POST",
                mode: "same-origin",
                credentials: "same-origin",
                headers: {
                    "Content-Type": "application/json",
                },
            }).then(function (data) {
                return data.json();
            });
            // console.log(mine_art);
            this.mineArts = mine_art;
        },
    },
    mounted() {
        this.get_mine_art();
    },
});

Vue.component("mine_profile", {
    template: `
                <div id="mine_profile">
                    <form action="" id="profile" method="POST">
                                    <div class="field-wrap">
                                        <label for="MEM_NICKNAME">暱稱</label>
                                        <input type="text" name="MEM_NICKNAME" class="my_name">
                                    </div>
                                    <div class="field-wrap">
                                        <label for="MEM_EMAIL">電子信箱</label>
                                        <input type="email" name="MEM_EMAIL" class="email">
                                    </div>
                                    <div class="field-wrap">
                                        <label for="MEM_ID">帳號</label>
                                        <input type="text" name="MEM_ID" class="my_id">
                                    </div>
                                    <div class="field-wrap">
                                        <label for="MEM_PW">舊密碼</label>
                                        <input type="password" name="MEM_PW" class="pass_password" />
                                    </div>
                                    <div class="field-wrap">
                                        <label for="new_password">新密碼</label>
                                        <input type="password" name="new_password" class="new_password" />
                                    </div>
                                    <div class="field-wrap">
                                        <label for="confirm_new_password">確認新密碼</label>
                                        <input type="text" name="confirm_new_pw" class="confirm_new_pw" />
                                    </div>
                                    <div class="btn_sent">
                                        <button type="submit" class="button"/>送出</button>
                                    </div>
                                </form>
                            </div>
                `,
    data() {
        return {
            mineInfos: "",
        };
    },
    methods: {
        get_mine_info: async function () {
            const mine_info = await fetch("./phps/get_mine_info.php", {
                method: "POST",
                mode: "same-origin",
                credentials: "same-origin",
                headers: {
                    "Content-Type": "application/json",
                },
            }).then(function (data) {
                return data.json();
            });
            console.log(mine_info);
            this.mineInfos = mine_info;
        },
    },
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

var app = new Vue({
    el: "#app",
    data: {
        memRows: [],
        content: "tour",
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
    // $(this).parent().parent().siblings("#main_container").children("#sub_menu").children("h3").removeClass("bg-color");
});
$("#mine_profile_btn").click(function () {
    $("#sub_menu").children("h3").removeClass("bg-color").addClass("select-color");
});
