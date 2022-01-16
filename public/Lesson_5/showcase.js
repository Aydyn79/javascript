Vue.component('showcase',
    {
        template:`
        <div class="goods-list">
            <card v-for="item of list" :good="item"></card>
        </div>
        `,
        props:['list']
    }
)
