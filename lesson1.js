// 1 task

// 1. Задать температуру в градусах по Цельсию. Вывести в alert соответствующую температуру в градусах по Фаренгейту. 
// Подсказка: расчёт идёт по формуле: Tf = (9 / 5) * Tc + 32, где Tf – температура по Фаренгейту, Tc – температура по Цельсию

let Celse = 26
let Fareighn = (9 / 5) * Celse + 32
alert(Fareighn)


// 2 task

// Работа с переменными. Объявить две переменные: admin и name. 
// Записать в name строку "Василий"; Скопировать значение из name в admin. Вывести admin (должно вывести «Василий»).

let name = "Василий"
let admin = name

console.log(admin)

// 3 task
// *Чему будет равно JS-выражение 1000 + "108"

// Ответ: "1000108" т.к. конкатенация

// 4 task
/*
async подойдет если нет четкой границы, до или после другого скрипта должен выполнится скрипт, то есть он не имееет
зависимостей от других скриптов.
Также имеет значение, как я поняла, требуется ли скрипту полностью загруженная страница для работы. Если да - то
лучше использовать defer либо async только в том случае если сам скрипт настроен на то чтобы ждать пока все прогрузится.
То есть defer скорее про отложенную загрузку скрипта а async - про асинхронную совместно с загрузкой остальных элементов
страницы
*/