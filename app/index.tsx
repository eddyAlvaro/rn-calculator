import { CustomButton } from '@/components/CustomButton'
import { ThemeText } from '@/components/ThemeText'
import { Colors } from '@/constants/theme'
import { useCalculator } from '@/hooks/useCalculator'
import { globalStyles } from '@/styles/global-styles'
import React from 'react'
import { View } from 'react-native'

const CalculatorApp = () => {

  const { output, prevNumber, calculateNumber, clean, toggleSign, deleteLast, divideOperation, multiplyOperation, substractOperation,addOperation, calculateSubResult, calculateResult} = useCalculator()
  return (
    <View style={globalStyles.calculatorContainer}>
      <View style={{paddingHorizontal:30, marginBottom: 20}}>
        <ThemeText variant='h1'>{output}</ThemeText>
        { output === prevNumber ?  
          <ThemeText variant='h2'> </ThemeText> :
          <ThemeText variant='h2'>{prevNumber}</ThemeText>
        }
      </View>
      <View style={globalStyles.row}>
        <CustomButton color={Colors.lightGray} blackText onPress={clean} label='C'/>
        <CustomButton color={Colors.lightGray} blackText onPress={toggleSign} label='+/-'/>
        <CustomButton color={Colors.lightGray} blackText onPress={deleteLast} label='del'/>
        <CustomButton color={Colors.orange} onPress={divideOperation} label='÷'/>
      </View>
      <View style={globalStyles.row}>
        <CustomButton onPress={()=> calculateNumber('7')} label='7'/>
        <CustomButton onPress={()=> calculateNumber('8')} label='8'/>
        <CustomButton onPress={()=> calculateNumber('9')} label='9'/>
        <CustomButton color={Colors.orange} onPress={multiplyOperation} label='x'/>
      </View>
      <View style={globalStyles.row}>
        <CustomButton onPress={()=> calculateNumber('4')} label='4'/>
        <CustomButton onPress={()=> calculateNumber('5')} label='5'/>
        <CustomButton onPress={()=> calculateNumber('6')} label='6'/>
        <CustomButton color={Colors.orange} onPress={substractOperation} label='-'/>
      </View>
      <View style={globalStyles.row}>
        <CustomButton onPress={()=> calculateNumber('1')} label='1'/>
        <CustomButton onPress={()=> calculateNumber('2')} label='2'/>
        <CustomButton onPress={()=> calculateNumber('3')} label='3'/>
        <CustomButton color={Colors.orange} onPress={addOperation} label='+'/>
      </View>
      <View style={globalStyles.row}>
        <CustomButton large onPress={()=> calculateNumber('0')} label='0'/>
        <CustomButton onPress={()=> calculateNumber('.')} label='.'/>
        <CustomButton color={Colors.orange} onPress={calculateResult} label='='/>
      </View>
    </View>
  )
}

export default CalculatorApp