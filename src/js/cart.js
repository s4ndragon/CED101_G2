window.addEventListener('load', doFirst);
let storage = sessionStorage;



function doFirst() {
    if (storage['addItemList'] == null) {
        storage['addItemList'] = '';
    }
    let add_cart = document.querySelectorAll('.add_cart');
    for (let i = 0; i < add_cart.length; i++) {
        add_cart[i].addEventListener('click', additem);
    }
    let add_Favorite = document.querySelectorAll('.addFavorite');
    for (let i = 0; i < add_Favorite.length; i++) {
        add_Favorite[i].addEventListener('click', addFavorite);
    }
    if (storage['addItemList'] != "") {
        loadcart();
    }
    calcAmount();
    let productNum = document.getElementById('productNum')
    if (productNum) {
        productNum.addEventListener('change', changeNum)
    }
    loadFavorite()
    dicountBtn()
}



function addFavorite(e) {
    let itemValueBtn = e.target.nextElementSibling.nextElementSibling,
        itemValue = e.target.nextElementSibling.nextElementSibling.value,
        itemFavorite = itemValue.split('|')[4];
    if (itemFavorite == '0') {
        e.target.src = './images/common/like.png';
        itemValueBtn.value = itemValue.substring(0, itemValue.length - 1);
        itemValueBtn.value += '1';
        // alert('已加入我的最愛');
    } else {
        e.target.src = "./images/common/heart.png";
        itemValueBtn.value = itemValue.substring(0, itemValue.length - 1);
        itemValueBtn.value += '0';
    };
    if (storage[itemValue.split('|')[0]]) {
        storage[itemValue.split('|')[0]] = itemValueBtn.value;
    }
}

function loadFavorite() {
    let FavoriteBtn = document.getElementsByClassName('addFavorite');
    for (let i = 0; i < FavoriteBtn.length; i++) {
        itemValueBtn = FavoriteBtn[i].nextElementSibling.nextElementSibling;
        let f = itemValueBtn.value.split('|')[4];
        if (f == 0) {
            FavoriteBtn[i].src = "./images/common/heart.png";
        } else if (f == 1) {
            FavoriteBtn[i].src = "./images/common/like.png";
        }
    }
}

function itemInnerhtml(newdiv, itemNo, itemName, itemNum, itemPrice) {
    newdiv.innerHTML = `
    <div class="drop">×</div>
    <div class="img">
        <img src="./images/shopping/product2.jpg" alt="">
    </div>
    <div class="aside">
        <a href="./04_product.html"><h3>${itemName}</h3></a>
        <div class="content">
            <div>數量: <input type="number" name=""  value="${itemNum}" min='0' max='999' onchange='calcAmount()'></div>
            <div class='price'>價格: </span><input type="number" name=""  disabled value="${itemPrice}" ></div>
            <input type="hidden" name="" value='${storage[`${itemNo}`]}' class='productInfo'>
        </div>
    </div>
    `
}

function additem(e) {
    let itemValue = e.target.nextElementSibling.value;
    let itemNo = itemValue.split('|')[0],
        itemName = itemValue.split('|')[1],
        itemPrice = itemValue.split('|')[2],
        itemNum = itemValue.split('|')[3];
    if (storage[`${itemNo}`]) {
        alert('已經在購物車內囉。')
    } else {
        storage[`${itemNo}`] = itemValue;
        storage['addItemList'] += itemNo + ',';
        itemValue = itemValue.split('|');
        itemName = itemValue[1];
        itemPrice = itemValue[2];
        itemNum = itemValue[3];
        let newdiv = document.createElement('div');
        newdiv.setAttribute('class', 'item');
        itemInnerhtml(newdiv, itemNo, itemName, itemNum, itemPrice);
        let cart_content = document.getElementById('cart_content');
        cart_content.insertBefore(newdiv, amount);
        calcAmount();
        newdiv.querySelectorAll('.drop')[0].addEventListener('click', dropitem);
    }
}

function loadcart() {
    let cartContent = document.getElementById('cart_content');
    if (cartContent) {
        let itemlist = storage['addItemList'];
        itemlist = itemlist.split(',');
        let itemlistLenght = itemlist.length - 1;
        for (let i = 0; i < itemlistLenght; i++) {
            itemValue = storage[itemlist[i]].split('|');
            itemName = itemValue[1];
            itemPrice = itemValue[2];
            itemNum = itemValue[3];
            let newdiv = document.createElement('div');
            newdiv.setAttribute('class', 'item');
            itemInnerhtml(newdiv, itemlist[i], itemName, itemNum, itemPrice);
            cart_content.insertBefore(newdiv, amount);
        }
    };
    let dropbtn = document.querySelectorAll('.drop');
    for (let i = 0; i < dropbtn.length; i++) {
        dropbtn[i].addEventListener('click', dropitem);
    }
}

