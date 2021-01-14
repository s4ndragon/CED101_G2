<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="shortcut icon" href="./images/index/webIcon.png" type="image/x-icon" />
        <link rel="stylesheet" href="./css/membership.css" />
        <script src="../node_modules/jquery/dist/jquery.js"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/1.20.3/TweenMax.min.js"></script>
        <!-- <script src="./js/membership.js"></script> -->
        <!-- <script src="./js/membership_vue.js"></script> -->
        <title>會員系統</title>
    </head>
    <body>
        @@include('layout/nav.html')
        <div class="banner">
            <h1>會員中心</h1>
            <!-- <h2>歡迎回來</h2> -->
        </div>
        <main id="app">
            <!-- 側邊欄 -->
            <div class="card">
                <div class="card-body">
                    <div class="profile-pic">
                        <img id="MEM_IMG" class="rounded-circle" src="./images/member/new_member.jpg" />
                    </div>
                    <h2 id="MEM_NICKNAME">{{MEM_NICKNAME}}</h2>
                    <h6 id="MEM_ID" class="memId">@{{MEM_ID}}</h6>
                    <!-- <input type="text" class="input-profile" name="profile" value="熱愛程式及茶園的男子"> -->
                    <button class="mine_profile" @click="content = 'mine_profile'">個人資料</button>
                </div>
            </div>
            <input type="file" id="profile_pic_input" name="profile_pic_input" accept="image/*" />
            <!-- 主要內容 -->
            <div id="main_container">
                <!-- 主要內容的選單列 -->
                <div id="sub_menu">
                    <h3 class="tour bg-color" @click="content = 'tour'">揪團管理</h3>
                    <h3 class="mine_fav select-color" @click="content = 'mine_fav'">我的收藏</h3>
                    <h3 class="mine_order select-color" @click="content = 'mine_order'">訂單查詢</h3>
                    <h3 class="mine_article select-color" @click="content = 'mine_article'">我的文章</h3>
                    <h3 class="mine_profile select-color" @click="content = 'mine_profile'">個人資料</h3>
                </div>
                <component :is="content"></component>
            </div>
        </main>
        <!-- 人數燈箱 -->
        <!-- <component :is="lightbox"></component> -->
        <!-- <div class="bgd"  v-if="lightboxAttendency" @click="lightboxAttendency = true"> </div> -->
        <div id="num_attendency" v-if="lightboxAttendency">
            <div class="close" @click="lightboxAttendency = false"></div>
            <div class="num_1 group">
                <div id="num_1_icon" class="icon">
                    <img src="./images/member/new_member.jpg" />
                </div>
                <div id="num_1_id" class="id">s4ndragon</div>
            </div>
            <div class="num_2 group">
                <div id="num_2_icon" class="icon">
                    <img src="./images/member/new_member.jpg" />
                </div>
                <div id="num_2_id" class="id">wan</div>
            </div>
            <div class="num_3 group">
                <div id="num_3_icon" class="icon">
                    <img src="./images/member/new_member.jpg" />
                </div>
                <div id="num_3_id" class="id">Tingting</div>
            </div>
            <div class="num_4 group">
                <div id="num_4_icon" class="icon">
                    <img src="./images/member/new_member.jpg" />
                </div>
                <div id="num_4_id" class="id">guan</div>
            </div>
            <div class="num_5 group">
                <div id="num_5_icon" class="icon">
                    <img src="./images/member/new_member.jpg" />
                </div>
                <div id="num_5_id" class="id">chieh</div>
            </div>
        </div>

        <!-- 刪除燈箱 -->
        <div id="delete_confirm">
            是否確認刪除？
            <div class="btn">
                <input type="button" id="btn_confirm" value="確認" />
                <input type="button" id="btn_cancel" value="取消" />
            </div>
        </div>
        <!-- 取消收藏燈箱 -->
        <div id="cancel_confirm">
            是否確認刪除？
            <div class="btn">
                <input type="button" id="cancel_confirm_btn" value="確認" />
                <input type="button" id="recall_cancel" value="取消" />
            </div>
        </div>
        <!-- 資料暫存區 -->
        <input type="text" name="MEM_NICKNAME" value="<?=$memberRows["MEM_NICKNAME"]?>">
        <input type="text" name="MEM_EMAIL" value="<?=$memberRows["MEM_EMAIL"]?>">
        <input type="text" name="MEM_ID" value="<?=$memberRows["MEM_ID"]?>">

        @@include('layout/login_register.html') @@include('layout/footer.html')
        <!-- <script src="../node_modules/vue/dist/vue.js"></script> -->
        <script src="https://cdn.jsdelivr.net/npm/vue@2.6.12/dist/vue.js"></script>
        <script src="./js/membership_vue.js"></script>
        <!-- <script src="./js/membership.js"></script> -->
    </body>
</html>