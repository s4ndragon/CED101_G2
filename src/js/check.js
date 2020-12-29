window.addEventListener('load', init)

function init() {
    payDisplay();
    let pay = document.getElementById('pay'),
        atmAccount = document.getElementById('atmAccount');
    pay.addEventListener('change', payDisplay)

}

function payDisplay() {
    if (pay.value == 'atm') {
        atmAccount.setAttribute('style', 'display:table-row')
    } else {
        atmAccount.setAttribute('style', 'display:none')
    }
}