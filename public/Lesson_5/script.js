const API_URL = `http://localhost:3000`;

const urlGet = `${API_URL}/api/v1/showcase`;
const urlCart = `${API_URL}/api/v1/cart`;



function sendGet(url) {
  return new Promise(function (resolve, reject) {
    let req;

    if (window.XMLHttpRequest) {
      // Chrome, Mozilla, Opera, Safari
      req = new XMLHttpRequest();
    } else if (window.ActiveXObject) {
      // Internet Explorer
      req = new ActiveXObject("Microsoft.XMLHTTP");
    }

    req.open('GET', url)

    req.onload = function () {

      if (req.status < 400 && req.readyState === 4) {
        // Resolve the promise with the response text
        resolve(req.responseText);
      }
      else {
        // Otherwise reject with the status text
        // which will hopefully be a meaningful error
        reject(Error(req.statusText));
      }
    };

    // Handle network errors
    req.onerror = function () {
      reject(Error("Network Error"));
    };

    // Make the request
    req.send();
  });
}

function sendPost(url, data) {
  return new Promise(function (resolve, reject) {
    let req;

    if (window.XMLHttpRequest) {
      // Chrome, Mozilla, Opera, Safari
      req = new XMLHttpRequest();
    } else if (window.ActiveXObject) {
      // Internet Explorer
      req = new ActiveXObject("Microsoft.XMLHTTP");
    }

    req.open('GET', url)
    req.setRequestHeader('Content-Type', 'application/json');
    req.onload = function () {

      if (req.status < 400 && req.readyState === 4) {
        resolve(req.responseText);
      }
      else {
        reject(Error(req.statusText));

      }
    };

    req.onerror = function () {
      reject(Error("Network Error"));
    };
    const json = JSON.stringify(data);
    req.send(json);
  });
}

function getCounter() {
  let last = 0;
  return () => ++last;
}

const stackIDGenrator = getCounter()


class Good {
  constructor({ id, title, price }) {
    this.id = id;
    this.title = title;
    this.price = price;
  }

  getId() {
    return this.id;
  }

  getPrice() {
    return this.price;
  }

  getTitle() {
    return this.title;
  }

  render() {
    return `<tr><td>${this.id}</td><td>${this.title}</td><td>${this.price}</td></tr>`;
  }

}

class GoodStack {
  constructor(good) {
    this.id = stackIDGenrator();
    this.good = good;
    this.count = 1;
  }

  getGoodId() {
    return this.good.id
  }

  getGood() {
    return this.good;
  }

  getCount() {
    return this.count;
  }

  add() {
    this.count++;
    return this.count;
  }

  remove() {
    this.count--;
    return this.count;
  }

  render() {
    return `<tr><td>${this.good.getTitle()}</td><td>${this.count}</td><td>${this.good.getPrice()}</td><td>${this.good.getPrice() * this.count}</td></tr>`;
  }
}

class Cart {
  constructor() {
    this.list = [];

  }

  _onSuccess(response) {
    if (response) {
      const data = JSON.parse(response)
      // data.forEach(product => {
      // this.list.push(new Good({ id: product.id, title: product.title, price: product.price }))
      this.list.push(data)
      console.log(this.list)
      // });
    } else console.log('Корзина пуста')
  }

  _onError(err1, err2) {
    console.log(err1 + ': ' + err2);
  }


  add(good) {
    sendGet(urlCart).then(this._onSuccess.bind(this), this._onError.bind(this))
    const idx = this.list.findIndex((stack) => stack.getGoodId() == good.id);
    if (idx >= 0) {
      this.list[idx].add()
      sendPost(url, this.list).then(
        function (response) { console.log(response) },
        function (error) { console.error("Failed!", error) }
      )

    } else {
      const newGoodStack = new GoodStack(good);
      console.log(newGoodStack);
      sendPost(urlCart, newGoodStack).then(
        function (response) { console.log(response) },
        function (error) { console.error("Failed!", error) }
      )
    }
  }
  remove(id) {
    sendGet(urlCart).then(this._onSuccess.bind(this), this._onError.bind(this))
    const idx = this.list.findIndex((stack) => stack.getGoodId() == id)
    if (idx >= 0) {
      this.list[idx].remove
      sendPost(url, this.list).then(
        function (response) { console.log(response) },
        function (error) { console.error("Failed!", error) }
      )

    } else {
      this.list.splice(idx, 1)
    }
  }


}

