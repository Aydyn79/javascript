

Vue.component('showcase',
    {
        template: `
        <div class="goods-list">
            <card v-for="item of list" :good="item" :actionname="'купить'" v-on:onBuyItem="onBI"></card>
        </div>
        `,
        props: ['list'],
        data: function () {
            return {
                showcase: this.list,
                cart: []
            }
        },
        methods: {
            onBI(id) {
                const product = this.showcase.find((good) => good.id == id)
                fetch(
                    `${API_URL}/cart`,
                    {
                        method: "POST",
                        headers: { "Content-type": "application/json" },
                        body: JSON.stringify(product)
                    })
                    .then(this.cart.push(product))
            }
        }
    }
)
