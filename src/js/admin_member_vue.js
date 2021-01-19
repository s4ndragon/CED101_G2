new Vue({
    el: '#app',
    data: {
        mem_id: '',
        members: '',
        MEM_NO: '',
        MEM_STATUS: '',
        lightBox_show: false,
		inner_text:'',
		inner_btn_text:'',
    },

    methods: {
        //函數放這裡

        get_mems: async function () {
            const res = await fetch('./phps/admin_GetMembers.php', {
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
            this.members = res
        },

        query_mem_id: async function () {
            // console.log(this.mem_id)

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
            }).then(function (data) {
                return data.json()
            })
            this.members = res

            //查詢完後清空輸入的內容
            this.mem_id = ''
        },

        edit_status: async function (MEM_NO, key) {
            if (this.members[key].ischecked == false) {
                this.MEM_STATUS = 0
            } else if (this.members[key].ischecked == true) {
                this.MEM_STATUS = 1
            }

            const res = await fetch('./phps/admin_UpdMemStatus.php', {
                method: 'POST',
                mode: 'same-origin',
                credentials: 'same-origin',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    MEM_NO: MEM_NO,
                    MEM_STATUS: this.MEM_STATUS,
                }),
            })

            //燈箱
            this.lightBox_show = true
            this.inner_text = '已修改完成'
            this.inner_btn_text = '資料已寫入，請安心關閉'

            this.get_mems()
        },
    },

    created() {
        this.get_mems()
    },
})
