new Vue({
	el: '#app',
	data: {
        //放click 事件 和v-model後面的變數
		products: '',
		Delprodus:'',
		orders: '',
		//#1
		selecteddealState:'',
		dealStates:['未付款', '已付款', '未出貨', '已出貨'],
		// #2
		// selectSTATE:'',
		// STAlists: [
		// 	{val:"0",item:'未付款'},
		// 	{val:"1",item:'已付款'},
		// 	{val:"2",item:'未出貨'},
		// 	{val:"3",item:'已出貨'},
		// ],
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
		
		get_Delprodus:async function () {
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
			
		}).then(function(data){
			return data.json()
		})
		//完成後 重新撈取一次資料 把res回傳到members裡面
		this.Delprodus = res
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
	
	change(event,key){
		console.log(key)
		this.products[key].NAME = event.currentTarget.value
		this.products[key].INFO = event.currentTarget.value
		this.products[key].PRICE = event.currentTarget.value
	}



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
		this.get_Delprodus()
        this.get_orders()
     
	},
})