function calcAmount() {
    let total = 0,
        items = document.querySelectorAll('.item');
    if (items) {
        for (let i = 0; i < items.length; i++) {
            let pricebtn = items[i].querySelectorAll('input[type=hidden]')[0],
                priceValue = pricebtn.value;
            let price = priceValue.split('|')[2],
                num = pricebtn.previousElementSibling.previousElementSibling.getElementsByTagName('input')[0].value,
                h = priceValue.split('|')[4],
                c;
            if (priceValue.split('|')[3] < 10) {
                c = priceValue.substring(0, priceValue.length - 3)
            } else if (priceValue.split('|')[3] >= 10 && priceValue.split('|')[3] < 100) {
                c = priceValue.substring(0, priceValue.length - 4)
            } else if (priceValue.split('|')[3] >= 100 && priceValue.split('|')[3] < 1000) {
                c = priceValue.substring(0, priceValue.length - 5)
            }
            pricebtn.value = `${c}${num}|${h}`;
            storage[priceValue.split('|')[0]] = pricebtn.value;
            total += (price * num);
        }
    }
    let totalAmount = document.getElementById('totalAmount');
    if (totalAmount) {
        totalAmount.setAttribute('value', total);
    }
    let totalBtn = document.getElementById('totalBtn');
    if (totalBtn) {
        dealDisPoint()
    }
}

function changeNum(e) {
    let pricebtn = e.target.parentNode.parentNode.querySelectorAll('input[type=hidden]')[0];
    let priceValue = pricebtn.value;
    let num = e.target.value,
        h = priceValue.split('|')[4],
        c;
    if (priceValue.split('|')[3] < 10) {
        c = priceValue.substring(0, priceValue.length - 3)
    } else if (priceValue.split('|')[3] >= 10 && priceValue.split('|')[3] < 100) {
        c = priceValue.substring(0, priceValue.length - 4)
    } else if (priceValue.split('|')[3] >= 100 && priceValue.split('|')[3] < 1000) {
        c = priceValue.substring(0, priceValue.length - 5)
    }
    pricebtn.value = `${c}${num}|${h}`;
    if (storage[priceValue.split('|')[0]]) {
        storage[priceValue.split('|')[0]] = pricebtn.value;
    }
}

function dropitem(e) {
    let addItemList = storage['addItemList'].split(','),
        itemValueBtn = e.target.nextElementSibling.nextElementSibling.querySelectorAll('input[type=hidden]')[0],
        itemNo = itemValueBtn.value.split('|')[0];
    e.target.parentNode.remove();
    calcAmount();
    storage.removeItem(itemNo);
    let index = addItemList.indexOf(itemNo);
    addItemList.splice(index, 1);
    //將陣列重組成字串
    addItemList = addItemList.toString() + ',';
    addItemList = addItemList.substring(0, addItemList.length - 1);
    storage['addItemList'] = addItemList;
}






function dealDisPoint() {
    let costPoint = document.getElementById('costPoint'),
        myPoint = document.getElementById('myPoint'),
        discountprice = document.getElementById('discountprice'),
        maxPoint,
        price,
        discount = document.getElementById('discount');
    //設定優惠點數的使用上限
    if (parseInt(totalAmount.value) < parseInt(myPoint.value)) {
        maxPoint = totalAmount.value;
    } else {
        maxPoint = myPoint.value
    }
    costPoint.setAttribute('max', maxPoint);
    costPoint.addEventListener('change', () => {
        costPoint.setAttribute('value', costPoint.value);
        console.log(parseInt(costPoint.value) > parseInt(maxPoint))
        if (parseInt(costPoint.value) > parseInt(maxPoint)) {
            costPoint.setAttribute('value', maxPoint);
            costPoint.value = maxPoint;
        }
        discountprice.setAttribute('value', costPoint.value);
    })

    usePoint = document.getElementById('usePoint');
    usePoint.addEventListener('click', () => {
        document.getElementById('pointTable').setAttribute('style', 'display:block');
    });
    price = parseInt(totalAmount.value) - parseInt(discount.value);
    console.log(price)
    document.getElementById('totalBtn').setAttribute('value', price)
};

function dicountBtn() {
    usePointbtn = document.getElementById('usePointbtn');
    usePointbtn.addEventListener('click', () => {
        if (confirm('使用優惠點數?')) {
            document.getElementById('pointTable').setAttribute('style', 'display:none');
            let dis = document.getElementById('discountprice').value;
            discount.setAttribute('value', dis);
            dealDisPoint()
        } else {}
    })
    document.getElementById('cancel').addEventListener('click', () => {
        document.getElementById('pointTable').setAttribute('style', 'display:none');
    })
}