'use strict';

// Товары и корзина

let products = document.querySelectorAll('.products-block-container');
let prodList = goods;
let basket = document.querySelector('.cart-products');
let prodInBasket = document.querySelector(".basket-list");
let roundOne = document.querySelector(".link-cart-round");

// надписи и кнопки в корзине

let noItems = document.querySelector('.no-items');
let total = document.querySelector('.total');
let totalAmount = 0;
let checkout = document.querySelector('.btn-checkout');
let toCart = document.querySelector('.btn-cart');
let toShop = document.querySelector('.btn-shopping');

// убираем отображение некоторых кнопок пока нет товаров

prodInBasket.innerHTML = "";
total.innerText = `Total amount: ${totalAmount}$`;
checkout.style.display = "none";
toCart.style.display = "none";



products.forEach(function(product){
    // Назначаем кнопкам data-id

    let button = product.querySelector(".products-add-button");
    button.dataset.id = product.dataset.id;

    // При клике на кнопку вызываем функцию увеличения кол-ва товаров 

    button.addEventListener('click', logClick);

})



// Увеличивает на 1 количество требуемого товара в корзине. Показываем содержимое корзины. 

function logClick(event) {
    ++prodList[event.currentTarget.dataset.id].units;
    getProductsList();     
    showBasket(basket);   
    setTimeout(hideBasket, 1200, basket);
}


// Показываем и прячем содержимое корзины

function showBasket(basket){
    basket.style.display = "block";
    noItems.innerHTML = "";
}

function hideBasket(basket){
    basket.style.display = "";
}

// Заполняем содержимое в корзине товарами (разметка)

function getProductsList() {
    let prodNumber = 0;
    let newProdList = "";
    
    for (let i = 0; i<prodList.length; i++) {
        if (prodList[i].units > 0) {
             newProdList += constructProd(prodList[i]);
             prodNumber += prodList[i].units;
             totalAmount += prodList[i].price;
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

// Действие для кнопки Go shoppng если нет товаров 

toShop.addEventListener('click', function(event){
    basket.style.display = 'none';
    setTimeout(function(){
    basket.style.display = '';
    }, 10);
});


