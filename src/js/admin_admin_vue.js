new Vue({
	el: '#app',
	data: {
		// add_no: '', // auto-increment 不能新增
		add_id: '',
		add_name: '',
		add_psw: '',
		admins:'',
	},
	
	methods: {//函數放這裡
		get_admins:async function () {
			const res = await fetch('./phps/admin_GetAdmins.php', {
				method: 'POST',
				mode: 'same-origin',
				credentials: 'same-origin',
				headers: {
					'Content-Type': 'application/json',
				},
				// body: JSON.stringify({
				// 	// add_no: this.add_no,
				// 	add_id: this.add_id,
				// 	add_name: this.add_name,
				// 	add_psw: this.add_psw,
				// }),
			}).then(function(data){
				return data.json()
			})
			//完成後 重新撈取一次資料 把res回傳到admins裡面
			this.admins = res
		},
		
		
		insert_admins: async function () {
			const res = await fetch('./phps/admin_InsertAdmins.php', {
				method: 'POST',
				mode: 'same-origin',
				credentials: 'same-origin',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					//add_no是自動增號
					// add_no: this.add_no,
					add_id: this.add_id,
					add_name: this.add_name,
					add_psw: this.add_psw,
				}),
			})
			//新增完後清空輸入的內容
			this.add_id = this.add_name = this.add_psw =''
			//重新撈取更新後的全部資料
			this.get_admins()
		},


		delete_admins: async function (ADMIN_NO) {
			console.log(ADMIN_NO)
			const res = await fetch('./phps/admin_DelAdmins.php', {
				method: 'POST',
				mode: 'same-origin',
				credentials: 'same-origin',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					ADMIN_NO: ADMIN_NO,
					// add_id: this.add_id,
					// add_name: this.add_name,
					// add_psw: this.add_psw,

				}),
				
			})
			//重新撈取一次細項列表
			this.get_admins(this.ADMIN_NO)

			}
			
		},


	created(){
		this.get_admins()
	},
})


