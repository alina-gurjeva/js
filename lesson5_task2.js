/**
 * 2. Сделать генерацию корзины динамической: верстка корзины не должна находиться в HTML-структуре. 
 * Там должен быть только div, в который будет вставляться корзина, сгенерированная на базе JS:
2.1. Пустая корзина должна выводить строку «Корзина пуста»;
2.2. Наполненная должна выводить «В корзине: n товаров на сумму m рублей».
 */

let basket = {
    'info': [
        // ['bloody knife', 10000, 1],
        // ['ghoust LookLikeHuman medicine', 9000, 2],
        // ['head of Doyle professor', 10000, 2],
        // ['Necronomicone Black Book', 100000, 1],
        // ['black cat', 12000, 1]
    ],
    countPrice() {
        let generalSum = 0
        let basket = this['info']
        for (let i = 0; i < basket.length; i++) {
            let position = basket[i]
            generalSum += position[1] * position[2]
        }
        return generalSum
    }
}

function basketDefiner(basket){
    let divBasket = document.getElementById('basket')
    let info = basket.info
    if (info.length == 0){
        divBasket.innerText = 'Корзина пуста'
    }
    else {
        divBasket.innerText = 'В корзине: ' + String(info.length) + ' товаров на сумму ' + String(basket.countPrice()) + ' рублей'
    }
}
basketDefiner(basket)
