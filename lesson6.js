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
    let divBasket = document.getElementById('CartPrice')
    let divBasketItems = document.getElementById('ItemsInCart')

    let info = basket.info
    if (info.length == 0){
        divBasket.innerText = 'Cart empty'
    }
    else {
        let infoGeneral = 'In cart: ' + String(info.length) + ' goods: ' + String(basket.countPrice()) + ' rub'
        for (let i = 0; i < info.length; i++){
            if(info[i][2]>0){
                const oneGoodinfo = document.createElement('li')
                oneGoodinfo.innerText = info[i][0] + ': ' + info[i][2]
                oneGoodinfo.classList.add("inCart")
                divBasketItems.appendChild(oneGoodinfo)
            }
            
        }
        divBasket.innerText = infoGeneral

    }
}


const cartChanger = {
    id: 'allGoods',
    quantities: {},

    basket: {
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
    },

    init() {
        document.getElementById(this.id).addEventListener('click', event => {
            this.eventHandler(event)
        })
    },

    eventHandler(event) {
        if (event.target.tagName !== 'BUTTON') return
        let chosenGood = event.target.parentNode
        this.addCart(chosenGood)
    },

    addCart(chosenGood) {
        let name = chosenGood.querySelector('.Description').innerText

        let price =  Number(chosenGood.querySelector('.Price').innerText)
        let info = this.basket.info
        
        if (this.quantities[name] === undefined) {
            this.quantities[name] = 1
            let quantity = 1
            info.push([name, price, quantity])
        }
        else {
            this.quantities[name] ++
            for (let i = 0; i < info.length; i++){
                if (info[i][0] === name){
                    info[i][2] ++
                    break
                }
            }

        }
        let divBasketItems = document.getElementById('ItemsInCart')
        let liElems = divBasketItems.querySelectorAll('li')
        this.removerCart()
        basketDefiner(this.basket)

    },

    removerCart() {
        let divBasketItems = document.getElementById('ItemsInCart')
        let liElems = divBasketItems.querySelectorAll('li')
        for (let i = 0; i < liElems.length; i++){
            divBasketItems.removeChild(liElems[i])
        }
        
    }
}




basketDefiner(basket)

cartChanger.init()


