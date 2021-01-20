<?php 
try {
	require_once("./phps/connect.php");
    $sql = "select * from my_art a left join member b on a.MEM_NO = b.MEM_NO where a.ART_NO = ?";
	$arts = $pdo->prepare($sql);
    $arts->bindValue(1, $_GET["ART_NO"]);
    $arts->execute();
    $artsRow = $arts->fetch(PDO::FETCH_ASSOC);
} catch (PDOException $e) {
	echo "錯誤原因 : ", $e->getMessage(), "<br>";
	echo "錯誤行號 : ", $e->getLine(), "<br>";
    // echo "系統錯誤, 請通知系統維護人員<br>";
}
?>

<!DOCTYPE html>
<html lang="zh-TW">
<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link rel="shortcut icon" href="./images/index/webIcon.png" type="image/x-icon" />
    <link rel="stylesheet" href="css/discuss.css" />
    <title>找茶討論</title>
    <!-- 代換預覽 -->
    <meta property="og:url" content="https://www.your-domain.com/your-page.html" />
    <meta property="og:type" content="website" />
    <meta property="og:title" content="偵茶者-<?=$artsRow["ART_TITLE"]?>" />
    <meta property="og:description" content="<?=$artsRow["ART_CONTENT"]?>" />
    <meta property="og:image" content="https://www.your-domain.com/path/<?=$artsRow["ART_IMG"]?>"/>
</head>

