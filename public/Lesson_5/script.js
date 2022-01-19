// const { type } = require("express/lib/response");


const API_URL = 'http://localhost:3000/api/v1';


new Vue({
    el: "#app",
    data: {
        showcase: [],
        cart: [],
        isVisible: false
    },
    methods: {
        onCartShow() {
            this.isVisible = !this.isVisible;
        }

    },
    mounted() {
        fetch(`${API_URL}/showcase`)
            .then((res) => {
                return res.json()
            })
            .then((data) => {
                this.showcase = data;
            })

        fetch(`${API_URL}/cart`)
            .then((res) => {
                return res.json()
            })
            .then((data) => {
                this.cart = data;
            })
    }

})