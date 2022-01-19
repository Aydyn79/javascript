

Vue.component('card',
    {
        template: `
        <div class="card">
            <h3>{{good.title}}</h3>
            <p>{{good.price}}$</p>
            <button :data-id="good.id" v-on:click="onBuy">{{actionname}}</button>
        </div>
        `,
        props: ['good', 'actionname'],
        methods: {
            onClick() {
                this.$emit('cart-close')
            },
            onBuy(event) {
                const btn = event.target;
                const id = btn.dataset.id
                this.$emit('clack', id)
            }
        }
    }
)
