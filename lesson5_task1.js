/**
 * 1. Создать функцию, генерирующую шахматную доску. 
 * При этом можно использовать любые html-теги по своему желанию. 
 * Доска должна быть разлинована соответствующим образом, т.е. чередовать черные и белые ячейки. 
 * Строки должны нумероваться числами от 1 до 8, столбцы – латинскими 
 * буквами A, B, C, D, E, F, G, H. (использовать createElement / appendChild)
 */

function chessBoard() {
    let body = document.body
    let container = document.createElement('table')
    body.appendChild(container)
    let flag = true
    let symbols = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H']
    let numbers = [1, 2, 3, 4, 5, 6, 7, 8]

    for (let row = 0; row < 9; row++) {
        const tr = document.createElement('tr')

        container.appendChild(tr)
        for (let col = 0; col < 9; col++) {
            const td = document.createElement('td')
            if (!flag) {
                td.style.backgroundColor = "black"

            }
            if (row == 0) {
                td.style.backgroundColor = "cadetblue"
                if (col > 0) {
                    td.innerText = symbols[col - 1]
                }

            }
            if (col == 0) {
                td.style.backgroundColor = "cadetblue"
                if (row > 0) {
                    td.innerText = numbers[row - 1]
                }
            }
            flag = !flag

            tr.appendChild(td)
        }


    }
}

chessBoard()


