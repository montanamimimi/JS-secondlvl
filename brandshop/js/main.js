'use strict';


// Класс товара

class Product {
  constructor(id, name, price) {
    this.id = id;
    this.name = name;
    this.price = price;
  }

  renderHtml() {
    return `
    <div class="products-block-container" data-id="${this.id}">
        <a href="#" class="products-block-link">
            <div class="products-block-item">                           
                    <img class="product-image" src="images/product-adapt-noimg.jpg" alt="Product1" class="products-item-image">
                
                <div class="products-item-text">
                    <h3>${this.name}</h3>
                    <p>Known for her sculptural takes on traditional tailoring, Australian arbiter of cool Kym Ellery teams up with Moda Operandi.</p>
                    <p class="pprice">$${this.price}</p>
                </div>
            </div>
        </a>
        <a href="#" class="products-add-button" data-id=${this.id}>
            <img src="images/basket_white.svg" alt=""> Add to cart
        </a>                    
    </div>
    `;
  }
}

// "Витрина" с товарамм

class Showcase {
  constructor(prodPlace){
    this.prodPlace = prodPlace;
    this.products = [];
  }
}

// Класс корзины 

class Basket {
  constructor(basketWindow, toCart, checkout, toShop, total, noItems, htmlInBasket) {
    this.products = [];
    this.basketWindow = basketWindow;
    this.total = total;
    this.toCart = toCart;
    this.checkout = checkout;
    this.toShop = toShop;
    this.noItems = noItems;
    this.htmlInBasket = htmlInBasket;
  }

  removeToCarts(){
    this.checkout.style.display = "none";
    this.toCart.style.display = "none";
  }

  addToCards(){
    this.noItems.innerHTML = '';
    this.checkout.style.display = "block";
    this.toCart.style.display = "block";
  }

  showBasket(){
    this.basketWindow.style.display = "block";
    this.noItems.innerHTML = "";
  }

  closeBasket(){    
    this.basketWindow.style.display = 'none';
    let that = this;
    setTimeout(function(){
    that.basketWindow.style.display = '';
    }, 10);
  }

  addProduct(product) {    
    if (this.products.find(x => x.id == product.id)) {
      let i = this.products.indexOf(this.products.find(x => x.id == product.id));
      this.products[i].quantity++;
    } else {
      let productToB = new ProductInBasket(product.id, product.name, product.price);
      productToB.quantity++;
      this.products.push(productToB);
    }

  }

  takeTotalAmount() {
    let totalAmount = 0;
    this.products.forEach((product) => {
      totalAmount += product.quantity * product.price;
   })
    this.total.innerHTML = `Всего заказано на $${totalAmount}`;
  }

  showBasketContent() {
    this.addToCards();
    let innerHtml = '';
    this.products.forEach((product) => {
       innerHtml += product.renderHtml();
    })
    this.htmlInBasket.innerHTML = innerHtml;
    this.takeTotalAmount();
    this.showBasket();  
    let that = this;
    setTimeout(function() {
      that.basketWindow.style.display = '';
    }, 1500);
  }

}

// Класс товара в корзине

class ProductInBasket extends Product {
  constructor(id, name, price){
    super(id, name, price);
    this.quantity = 0;
  }

  renderHtml(){
    return `<div class="basket-list-item">
    <img src="images/product-adapt-noimg.jpg" alt="Prod">
    <div class="basket-list-item-text">
        <h4>${this.name}</h4>
        <p class="price">${this.quantity}  x   $${this.price} = $${this.quantity * this.price}</p>
    </div>
    </div>`
  }
}

// Создаем витрину 

const myShowcase = new Showcase(document.querySelector('.products-block'));

// Создаем корзину 

const myBasket = new Basket(
  document.querySelector('.cart-products'),
  document.querySelector('.btn-cart'), 
  document.querySelector('.btn-checkout'), 
  document.querySelector('.btn-shopping'), 
  document.querySelector('.total'),
  document.querySelector('.no-items'),
  document.querySelector(".basket-list"));

// Убираем некоторые кнопки для начала 

myBasket.removeToCarts();

// Работа кнопки Go Shopping 

myBasket.toShop.addEventListener('click', () => myBasket.closeBasket());




// Адрес файла с товарами 

const myUrl = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses/catalogData.json';


// Запрос с колбэк функцией 

function makeGETRequest(url) {
  return new Promise((resolve, reject) => {

    let xhr;
    if (window.XMLHttpRequest) {
      xhr = new XMLHttpRequest();
    } else if (window.ActiveXObject) { 
      xhr = new ActiveXObject("Microsoft.XMLHTTP");
    }
  
    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4) {
        let goods = JSON.parse(xhr.responseText);
        resolve(goods);
      }
    }
  
    xhr.open('GET', url, true);
    xhr.send();

  })

}

// Функция для отображения товаров на странице

function showProducts(goods) {
  let ourHtml = '';
  let products = [];
  goods.forEach((good) => {
    let prod = new Product(good.id_product, good.product_name, good.price);
    ourHtml += prod.renderHtml();
    products.push(prod);
  })
  myShowcase.prodPlace.innerHTML = ourHtml;    
  return products;
}

// Вешаем обработку событий на кнопки

function addListeners(products){
  myShowcase.products = products;
  let buttons = document.querySelectorAll('.products-add-button');
  buttons.forEach((button) => {
    button.addEventListener('click', addToBasket);
  })
}

function addToBasket(e){
  let id = e.target.dataset.id;
  let product = myShowcase.products.find(x => x.id == id);
  myBasket.addProduct(product);
  console.log(myBasket.products);
  myBasket.showBasketContent();
}


// Запрос и все остальное


makeGETRequest(myUrl)
  .then(showProducts)
  .then(addListeners);


