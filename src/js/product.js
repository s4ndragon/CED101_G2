var storage = sessionStorage;

window.addEventListener('load', init);

function $id(id) { //尋找id
    return document.getElementById(id);
}

function init() {
    if (storage['addItemList'] == null) {
        storage['addItemList'] = '';
    }
    //如果是商城首頁的話
    if ($id('products')) {
        getproducts();
        classifyBtnsSelect();
        addcartalert()
    };
    if ($id('recommends')) {
        getRecommends(2)
    }
    if ($id('cart_content')) {
        loadcart();
        addcartalert()
    }
    if ($id('totalBtn')) {
        dicountBtn()
    }
};

function getproducts() {
    var xhr = new XMLHttpRequest();
    xhr.onload = function () {
        if (xhr.status == 200) {
            //modify here
            let products = JSON.parse(xhr.responseText);
            let page = document.getElementsByClassName('page')[0];
            for (let i = 0; i < products.length; i++) {
                document.getElementsByClassName('products')[0].insertBefore(addProduct(products[i]), inserTarget); //將div插入page前

                ;
            };
        } else {
            alert(xhr.status);
        }
    }
    var url = "./phps/getproducts.php";
    xhr.open("Get", url, true);
    xhr.send(null);

}

function addProduct(product) {
    let newproduct = document.createElement('div'); //創建div
    newproduct.setAttribute('class', 'product'); //設定div的class
    newproduct.innerHTML = `
    <div>
        <div class="img">   
            <a href="./04_product.html">
                <img src="./images/shopping/${product.IMG}" alt="">
            </a>
        </div>
        <div class="content">
            <a href="./04_product.html">
                <h4>${product.NAME}</h4>
                <div class="price"><span>${product.PRICE}</span></div>
                <p>${product.INFO}</p>
            </a>
            <div class='btns'>
            <img class='addFavorite' src="./images/common/heart.png" alt="">
            <input type="button" value="加入購物車" class="add_cart">
            <input type="hidden" name="" value='${product.PSN}|${product.NAME}|${product.IMG}|${product.PRICE}|1|1' class='productInfo' id="${product.PSN}">
            </div>
        </div>
    </div>
                        `;
    newproduct.getElementsByClassName('add_cart')[0].addEventListener('click', addItem);
    return newproduct;
}

function classifyBtnsSelect() {
    classifyBtns = document.getElementsByClassName('classifyBtn');
    for (let i = 0; i < classifyBtns.length; i++) {
        classifyBtns[i].addEventListener('click', (e) => {
            for (let j = 0; j < classifyBtns.length; j++) {
                classifyBtns[j].setAttribute('class', 'classifyBtn');
            }
            e.target.setAttribute('class', 'classifyBtn selected')
        });

    }
}

function addItem(e) {
    console.log(e.target)
    let itemValue = e.target.nextElementSibling.value;
    let itemNo = itemValue.split('|')[0],
        itemName = itemValue.split('|')[1],
        itemPrice = itemValue.split('|')[2],
        itemNum = itemValue.split('|')[3];
    if (storage[`${itemNo}`]) {
        alertLB('已經在購物車內囉。');
    } else {
        storage[`${itemNo}`] = itemValue;
        storage['addItemList'] += itemNo + ',';
        itemValue = itemValue.split('|');
        itemName = itemValue[1];
        itemPrice = itemValue[2];
        itemNum = itemValue[3];
        let cart_content = document.getElementById('cart_content');
        if (cart_content) {
            let newdiv = document.createElement('div');
            newdiv.setAttribute('class', 'item');
            itemInnerhtml(newdiv, itemNo, itemName, itemNum, itemPrice);
            cart_content.insertBefore(newdiv, amount);
            calcAmount();
            newdiv.querySelectorAll('.drop')[0].addEventListener('click', dropitem);
        };
        alertLB('已加入購物車。');
    }
}



