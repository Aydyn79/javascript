<template>
  <div class="home">
    <header>
      <button v-on:click="onCartOpen" type="button">Ваша корзина</button>
    </header>
    <main>
      <showcase></showcase>
    </main>
    <cart
      v-if="isCartVisible"
      :list="cart"
      v-on:removefromcart="onRemoveFromCart"
      v-on:cart-close="onCartOpen"
    ></cart>
  </div>
</template>

<script>

import cart from "../components/Cart.vue";
import showcase from "../components/Showcase.vue";

export default {
  name: "Home",
  components: {
    cart, showcase
  },
  data() {
    return {
      isCartVisible: false,
    };
  },
  methods: {
    onCartOpen() {
      this.isCartVisible = !this.isCartVisible;
      // console.log(this.cart[0].title);
    }
  }
};
</script>
