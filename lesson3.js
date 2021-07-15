/*
1. С помощью цикла while вывести все простые числа в промежутке от 0 до 100.
*/

function ifSimple(x) {
    let maxDel = Math.ceil(Math.sqrt(x))
    if (x === 0 || x === 1) {
        return false
    }
    for (let i = 0; i <= maxDel; i++) {
        if (x % i === 0) {
            if (i != 1 && i != x)
                return false
        }
    }
    return true
}

// логика если ВКЛЮЧАЯ 100 (промежуток от 0 до 100 не конкретизировано)
// !!! согласно комментарию на лекции НЕ обязательно именно while
function logAllSimpleNums(x1, x2) {
    for (let i = x1; i <= x2; i++) {
        if (ifSimple(i)) {
            console.log(i)
        }
    }
}

console.log('task1')
logAllSimpleNums(0, 100)

/*
2. С этого урока начинаем работать с функционалом интернет-магазина. Предположим, есть сущность корзины. Нужно реализовать функционал подсчета стоимости корзины в зависимости от находящихся в ней товаров.
3. Товары в корзине хранятся в массиве. Задачи:
a) Организовать такой массив для хранения товаров в корзине;
b) Организовать функцию countBasketPrice, которая будет считать стоимость корзины.
*/

// Судя по всему это должна была быть 1 задача...... (2 и 3) 

// a)

let basket = [
    ['bloody knife', 10000, 1],
    ['ghoust LookLikeHuman medicine', 9000, 2],
    ['head of Doyle professor', 10000, 2],
    ['Necronomicone Black Book', 100000, 1],
    ['black cat', 12000, 1]
]

// b)

function countBasketPrice(basket) {
    let generalSum = 0
    for (let i = 0; i < basket.length; i++) {
        let position = basket[i]
        generalSum += position[1] * position[2]
    }
    return generalSum
}

console.log('task2 task3')
console.log(countBasketPrice(basket))

/*
4.*Вывести с помощью цикла for числа от 0 до 9, не используя тело цикла. Выглядеть это должно так:
for(…){// здесь пусто}
*/

// логика если ВКЛЮЧАЯ 0 и 9 границы (не конкретизировано)

console.log('task4')
for (let i = -1; i < 9; i++, console.log(i)) { }

/*
5. *Нарисовать пирамиду с помощью console.log, как показано на рисунке, только у вашей пирамиды должно быть 20 рядов, а не 5:

x
xx
xxx
xxxx
xxxxx

*/

function multipyString(someStr, x) {
    let concatenated = ''
    for (let i = 0; i < x; i++) {
        concatenated = concatenated + someStr
    }
    return concatenated
}

console.log('task5')

for (let i = 1; i < 21; i++) {
    console.log(multipyString('x', i))
}