function loadcart() {
    let itemlist = storage['addItemList'];
    itemlist = itemlist.split(',');
    itemlist.pop();
    for (let i = 0; i < itemlist.length; i++) {
        let newdiv = document.createElement('div');
        newdiv.setAttribute('class', 'item');
        newdiv.setAttribute('id', itemlist[i]);
        newdiv.innerHTML = itemInnerhtml(itemlist[i]);
        $id('cart_content').insertBefore(newdiv, amount);
        newdiv.getElementsByClassName('itemNum')[0].addEventListener('change', changeNum)
        newdiv.getElementsByClassName('drop')[0].addEventListener('click', dropitem)
    };
    calcAmount();
}

function itemInnerhtml(itemNo) {
    let itemValue = storage[itemNo].split('|'),
        itemName = itemValue[1],
        itemImg = itemValue[2],
        itemPrice = itemValue[3],
        itemNum = itemValue[4];
    return `
    <div class="drop">×</div>
    <div class="img">
        <img src="./images/shopping/${itemImg}" alt="">
    </div>
    <div class="aside">
        <a href="./04_product.html"><h3>${itemName}</h3></a>
        <div class="content">
            <div>數量: <input type="number" name=""  value="${itemNum}" min='0' max='999' class='itemNum'></div>
            <div class='price'>價格: </span><input type="number" name=""  disabled value="${itemPrice}" class='itemPrice'></div>
            <input type="hidden" name="" value='${storage[`${itemNo}`]}' class='productInfo'>
        </div>
    </div>
    `;
}

function dropitem(e) {
    let addItemList = storage['addItemList'].split(','),
        index = addItemList.indexOf(e.target.parentNode.id);
    addItemList.splice(index, 1);
    storage['addItemList'] = addItemList;
    console.log(addItemList);
    e.target.parentNode.remove();
    storage.removeItem(e.target.parentNode.id);
    calcAmount()
}


function calcAmount(e) {
    let items = document.getElementsByClassName('item'),
        total = 0;
    for (let i = 0; i < items.length; i++) {
        items[i];
        let p = parseInt(items[i].getElementsByClassName('itemPrice')[0].value),
            n = parseInt(items[i].getElementsByClassName('itemNum')[0].value);
        total += p * n;

    }
    $id('totalAmount').setAttribute('value', total);

    let totalBtn = $id('totalBtn');
    if (totalBtn) {
        dealDisPoint()
        maxDis()
    }
}

function changeNum(e) {
    let num = e.target.value;
    e.target.setAttribute('value', num);
    let ValueBtn = e.target.parentNode.parentNode.querySelectorAll('input[type=hidden]')[0];
    let value = ValueBtn.value.split('|'),
        itemNo = value[0];
    value.splice(-2, 1, num)
    value = value.join('|')
    storage[itemNo] = value;
    calcAmount();
}


function dealDisPoint() {
    var costPoint = document.getElementById('costPoint'),
        price,
        discount = document.getElementById('discount');
    //設定優惠點數的使用上限
    costPoint.addEventListener('change', maxDis);
    price = parseInt(totalAmount.value) - parseInt(discount.value);
    document.getElementById('totalBtn').setAttribute('value', price);
};

function maxDis() {
    let totalAmount = document.getElementById('totalAmount'),
        costPoint = document.getElementById('costPoint'),
        myPoint = document.getElementById('myPoint'),
        dis = document.getElementById('discountprice');
    if (parseInt(totalAmount.value) < parseInt(myPoint.value)) {
        maxPoint = totalAmount.value;
    } else {
        maxPoint = myPoint.value
    }
    costPoint.setAttribute('value', costPoint.value);
    if (parseInt(costPoint.value) > parseInt(maxPoint)) {
        costPoint.setAttribute('value', maxPoint);
        costPoint.value = maxPoint;
    }
    discountprice.setAttribute('value', costPoint.value);
    if (parseInt(totalAmount.value) < parseInt(costPoint.value)) {
        document.getElementById('pointTable').setAttribute('style', 'display:none');
        calcAmount();
    }
    let discount = document.getElementById('discount'),
        totalBtn = document.getElementById('totalBtn');
    if (parseInt(totalBtn.value) < 0) {
        discount.setAttribute('value', maxPoint);
        calcAmount();
    }
}

