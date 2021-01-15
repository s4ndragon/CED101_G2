
new Vue({
    el: '#app',
    data: {
        //放click 事件 和v-model後面的變數
        gardMsgId:'',//茶園留言的檢舉管理
        DissMsgId:'',//討論區留言管理
        DissArtId:'',//討論區文章檢舉管理
        diss_MegReports: '',
        diss_ArtReports:'',
        gardens_MegReports: '',
          },

    methods: {
        //函數放這裡

        get_gardens_MegReports: async function () {
            const res = await fetch('./phps/admin_GetGardsMsgReport.php', {
                method: 'POST',
                mode: 'same-origin',
                credentials: 'same-origin',
                headers: {
                    'Content-Type': 'application/json',
                },
            }).then(function (data) {
                return data.json()
            })
            //完成後 重新撈取一次資料 把res回傳到members裡面
            this.gardens_MegReports = res
        },

        get_diss_MegReports: async function () {
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
            }).then(function (data) {
                return data.json()
            })
            //完成後 重新撈取一次資料 把res回傳到members裡面
            this.diss_MegReports = res
        },

        get_diss_ArtReports: async function () {
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
            }).then(function (data) {
                return data.json()
            })
            //完成後 重新撈取一次資料 把res回傳
            this.diss_ArtReports = res
        },
        
        // 查詢茶園留言
        //query_gardMsg_id
        query_gardMsg_id: async function () {
			console.log(this.gardMsgId)

			const res = await fetch('./phps/admin_QueGardMsgReport.php', {
				method: 'POST',
				mode: 'same-origin',
				credentials: 'same-origin',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					gardMsgId: this.gardMsgId,
				}),
			}).then(function(data){
				return data.json()
			})
			this.gardens_MegReports = res

			//查詢完後清空輸入的內容
			this.gardMsgId =''

		},

        // 查詢討論區文章留言
        query_DissArt_id: async function () {
			console.log(this.DissArtId)

			const res = await fetch('./phps/admin_QueDissArt.php', {
				method: 'POST',
				mode: 'same-origin',
				credentials: 'same-origin',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					DissArtId: this.DissArtId,
				}),
			}).then(function(data){
				return data.json()
			})
			this.diss_ArtReports = res

			//查詢完後清空輸入的內容
			this.DissArtId =''

		},

        // 查詢討論區留言
        query_DissMsg_id: async function () {
			console.log(this.DissMsgId)

			const res = await fetch('./phps/admin_QueDissMsgReport.php', {
				method: 'POST',
				mode: 'same-origin',
				credentials: 'same-origin',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					DissMsgId: this.DissMsgId,
				}),
			}).then(function(data){
				return data.json()
			})
			this.diss_MegReports = res

			//查詢完後清空輸入的內容
			this.DissMsgId =''

		}

        


    },

    created() {
        this.get_gardens_MegReports()
        this.get_diss_MegReports()
        this.get_diss_ArtReports()
    },
})
