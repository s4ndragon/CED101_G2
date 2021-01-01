let tourBlock = document.getElementsByClassName("tourCreate_item_block")[0];
let helpText = document.getElementsByClassName("help_text");
let getRightsideLocal = document.getElementsByClassName('local_rightside_img')[0];
let getRightsideHotel = document.getElementsByClassName('hotel_rightside_img')[0];
let getRightsideRest = document.getElementsByClassName('rest_rightside_img')[0];
let getRightsideActive = document.getElementsByClassName('active_rightside_img')[0];
let greenLine = document.getElementById("greenline");

window.addEventListener("load", function () {
    let localNum = 9;
    for (let i = 0; i < localNum; i++) {
        let newitem = document.createElement('div');
        tourBlock.appendChild(newitem);
        newitem.setAttribute('class', 'tourCreate_item');
        newitem.innerHTML = `
                     <div class="tourCreate_item_img">
                        <img src="./images/vote/tea.jpg" alt="">
                     </div>
                   <p>八卦山茶園</p>
                `
        let localChoice = document.getElementsByClassName('tourCreate_item')[i];
        localChoice.addEventListener('click', addLocal);
        // ==================changeBtn==============================
        local.style.color = "#69994e";
        local.style.backgroundColor = "#fff";
        hotel.style.visibility = "hidden";
        rest.style.visibility = "hidden";
        active.style.visibility = "hidden";
        local.setAttribute('disabled', 'daisabled');

        helpText[0].innerText = "請選擇要去的茶園!!";
        helpText[1].innerText = "請選擇要去的茶園!!";
    }
})
function addLocal() {
    if (getRightsideLocal.childNodes.length < 1) {
        let newLocal = document.createElement('div');
        getRightsideLocal.appendChild(newLocal);
        newLocal.setAttribute('class', 'local_block');
        newLocal.innerHTML = `
                <div class="local_img">
                            <img src="./images/vote/tea.jpg" alt="">
                        </div>
                        <div class="local_text">
                            <h2>舞鶴茶園
                                <span class="t1">茶園</span>
                            </h2>
                            <p>海拔100至300公尺的舞鶴台地，依傍高聳的中央山脈，隨風拂來秀姑巒溪與紅葉溪的濕潤水氣，宜人的氣候適合茶樹生長，是天鶴茶的產地，也是小葉綠蟬生長的天堂，經由小葉綠蟬吸吮而製成的蜜香紅茶，微帶淡淡的果香與蜜香，口感溫潤生津，獨特的風味聞名全臺，成為旅人來訪瑞穗必帶的伴手禮之一。
                            </p>
                        </div>
                        <button id="removeNewLocal" >X</button>
                    `;
        let removeLocal = document.getElementById("removeNewLocal");
        removeLocal.addEventListener("click", removeNewLocal);
        hotel.style.visibility = "visible";
        rest.style.visibility = "visible";
        active.style.visibility = "visible";
        greenLine.setAttribute("style", "display:block");

        // ==================change helper text=====================

        helpText[0].innerText = "請選擇要住的旅館!! (限一個)"
        helpText[1].innerText = "請選擇要住的旅館!! (限一個)"

    };
}
function removeNewLocal() {
    getRightsideLocal.innerHTML = "";
    getRightsideHotel.innerHTML = "";
    getRightsideRest.innerHTML = "";
    getRightsideActive.innerHTML = "";
    showLocal();
    hotel.style.visibility = "hidden";
    rest.style.visibility = "hidden";
    active.style.visibility = "hidden";
    greenLine.removeAttribute("style");

};



// ==================================localBtn=============================================
let local = document.getElementById('local');
local.addEventListener('click', showLocal);
function showLocal() {
    tourBlock.innerHTML = "";
    let localNum = 8;
    for (let i = 0; i < localNum; i++) {
        let newitem = document.createElement('div');
        tourBlock.appendChild(newitem);
        newitem.setAttribute('class', 'tourCreate_item');
        newitem.innerHTML = `
                <div class="tourCreate_item_img">
                        <img src="./images/vote/tea.jpg" alt="">
                    </div>
                    <p>八卦山茶園</p>
                    
                `;
        let localChoice = document.getElementsByClassName('tourCreate_item')[i];
        localChoice.addEventListener('click', addLocal);
        // ==================changeBtn==============================
        local.style.color = "#69994e";
        local.style.backgroundColor = "#fff";
        hotel.removeAttribute('style');
        active.removeAttribute('style');
        rest.removeAttribute('style');
        local.setAttribute('disabled', 'daisabled');




        // ==================change helper text=====================
        helpText[0].innerText = "請選擇要去的茶園!!"
        helpText[1].innerText = "請選擇要去的茶園!!"
    }
};

