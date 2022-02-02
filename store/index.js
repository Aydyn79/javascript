import { createStore } from 'vuex'

const API_URL = "http://localhost:3000/api/v1";

export default createStore({
  state: {
    showcase: [],
    cart: []
  },
  getters: {
    getCart: (state) => state.cart.slice(),
    getShowcase: (state) => state.showcase.slice(),
    getShCsBySerch: (state) => state.showcase.filter((product) => new RegExp(state.searchstring, 'i'))
  },
  mutations: {
    setShowcase: (state, payload) => state.showcase = payload,
    addToCart: (state, payload) => state.cart.push(payload),
    removeFromCart: (state, id) => {
      const index = state.cart.findIndex((item) => item.id == id);
      state.cart.splice(index, 1);
    }
  },
  actions: {
    loadShowcase({ commit }) {
      fetch(`${API_URL}/showcase`)
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          commit('setShowcase', data);
        });
    },
    loadCart({ commit }) {
      fetch(`${API_URL}/cart`)
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          data.forEach((product) => commit('addToCart', product))
        });
    },
    addToCart({ commit }, product) {
      fetch(`${API_URL}/cart`, {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify(product),
      }).then(() => {
        commit('addToCart', product)
      });
    },
    removeFromCart({ commit }, product) {
      fetch(`${API_URL}/cart`, {
        method: "DELETE",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify(product),
      }).then(() => {
        commit('removeFromCart', product.id)
      });
    }
  },
  modules: {
  }
})
