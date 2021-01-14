new Vue({
    el: '#app',
    data: {
        //放click 事件 和v-model後面的變數
        products: '',
        Delprodus: '',
        orders: '',
        //#1
        selecteddealState: '',
        dealStates: ['未付款', '已付款', '未出貨', '已出貨'],
        // #2
        // selectSTATE:'',
        // STAlists: [
        // 	{val:"0",item:'未付款'},
        // 	{val:"1",item:'已付款'},
        // 	{val:"2",item:'未出貨'},
        // 	{val:"3",item:'已出貨'},
		// ],
		ONSALE:"",
    },

    methods: {
        //函數放這裡

        get_produs: async function () {
            const res = await fetch('./phps/admin_GetProduts.php', {
                method: 'POST',
                mode: 'same-origin',
                credentials: 'same-origin',
                headers: {
                    'Content-Type': 'application/json',
                },
                // body: JSON.stringify({
                // 	add_no: this.add_no,
                // 	add_id: this.add_id,
                // 	add_name: this.add_name,
                // 	add_psw: this.add_psw,

                // }),
            }).then(function (data) {
                return data.json()
            })
            //完成後 重新撈取一次資料 把res回傳到members裡面
            this.products = res
        },

        get_Delprodus: async function () {
            const res = await fetch('./phps/admin_GetDelProduts.php', {
                method: 'POST',
                mode: 'same-origin',
                credentials: 'same-origin',
                headers: {
                    'Content-Type': 'application/json',
                },
                // body: JSON.stringify({
                // 	add_no: this.add_no,
                // 	add_id: this.add_id,
                // 	add_name: this.add_name,
                // 	add_psw: this.add_psw,

                // }),
            }).then(function (data) {
                return data.json()
            })
            //完成後 重新撈取一次資料 把res回傳到members裡面
            this.Delprodus = res
        },

        get_orders: async function () {
            const res = await fetch('./phps/admin_GetOrders.php', {
                method: 'POST',
                mode: 'same-origin',
                credentials: 'same-origin',
                headers: {
                    'Content-Type': 'application/json',
                },
                // body: JSON.stringify({
                // 	add_no: this.add_no,
                // 	add_id: this.add_id,
                // 	add_name: this.add_name,
                // 	add_psw: this.add_psw,

                // }),
            }).then(function (data) {
                return data.json()
            })
            //完成後 重新撈取一次資料 把res回傳到members裡面
            this.orders = res
        },

        changeNAME(event, key) {
            console.log(key)
            this.products[key].NAME = event.currentTarget.value
        },
        changeINFO(event, key) {
            this.products[key].INFO = event.currentTarget.value
        },
        changePRICE(event, key) {
            this.products[key].PRICE = event.currentTarget.value
        },

        edit_products: async function (PSN, key) {
            if (this.products[key].ischecked == false) {
                this.ONSALE = 0
            } else if (this.products[key].ischecked == true) {
                this.ONSALE = 1
            }

            const res = await fetch('./phps/admin_UpdProduts.php', {
                method: 'POST',
                mode: 'same-origin',
                credentials: 'same-origin',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    PSN: PSN,
                    NAME: this.products[key].NAME,
                    INFO: this.products[key].INFO,
                    PRICE: this.products[key].PRICE,
                    ONSALE: this.ONSALE,
                }),
            })

            this.get_produs()
        },

        // query_mem_id: async function (mem_id) {
        // 	console.log(mem_id)

        // 	const res = await fetch('./phps/admin_QueMembers.php', {
        // 		method: 'POST',
        // 		mode: 'same-origin',
        // 		credentials: 'same-origin',
        // 		headers: {
        // 			'Content-Type': 'application/json',
        // 		},
        // 		body: JSON.stringify({
        // 			mem_id: this.mem_id,
        // 		}),
        // 	}).then(function(data){
        // 		return data.json()
        // 	})
        //   //重新撈取一次細項列表
        // 	this.get_mems(this.mem_id)
        // },
    },

    created() {
        this.get_produs()
        this.get_Delprodus()
        this.get_orders()
    },
})
