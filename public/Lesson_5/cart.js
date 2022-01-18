

Vue.component('cart',
    {
        template: `
            <div class="modal">
                <button v-on:click="onClick">close</button>
                <div class="cart-list">
                    <card v-for="item of list" :good="item" :actionname="'удалить'"></card>
                </div>
            </div>`
        ,
        props: ['list'],
        // data: function () {
        //     return {
        //         showcase: this.list,
        //         cart: []
        //     }
        // },
        methods: {
            onClick() {
                this.$emit('cart-close')
            }
            // onBI(id) {
            //     const product = this.showcase.find((good) => good.id == id)
            //     fetch(
            //         `${API_URL}/cart`,
            //         {
            //             method: "POST",
            //             headers: { "Content-type": "application/json" },
            //             body: JSON.stringify(product)
            //         })
            //         .then(this.cart.push(product))
            // }
        }
    }
)