

Vue.component('showcase',
    {
        template: `
        <div class="goods-list">
            <card v-for="item of list" :good="item" :actionname="'купить'" v-on:clack="onBI"></card>
        </div>
        `,
        props: ['list'],
        // data() {
        //     return { sc:this.list, cart: [] } // не работает
        // },
        methods: {
            onBI(id) {
                const product = this.list.find((good) => good.id == id)
                console.log(this.list, "  ", id)
                fetch(
                    `${API_URL}/cart`,
                    {
                        method: "POST",
                        headers: { "Content-type": "application/json" },
                        body: JSON.stringify(product)
                    })
                    .then(console.log(product.title + " добавлен в корзину"))
            }
        }
    }
)
