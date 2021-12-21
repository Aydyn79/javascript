function getCounter() {
  let last = 0;

  return () => ++last;
}

const stackIDGenrator = getCounter()


class Good {
  constructor({id, title, price}) {
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

  getGood(){
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
        return `<tr><td>${this.good.getTitle()}</td><td>${this.count}</td><td>${this.good.getPrice()}</td><td>${this.good.getPrice()*this.count}</td></tr>`;
	}
}

class Cart {
  constructor(){
    this.list = []
  }

  add(good) {
    const idx = this.list.findIndex((stack) => stack.getGoodId() == good.id)

    if(idx >= 0) {
      this.list[idx].add()
    } else {
      this.list.push(new GoodStack(good))
    }

  }

  remove(id) {
    const idx = this.list.findIndex((stack) => stack.getGoodId() == id)

    if(idx >= 0) {
      this.list[idx].remove()

      if(this.list[idx].getCount() <= 0) {
        this.list.splice(idx, 1)
      }
    }
  }
  
  
  
}

class Showcase {

  constructor(cart){
    this.list = [];
    this.cart = cart;
	this.cartItems = Object.entries(cart)[0][1];
  }

	renderShowCaseItem(){
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
            count += item.getGood().getPrice()*item.getCount();
            listHtml += item.render();
        });
        listHtml += `<div class="goods-item"><h3>Общая стоимость товаров: ${count} рублей</h3></div>`;
        document.getElementById("goods-list").insertAdjacentHTML('beforeend', listHtml);
    }

	renderModal() {
			let listHtml = '';
			let count = 0;
			this.cartItems.forEach(item => {
				count += item.getGood().getPrice()*item.getCount();
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

	fetchGoods() {
		this.list = [
		new Good({id: 1, title: 'Футболка', price: 140}),
		new Good({id: 2, title: 'Брюки', price: 320}),
		new Good({id: 3, title: 'Галстук', price: 24}),
		new Good({id: 4, title: 'Шляпа', price: 124}),
		new Good({id: 5, title: 'Черный плащ', price: 1100}),
		]
	}

	addToCart(id) {
		const idx = this.list.findIndex((good) => id == good.id)

		if(idx >= 0) {
		this.cart.add(this.list[idx])
		}
	}
}

const btn_main = document.getElementById("btn_main");
btn_main.addEventListener('click',function(){showcase.render()}, {once : true});
const btn_sc = document.getElementById("btn_sc");
btn_sc.addEventListener('click',function(){showcase.renderSC()}, {once : true});
const modal = document.getElementById("my_modal");
const btn = document.getElementById("btn_modal_window");
const span = document.getElementsByClassName("close_modal_window")[0];
const table = document.getElementById("modal");


btn.addEventListener('click',function(){
	modal.style.display = "block"; 
	showcase.renderModal()});

 span.onclick = function() {
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

showcase.addToCart(1)
showcase.addToCart(1)
showcase.addToCart(2)
showcase.addToCart(4)
showcase.addToCart(4)
showcase.addToCart(5)
showcase.addToCart(5)
cart.remove(1)


