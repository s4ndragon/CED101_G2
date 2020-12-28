window.addEventListener('load', init)

function init() {
    let storage = sessionStorage;
    if (storage['addItemList'] != "") {
        loadcart();
    }

    function loadcart() {
        let items = document.getElementById('items');
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