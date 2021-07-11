/*
1. Дан код:
var a = 1, b = 1, c, d;
c = ++a; alert(c);           // 2  - потому что СНАЧАЛА к a прибавляется 1, а ЗАТЕМ результат присваивается к c
d = b++; alert(d);           // 1 - потому что СНАЧАЛА результат присваивается к d, а ЗАТЕМ к b приьавляется 1
c = (2+ ++a); alert(c);      // 5 - потому что a к этому времени уже = 2, и плюс еще единица прибавляется в этой строке, значит - 3м. 3+2=5
d = (2+ b++); alert(d);      // 4 - потому что b к этому времени равно уже 2м, 2+2=4, а ПОТОМ b еще увеличивается на 1
alert(a);                    // 3 - потому что все операции выше увеличили a до 3х
alert(b);                    // 3 - потому что все операции выше увеличили b до 3х
Почему код даёт именно такие результаты? - ответы выше
*/

/*
2. Чему будет равен x в примере ниже?
var a = 2;
var x = 1 + (a *= 2);

Ответ: 5, потому что сначала действие в скобках вернет 4, а 4+1 = 5
*/

/*
3. Объявить две целочисленные переменные a и b и задать им произвольные начальные значения. 
Затем написать скрипт, который работает по следующему принципу:
если a и b положительные, вывести их разность;
если а и b отрицательные, вывести их произведение;
если а и b разных знаков, вывести их сумму; ноль можно считать положительным числом.
*/
{
let a = 1, b = 666

function OperationAB(a, b) {
    if (!Number.isInteger(a) || !Number.isInteger(b)){
        console.log('Функция принимает только целые числа')
    } 
    else {
        if (a >= 0 && b >= 0) {
            console.log(a - b)
        } else if (a < 0 && b < 0) {
            console.log(a * b)
        } else {
            console.log(a+b)
        }
    }
}

OperationAB(1, 2)
OperationAB(-1, -2)
OperationAB(1, -2)
OperationAB(1, 2.1)
OperationAB(1.3, 2)

}

/*
4. Присвоить переменной а значение в промежутке [0..15]. С помощью оператора switch организовать вывод чисел от a до 15.
*/

{
let a = 7

switch (a) {
    case 0: console.log(0)
    case 1: console.log(1)
    case 2: console.log(2)
    case 3: console.log(3)
    case 4: console.log(4)
    case 5: console.log(5)
    case 6: console.log(6)
    case 7: console.log(7)
    case 8: console.log(8)
    case 9: console.log(9)
    case 10: console.log(10)
    case 11: console.log(11)
    case 12: console.log(12)
    case 13: console.log(13)
    case 14: console.log(14)
    case 15: console.log(15)
    break
    default:
        console.log('a не подходит промежутку [0..15]')
}

}


/*
5. Реализовать основные 4 арифметические операции в виде функций с двумя параметрами. Обязательно использовать оператор return.
*/

function checkIfNumber(a, b) {
    return (!isNaN(a))&&(!isNaN(b))  // isNaN вернет true если НЕ число
}

function sumAB(a, b) {
    if (checkIfNumber(a, b)) {
        return a + b
    } else {
        console.log('Параметры функции должны быть числами')
        return null
    }
    
}

function diffAB(a, b) {
    if (checkIfNumber(a, b)) {
        return a - b
    } else {
        console.log('Параметры функции должны быть числами')
        return null
    }
    
}

function multiAB(a, b) {
    if (checkIfNumber(a, b)) {
        return a * b
    } else {
        console.log('Параметры функции должны быть числами')
        return null
    }
    
}

function divAB(a, b) {
    if (checkIfNumber(a, b)) {
        return a / b
    } else {
        console.log('Параметры функции должны быть числами')
        return null
    }
    
}

console.log('5 task checking')

console.log(sumAB('a', 0))

console.log(sumAB(1, 0))

console.log(sumAB(-5, 10))

console.log(sumAB(1.2, 20.4))

console.log(diffAB(6, 1))

console.log(multiAB(1, 20))

console.log(divAB(12, 6))


/*
6. Реализовать функцию с тремя параметрами: function mathOperation(arg1, arg2, operation), 
где arg1, arg2 – значения аргументов, operation – строка с названием операции. 
В зависимости от переданного значения операции выполнить одну из арифметических операций (использовать функции из пункта 5) 
и вернуть полученное значение (использовать switch).
*/

function mathOperation(a, b, operation) {
    switch (operation) {
        case 'sum': 
        case 'сложение':
        case 'сложить':
        case 'summarize':
            return sumAB(a, b)
        case 'diff':
        case 'difference':
        case 'вычесть':
        case 'разность':
        case 'вычитание':
            return diffAB(a, b)
        case 'mult':
        case 'multipy':
        case 'умножить':
        case 'умножение':
            return multiAB(a, b)
        case 'div':
        case 'divide':
        case 'division':
        case 'деление':
        case 'поделить':
        case 'делить':
            return divAB(a, b)
        default:
            console.log('Операция не определена. Попробуйте одну из: sum, diff, mult, div')
            return null
    }
}

let arg1 = 1, arg2 = 5
console.log('6 task checking')
console.log(mathOperation(arg1, arg2, 'ВЫЧЕСТЬ'))
console.log(mathOperation(arg1, arg2, 'diff'))
console.log(mathOperation(arg1, arg2, 'деление'))


/*
7. *Сравнить null и 0. Попробуйте объяснить результат.
Любые сравнения дают false, кроме null >= 0 (true) и null <= 0 (true).

При сравнении >< null будет преобразовано в +0, а 0 останется самим собой, в результате алгоритм возвращает false.

При сравнении null == 0 случай попадает на дефолтное значение (false) т.к. в спецификации прописаны все возможные вариации сравнения 
при различный вариантах a и b, но данный случай не подходит ни под один из кейсов, поэтому - дефолт

null >= 0 возвращает true только потому, что null < 0 возвращает false, а алгоритм проверяет >= именно так, т.к. это логично: 
если !a<b, то a>=b.
То же самое происходит при обработке выражения null <= 0. Т.к. null > 0 вернет false, 
чисто логически обратная история null<=0 вернет true.
*/


/*
8. *С помощью рекурсии организовать функцию возведения числа в степень. 
Формат: function power(val, pow), где val – заданное число, pow – степень.
*/

// для упрощения считаем данными идеальными и не делаем проверок (упоминалось в конце лекции)

function power(val, pow) {
    if (pow==0){
        return 1
    }
    if (pow==1) {
        return val
    }
    else {
        return val*(power(val, pow-1))
    }

}

console.log('task 8 checking')
console.log(power(2,3))
console.log(power(2,0))
console.log(power(2,1))
console.log(power(3,3))
console.log(power(2.3,3))



