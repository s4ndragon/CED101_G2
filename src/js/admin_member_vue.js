new Vue({
	el: '#app',
	data: {
        mem_id: '',
        members:'',
		
	},
	
	
	
    methods: {//函數放這裡
        
        get_mems:async function () {
				const res = await fetch('./phps/admin_GetMembers.php', {
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
			this.members = res
		},

		query_mem_id: async function () {
			console.log(this.mem_id)

			const res = await fetch('./phps/admin_QueMembers.php', {
				method: 'POST',
				mode: 'same-origin',
				credentials: 'same-origin',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					mem_id: this.mem_id,
				}),
			}).then(function(data){
				return data.json()
			})
			this.members = res

			//查詢完後清空輸入的內容
			this.mem_id =''

		}
		
	},


	created(){
		this.get_mems()
	},
})


