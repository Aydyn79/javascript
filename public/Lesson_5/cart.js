Vue.component('cart',
    {
        template:`
            <div class="modal">
                <button v-on:click="onClick">close</button>
                <div class="cart-list">
                    <card v-for="item of list" :good="item" :action-name="'удалить'"></card>
                </div>
            </div>`
            ,
            props: ['list'],
            methods: {
                onClick() {
                this.$emit('cart-close')
            }
        }
    }
)