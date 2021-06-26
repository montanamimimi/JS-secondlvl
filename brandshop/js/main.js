'use strict';

// Тут еще есть что перевести на методы в классах, но по дз все что нужно сделано

// Класс для 1 товара

class GoodsItem {
    constructor(name, price, img) {
        this.name = name;
        this.price = price;
        this.img = img;
        this.units = 0;
    }

    changePic(newImg){
        this.img = newImg;
    }

    changeName(newName){
        this.name = newName;
    }

    changePrice(newPrice){
        this.price = newPrice;
    }

    addUnit(){
        this.units++;
    }
}

// Класс для списка товаров в корзине 

class GoodsList {
    constructor() {
        this.items = [];
    }

    addItem(item) {
        this.items.push(item);
    }

    takeTotal() {
        let totalPrice = 0;
        this.items.forEach(function(item){
            totalPrice += item.price*item.units;
        });
        return totalPrice;
    }

    takeHTML(){
        let prodNumber = 0;
        let newProdList = "";
        
        for (let i = 0; i<this.items.length; i++) {
            if (this.items[i].units > 0) {
                 newProdList += constructProd(this.items[i]);
                 prodNumber += this.items[i].units;            
            }
        }
    
        // Обновляем данные в корзине 
        total.innerText = `Total amount: ${totalAmount}$`;
        prodInBasket.innerHTML = newProdList;
        roundOne.style.display = "block";    
        roundOne.innerHTML = prodNumber;
        checkout.style.display = "inline-block";
        toCart.style.display = "inline-block";
        toShop.style.display = "none";
    }
}

// Добавляем в коризну все товары с количеством 0 (не оч правильно, потом поправлю)

const myList = new GoodsList();

goods.map(function(good){
    let newGood = new GoodsItem(good.name, good.price, good.img);
    myList.addItem(newGood);
});

// Товары и корзина

let products = document.querySelectorAll('.products-block-container');
let basket = document.querySelector('.cart-products');
let prodInBasket = document.querySelector(".basket-list");
let roundOne = document.querySelector(".link-cart-round");

// надписи и кнопки в корзине

let noItems = document.querySelector('.no-items');
let total = document.querySelector('.total');
let totalAmount = myList.takeTotal();
let checkout = document.querySelector('.btn-checkout');
let toCart = document.querySelector('.btn-cart');
let toShop = document.querySelector('.btn-shopping');

// убираем отображение некоторых кнопок пока нет товаров

prodInBasket.innerHTML = "";
total.innerText = `Total amount: ${totalAmount}$`;
checkout.style.display = "none";
toCart.style.display = "none";


products.forEach(function(product){
    // При клике на кнопку вызываем функцию увеличения кол-ва товаров 
    let button = product.querySelector(".products-add-button");
    button.addEventListener('click', logClick);
})


// Увеличивает на 1 количество требуемого товара в корзине. Показываем содержимое корзины. 

function logClick(event) {
    myList.items[event.currentTarget.dataset.id].addUnit();
    totalAmount = myList.takeTotal();
    myList.takeHTML();     
    showBasket();   
    setTimeout(hideBasket, 1200);
}

// Показываем и прячем содержимое корзины

function showBasket(){
    basket.style.display = "block";
    noItems.innerHTML = "";
}

function hideBasket(){
    basket.style.display = "";
}

// закрывает корзину даже если на нее наведена мышка

function closeBasket(){
    basket.style.display = 'none';
    setTimeout(function(){
    basket.style.display = '';
    }, 10);
}


// Действие для кнопки Go shopping если нет товаров 

toShop.addEventListener('click', closeBasket);

// Заполняем содержимое в корзине товарами (разметка)



// разметка для 1 товара в превью корзины

function constructProd(product) {

    return `<div class="basket-list-item">
    <img src="images/${product.img}" alt="Prod">
    <div class="basket-list-item-text">
        <h4>${product.name}</h4>
        <p class="price">${product.units}  x   $${product.price} = $${product.units * product.price}</p>
    </div>
    </div>`
    

}



