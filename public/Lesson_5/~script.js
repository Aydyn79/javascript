// const req = require(["express/lib/request"]);
// import express from 'express';

// const API_URL = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses/';
const API_URL = 'http://localhost:3000';

// function send(onError, onSuccess, url, method = 'GET', data = '', headers = {}, timeout = 60000) {

//   let xhr;

//   if (window.XMLHttpRequest) {
//     // Chrome, Mozilla, Opera, Safari
//     xhr = new XMLHttpRequest();
//   } else if (window.ActiveXObject) {
//     // Internet Explorer
//     xhr = new ActiveXObject("Microsoft.XMLHTTP");
//   }

//   for ([key, value] of Object.entries(headers)) {
//     xhr.setRequestHeader(key, value)
//   }

//   xhr.timeout = timeout;

//   xhr.ontimeout = onError;

//   xhr.onreadystatechange = function () {
//     if (xhr.readyState === 4 && xhr.status < 400) {
//         onSuccess(xhr.responseText)
//       } else if (xhr.status >= 400) {
//         onError(xhr.status)
//       }
//   }


//   xhr.open(method, url, true);

//   xhr.send(data);
// }

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

    // for ([key, value] of Object.entries(headers)) {
    //   req.setRequestHeader(key, value)
    // }

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



// let xhr;

// if (window.XMLHttpRequest) {
// Chrome, Mozilla, Opera, Safari
// xhr = new XMLHttpRequest();
// } else if (window.ActiveXObject) {
// Internet Explorer
// xhr = new ActiveXObject("Microsoft.XMLHTTP");
// }

// xhr.timeout = timeout;

// xhr.ontimeout = onError;

// xhr.onreadystatechange = function () {
// if (xhr.readyState === 4 && xhr.status < 400) {
// onSuccess(xhr.responseText);
// } else {
// onError(xhr);
// }
// }

// const json = JSON.stringify(good);
// xhr.open(method, url, true);
// xhr.setRequestHeader('Content-type', 'application/json; charset=utf-8');
// xhr.send(json);
// }


function getCounter() {
  let last = 0;

  return () => ++last;
}

const stackIDGenrator = getCounter()


class Good {
  constructor({ id, title, price }) {
    this.id_product = id;
    this.product_name = title;
    this.price = price;
  }

  getId() {
    return this.id_product;
  }

  getPrice() {
    return this.price;
  }

  getTitle() {
    return this.product_name;
  }

  render() {
    return `<tr><td>${this.id_product}</td><td>${this.product_name}</td><td>${this.price}</td></tr>`;
  }

}

class GoodStack {
  constructor(good) {
    this.id = stackIDGenrator();
    this.good = good;
    this.count = 1;
  }

  getGoodId() {
    return this.good.id_product
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
    // const data = JSON.parse(response);
    const data = response;
    return data;

  }

  _onError(err) {
    console.log(err.status + ': ' + err.statusText);
    this.success = false;
  }


  add(good) {
    const idx = this.list.findIndex((stack) => stack.getGoodId() == good.id_product)//возможно надо будет использовать getId;
    if (idx >= 0) {
      send(this._onError.bind(this), this._onSuccess.bind(this), `${API_URL}addToBasket.json`)
      if (this._onSuccess.bind(this).result == 1) {
        this.list[idx].add()
      } else { alert('Сервер недоступен') }
    } else {
      const newGoodStack = new GoodStack(good);
      send(this._onError.bind(this), this._onSuccess.bind(this), `${API_URL}addToBasket.json`)
      if (this._onSuccess.bind(this).result == 1) {
        this.list.push(newGoodStack);
      } else { alert('Сервер недоступен') }
    }

  }

  remove(id) {
    const idx = this.list.findIndex((stack) => stack.getGoodId() == id)
    if (idx >= 0) {
      send(this._onError.bind(this), this._onSuccess.bind(this), `${API_URL}deleteFromBasket.json`)
      if (this._onSuccess.bind(this).result == 1) {
        this.list[idx].remove()
      } else { alert('Сервер недоступен') }
    } else {
      // if(this.list[idx].getCount() <= 0) {
      this.list.splice(idx, 1)
      // }
    }
  }
  //Это для реального POST запроса
  // add(good) {
  // const idx = this.list.findIndex((stack) => stack.getGoodId() == good.id_product)//возможно надо будет использовать getId;
  // if(idx >= 0) {
  // sendPost(this._onError.bind(this), this._onSuccess.bind(this), `${API_URL}addToBasket.json`, 'POST', this.list[idx] )
  // if(this.success) {
  // this.list[idx].add()
  // }else{alert('Сервер недоступен')}
  // } else {
  // const newGoodStack = new GoodStack(good);
  // sendPost(this._onError.bind(this), this._onSuccess.bind(this), `${API_URL}addToBasket.json`, 'POST', newGoodStack)
  // if(this.success) {
  // this.list.push(newGoodStack);
  // }else{alert('Сервер недоступен')}
  // }

  // }

  // remove(id) {
  // const idx = this.list.findIndex((stack) => stack.getGoodId() == id)
  // if(idx >= 0) {
  // sendPost(this._onError.bind(this), this._onSuccess.bind(this), `${API_URL}deleteFromBasket.json`, 'POST', this.list[idx] )
  // if(this.success) {
  // this.list[idx].remove()
  // }else{alert('Сервер недоступен')}
  // } else {
  // if(this.list[idx].getCount() <= 0) {
  // this.list.splice(idx, 1)
  // }
  // }
  // }

}

// sendGet(`${API_URL}/api/v1/showcase`).then(function (response) {
//   console.log("Success!", response);
// const data = JSON.parse(response)
//   data.forEach(product => {
//     this.list.push(new Good({ id: product.id_product, title: product.product_name, price: product.price }))
//   });
// }, function (error) {
//   console.error("Failed!", error);
// });

class Showcase {

  constructor(cart) {
    this.list = [];
    this.cart = cart;
    this.cartItems = Object.entries(cart)[0][1];
  }

  

  _onSuccess(response) {
    const data = JSON.parse(response)
    data.forEach(product => {
      this.list.push(new Good({ id: product.id_product, title: product.product_name, price: product.price }))
    });
  }

  _onError(err1, err2) {
    console.log(err1 + ': ' + err2);
  }

  
  // send(this._onError.bind(this), this._onSuccess.bind(this), `${API_URL}catalogData.json`)

  fetchGoods() {sendGet(`${API_URL}/api/v1/showcase`).then(this._onSuccess.bind(this), this._onError.bind(this)); }


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
    listHtml += `<div class="goods-item"><h3>Общая стоимость товаров: ${count} рублей</h3></div>`;
    document.getElementById("goods-list").insertAdjacentHTML('beforeend', listHtml);
  }

  renderModal() {
    let listHtml = '';
    let count = 0;
    this.cartItems.forEach(item => {
      count += item.getGood().getPrice() * item.getCount();
      listHtml += item.render();
    });
    listHtml += `<div class="goods-item"><h3>Общая стоимость товаров: ${count} рублей</h3></div>`;
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
btn_sc.addEventListener('click', function () { showcase.renderSC() }, { once: true });
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
console.log(showcase.list)
// setTimeout(() => {
//   showcase.addToCart(123)
//   showcase.addToCart(123)
//   showcase.addToCart(123)
//   showcase.addToCart(456)

//   cart.remove(123)
//   // cart.add(123)


//   console.log(showcase, cart)
// }, 1000)