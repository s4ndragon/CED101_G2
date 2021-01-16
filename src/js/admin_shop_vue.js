new Vue({
    el: '#app',
    data: {
        //放click 事件 和v-model後面的變數
        products: '',
        Delprodus: '',
        orders: '',
        selecteddealState: '',
        dealStates: ['0(未付款)', '1(已付款)', '2(未出貨)', '3(已出貨)'],
        ONSALE: '',
        psn:'',
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
            }).then(function (data) {
                return data.json()
            })
            //完成後 重新撈取一次資料 把res回傳到products裡面
            this.products = res
        },

        get_orders: async function () {
            const res = await fetch('./phps/admin_GetOrders.php', {
                method: 'POST',
                mode: 'same-origin',
                credentials: 'same-origin',
                headers: {
                    'Content-Type': 'application/json',
                },
            }).then(function (data) {
                return data.json()
            })
            //完成後 重新撈取一次資料 把res回傳到orders裡面
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

        add_products(){
            const res = await fetch('./phps/admin_InsertProds.php', {
				method: 'POST',
				mode: 'same-origin',
				credentials: 'same-origin',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					//自動增號欄位無法新增 (無法新增psn)
					add_NAME: this.add_NAME,
					add_INFO: this.add_INFO,
					add_PRICE: this.add_PRICE,
				}),
			})
			//新增完後清空輸入的內容
			this.add_NAME = this.add_INFO = this.add_PRICE =''
			//重新撈取更新後的全部資料
			this.get_produs()
        },
        
        query_pro_psn: async function () {
            console.log(this.psn)
        
            const res = await fetch('./phps/admin_QueProds.php', {
                method: 'POST',
                mode: 'same-origin',
                credentials: 'same-origin',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    psn: this.psn,
                }),
            }).then(function(data){
                return data.json()
            })
            this.products = res
        
            //查詢完後清空輸入的內容
            this.psn =''
        
            },
    },

    created() {
        this.get_produs()
        this.get_orders()
    },
})
