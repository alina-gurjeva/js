/**
 * 1. Написать функцию, преобразующую число в объект. 
 * Передавая на вход число от 0 до 999, мы должны получить на выходе объект, 
 * в котором в соответствующих свойствах описаны единицы, десятки и сотни. 
 * Например, для числа 245 мы должны получить следующий объект: {‘единицы’: 5, ‘десятки’: 4, ‘сотни’: 2}. 
 * Если число превышает 999, необходимо выдать соответствующее сообщение с помощью console.log и вернуть пустой объект.
 */

function Digits(x) {
    if (x < 0 | x > 999 | Math.trunc(x) !== x) {
        console.log('Число не корректно. Функция принимает целое число от 0 до 999 включая границы')
        return {}
    }
    return {
        'единицы': Math.trunc(x % 10),
        'десятки': Math.trunc(x / 10) % 10,
        'сотни': Math.trunc(x / 100)
    }
}

console.log('1 task')
console.log(Digits(89))
console.log(Digits(189))
console.log(Digits(1))
console.log(Digits(0))


/**
 * 2.Продолжить работу с интернет-магазином:
2.1. В прошлом домашнем задании вы реализовали корзину на базе массивов. Какими объектами можно заменить их элементы?
2.2. Реализуйте такие объекты.
2.3. Перенести функционал подсчета корзины на объектно-ориентированную базу.
 */

let basket = {
    'info': [
        ['bloody knife', 10000, 1],
        ['ghoust LookLikeHuman medicine', 9000, 2],
        ['head of Doyle professor', 10000, 2],
        ['Necronomicone Black Book', 100000, 1],
        ['black cat', 12000, 1]
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

console.log('2 task')
console.log(basket.countPrice())

/**
 * 3.* Подумать над глобальными сущностями. К примеру, сущность «Продукт» в интернет-магазине
 * актуальна не только для корзины, но и для каталога. Стремиться нужно к тому,
 * чтобы объект «Продукт» имел единую структуру для различных модулей сайта,
 * но в разных местах давал возможность вызывать разные методы.
 */

let product = {
    name: 'ghoust LookLikeHuman medicine',
    image: 'some path to image',
    price: 9000,
    id_product: 888,
    description: 'special for ghosts. Want to look like a human? With this potion you can!',
    remained: 2,
    supplier: 'weird sisters from Bloody Forest',
    inBasket: 0,
    isVisible: true,
    appendInBasket() {
        if (this.remained > 0) {
            console.log(this.name + ' добавлен в корзину!')
            this.inBasket++
            this.remained--
        }
        else { console.log('Позиций не осталось. Ждите поставки!') }
    },
    removeFromBasket() {
        if (this.inBasket > 0) {
            console.log(this.name + ' удален из корзину!')
            this.inBasket--
            this.remained++
        }
    },
    countPrice() {
        let price = this.inBasket * this.price
        console.log('price', price)
        return price
    },
    getMoreSupplies(x) {
        console.log(this.name + ' отправлен заказ на поставку: ' + String(x))
        this.remained += x
    },
    cancelSupply(x) {
        console.log(this.name + ' поставка отменена. Уплатите штраф: ' + String(x * price / 100))
        this.remained -= x
        if (this.remained < 0) {
            this.remained = 0
        }
    },
    addToCatalog() {
        console.log(this.name + ' добавлен в каталог')
        this.isVisible = true
    },
    removeFromCatalog() {
        console.log(this.name + ' удален из каталога')
        this.isVisible = false
    }

}

console.log('3 task')
product.addToCatalog()
product.getMoreSupplies(10)
console.log(product.remained)
product.appendInBasket()
product.appendInBasket()
product.countPrice()
console.log(product.remained)

