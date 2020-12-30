window.addEventListener('load', init)

function $id(id) { //尋找id
    return document.getElementById(`${id}`);
}

function init() {
    payDisplay();
    // let pay = document.getElementById('pay');
    let pay = $id('pay');
    pay.addEventListener('change', payDisplay);
    $id('getinfo').addEventListener('click', storeInfo);

}

function payDisplay() {
    let atmAccount = $id('atmAccount');
    if (pay.value == 'atm') {
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
    location.href = './04_checkout.html'
}