// =================================hotelBtn============================================
let hotel = document.getElementById('hotel');
hotel.addEventListener('click', showHotel);
function showHotel() {
    tourBlock.innerHTML = "";
    let hotelNum = 2;
    for (let i = 0; i < hotelNum; i++) {
        let newitem = document.createElement('div');
        tourBlock.appendChild(newitem);
        newitem.setAttribute('class', 'tourCreate_item');
        newitem.innerHTML = `
                <div class="tourCreate_item_img">
                        <img src="./images/tour/hotel1.jpg" alt="">
                    </div>
                    <p>伊豆溫泉旅館</p>
                `;
        let hotelChoice = document.getElementsByClassName('tourCreate_item')[i];
        hotelChoice.addEventListener('click', addhotel);

        // ==================changeBtn==============================
        this.style.color = "#69994e";
        this.style.backgroundColor = "#fff";
        local.removeAttribute('style');
        active.removeAttribute('style');
        rest.removeAttribute('style');
        local.removeAttribute('disabled');


    }
};

function addhotel() {
    console.log(getRightsideHotel);
    console.log(getRightsideHotel.childNodes.length);
    if (getRightsideHotel.childNodes.length < 1) {
        let newHotel = document.createElement('div');
        getRightsideHotel.appendChild(newHotel);
        newHotel.setAttribute('class', 'local_block');
        newHotel.innerHTML = `
                <div class="local_img">
                            <img src="images/vote/hotel.jpg" alt="">
                        </div>
                        <div class="local_text">
                            <h2>瑞穗天合國際觀光酒店
                                <span class="t2">住宿</span>
                            </h2>
                            <p>整體設計以南歐莊園風格為主，風光明媚的山水以及豐富的人文及自然生態，將花蓮瑞穗美景盡收眼底。
                            </p>
                        </div>
                        <button id="removeNewHotel" >X</button>
                    `;
        let removeHotel = document.getElementById("removeNewHotel");
        removeHotel.addEventListener("click", removeNewHotel);
        function removeNewHotel() {
            getRightsideHotel.removeChild(newHotel);
        };
        // ==================change helper text=====================

        helpText[0].innerText = "請選擇用餐的餐廳!! (最多三個)";
        helpText[1].innerText = "請選擇用餐的餐廳!! (最多三個)";
    }
}



// =================================restaurantBtn========================================
let rest = document.getElementById('restaurant');
rest.addEventListener('click', showRest);
function showRest() {
    tourBlock.innerHTML = "";
    let restNum = 6;
    for (let i = 0; i < restNum; i++) {
        let newitem = document.createElement('div');
        tourBlock.appendChild(newitem);
        newitem.setAttribute('class', 'tourCreate_item');
        newitem.innerHTML = `
                <div class="tourCreate_item_img">
                        <img src="./images/tour/restaurant1.jpg" alt="">
                    </div>
                    <p>好吃餐廳</p>
                `;
        let restChoice = document.getElementsByClassName('tourCreate_item')[i];
        restChoice.addEventListener('click', addRest);

        // ==================changeBtn==============================
        this.style.color = "#69994e";
        this.style.backgroundColor = "#fff";
        local.removeAttribute('style');
        active.removeAttribute('style');
        hotel.removeAttribute('style');
        local.removeAttribute('disabled');

    }
};
function addRest() {
    console.log(getRightsideRest);
    console.log(getRightsideRest.childNodes.length);
    if (getRightsideRest.childNodes.length < 3) {
        let newRest = document.createElement('div');
        getRightsideRest.appendChild(newRest);
        newRest.setAttribute('class', 'local_block');
        newRest.innerHTML = `
                <div class="local_img">
                            <img src="images/vote/cafe.jpg" alt="">
                        </div>
                        <div class="local_text">
                            <h2>好茶咖啡工作室
                                <span class="t3">餐廳</span>
                            </h2>
                            <p>Ba han han non - 阿美族語何不休息一下，品茗伴隨陣陣咖啡香，一同品味蜜香紅茶與迦納咖啡的風味。
                            </p>
                        </div>
                        <button id="removeNewRest" >X</button>
                    `;
        let removeRest = document.getElementById("removeNewRest");
        newRest.addEventListener("click", removeNewRest);
        function removeNewRest() {
            getRightsideRest.removeChild(newRest);
        };
        // ==================change helper text=====================
        helpText[0].innerText = "請選擇想參加的活動!! (三擇一)"
        helpText[1].innerText = "請選擇想參加的活動!! (三擇一)"

    }
}

