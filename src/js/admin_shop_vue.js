new Vue({
	el: '#app',
	data: {
        //放click 事件 和v-model後面的變數
        products: '',
        orders: '',
       
		
	},
	
	
	
    methods: {//函數放這裡
        
        get_produs:async function () {
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
			
			}).then(function(data){
				return data.json()
			})
			//完成後 重新撈取一次資料 把res回傳到members裡面
			this.products = res
        },
        
        get_orders:async function () {
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
        
        }).then(function(data){
            return data.json()
        })
        //完成後 重新撈取一次資料 把res回傳到members裡面
        this.orders = res
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


	created(){
        this.get_produs()
        this.get_orders()
     
	},
})


