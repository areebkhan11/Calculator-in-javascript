class Calculator{
    constructor(previousTextElement , currrentTextElement)
    {
        this.previousTextElement = previousTextElement
        this.currrentTextElement = currrentTextElement
        this.clear()
    }


clear() {
    this.currentoperand = ''
    this.previousoperand = ''
    this.operation = undefined
}

delete() {
this.currentoperand = this.currentoperand.toString().slice(0 , -1)
}
appendNumber(number){
    if(number === '.' && this.currentoperand.includes('.')) return 
    this.currentoperand = this.currentoperand.toString() + number.toString()
}
chooseOperation(operation){
    if(this.currentoperand === '') return
    if(this.previousoperand != ''){
        this.compute()
    }
    this.operation = operation
    this.previousoperand = this.currentoperand
    this.currentoperand = '' 
}
compute(){
     let computation 
     const prev = parseFloat(this.previousoperand)
     const current = parseFloat(this.currentoperand)
     if (isNaN(prev) || isNaN(current)) return 
    switch(this.operation) {
        case '+':
        computation  = prev + current
        break
        case '-':
        computation  = prev - current
        break
        case '*':
        computation  = prev * current
        break
        case '÷':
        computation  = prev / current
        break
        default:
            return
    }
    this.currentoperand = computation
    this.operation = undefined
    this.previousoperand = ''

}

// ---------- function below used in updateDisplay function
getDisplayNumber(number){
    const floatNumber = parseFloat (number)
    if(isNaN(floatNumber)) return ''
    return floatNumber.toLocaleString('en')
}

updateDisplay(){
    this.currrentTextElement.innerText = this.getDisplayNumber(this.currentoperand)
    if(this.operation != null){
        this.previousTextElement.innerText = 
        `${this.getDisplayNumber(this.previousoperand)} ${this.operation} ${this.getDisplayNumber(this.currentoperand)}`
    }
    else {
        this.previousTextElement.innerText = ''
    }
    
}
}
const numberButtons = document.querySelectorAll('[data-number]')
const operationButtons = document.querySelectorAll('[data-operator]')
const equalButton = document.querySelector('[data-equals]')
const AllClearButton = document.querySelector('[data-all-clear]')
const deleteButton = document.querySelector('[data-delete]')
const previousTextElement = document.querySelector('[data-previousoperand]')
const currrentTextElement = document.querySelector('[data-currentoperand]')


console.log(previousTextElement.innerText)
const calculator = new Calculator(previousTextElement , currrentTextElement)

numberButtons.forEach(button => {
    button.addEventListener('click', ()=>{
        console.log(button.innerText)
        calculator.appendNumber(button.innerText)
        calculator.updateDisplay()
    })
})


    
operationButtons.forEach(button => {
    button.addEventListener('click', ()=>{
        console.log(button.innerText)
        calculator.chooseOperation(button.innerText)
        calculator.updateDisplay()
    })
})


equalButton.addEventListener('click', button =>{
    calculator.compute()
    calculator.updateDisplay()
})

AllClearButton.addEventListener('click', button =>{
    calculator.clear()
    calculator.updateDisplay()
})

deleteButton .addEventListener('click', button =>{
    calculator.delete()
    calculator.updateDisplay()
})