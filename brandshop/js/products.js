'use strict';

let productsBlock = document.querySelector('.products-block');
let goodsHtml = '';

let goods = [
    {
        name: 'Great t-shirt',
        price: 25,
        img: 'product-adapt-1.jpg',
        units: 0
    },
    {
        name: 'Womans suit',
        price: 35,
        img: 'product-adapt-2.jpg',
        units: 0
    },
    {
        name: 'Blue hoody',
        price: 15,
        img: 'product-adapt-3.jpg',
        units: 0
    },
    {
        name: 'Perfect t-shirt',
        price: 32,
        img: 'product-adapt-4.jpg',
        units: 0
    },
    {
        name: 'Coat for you',
        price: 18,
        img: 'product-adapt-5.jpg',
        units: 0
    },
    {
        name: 'Womans shirt',
        price: 41,
        img: 'product-adapt-6.jpg',
        units: 0
    },
]

for (let i = 0; i < goods.length; i++) {
    goodsHtml += renderHtml(goods[i], i);
}

function renderHtml(good, i) {
    return `<div class="products-block-container" data-id="${i}">
    <a href="#" class="products-block-link">
        <div class="products-block-item">                           
                <img class="product-image" src="images/${good.img}" alt="Product1" class="products-item-image">
            
            <div class="products-item-text">
                <h3>${good.name}</h3>
                <p>Known for her sculptural takes on traditional tailoring, Australian arbiter of cool Kym Ellery teams up with Moda Operandi.</p>
                <p class="pprice">$${good.price}</p>
            </div>
        </div>
    </a>
    <a href="#" class="products-add-button">
        <img src="images/basket_white.svg" alt=""> Add to cart</a>                    
    </div>
    `;
}


productsBlock.innerHTML = goodsHtml;