class Showcase {

  constructor(cart) {
    this.list = [];
    this.cartList = [];
    this.cart = cart;
    this.cartItems = Object.entries(cart)[0][1];

  }

  _onSuccess(response) {
    const data = JSON.parse(response)
    data.forEach(product => {
      this.list.push(new Good({ id: product.id, title: product.title, price: product.price }))
    });
  }

  _onSucCart(response) {
    const data = JSON.parse(response)
    data.forEach(product => {
      this.cartList.push(new Good({ id: product.id, title: product.title, price: product.price }))
    });
  }

  _onError(err1, err2) {
    console.log(err1 + ': ' + err2);
  }

  fetchGoods() { sendGet(urlGet).then(this._onSuccess.bind(this), this._onError.bind(this)) };


  renderShowCaseItem() {
    this.cartItems.forEach(item => {
      console.log(item.id);
      console.log();
      console.log(item.getCount());
    })
  }

  render() {
    let listHtml = '';
    let count = 0;
    this.cartItems.forEach(item => {
      count += item.getGood().getPrice() * item.getCount();
      listHtml += item.render();
    });
    listHtml += `< div class="goods-item" > <h3>Общая стоимость товаров: ${count} рублей</h3></div > `;
    document.getElementById("goods-list").insertAdjacentHTML('beforeend', listHtml);
  }

  renderModal() {
    let listHtml = '';
    let count = 0;
    this.cartItems.forEach(item => {
      count += item.getGood().getPrice() * item.getCount();
      listHtml += item.render();
    });
    listHtml += `< div class="goods-item" > <h3>Общая стоимость товаров: ${count} рублей</h3></div > `;
    document.getElementById("modal").insertAdjacentHTML('beforeend', listHtml);
  }

  renderSC() {
    let listHtml = '';
    this.list.forEach(item => {
      listHtml += item.render();
    });
    document.getElementById("goods-item").insertAdjacentHTML('beforeend', listHtml);
  }


  addToCart(id) {
    const idx = this.list.findIndex((good) => id == good.id_product)
    if (idx >= 0) {
      this.cart.add(this.list[idx])
    }
  }
}

const btn_main = document.getElementById("btn_main");
btn_main.addEventListener('click', function () { showcase.render() }, { once: true });
const btn_sc = document.getElementById("btn_sc");

const modal = document.getElementById("my_modal");
const btn = document.getElementById("btn_modal_window");
const span = document.getElementsByClassName("close_modal_window")[0];
const table = document.getElementById("modal");


btn.addEventListener('click', function () {
  modal.style.display = "block";
  showcase.renderModal()
});

span.onclick = function () {
  modal.style.display = "none";
  table.innerText = "";
}

window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}

const cart = new Cart()
const showcase = new Showcase(cart)

showcase.fetchGoods();
btn_sc.addEventListener('click', function () { showcase.renderSC() }, { once: true });
// console.log(flag)
// console.log(showcase.list)

// setTimeout(() => { console.log(flag) }, 50)

// setTimeout(() => {
//   showcase.addToCart(123)
//   showcase.addToCart(123)
//   showcase.addToCart(123)
//   showcase.addToCart(456)
const phone = new Good({ id: 7, title: 'samsung M31', price: 765 })
setTimeout(() => {
  // cart.remove(123)
  cart.add(phone)
})

  // console.log(showcase, cart)
// }, 1000)