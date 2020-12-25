window.addEventListener('load', () => {
    let items = document.getElementById('items');
    for (let i = 0; i < 6; i++) {
        let newitem = document.createElement('li');
        newitem.innerHTML = `
        
        <table>
        <tr>
            <td>
            <div class="img"><img src="./images/shopping/product.jpg" alt=""></div>
            </td>
            <td class="prodtitle">
            不鏽琺瑯真空保溫瓶-玫瑰粉(360ml)-
            </td>
        </tr>
        <tr>
            <td>數量:<span>1</span></td>
            <td>價格:<span>1280</span></td>
        </tr>
    </table>
                        `;
        items.appendChild(newitem);
    }
})