//========== content ==========//
Vue.component("tour", {
    template: `
    <div id="tour">
    <div id="mine_tour">
        <h3>我主揪</h3>
        <div id="mine_on_going">
            <h4>揪團中的團</h4>
            <div class="tour_detail">
                <div class="tour_title">跨年茶園之旅</div>
                <div class="tour_date">2020/12/31</div>
                <div class="tour_attendency" @click="lightboxAttendency = true">人數：<span class="attend attend_1">15</span>／<span class="require require_1">30</span></div>
                <div class="tour_status_bar">
                    <div class="tour_status">未成團</div>
                    <div class="tour_join">取消</div>
                    <div class="tour_check">
                        <a href="">查看</a>
                    </div>
                    <div class="arrow down"></div>
                </div>
            </div>
            <div class="tour_detail">
                <div class="tour_title">12月例行揪團</div>
                <div class="arrow down"></div>
                <div class="tour_date">2020/12/20</div>
                <div class="tour_attendency" @click="lightboxAttendency = true">人數：<span class="attend attend_1">10</span>／<span class="require require_1">10</span></div>
                <div class="tour_status_bar">
                    <div class="tour_status">已成團</div>
                    <div class="tour_join">取消</div>
                    <div class="tour_check">查看</div>
                    <!-- <div class="arrow down"></div> -->
                </div>
            </div>
        </div>
        <div id="mine_out_of_date">
            <h4>過往的揪團</h4>
            <div class="tour_detail outdated">
                <div class="tour_title">11月例行揪團</div>
                <div class="tour_date">2020/11/20</div>
                <div class="tour_attendency" @click="lightboxAttendency = true">人數：<span class="attend attend_1">10</span>／<span class="require require_1">10</span></div>
                <div class="tour_status_bar">
                    <div class="tour_status">已過期</div>
                    <div class="tour_join"></div>
                    <div class="tour_check">查看</div>
                    <div class="arrow down"></div>
                </div>
            </div>
        </div>
        <div id="mine_cancel">
            <h4>取消的揪團</h4>
            <div class="tour_detail outdated">
                <div class="tour_title">10月例行揪團</div>
                <div class="tour_date">2020/10/20</div>
                <div class="tour_attendency" @click="lightboxAttendency = true">人數：<span class="attend attend_1">10</span>／<span class="require require_1">10</span></div>
                <div class="tour_status_bar">
                    <div class="tour_status">已取消</div>
                    <div class="tour_join"></div>
                    <div class="tour_check">查看</div>
                    <div class="arrow down"></div>
                </div>
            </div>
        </div>
    </div>
    <div id="i_join">
        <h3>我參加</h3>
        <div id="join_on_going">
            <h4>揪團中的團</h4>
            <div class="tour_detail">
                <div class="tour_title">跨年茶園之旅</div>
                <div class="tour_date">2020/12/31</div>
                <div class="tour_attendency">人數：<span class="attend attend_1">15</span>／<span class="require require_1">30</span></div>
                <div class="tour_status_bar">
                    <div class="tour_status">未成團</div>
                    <div class="tour_join">退出</div>
                    <div class="tour_check">查看</div>
                    <div class="arrow down"></div>
                </div>
            </div>
            <div class="tour_detail">
                <div class="tour_title">12月例行揪團</div>
                <div class="tour_date">2020/12/20</div>
                <div class="tour_attendency">人數：<span class="attend attend_1">10</span>／<span class="require require_1">10</span></div>
                <div class="tour_status_bar">
                    <div class="tour_status">已成團</div>
                    <div class="tour_join"></div>
                    <div class="tour_check">查看</div>
                    <div class="arrow down"></div>
                </div>
            </div>
        </div>
        <div id="join_out_of_date">
            <h4>過往的揪團</h4>
            <div class="tour_detail outdated">
                <div class="tour_title">11月例行揪團</div>
                <div class="tour_date">2020/11/20</div>
                <div class="tour_attendency">人數：<span class="attend attend_1">10</span>／<span class="require require_1">10</span></div>
                <div class="tour_status_bar">
                    <div class="tour_status">已過期</div>
                    <div class="tour_join"></div>
                    <div class="tour_check">查看</div>
                    <div class="arrow down"></div>
                </div>
            </div>
        </div>
        <div id="join_cancel">
            <h4>取消的揪團</h4>
            <div class="tour_detail outdated">
                <div class="tour_title">10月例行揪團</div>
                <div class="tour_date">2020/10/20</div>
                <div class="tour_attendency">人數：<span class="attend attend_1">10</span>／<span class="require require_1">10</span></div>
                <div class="tour_status_bar">
                    <div class="tour_status">已取消</div>
                    <div class="tour_join"></div>
                    <div class="tour_check">查看</div>
                    <div class="arrow down"></div>
                </div>
            </div>
        </div>
        <div id="join_quit">
            <h4>退出的揪團</h4>
            <div class="tour_detail outdated">
                <div class="tour_title">1月例行揪團</div>
                <div class="tour_date">2020/1/20</div>
                <div class="tour_attendency">人數：<span class="attend attend_1">10</span>／<span class="require require_1">10</span></div>
                <div class="tour_status_bar">
                    <div class="tour_status">已退出</div>
                    <div class="tour_join"></div>
                    <div class="tour_check">查看</div>
                    <div class="arrow down"></div>
                </div>
            </div>
        </div>
    </div>
</div>
    `,
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
                    <div class="blog_container tour_blog">
                        <img src="./images/tour/tour1.jpg">
                        <div class="heart">
                            <img class="like" src="./images/common/like.png" title="加入收藏" alt="">
                        </div>
                        <div class="blog_content_container">
                            <div class="blog_title">跨年茶園之旅</div>
                            <div class="blog_content">一年一度的跨年活動絕對不能錯過</div>
                        </div>
                    </div>
                    <div class="blog_container tour_blog">
                        <img src="./images/tour/tour1.jpg">
                        <div class="heart">
                            <img class="like" src="./images/common/like.png" title="加入收藏" alt="">
                        </div>
                        <div class="blog_content_container">
                            <div class="blog_title">跨年茶園之旅</div>
                            <div class="blog_content">一年一度的跨年活動絕對不能錯過</div>
                        </div>
                    </div>
                    <div class="blog_container tour_blog">
                        <img src="./images/tour/tour1.jpg">
                        <div class="heart">
                            <img class="like" src="./images/common/like.png" title="加入收藏" alt="">
                        </div>
                        <div class="blog_content_container">
                            <div class="blog_title">跨年茶園之旅</div>
                            <div class="blog_content">一年一度的跨年活動絕對不能錯過</div>
                        </div>
                    </div>
                    
                </div>
            </div>
            <!-- 收藏的文章 -->
            <div id="fav_article">
                <div id="article_list" class="fav_content">
                    <div class="blog_container article_blog">
                        <img src="./images/tour/tour1.jpg" alt="">
                        <div class="heart">
                            <img class="like" src="./images/common/like.png" title="加入收藏" alt="">
                        </div>
                        <div class="blog_content">
                            <div class="blog_title">高海拔茶園全攻略！</div>
                            <div class="blog_content">網羅全台必去高海拔茶園都在這一篇</div>
                        </div>
                    </div>
                    <div class="blog_container article_blog">
                        <img src="./images/tour/tour1.jpg" alt="">
                        <div class="heart">
                            <img class="like" src="./images/common/like.png" title="加入收藏" alt="">
                        </div>
                        <div class="blog_content">
                            <div class="blog_title">高海拔茶園全攻略！</div>
                            <div class="blog_content">網羅全台必去高海拔茶園都在這一篇</div>
                        </div>
                    </div>
                    <div class="blog_container article_blog">
                        <img src="./images/tour/tour1.jpg" alt="">
                        <div class="heart">
                            <img class="like" src="./images/common/like.png" title="加入收藏" alt="">
                        </div>
                        <div class="blog_content">
                            <div class="blog_title">高海拔茶園全攻略！</div>
                            <div class="blog_content">網羅全台必去高海拔茶園都在這一篇</div>
                        </div>
                    </div>
                    <div class="blog_container article_blog">
                        <img src="./images/tour/tour1.jpg" alt="">
                        <div class="heart">
                            <img class="like" src="./images/common/like.png" title="加入收藏" alt="">
                        </div>
                        <div class="blog_content">
                            <div class="blog_title">高海拔茶園全攻略！</div>
                            <div class="blog_content">網羅全台必去高海拔茶園都在這一篇</div>
                        </div>
                    </div>
                    <div class="blog_container article_blog">
                        <img src="./images/tour/tour1.jpg" alt="">
                        <div class="heart">
                            <img class="like" src="./images/common/like.png" title="加入收藏" alt="">
                        </div>
                        <div class="blog_content">
                            <div class="blog_title">高海拔茶園全攻略！</div>
                            <div class="blog_content">網羅全台必去高海拔茶園都在這一篇</div>
                        </div>
                    </div>
                    <div class="blog_container article_blog">
                        <img src="./images/tour/tour1.jpg" alt="">
                        <div class="heart">
                            <img class="like" src="./images/common/like.png" title="加入收藏" alt="">
                        </div>
                        <div class="blog_content">
                            <div class="blog_title">高海拔茶園全攻略！</div>
                            <div class="blog_content">網羅全台必去高海拔茶園都在這一篇</div>
                        </div>
                    </div>
                </div>
            </div>
            <!-- 收藏的商品 -->
            <div id="fav_product">
                <div id="product_list" class="fav_content">
                    <div class="blog_container product_blog">
                        <img src="./images/tour/tour1.jpg" alt="">
                        <div class="heart">
                            <img class="like" src="./images/common/like.png" title="加入收藏" alt="">
                        </div>
                        <div class="blog_content">
                            <div class="blog_title">斗笠</div>
                            <div class="blog_content">2020最佳出遊道具，過了這個村，沒了那個店</div>
                        </div>
                    </div>
                    <div class="blog_container product_blog">
                        <img src="./images/tour/tour1.jpg" alt="">
                        <div class="heart">
                            <img class="like" src="./images/common/like.png" title="加入收藏" alt="">
                        </div>
                        <div class="blog_content">
                            <div class="blog_title">斗笠</div>
                            <div class="blog_content">2020最佳出遊道具，過了這個村，沒了那個店</div>
                        </div>
                    </div>  
                    <div class="blog_container product_blog">
                        <img src="./images/tour/tour1.jpg" alt="">
                        <div class="heart">
                            <img class="like" src="./images/common/like.png" title="加入收藏" alt="">
                        </div>
                        <div class="blog_content">
                            <div class="blog_title">斗笠</div>
                            <div class="blog_content">2020最佳出遊道具，過了這個村，沒了那個店</div>
                        </div>
                    </div>
                    <div class="blog_container product_blog">
                        <img src="./images/tour/tour1.jpg" alt="">
                        <div class="heart">
                            <img class="like" src="./images/common/like.png" title="加入收藏" alt="">
                        </div>
                        <div class="blog_content">
                            <div class="blog_title">斗笠</div>
                            <div class="blog_content">2020最佳出遊道具，過了這個村，沒了那個店</div>
                        </div>
                    </div>  
                    <div class="blog_container product_blog">
                        <img src="./images/tour/tour1.jpg" alt="">
                        <div class="heart">
                            <img class="like" src="./images/common/like.png" title="加入收藏" alt="">
                        </div>
                        <div class="blog_content">
                            <div class="blog_title">斗笠</div>
                            <div class="blog_content">2020最佳出遊道具，過了這個村，沒了那個店</div>
                        </div>
                    </div>
                    <div class="blog_container product_blog">
                        <img src="./images/tour/tour1.jpg" alt="">
                        <div class="heart">
                            <img class="like" src="./images/common/like.png" title="加入收藏" alt="">
                        </div>
                        <div class="blog_content">
                            <div class="blog_title">斗笠</div>
                            <div class="blog_content">2020最佳出遊道具，過了這個村，沒了那個店</div>
                        </div>
                    </div>                                
                </div>
            </div>
        </div>
    </div>
    `,
});

Vue.component("mine_order", {
    template: `
    <div id="mine_order">
                    <div id="list">
                        <div id="list_title">
                            <h5 id="order_no">訂單編號</h5>
                            <h5 id="order_status">訂單狀態</h5>
                            <h5 id="order_payment">付款方式</h5>
                            <h5 id="order_total">訂單金額</h5>
                            <h5 id="order_date">下單時間</h5>
                        </div>
                        <div id="order">
                            <h5 id="order_no">20201122028</h5>
                            <h5 id="order_status">處理中</h5>
                            <h5 id="order_payment">線上刷卡</h5>
                            <h5 id="order_total">$4,000</h5>
                            <h5 id="order_date">2020/11/22 02:28:28</h5>
                        </div>
                        <div id="order">
                            <h5 id="order_no">20201122028</h5>
                            <h5 id="order_status">處理中</h5>
                            <h5 id="order_payment">線上刷卡</h5>
                            <h5 id="order_total">$4,000</h5>
                            <h5 id="order_date">2020/11/22 02:28:28</h5>
                        </div>
                        <div id="order">
                            <h5 id="order_no">20201122028</h5>
                            <h5 id="order_status">處理中</h5>
                            <h5 id="order_payment">線上刷卡</h5>
                            <h5 id="order_total">$4,000</h5>
                            <h5 id="order_date">2020/11/22 02:28:28</h5>
                        </div>
                        <div id="order">
                            <h5 id="order_no">20201122028</h5>
                            <h5 id="order_status">處理中</h5>
                            <h5 id="order_payment">線上刷卡</h5>
                            <h5 id="order_total">$4,000</h5>
                            <h5 id="order_date">2020/11/22 02:28:28</h5>
                        </div>
                        <div id="order">
                            <h5 id="order_no">20201122028</h5>
                            <h5 id="order_status">處理中</h5>
                            <h5 id="order_payment">線上刷卡</h5>
                            <h5 id="order_total">$4,000</h5>
                            <h5 id="order_date">2020/11/22 02:28:28</h5>
                        </div>
                        <div id="order">
                            <h5 id="order_no">20201122028</h5>
                            <h5 id="order_status">處理中</h5>
                            <h5 id="order_payment">線上刷卡</h5>
                            <h5 id="order_total">$4,000</h5>
                            <h5 id="order_date">2020/11/22 02:28:28</h5>
                        </div>
                        <div id="order">
                            <h5 id="order_no">20201122028</h5>
                            <h5 id="order_status">處理中</h5>
                            <h5 id="order_payment">線上刷卡</h5>
                            <h5 id="order_total">$4,000</h5>
                            <h5 id="order_date">2020/11/22 02:28:28</h5>
                        </div>
                        <div id="order">
                            <h5 id="order_no">20201122028</h5>
                            <h5 id="order_status">處理中</h5>
                            <h5 id="order_payment">線上刷卡</h5>
                            <h5 id="order_total">$4,000</h5>
                            <h5 id="order_date">2020/11/22 02:28:28</h5>
                        </div>
                        <div id="order">
                            <h5 id="order_no">20201122028</h5>
                            <h5 id="order_status">處理中</h5>
                            <h5 id="order_payment">線上刷卡</h5>
                            <h5 id="order_total">$4,000</h5>
                            <h5 id="order_date">2020/11/22 02:28:28</h5>
                        </div>
                        <div id="order">
                            <h5 id="order_no">20201122028</h5>
                            <h5 id="order_status">處理中</h5>
                            <h5 id="order_payment">線上刷卡</h5>
                            <h5 id="order_total">$4,000</h5>
                            <h5 id="order_date">2020/11/22 02:28:28</h5>
                        </div>
                    </div>
                </div>
    `,
});

Vue.component("mine_article", {
    template: `
    <div id="mine_article">
                    <div class="article_brief" id="article_brief">
                        <div class="article_detail">
                            <div class="article_title">林家茶園心得</div>
                            <div class="article_date">2020/11/25</div>
                            <div class="article_status_bar">
                                <!-- <div class="article_status">分享</div> -->
                                <div class="article_join">查看</div>
                                <div class="article_check">刪除</div>
                            </div>
                        </div>                        
                    </div>
                    <div class="article_brief">
                        <div class="article_detail">
                            <div class="article_title">林家茶園心得</div>
                            <div class="article_date">2020/12/31</div>
                            <div class="article_status_bar">
                                <!-- <div class="article_status">分享</div> -->
                                <div class="article_join">查看</div>
                                <div class="article_check">刪除</div>
                            </div>
                        </div>                        
                    </div>
                    <div class="article_brief">
                        <div class="article_detail">
                            <div class="article_title">林家茶園心得</div>
                            <div class="article_date">2020/12/31</div>
                            <div class="article_status_bar">
                                <!-- <div class="article_status">分享</div> -->
                                <div class="article_join">查看</div>
                                <div class="article_check">刪除</div>
                            </div>
                        </div>                        
                    </div>
                    <div class="article_brief">
                        <div class="article_detail">
                            <div class="article_title">林家茶園心得</div>
                            <div class="article_date">2020/12/31</div>
                            <div class="article_status_bar">
                                <!-- <div class="article_status">分享</div> -->
                                <div class="article_join">查看</div>
                                <div class="article_check">刪除</div>
                            </div>
                        </div>                        
                    </div>
                    <div class="article_brief">
                        <div class="article_detail">
                            <div class="article_title">林家茶園心得</div>
                            <div class="article_date">2020/12/31</div>
                            <div class="article_status_bar">
                                <!-- <div class="article_status">分享</div> -->
                                <div class="article_join">查看</div>
                                <div class="article_check">刪除</div>
                            </div>
                        </div>                        
                    </div>
                    <div class="article_brief">
                        <div class="article_detail">
                            <div class="article_title">林家茶園心得</div>
                            <div class="article_date">2020/12/31</div>
                            <div class="article_status_bar">
                                <!-- <div class="article_status">分享</div> -->
                                <div class="article_join">查看</div>
                                <div class="article_check">刪除</div>
                            </div>
                        </div>                        
                    </div>
                    <div class="article_brief">
                        <div class="article_detail">
                            <div class="article_title">林家茶園心得</div>
                            <div class="article_date">2020/12/31</div>
                            <div class="article_status_bar">
                                <!-- <div class="article_status">分享</div> -->
                                <div class="article_join">查看</div>
                                <div class="article_check">刪除</div>
                            </div>
                        </div>                        
                    </div>
                    <div class="article_brief">
                        <div class="article_detail">
                            <div class="article_title">林家茶園心得</div>
                            <div class="article_date">2020/12/31</div>
                            <div class="article_status_bar">
                                <!-- <div class="article_status">分享</div> -->
                                <div class="article_join">查看</div>
                                <div class="article_check">刪除</div>
                            </div>
                        </div>                        
                    </div>
                    <div class="article_brief">
                        <div class="article_detail">
                            <div class="article_title">林家茶園心得</div>
                            <div class="article_date">2020/12/31</div>
                            <div class="article_status_bar">
                                <!-- <div class="article_status">分享</div> -->
                                <div class="article_join">查看</div>
                                <div class="article_check">刪除</div>
                            </div>
                        </div>                        
                    </div>
                    <div class="article_brief">
                        <div class="article_detail">
                            <div class="article_title">林家茶園心得</div>
                            <div class="article_date">2020/12/31</div>
                            <div class="article_status_bar">
                                <!-- <div class="article_status">分享</div> -->
                                <div class="article_join">查看</div>
                                <div class="article_check">刪除</div>
                            </div>
                        </div>                        
                    </div>
                </div>
    `,
});

Vue.component("mine_profile", {
    template: `
    <div id="mine_profile">
                    <form action="" id="profile">
                        <div class="field-wrap">
                            <label for="my_name">暱稱</label>
                            <input type="text" name="my_name" class="my_name" />
                        </div>
                        <div class="field-wrap">
                            <label for="email">電子信箱</label>
                            <input type="email" name="email" class="email"/>
                        </div>
                        <div class="field-wrap">
                            <label for="my_id">帳號</label>
                            <input type="text" name="my_id" class="my_id" />
                        </div>
                        <div class="field-wrap">
                            <label for="pass_password">舊密碼</label>
                            <input type="password" name="pass_password" class="pass_password" />
                        </div>
                        <div class="field-wrap">
                            <label for="new_password">新密碼</label>
                            <input type="password" name="new_password" class="new_password" />
                        </div>
                        <div class="field-wrap">
                            <label for="confirm_new_password">確認新密碼</label>
                            <input type="text" name="confirm_new_pw" class="confirm_new_pw" />
                        </div>
                        <!-- <div class="field-wrap"> -->
                            <!-- <div role="tw-city-selector" class="add"></div> -->
                            <!-- <label for="add">地址</label>
                            <input type="text" name="add" class="add" />
                        </div>
                        <div class="field-wrap">
                            <label for="tel">電話</label>
                            <input type="text" name="add" class="add" />
                        </div> -->
                        <div class="btn_sent">
                            <button type="submit" class="button button-block"/>送出</button>
                        </div>
                    </form>
                </div>
    `,
});

//========== lightbox ==========//

new Vue({
    el: "#app",
    data: {
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
    $(this).parent().parent().siblings("#main_container").children("#sub_menu").children("h3").removeClass("bg-color");
    // $("#tour").hide();
    // $("#mine_fav").hide();
    // $("#mine_order").hide();
    // $("#mine_article").hide();
    // $("#mine_profile").show();
});

//收藏內分頁
$(".fav_tour").click(function () {
    console.log($(this).parent("#mine_fav_bar").siblings("#fav_container").children("#fav_tour"));
    $(this).addClass("colored").removeClass("unselected");
    $(this).siblings().removeClass("colored").addClass("unselected");
});
$(".fav_article").click(function () {
    $(this).addClass("colored").removeClass("unselected");
    $(this).siblings().removeClass("colored").addClass("unselected");
});
$(".fav_product").click(function () {
    $(this).addClass("colored").removeClass("unselected");
    $(this).siblings().removeClass("colored").addClass("unselected");
});