window.addEventListener('load', init)

function init() {

    usePoint = document.getElementById('usePoint');
    usePoint.addEventListener('click', () => {
        document.getElementById('pointTable').setAttribute('style', 'display:block');
    })
    usePointbtn = document.getElementById('usePointbtn');
    usePointbtn.addEventListener('click', () => {
        if (confirm('使用優惠點數?')) {
            document.getElementById('pointTable').setAttribute('style', 'display:none');
        }
    })
    document.getElementById('cancel').addEventListener('click', () => {
        document.getElementById('pointTable').setAttribute('style', 'display:none');
    })
    let costPoint = document.getElementById('costPoint'),
        myPoint = document.getElementById('myPoint'),
        totalAmount = document.getElementById('totalAmount'),
        discountprice = document.getElementById('discountprice'),
        maxPoint;
    calcMaxpoint();
    // totalAmount.addEventListener('change', calcMaxpoint);

}

function calcMaxpoint() {
    console.log(totalAmount.value)
    if (parseInt(totalAmount.value) < parseInt(myPoint.value)) {
        maxPoint = totalAmount.value;
    } else {
        maxPoint = myPoint.value
    }
    costPoint.setAttribute('max', `${maxPoint}`);
}