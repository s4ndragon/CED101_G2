var storage = sessionStorage;
window.addEventListener('load', init);

function $id(id) { //尋找id
    return document.getElementById(`${id}`);
}

function init() {
    let pay = $id('pay');
    if (pay) {
        payDisplay();
        pay.addEventListener('change', payDisplay);
        $id('getinfo').addEventListener('click', storeInfo);
    }
    if (storage['addItemList'] != "") {
        loaditems();
    }
    loadinfo();

}

function payDisplay() {
    let atmAccount = $id('atmAccount'),
        pay = $id('pay');
    if (pay.value == 'ATM付款') {
        atmAccount.setAttribute('style', 'display:table-row')
    } else {
        atmAccount.setAttribute('style', 'display:none')
    }
}

function storeInfo() {
    let infoList = document.getElementsByClassName('info');
    for (let i = 0; i < infoList.length; i++) {
        storage[infoList[i].name] = infoList[i].value;
    };
    // location.href = './04_checkout.html'
}

function loadinfo() {
    let infoList = document.getElementsByClassName('info');
    for (let i = 0; i < infoList.length; i++) {
        if (storage[infoList[i].name]) {
            infoList[i].setAttribute('value', `${storage[infoList[i].name]}`);
        }
    }
    $id('total').value = parseInt($id('amount').value) - parseInt($id('discount').value);
}


function loaditems() {
    let items = document.getElementById('items');
    if (items) {
        let itemlist = storage['addItemList'];
        itemlist = itemlist.split(',');
        let itemlistLenght = itemlist.length - 1;
        let total = 0;
        for (let i = 0; i < itemlistLenght; i++) {
            itemValue = storage[itemlist[i]].split('|');
            itemName = itemValue[1];
            itemImg = itemValue[2];
            itemPrice = itemValue[3];
            itemNum = itemValue[4];
            itemPrice = itemPrice * itemNum;
            total += itemPrice;
            let newdiv = document.createElement('li');
            // newdiv.setAttribute('class', 'item');
            newdiv.innerHTML = `
                <div class="img"><img src="./images/shopping/${itemImg}" alt=""></div>
                <div class='aside'>
                <h4 class="prodtitle">${itemName}</h4>
                <div>數量:<span>${itemNum}</span></div>
                <input type="hidden" name="${itemlist[i]}" value="${itemlist[i]},${itemNum},${itemPrice}">
                <div>價格:<span>${itemPrice}</span></div>
                </div>
                `
            items.appendChild(newdiv);
        };
    }
}