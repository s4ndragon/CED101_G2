new Vue({
    el: '#app',
    data: {
        //放click 事件 和v-model後面的變數
        tours:'',
        tour_id_search: '',
        TOUR_ID: '',
        TOUR_STATUS:'',
    
  
    },

    methods: {
        //函數放這裡

        get_tour: async function () {
            const res = await fetch('./phps/admin_GetTours.php', {
                method: 'POST',
                mode: 'same-origin',
                credentials: 'same-origin',
                headers: {
                    'Content-Type': 'application/json',
                },
            }).then(function (data) {
                return data.json()
            })
            //完成後 重新撈取一次資料 把res回傳到tours裡面
            this.tours = res
        },

        query_tour: async function () {
            console.log(this.tour_id_search)

            const res = await fetch('./phps/admin_QueTours.php', {
                method: 'POST',
                mode: 'same-origin',
                credentials: 'same-origin',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    tour_id_search: this.tour_id_search,
                }),
            }).then(function (data) {
                return data.json()
            })
            this.tours = res

            //查詢完後清空輸入的內容
            this.tour_id_search = ''
        },

   
        // changeNAME(event, key) {
        //     console.log(key)
        //     this.products[key].NAME = event.currentTarget.value
        // },
        // changeINFO(event, key) {
        //     this.products[key].INFO = event.currentTarget.value
        // },
        // changePRICE(event, key) {
        //     this.products[key].PRICE = event.currentTarget.value
        // },

        edit_tours: async function (TOUR_ID, key) {
            if (this.tours[key].ischecked == false) {
                this.TOUR_STATUS = 0
            } else if (this.tours[key].ischecked == true) {
                this.TOUR_STATUS = 1
            }

            const res = await fetch('./phps/admin_UpdTourStatus.php', {
                method: 'POST',
                mode: 'same-origin',
                credentials: 'same-origin',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    TOUR_ID: TOUR_ID,
                    TOUR_STATUS: this.TOUR_STATUS,
                }),
            })

            this.get_tour()
        },

     

    },

    created() {
        this.get_tour()
       
    },
})
