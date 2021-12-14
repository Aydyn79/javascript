const goods = [
    { title: 'Shirt', price: 150 },
    { title: 'Socks', price: 50 },
    { title: 'Jacket', price: 350 },
    { title: 'Shoes', price: 250 },
];

const btn = document.querySelector(".btn")
const _goodsList = document.getElementsByTagName("tbody");
  
const renderGoodsItem = ({ title, price }) => {
    return `<tr><td>${title}</td><td>${price}</td></tr>`;
};


const renderGoodsList = (list = goods) => {
    let goodList = list.map(
            (item) =>  {
                return renderGoodsItem(item)
            }
        ).join('');

    _goodsList[0].insertAdjacentHTML('beforeend', goodList);
}
  


btn.addEventListener('click',function(){renderGoodsList()}, {once : true});
