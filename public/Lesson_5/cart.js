Vue.component('cart',
    {
        template: `
            <div class="modal">
                <button v-on:click="onClick">close</button>
                <div class="cart-list">
                    <card v-for="item of list" :good="item" :actionname="'удалить'" v-on:clack="remove"></card>
                </div>
            </div>`
        ,
        props: ['list'],
        data: function () {
            return {
                cart: this.list
            }
        },
        methods: {
            onClick() {
                this.$emit('cart-close')
            },
            remove(id) {
                const product_id = this.cart.findIndex((good) => good.id == id)
                console.log(product_id)
                fetch(
                    `${API_URL}/cart`,
                    {
                        method: "DELETE",
                        headers: { "Content-type": "application/json" },
                        body: JSON.stringify(this.cart[product_id])
                    })
                    .then(() => {
                        this.cart.splice(product_id, 1)
                    })
            }
        }
    }
)



