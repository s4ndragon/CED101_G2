new Vue({
	el: '#app',
	data: {
        //放click 事件 和v-model後面的變數
        gardens_MegReports: '',
        diss_MegReports: '',
        diss_ArtReports: '',
       
		
	},
	
	
	
    methods: {//函數放這裡
        
        get_gardens_MegReports:async function () {
				const res = await fetch('./phps/admin_GetGardsMsgReport.php', {
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
			this.get_gardens_MegReports = res
        },
        
        get_diss_MegReports:async function () {
            const res = await fetch('./phps/admin_GetDissMsgReport.php', {
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
        this.get_diss_MegReports = res
    },

    get_diss_ArtReports:async function () {
        const res = await fetch('./phps/admin_GetDissArtReport.php', {
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
    this.get_diss_ArtReports = res
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
        this.get_gardens_MegReports()
        this.get_diss_MegReports()
        this.get_diss_ArtReports()
     
	},
})


