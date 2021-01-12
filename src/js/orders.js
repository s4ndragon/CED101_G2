vue = new Vue({
    el: '#app',
    data: {
        orderInfo: {},

    },
    methods: {


    },
    beforeCreate() {
        let storage = sessionStorage;
        let xhr = new XMLHttpRequest(),
            searchURL = window.location.search.split("=");
        var orderNo = searchURL[searchURL.length - 1];
        //寫入收藏列表
        let url = "./phps/getOrderInfo.php";
        xhr.open("POST", url, true);
        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        let data_info = `orderNo=${orderNo}`;
        xhr.send(data_info);
        xhr.onload = function () {
            if (xhr.status == 200) {
                console.log(JSON.parse(xhr.responseText)[0]); //讀取json
                // console.log(xhr.responseText); //讀取字串
                vue.orderInfo = JSON.parse(xhr.responseText)[0];
            } else {
                alert(xhr.status);
            }
        }
    },
    computed: {}
});
Vue.component('item', {
    template: `
    `,
    data() {
        return {};
    }

})