function dicountBtn() {
    usePoint = document.getElementById('usePoint');
    usePoint.addEventListener('click', () => {
        document.getElementById('pointTable').setAttribute('style', 'display:block');
    });
    usePointbtn = document.getElementById('usePointbtn');
    usePointbtn.addEventListener('click', () => {
        if (confirm('使用優惠點數?')) {
            document.getElementById('pointTable').setAttribute('style', 'display:none');
            let dis = document.getElementById('discountprice').value;
            discount.setAttribute('value', dis);
            calcAmount();
        }
    })
    document.getElementById('cancel').addEventListener('click', () => {
        document.getElementById('pointTable').setAttribute('style', 'display:none');
    })
}

function addcartalert() {
    if ($id('addcartLB')) {} else {
        let newdiv = document.createElement('div');
        newdiv.setAttribute('id', 'addcartLB');
        newdiv.innerHTML = `<div>
        <span id='closeLB'>×</span><h4 id="addcartLBText">已加入購物車</h4>
        </div>
        `;
        let footer = document.getElementsByTagName('footer')[0];
        document.getElementsByTagName('body')[0].insertBefore(newdiv, footer);
        document.getElementById('closeLB').addEventListener('click', () => {
            addcartLB.style.display = 'none';
        })
    }
}

function alertLB(text) {
    document.getElementById('addcartLBText').innerText = text;
    addcartLB = document.getElementById('addcartLB');
    addcartLB.style.display = 'flex';

}

function recommend() {

    //寫入假的商品物件
    let recommendList = '10003,10005,';
    let recommends = $id('recommends');
    recommends.addProduct(product, inserTarget)
    for (let i = 0; i < productsnum; i++) {
        let newproduct = document.createElement('div');
        recommend_products.appendChild(newproduct);
        newproduct.setAttribute('class', 'product');
        newproduct.innerHTML = itemInnerhtml(itemNo);
        //  `
        //                       <div>
        //                           <div class="img">
        //                               <a href="./04_product.html">
        //                                   <img src="./images/shopping/product2.jpg" alt="">
        //                               </a>
        //                           </div>
        //                           <div class="content">
        //                               <a href="./04_product.html">
        //                                   <h4>戶外旅行便攜茶具8件組-黑陶款(贈不掉毛雙層吸水抹布4入)</h4>
        //                                   <div class="price"><span>689</span></div>
        //                                   <p>商品介紹商品介紹商品介紹商品介紹商品介紹商品介紹商品介紹商品介紹商品介紹商品介紹商品介紹</p>
        //                               </a>
        //                               <div class='btns'>
        //                               <img class='addFavorite' src="./images/common/heart.png" alt="">
        //                               <input type="button" value="加入購物車" class="add_cart">
        //                               <input type="hidden" name="" value='s1123${i}|【原藝坊】悠然愜意 青瓷鯉魚茶壺套組精湛工藝，功夫淳厚，手感極佳，品茶必備|550|1|0' class='productInfo'>
        //                               </div>
        //                           </div>
        //                           </div>
        //                       `;
    };
    $('.recommend_products').ready(function () {
        $('.recommend_products').slick({ //啟動slick
            infinite: true,
            slidesToShow: 3,
            slidesToScroll: 3,
            responsive: [{
                breakpoint: 721,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                }
            }],
        });
    })
}

function getRecommends(sold) {
    var xhr = new XMLHttpRequest();
    xhr.onload = function () {
        if (xhr.status == 200) {
            //modify here
            let products = JSON.parse(xhr.responseText);
            let page = $id('recommends');
            for (let i = 0; i < products.length; i++) {
                addProduct(products[i]);
            };
        } else {
            alert(xhr.status);
        }
    }
    var url = "./phps/getRecommends.php?sold=" + sold;
    xhr.open("Get", url, true);
    xhr.send(null);



}