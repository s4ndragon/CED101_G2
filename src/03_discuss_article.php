<?php 
try {
	require_once("./phps/connect.php");
    $sql = "select * from my_art where ART_NO = ?";
    // $sql = "select * from my_art a left join art_msg b on a.ART_NO = b.ART_NO where a.ART_NO = ?";
	$arts = $pdo->prepare($sql);
    $arts->bindValue(1, $_GET["ART_NO"]);
    $arts->execute();
    $artsRow = $arts->fetch(PDO::FETCH_ASSOC);
    // echo json_encode($artsRow);
} catch (PDOException $e) {
	echo "錯誤原因 : ", $e->getMessage(), "<br>";
	echo "錯誤行號 : ", $e->getLine(), "<br>";
    // echo "系統錯誤, 請通知系統維護人員<br>";
}
?>

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link rel="shortcut icon" href="./images/index/webIcon.png" type="image/x-icon" />
    <link rel="stylesheet" href="css/discuss.css" />
    <script src="https://cdnjs.cloudflare.com/ajax/libs/vue/2.5.3/vue.js"></script>
    <title>討論區</title>
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
                    <div class="mem_photo"><img class="mem_photo" src="./images/common/mem_photo1.png" alt=""></div>
                    <span>董董</span>
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

            <!-- ====留言的部分===== -->
            <div id="commandall">
                <div class="com_title">文章留言</div>

                <div class="command" v-for="item in comList">
                    <div class="nameall">
                        <div class="mem_photo"><img class="mem_photo" src="./images/common/mem_photo1.png" alt=""></div>
                        <span class="pub_mem_name">翰婷</span>
                    </div>
                    <div class="text_excl">
                        <div class="command_text">
                            <div class="pub_text">{{item.MSG_CONTENT}}</div>
                            <div class="com_pub_time">發表於{{item.MSG_DATE}}</div>
                        </div>
                        <div class="excl">
                            <img class="excl" src="./images/common/852019_exclamation_512x512.png" alt="" @click="showModal2 = true">
                        </div>
                        <!-- overlay -->
                        <div class="overlay" v-if="showModal2" @click="showModal2 = true"></div>
                        <!-- modal -->
                        <div class="modal" v-if="showModal2">
                            <form action="post">
                                <div class="close" @click="showModal2 = false">
                                    <img class="cancel" src="images/vote/cancel.png">
                                </div>
                                <p class="welcome">請選取檢舉理由</p>
                                <div class="reason_container">
                                    <input class="reason" type="radio" name="size" value="惡意中傷">惡意中傷</div>
                                <div class="reason_container">
                                    <input class="reason" type="radio" name="size" value="散布廣告">散布廣告
                                </div>
                                <div class="reason_container">
                                    <input class="reason" type="radio" name="size" value="色情資訊">色情資訊
                                </div>
                                <div class="reason_container">
                                    <input class="reason" type="radio" name="size" value="色情資訊">不雅字眼
                                </div>
                                <button class="go" type="submit">送出</button>
                            </form>
                        </div>
                    </div>
                </div>

                <div class="empty" v-show="comList.length==0">此文章尚無留言，歡迎留言。</ul>
            </div>

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
            <div class="back_discuss_con"><button class="back_discuss"><a href="03_discuss.html">更多文章</a></button></div>

    </main>

    @@include('layout/footer.html')

    <script>
        window.onload = function () {
             $.ajax({
                        url: './phps/getCommand.php', // 要傳送的頁面
                        method: 'POST',               // 使用 POST 方法傳送請求
                        dataType: 'json',             // 回傳資料會是 json 格式
                        data: $('form').serialize(),  // 將表單資料用打包起來送出去
                        success: function(res){       // 成功以後會執行這個方法
                            console.log('good');
                            console.log(res);
                            app.comList = res;
                            console.log(app.comList);
                        },
                        error: function(res){    
                            console.log('not good');
                            console.log(res);
                        },
                    });
                };


            var app = new Vue({
                el: '#app',
                data: {
                    showModal: false,
                    showModal2: false,
                    comList:[],
                    da: new Date(),
                    content:"",
                },
                methods: {
                    // add: function () {
                    //     this.comList.push({
                    //         content: this.content,
                    //     });
                    //     this.content = '';
                    // },
                    
                    // =====日期格式化====
                    dateFormat: function (time) {
                    var date = new Date(time);
                    var year = date.getFullYear();
                    var month = date.getMonth() + 1 < 10 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1;
                    var day = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
                    var hours = date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
                    var minutes = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
                    var seconds = date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();
                    // 拼接
                    return year + "-" + month + "-" + day + " " + hours + ":" + minutes + ":" + seconds;
                },

                },
                mounted() {
                                
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
                                // console.log(app.comList);
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