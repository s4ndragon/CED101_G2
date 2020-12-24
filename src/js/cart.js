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
}

function additem(e) {
    let itemValue = e.target.nextElementSibling.value;
    let itemNo = itemValue.split('|')[0],
        itemName = itemValue.split('|')[1],
        itemPrice = itemValue.split('|')[2],
        itemNum = itemValue.split('|')[3];
    console.log(itemNo);
    console.log(itemName);
    console.log(itemPrice);
    console.log(itemNum);
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
        newdiv.innerHTML = `
            <span class="close">×</span>
            <div class="img">
                <img src="./images/shopping/product3.jpg" alt="">
            </div>
            <div class="aside">
                <h3>${itemName}</h3>
                <div class="content">
                    數量:<input type="number" name="" id="" value="${itemNum}" min='0' max='999' onchange='calcAmount()'>
                    價格: <input type="number" name="" id="" disabled value="${itemPrice}" >
                    <input type="hidden" name="" value='${storage[`${itemNo}`]}' class='productInfo'>
                </div>
            </div>
            `
        document.getElementById('cart_content').appendChild(newdiv);
        calcAmount()
    }
}

function addFavorite(e) {
    let itemValueBtn = e.target.nextElementSibling.nextElementSibling,
        itemValue = e.target.nextElementSibling.nextElementSibling.value,
        itemFavorite = itemValue.split('|')[4];
    if (itemFavorite == '0') {
        e.target.src = './images/common/like.png';
        itemValueBtn.value = itemValue.substring(0, itemValue.length - 1);
        itemValueBtn.value += '1';
    } else {
        e.target.src = "./images/common/heart.png";
        itemValueBtn.value = itemValue.substring(0, itemValue.length - 1);
        itemValueBtn.value += '0';
    }
}


function loadcart() {
    let cartContent = document.getElementById('cart_content');
    if (cartContent) {
        let itemlist = storage['addItemList'];
        itemlist = itemlist.split(',');
        let itemlistLenght = itemlist.length - 1;
        if (itemlist.length < 3) {
            itemlistLenght = 1
        }
        for (let i = 0; i < itemlistLenght; i++) {
            itemValue = storage[itemlist[i]].split('|');
            itemName = itemValue[1];
            itemPrice = itemValue[2];
            itemNum = itemValue[3];
            let newdiv = document.createElement('div');
            newdiv.setAttribute('class', 'item');
            newdiv.innerHTML = `
                <span class="close">×</span>
                <div class="img">
                    <img src="./images/shopping/product3.jpg" alt="">
                </div>
                <div class="aside">
                    <h3>${itemName}</h3>
                    <div class="content">
                        數量:<input type="number" name="" id="" value="${itemNum}" min='0' max='999' onchange='calcAmount()'>
                        價格: <input type="number" name="" id="" disabled value="${itemPrice}" >
                        <input type="hidden" name="" value='${storage[itemlist[i]]}' class='productInfo'>
                    </div>
                </div>
                `
            cartContent.appendChild(newdiv);
        }
    }
}

function calcAmount() {
    let total = 0,
        items = document.querySelectorAll('.item');
    for (let i = 0; i < items.length; i++) {
        let pricebtn = items[i].querySelectorAll('input[type=hidden]')[0],
            priceValue = pricebtn.value;
        let price = priceValue.split('|')[2],
            num = pricebtn.previousElementSibling.previousElementSibling.value,
            h = priceValue.split('|')[4],
            c;
        if (priceValue.split('|')[3] < 10) {
            c = priceValue.substring(0, priceValue.length - 3)
        } else if (priceValue.split('|')[3] >= 10 && priceValue.split('|')[3] < 100) {
            c = priceValue.substring(0, priceValue.length - 4)
        } else if (priceValue.split('|')[3] >= 100 && priceValue.split('|')[3] < 1000) {
            c = priceValue.substring(0, priceValue.length - 5)
        }
        console.log(priceValue.split('|')[3])
        pricebtn.value = `${c}${num}|${h}`
        total += (price * num);
        document.getElementById('totalAmount').value = total;
    }
}

function dropitem() {
    if (cart_list.length == 1) {
        storage['cart_list'] = '';
    } else {
        //尋找陣列中跟item[0].id一樣的字串刪除
        for (let i in cart_list) {
            if (cart_list[i] == `${item[0].id}`) {
                //切割掉指定字串
                cart_list.splice(i, 1);
                //將陣列重組成字串
                cart_list = cart_list.toString() + ',';
                //存回storage['cart_list']
                storage['cart_list'] = cart_list;
                //跳出迴圈
                break;
            }

        }

    }
}