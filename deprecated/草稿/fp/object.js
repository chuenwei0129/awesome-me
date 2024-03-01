class Calculator {
  constructor() {
    this.value = 0
  }

  add = (num) => {
    this.value += num
    return this
  }

  subtract = (num) => {
    this.value -= num
    return this
  }

  multiply = (num) => {
    this.value *= num
    return this
  }

  divide = (num) => {
    this.value /= num
    return this
  }

  getValue = () => {
    return this.value
  }
}

const result = new Calculator()
  .add(10)
  .multiply(2)
  .subtract(5)
  .divide(3)
  .getValue()

console.log(result) // 输出: 5