// ========================active=================================================
let active = document.getElementById('active');
let newActive = document.getElementsByClassName('active');

active.addEventListener('click', showActive);
function showActive() {
    tourBlock.innerHTML = "";
    tourBlock.innerHTML = `
    <div class="tourCreate_item active ">
        <div class="tourCreate_item_img">
            <img src="./images/tour/maktea1.jpg" alt="">
        </div>
        <p>傳統手工採茶</p>
    </div>
    <div class="tourCreate_item active">
        <div class="tourCreate_item_img">
            <img src="./images/tour/maktea2.jpg" alt="">
        </div>
        <p>烘培製茶技術</p>
    </div>
    <div class="tourCreate_item active">
        <div class="tourCreate_item_img">
            <img src="./images/tour/maktea3.jpg" alt="">
        </div>
        <p>專業品茶體驗</p>
    </div>
    `;
    // ==================changeBtn==============================
    this.style.color = "#69994e";
    this.style.backgroundColor = "#fff";
    local.removeAttribute('style');
    hotel.removeAttribute('style');
    rest.removeAttribute('style');
    local.removeAttribute('disabled');


    newActive[0].addEventListener("click", addActive1);
    newActive[1].addEventListener("click", addActive2);
    newActive[2].addEventListener("click", addActive3);
};
function addActive1() {
    getRightsideActive.innerHTML = `
    <div class="local_block">
        <div class="local_img">
          <img src="./images/tour/maktea1.jpg" alt="">
          </div>
        <div class="local_text">
         <h2>傳統手工採茶
             <span class="t4">活動</span>
          </h2>
             <p>頭戴花巾斗笠，腰細竹編茶簍，隨著導覽員的腳步在茶園中穿梭，親眼辨識茶樹母本園內10種以上茶種，親身尋覓一心二葉採菁的感動，親手揉製屬於自己的手感茶葉，在品嚐圓滿實在的採茶人便當與回甘好茶後，更可攜回自己烘焙的手製茶品。
             零距離的茶園體驗，一趟五感認知茶人生活日常的旅程。
            </p>
         </div>
      <button id="removeNewAct">X</button>
    </div>
    `;
    let removeAct = document.getElementById("removeNewAct");
    removeAct.addEventListener("click", removeNewAct);
}

function addActive2() {
    getRightsideActive.innerHTML = `
    <div class="local_block">
        <div class="local_img">
          <img src="./images/tour/maktea2.jpg" alt="">
          </div>
        <div class="local_text">
         <h2>烘培製茶技術
             <span class="t4">活動</span>
          </h2>
             <p>頭戴花巾斗笠，腰細竹編茶簍，隨著導覽員的腳步在茶園中穿梭，親眼辨識茶樹母本園內10種以上茶種，親身尋覓一心二葉採菁的感動，親手揉製屬於自己的手感茶葉，在品嚐圓滿實在的採茶人便當與回甘好茶後，更可攜回自己烘焙的手製茶品。
             零距離的茶園體驗，一趟五感認知茶人生活日常的旅程。
            </p>
         </div>
      <button id="removeNewAct">X</button>
    </div>
    `;
    let removeAct = document.getElementById("removeNewAct");
    removeAct.addEventListener("click", removeNewAct);
}

function addActive3() {
    getRightsideActive.innerHTML = `
    <div class="local_block">
        <div class="local_img">
          <img src="./images/tour/maktea1.jpg" alt="">
          </div>
        <div class="local_text">
         <h2>專業品茶體驗
             <span class="t4">活動</span>
          </h2>
             <p>頭戴花巾斗笠，腰細竹編茶簍，隨著導覽員的腳步在茶園中穿梭，親眼辨識茶樹母本園內10種以上茶種，親身尋覓一心二葉採菁的感動，親手揉製屬於自己的手感茶葉，在品嚐圓滿實在的採茶人便當與回甘好茶後，更可攜回自己烘焙的手製茶品。
             零距離的茶園體驗，一趟五感認知茶人生活日常的旅程。
            </p>
         </div>
      <button id="removeNewAct">X</button>
    </div>
    `;
    let removeAct = document.getElementById("removeNewAct");
    removeAct.addEventListener("click", removeNewAct);
}

function removeNewAct() {
    getRightsideActive.innerHTML = "";
};





