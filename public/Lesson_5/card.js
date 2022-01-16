Vue.component('card',
    {
        template:`
        <div class="card">
            <h3>{{good.title}}</h3>
            <p>{{good.price}}$</p>
            <button :data-id="good.id">Купить</button>
        </div>
        `,
        props:['good'],
        methods: {
            onClick() {
                this.$emit('cart-close')
            }
        }
    }
            )
