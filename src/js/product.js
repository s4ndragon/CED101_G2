window.addEventListener('load', () => {
    let productsnum = 18;
    let products = document.getElementsByClassName('products')[0];
    let page = document.getElementsByClassName('page')[0];
    for (let i = 0; i < productsnum; i++) {
        let newproduct = document.createElement('div'); //創建div
        newproduct.setAttribute('class', 'product'); //設定div的class
        products.insertBefore(newproduct, page); //將div插入page前
        newproduct.innerHTML = `
        <div>
            <div class="img">   
                <a href="./04_product.html">
                    <img src="./images/shopping/product3.jpg" alt="">
                </a>
            </div>
            <div class="content">
                <a href="./04_product.html">
                    <h4>【原藝坊】悠然愜意 青瓷鯉魚茶壺套組精湛工藝，功夫淳厚，手感極佳，品茶必備</h4>
                    <div class="price"><span>550</span></div>
                    <p>商品介紹商品介紹商品介紹商品介紹商品介紹商品介紹商品介紹商品介紹商品介紹</p>
                </a>
                <div class='btns'>
                <img class='addFavorite' src="./images/common/heart.png" alt="">
                <input type="button" value="加入購物車" class="add_cart">
                <input type="hidden" name="" value='s1123|【原藝坊】悠然愜意 青瓷鯉魚茶壺套組精湛工藝，功夫淳厚，手感極佳，品茶必備|550|1|0' class='productInfo'>
                </div>
            </div>
        </div>
                            `;
    };
    classifyBtns = document.getElementsByClassName('classifyBtn');
    for (let i = 0; i < classifyBtns.length; i++) {
        classifyBtns[i].addEventListener('click', (e) => {
            for (let j = 0; j < classifyBtns.length; j++) {
                classifyBtns[j].setAttribute('class', 'classifyBtn');
            }
            e.target.setAttribute('class', 'classifyBtn selected')
        });

    }
})