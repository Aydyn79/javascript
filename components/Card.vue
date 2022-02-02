<template>
  <!-- <div class="card">

    <h3>{{ good.title }}</h3>
    <p>{{ good.price }}$</p>
    <button :data-id="good.id" v-on:click="onClick">{{ actionname }}</button>
  </div> -->
  <div class="card_item">
    <div class="overlay">
      <button class="btn-cart" :data-id="good.id" v-on:click="onClick">
        <img
          class="btn_img"
          :src="require(`../assets/img/header/shop-cart.svg`)"
          alt="cart"
        />{{ actionname }}
      </button>
    </div>
    <div class="card-link">
      <img class="cart-item-img" :src="getImgUrl(good.src)" alt="card" />

      <div class="text_card">
        <span class="card_title">{{ good.title }}</span>
        <p class="card_subtitle">
          {{ good.description }}
        </p>
        <span class="card_price pink_text"
          >Доступные размеры: {{ getSizes(good.size) }}</span
        >
        <br />
        <span class="card_price pink_text">{{ good.price }}$</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "card",
  props: ["good", "actionname"],
  methods: {
    onClick() {
      this.$emit("cardaction", this.good);
    },
    getImgUrl(pic) {
      return require("../assets/img/new arrivals/" + pic);
    },
    getSizes(size) {
      let strSize = "";
      if (typeof size === "string") {
        return size;
      } else {
        size.forEach((element) => {
          if (element != size[size.length - 1]) {
            strSize += element + ",";
          } else {
            strSize += element;
          }
        });
        return strSize;
      }
    },
  },
};
</script>

<style src="../assets/css/style.css" scoped></style>
<style src="../assets/css/fonts.css" scoped></style>
<style src="../assets/css/normalize.css" scoped></style>
