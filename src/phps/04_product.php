<!DOCTYPE html>
<html lang="zh-TW">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>商品頁</title>
    <link rel="stylesheet" href="../vendors/slick-1.8.1/slick/slick.css">
    <link rel="stylesheet" href="../vendors/slick-1.8.1/slick/slick-theme.css">
    <link rel="stylesheet" href="../css/product.css">
    <script src="../js/vue.min.js"></script>
    <script src="../js/product.js"></script>

</head>

<body>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
    <script src="../vendors/slick-1.8.1/slick/slick.js"></script>
    <!-- <script src="../js/member_login_register"></script> -->

    <nav>
        <!-- logo放置區 -->
        <a href="../index.html">
            <h1 id="logo"><img src="../images/common/logo.png" alt="" /></h1>
        </a>
        <!-- 會員icon放置區 -->
        <a href="../05_membership.html">
            <img class="memicon" src="../images/common/user.png" alt="">
        </a>
        <!-- 購物車icon放置區 -->
        <a href="../04_cart.html">
            <img class="caricon" src="../images/common/cart.png" alt="">
        </a>
        <!-- 揪團去按鈕區 -->
        <a class="go_tour" href="../01_tourCreate.html">
            揪團去
        </a>
        <div class="menu-wrap">
            <input type="checkbox" class="toggler" />
            <div class="hamburger">
                <div></div>
            </div>
            <div class="menu">
                <div>
                    <div>
                        <ul>
                            <li>
                                <a class="underline" href="../01_tour.html"><img class="navicon" src="../images/common/nav_leaf.png" alt="" />茶園揪團</a>
                            </li>
                            <li>
                                <a class="underline" href="../02_vote.html"><img class="navicon" src="../images/common/nav_leaf.png" alt="" />茶園排行</a>
                            </li>
                            <li>
                                <a class="underline" href="../04_shopping.html"><img class="navicon" src="../images/common/nav_leaf.png" alt="" />偵茶商城</a>
                            </li>
                            <li>
                                <a class="underline" href="03_discuss.html"><img class="navicon" src="../images/common/nav_leaf.png" alt="" />找茶討論</a>
                            </li>
                            <li>
                                <a class="underline" href="../06_game.html"><img class="navicon" src="../images/common/nav_leaf.png" alt="" />小遊戲</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </nav>
    <div class="banner">
        <h2 class="banner_t">產品介紹</h2>
    </div>
    <div id='productInfo'>
        <div class="product_info">
            <div class="product_img">
                <img v-bind:src="'../images/shopping/'+product[0].IMG" alt="">
            </div>
            <div class="info">{{product[0].NAME}}</h2>

                <div class="info_content">
                    <div class="price">NT<span>{{product[0].PRICE}}</span></div>
                    <div class="num">數量:
                        <input type="number" v-model="itemNum" max='99' min='0' id="productNum">
                    </div><br><br>
                    <img class='addFavorite' src="../images/common/heart.png" alt="">
                    <input type="button" value="加入購物車" class="add_cart" id="add_cart">
                    <input type="hidden" name="" :value="value" class='productInfo'>
                    <input type="button" value="直接購買" id="buy">
                </div>
            </div>
        </div>
        <div class="product_detail">
            <ul id="selected">
                <li class="displayBtn selected" id='detail' @click="switchC($event)">商品特色</li>
                <li class="displayBtn" id='feature' @click="switchC($event)">商品細節</li>
            </ul>
            <component :is="content" :product="product"></component>
        </div>
        <div class="recommend">
            <h2 class="partTitle">推薦商品</h2>
            <div class="recommend_products" id="recommends">
            </div>
        </div>
        <div class="back">
            <button><a href="../04_shopping.html">回商城</a></button>
        </div>
    </div>
    <footer>
        <h5>®偵茶者TEA SEARCHER CORPORATION. ALL RIGHTS RESERVED2020</h5>
    </footer>



    <script>
        var storage = sessionStorage;
        // window.addEventListener('load', getproductInfo)
        getproductInfo();

        function getproductInfo() {
            var xhr = new XMLHttpRequest();
            xhr.onload = function() {
                if (xhr.status == 200) {
                    productInfo.product = JSON.parse(xhr.responseText);
                } else {
                    alert(xhr.status);
                }
            }
            var url = `./getproductInfo.php?psn=${<?= $_GET['psn'] ?>}`;
            xhr.open("Get", url, true);
            xhr.send(null);
        };

        Vue.component('detail', {
            props: ['details', "product"],
            template: `
                    <div class="content">
                        <img v-for='jpg in details' v-bind:src="'../images/shopping/'+jpg" alt="">
                    </div>
            `,
            computed: {
                details() {
                    details = this.product[0].FEATURES.split('|');
                    return details;
                }
            },
        });
        Vue.component('feature', {
            props: ["product"],
            template: `
            <div class="content">
                <table id='feature'>
                    <tr v-for='text in feature'>
                        <td v-for='td in gettd(text)' v-html='td'></td>
                   </tr>
                </table>
            </div>
        </div>
            `,
            computed: {
                feature() {
                    feature = this.product[0].DETAIL.split('|');
                    return feature[0].split('\n');
                },

            },
            methods: {
                gettd(text) {
                    text = text.split('：');
                    return text;
                },

            },
        });
        // Vue.config.devtools = true;
        productInfo = new Vue({
            el: '#productInfo',
            data: {
                product: [{
                    DETAIL: "",
                    FEATURES: "1.jpg",
                    IMG: "1.jpg",
                    INFO: "",
                    NAME: "",
                    ONSALE: "",
                    PRICE: "",
                    PSN: "",
                    SOLD: "",
                    TYPE: "",
                }],
                content: 'detail',
                itemNum: 1,
            },
            methods: {
                switchC($event) {
                    let displayBtn = document.querySelectorAll('li.displayBtn');
                    for (let i = 0; i < displayBtn.length; i++) {
                        displayBtn[i].setAttribute('class', 'displayBtn');
                    };
                    $event.target.setAttribute('class', 'displayBtn selected');
                    this.content = $event.target.id;
                }
            },
            computed: {
                value() {
                    let value = '';
                    for (let i in this.product[0]) {
                        value += this.product[0][i] + '|';
                    }
                    return value;
                }
            }
        });
    </script>
</body>

</html>