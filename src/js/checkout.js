window.addEventListener('load', init)

var storage = sessionStorage;

function $id(id) { //尋找id
    return document.getElementById(`${id}`);
}

function init() {
    if (storage['addItemList'] != "") {
        loaditems();
    }
    loadinfo();
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
            itemPrice = itemValue[2];
            itemNum = itemValue[3];
            itemPrice = itemPrice * itemNum;
            total += itemPrice;
            let newdiv = document.createElement('li');
            // newdiv.setAttribute('class', 'item');
            newdiv.innerHTML = `
                <div class="img"><img src="./images/shopping/product2.jpg" alt=""></div>
                <div class='aside'>
                <h4 class="prodtitle">${itemName}</h4>
                <div>數量:<span>${itemNum}</span></div>
                <div>價格:<span>${itemPrice}</span></div>
                </div>
                `
            items.appendChild(newdiv);
        };
    }
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