new Vue({
	el: '#app',
	data: {
        //放click 事件 和v-model後面的變數
        gard_id:'',
        RESTAURANT_ID:'',
        HOTEL_ID:'',
        gardens:'',
        rests:'',
        hotels:'',
		
	},
	
	
	
    methods: {//函數放這裡
        
        get_gards:async function () {
				const res = await fetch('./phps/admin_GetGards.php', {
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
			//完成後 重新撈取一次資料 把res回傳到gardens裡面
			this.gardens = res
        },
        
        get_rests:async function () {
            const res = await fetch('./phps/admin_GetRests.php', {
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
        //完成後 重新撈取一次資料 把res回傳到rests裡面
        this.rests = res
    },

    get_hotels:async function () {
        const res = await fetch('./phps/admin_GetHotels.php', {
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
    this.hotels = res
},

query_gard_id: async function () {
    console.log(this.gard_id)

    const res = await fetch('./phps/admin_QueGards.php', {
        method: 'POST',
        mode: 'same-origin',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            gard_id: this.gard_id,
        }),
    }).then(function(data){
        return data.json()
    })
    this.gardens = res

    //查詢完後清空輸入的內容
    this.gard_id =''

    
  
    }
},


	created(){
        this.get_gards()
        this.get_rests()
        this.get_hotels()
	},
})