<body>
    @@include('layout/nav.html')
     <main id="app">
        <div class="banner">
            <div>
                <h1>找茶討論</h1>
            </div>
        </div>
        <div class="allthings">
            <button class="addtour">
                <a href="03_discuss_pub.html">我要發文</a>
                <img class="dis_hand_pub" src="./images/discuss/hand_button.png" alt="">
            </button>
            <div id="art_information">
                <div class="nameall2">
                    <div class="mem_photo"><img class="mem_photo" src="<?=$artsRow["MEM_IMG"]?>" alt=""></div>
                    <span><?=$artsRow["MEM_NICNAME"]?></span>
                </div>
                <div class="text_excl">
                    <h2>【<?=$artsRow["CAT"]?>】<?=$artsRow["ART_TITLE"]?></h2>
                </div>
            </div>

            <div id="article_image">
                <img src="<?=$artsRow["ART_IMG"]?>" alt="">
            </div>
            <div id="article_text">
                <?=$artsRow["ART_CONTENT"]?>
            </div>

            <!-- 留言 -->
            <div id="commandall">
                <div class="com_title">文章留言</div>
                <!-- 一則留言開始 -->
                <div class="command" v-for="item in comList">
                    <div class="nameall">
                        <div class="mem_photo"><img class="mem_photo" :src="item.MEM_IMG" alt=""></div>
                        <span class="pub_mem_name">{{item.MEM_NICNAME}}</span>
                    </div>
                    <div class="text_excl">
                        <div class="command_text">
                            <div class="pub_text">{{item.MSG_CONTENT}}</div>
                            <div class="com_pub_time">發表於{{item.MSG_DATE}}</div>
                        </div>
                        <!-- 檢舉 -->
                        <div class="excl">
                            <img class="excl" v-show="item.MEM_NO!=memRows.MEM_NO" src="./images/common/852019_exclamation_512x512.png" alt="" @click="showBox(item.MSG_NO)">
                        </div>
                    </div>                   
                </div>
                <div class="empty" v-show="comList.length==0">此文章尚無留言，歡迎留言。</ul>
            </div>

            <!-- 檢舉燈箱 -->
                <art-reg :msgno="msgno"></art-reg>

            <form method="post">
                <div class="input_container">
                    <h2>新增留言</h2>
                    <div class="create_command_container" >
                        <textarea class="create_command" name="command" v-model='content'></textarea>
                        <div class="com_btn_countainer">
                            <button class="inner_btn" type="submit">
                                送出
                            </button>
                        </div>
                    </div>
                    <!-- 傳文章的編號 -->
                    <input type="hidden" name="artNo" value="<?=$artsRow["ART_NO"]?>">
                </div>
            </form>
            <div class="back_discuss_con">
                <button class="back_discuss">
                    <a href="03_discuss.html">更多文章</a>
                </button>
            </div>

    </main>

    @@include('layout/footer.html')
     <!-- vue  -->
    <script src="./js/vue.js"></script>
    <script>
        Vue.component('art-reg', {
            props: ['msgno'],
            template: ` <div>
                        <div class="overlay" style="display: none;">
                            <div class="modal">
                                <form method="post" >
                                    <div class="close" @click="closeBox()">
                                        <img class="cancel" src="./images/vote/cancel.png">
                                    </div>
                                    <p class="welcome">請選取檢舉理由</p>
                                    <div class="reason_container">
                                        <input class="reason" type="radio" name="size" id="a" value="惡意中傷">
                                        <label for="a">惡意中傷</label>
                                    </div>
                                    <div class="reason_container">
                                        <input class="reason" type="radio" name="size" id="b" value="散布廣告">
                                        <label for="b">散布廣告</label>
                                    </div>
                                    <div class="reason_container">
                                        <input class="reason" type="radio" name="size" id="c" value="色情資訊">
                                        <label for="c">色情資訊</label>
                                    </div>
                                    <div class="reason_container">
                                        <input class="reason" type="radio" name="size" id="d" value="不雅字眼">
                                        <label for="d">不雅字眼</label>
                                    </div>
                                    <button class="go" type="button" @click="send_data">送出</button>
                                    <input type="hidden" name="msg_reg" :value="msgno">
                                </form>
                            </div>
                        </div>
                        <div class="overlay2" style="display: none;" >
                            <div class="modal">
                                <form method="post" >
                                    <p class="welcome">檢舉成功！</p>
                                    <button class="go" type="button" @click="close">確認</button>
                                </form>
                            </div>
                         </div></div>
                         `,
            methods: {
                closeBox: function () {
                    let lightbox = document.querySelectorAll('.overlay')[0];
                    lightbox.style.display = 'none';
                },
                check_radio() {

                },
                send_data() {
                    $.ajax({
                        url: './phps/addCommandReg.php', // 要傳送的頁面
                        method: 'POST',               // 使用 POST 方法傳送請求
                        dataType: 'text',             // 回傳資料會是 json 格式
                        data: $('form').serialize(),  // 將表單資料用打包起來送出去
                        success: function (res) {       // 成功以後會執行這個方法
                            console.log('good');
                            console.log(res);
                            let lightbox = document.querySelectorAll('.overlay')[0];
                            lightbox.style.display = 'none';
                            let lightbox2 = document.querySelectorAll('.overlay2')[0];
                            lightbox2.style.display = '';
                        },
                        error: function (res) {
                            console.log('not good');
                            console.log(res);
                        },
                    });
                },
                                        close() {
                            let lightbox2 = document.querySelectorAll('.overlay2')[0];
                            lightbox2.style.display = 'none';
                        },
            },
        });



            var app = new Vue({
                el: '#app',
                data: {
                    comList:[],
                    content:"",
                    msgno: "",
                    memRows:[],
                },
                methods: {
                showBox: function (MSG_NO) {
                    let lightbox = document.querySelectorAll('.overlay')[0];
                    lightbox.style.display = '';
                    this.msgno = MSG_NO;
                },
                },

                beforeCreate() {
                        $.ajax({
                        url: './phps/getCommand.php', // 要傳送的頁面
                        method: 'POST',               // 使用 POST 方法傳送請求
                        dataType: 'json',             // 回傳資料會是 json 格式
                        data: $('form').serialize(),  // 將表單資料用打包起來送出去
                        success: function(res){       // 成功以後會執行這個方法
                            console.log('good');
                            console.log(res);
                            app.comList = res;
                        },
                        error: function(res){    
                            console.log('not good');
                            console.log(res);
                        },
                    });
                },
                mounted() {
                // 抓會員資料
                let memRows;
                let xhr2 = new XMLHttpRequest();
                xhr2.onload = function () {
                    app.memRows = JSON.parse(xhr2.responseText);
                    console.log(app.memRows);
                };
                xhr2.open("get", "./phps/member.php", true);
                xhr2.send(null);
                                
                    $('form').on('submit', function(){
                        $.ajax({
                            url: './phps/addCommand.php', // 要傳送的頁面
                            method: 'POST',               // 使用 POST 方法傳送請求
                            dataType: 'json',             // 回傳資料會是 json 格式
                            data: $('form').serialize(),  // 將表單資料用打包起來送出去
                            success: function(res){       // 成功以後會執行這個方法
                                console.log('good');
                                console.log(res);
                                app.comList = res;
                                app.content = "";
                            },
                            error: function(res){    
                                console.log('not good');
                                console.log(res);
                            },
                        });
                        return false;  // 阻止瀏覽器跳轉到 send.php，因為已經用 ajax 送出去了
                    });
                },
            });

            
    
    </script>
</body>

</html>