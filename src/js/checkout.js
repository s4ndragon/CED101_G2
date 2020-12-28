window.addEventListener('load', () => {
    let items = document.getElementById('items');
    for (let i = 0; i < 6; i++) {
        let newitem = document.createElement('li');
        newitem.innerHTML = `
    
            <div class="img"><img src="./images/shopping/product.jpg" alt=""></div>
            <div class='aside'>
            <h4 class="prodtitle">
            不鏽鋼琺瑯真空保溫瓶-玫瑰粉(360ml)-</h4>
            <div>數量:<span>1</span></div>
            <div>價格:<span>1280</span></div>
            </div>
                        `;
        items.appendChild(newitem);
    }
})