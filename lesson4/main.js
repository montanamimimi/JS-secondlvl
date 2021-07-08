'use strict';

let text = document.querySelector('.text').innerText;

const rg1 = /'/g;
const rg2 = /([a-zA-Z]+)"([a-z]+)/g;

let newText = text.replace(rg1, '"');
newText = newText.replace(rg2, "$1'$2");

document.querySelector('.text-red').innerText = newText;

