import { useEffect, useRef, useState } from "react"

enum Operator {
  add = '+',
  subtract = '-',
  multiply = 'x',
  divide = '÷'
}

export const useCalculator = () => {

  const [output, setOutput] = useState('0')
  const [number, setNumber] = useState('0')
  const [prevNumber, setPrevNumber] = useState('0')
  const lastOperation = useRef<Operator | undefined>(undefined)

  useEffect(() => { 
    if(lastOperation.current) {
      const firstOutputPart = output.split(' ').at(0)
      setOutput(`${firstOutputPart} ${lastOperation.current} ${number}`)
    }else{
      setOutput(number)
    }

  }, [number])

  useEffect(() => {
    const subResult = calculateSubResult()

    setPrevNumber(subResult.toString())
  }, [output])

  const clean = () => {
    setNumber('0')
    setPrevNumber('0')
    setOutput('0')

    lastOperation.current = undefined
  }

  const toggleSign = () => {
    if (number.startsWith('-')) return setNumber(number.replace('-', ''))
    setNumber('-' + number)
  }

  const deleteLast = () => {

    if (number.includes('-') && number.length === 2) return setNumber('0')

    if (number.length === 1) return setNumber('0')

    setNumber(number.slice(0, -1))
  }

  const setLastNumber = () => {
    calculateResult()
    if (number.endsWith('.')) return setPrevNumber(number.slice(0, -1))

    setPrevNumber(number)
    setNumber('0')
  }
  const divideOperation = () => {
    setLastNumber()
    lastOperation.current = Operator.divide
  }

  const multiplyOperation = () => {
    setLastNumber()
    lastOperation.current = Operator.multiply
  }

  const addOperation = () => {
    setLastNumber()
    lastOperation.current = Operator.add
  }

  const substractOperation = () => {
    setLastNumber()
    lastOperation.current = Operator.subtract
  }

  const calculateSubResult = () => {
    const [firstValue, operator, secondValue] = output.split(" ")
    
    const num1 = Number(firstValue)
    const num2 = Number(secondValue)

    if(isNaN(num2)) return num1

    switch( operator ){
      case Operator.add :
        return num1 + num2
      case Operator.divide :
        return num1 / num2
      case Operator.multiply :
        return num1 * num2
      case Operator.subtract :
        return num1 - num2

      default:
        throw new Error('Operation not implemented')
    }
  }
  const calculateResult = () => {
    setOutput(`${calculateSubResult()}`)

    lastOperation.current = undefined

    setPrevNumber('0')
  }

  const calculateNumber = (numberString: string) => {
    if (number.includes('.') && numberString === '.') return

    if (number.startsWith('0') || number.startsWith('-0')) {
      if (numberString === '.') return setNumber(number + numberString)

      if (numberString === '0' && number.includes('.')) return setNumber(number + numberString)

      if (numberString !== '0' && !number.includes('.')) return setNumber(numberString)

      if (numberString === '0' && !number.includes('.')) return
    }
    setNumber(number + numberString)
  }


  return {
    output,
    number,
    prevNumber,

    //Methodes
    calculateNumber,
    clean,
    toggleSign,
    deleteLast,
    divideOperation,
    multiplyOperation,
    addOperation,
    substractOperation,
    calculateSubResult,
    calculateResult
  }
}