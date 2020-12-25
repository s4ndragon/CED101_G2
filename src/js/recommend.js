window.addEventListener("load", doFirst);

function doFirst() {
    //寫入假的商品物件
    let productsnum = 8;
    let recommend_products = document.getElementsByClassName('recommend_products')[0];
    for (let i = 0; i < productsnum; i++) {
        let newproduct = document.createElement('div');
        recommend_products.appendChild(newproduct);
        newproduct.setAttribute('class', 'product');
        newproduct.innerHTML = `
        <div>
                                <div class="img">
                                    <a href="./04_product.html">
                                        <img src="./images/shopping/product2.jpg" alt="">
                                    </a>
                                </div>
                                <div class="content">
                                    <a href="./04_product.html">
                                        <h4>戶外旅行便攜茶具8件組-黑陶款(贈不掉毛雙層吸水抹布4入)</h4>
                                        <div class="price">NT<span>689</span></div>
                                    </a>
                                    <div class='btns'>
                                    <img class='addFavorite' src="./images/common/heart.png" alt="">
                                    <input type="button" value="加入購物車" class="add_cart">
                                    <input type="hidden" name="" value='s1123${i}|【原藝坊】悠然愜意 青瓷鯉魚茶壺套組精湛工藝，功夫淳厚，手感極佳，品茶必備|550|1|0' class='productInfo'>
                                    </div>
                                </div>
                                </div>
                            `;
    }
    $('.recommend_products').slick({ //啟動slick
        infinite: true,
        slidesToShow: 3,
        slidesToScroll: 3,
        responsive: [{
                breakpoint: 721,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                }
            },
            {
                breakpoint: 377,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                }
            }
        ],
    });
    let classifyBtn = document.getElementById("classifyBtn");
    let classifyTable = document.getElementById("classifyTable");
    if (classifyTable) { //啟動classifyBtn事件
        classifyTable.addEventListener('click', (e) => {
            e.stopPropagation();
        });
        classifyBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            classifyTable.setAttribute('style', 'display:block;');
        });
        document.getElementsByTagName('body')[0].addEventListener('click', () => {
            classifyTable.setAttribute('style', 'display:none;');
        });
    }
}