import './styles/global.scss'
import './styles/main.scss'

const numericButtons = document.querySelectorAll<HTMLButtonElement>('.number')
const operators = document.querySelectorAll<HTMLButtonElement>('[data-type="operator"]')
let previousValueElement = document.querySelector<HTMLSpanElement>('[data-type="previous-value"]')
let currentValueElement = document.querySelector<HTMLSpanElement>('[data-type="current-value"]')
const clearButton = document.querySelector<HTMLButtonElement>('[data-type="clear"]')
const equalsButton = document.querySelector<HTMLButtonElement>('[data-type="equals"')
const bulletButton = document.querySelector<HTMLButtonElement>('[data-type="bullet"')

type Operator = string | null

let operator: Operator = null

function initDisplay() {
    numericButtons.forEach(button => {
        button.addEventListener("click", () => {
            currentValueElement!.innerText += button.innerText
        })
    })
}

function updateOperator(sign: string) {
    if (operator === null && !currentValueElement.innerText.includes(sign)) {
        currentValueElement.innerText += sign
        operator = sign
    }
}

function addBullet() {
    if (!currentValueElement.innerText.includes(".")) {
        currentValueElement.innerText += bulletButton.value
    } else {
        return;
    }
}

function calculate() {
    const currentValueInNumber = parseFloat(currentValueElement!.innerText)
    const previousValueInNumber = parseFloat(previousValueElement!.innerText)
    let result: string

    switch (operator) {
        case "+":
            if (isNaN(currentValueInNumber) || isNaN(previousValueInNumber)) {
                return;
            }

            result = String(currentValueInNumber + previousValueInNumber)

            currentValueElement!.innerHTML = result
            break;
        case "-":
            if (isNaN(currentValueInNumber) || isNaN(previousValueInNumber)) {
                return;
            }

            result = String(currentValueInNumber - previousValueInNumber)

            currentValueElement!.innerHTML = result
            break;
        case "/":
            if (isNaN(currentValueInNumber) || isNaN(previousValueInNumber)) {
                return;
            }

            result = String(currentValueInNumber / previousValueInNumber)

            currentValueElement!.innerHTML = result
            break;
        case "X":
            if (isNaN(currentValueInNumber) || isNaN(previousValueInNumber)) {
                return;
            }

            result = String(currentValueInNumber * previousValueInNumber)

            currentValueElement!.innerHTML = result
            break;
        case "%":
            if (isNaN(currentValueInNumber) || isNaN(previousValueInNumber)) {
                return;
            }

            result = String(previousValueInNumber * (currentValueInNumber / 100))

            currentValueElement!.innerHTML = result
            break;
        default:
            break;
    }

    previousValueElement.innerText = ""
    currentValueElement.innerText = result
    operator = null
}

function clearCurrentResult() {
    previousValueElement!.innerHTML = ""
    currentValueElement!.innerText = ""
}

initDisplay()

operators?.forEach(button => {
    button.addEventListener("click", () => {
        if (previousValueElement.innerText !== "") {
            calculate()
        }

        updateOperator(button.value)

        previousValueElement.innerText = currentValueElement.innerText
        currentValueElement.innerText = ""
    })
})

clearButton?.addEventListener("click", clearCurrentResult)
bulletButton?.addEventListener("click", addBullet)
equalsButton?.addEventListener("click", calculate)