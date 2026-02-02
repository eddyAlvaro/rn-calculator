import { Colors } from '@/constants/theme';
import { globalStyles } from '@/styles/global-styles';
import * as Haptics from 'expo-haptics';
import React from 'react';
import { Pressable, Text } from 'react-native';

interface Props {
  label: string,
  color?: string,
  blackText?: boolean,
  large?: boolean,
  onPress: () => void
}
export const CustomButton = ({ label, color = Colors.darkGray, blackText = false, onPress, large = false }: Props) => {
  return (
    <Pressable style={({ pressed }) => ({
      ...globalStyles.button,
      backgroundColor: color,
      opacity: pressed ? 0.8 : 1,
      width: large ? 180 : 80
    })} onPress={() => {
      Haptics.selectionAsync()
      onPress()
    }}>
      <Text style={{ ...globalStyles.buttonText, color: blackText ? 'black' : 'white' }}>{label}</Text>
    </Pressable>
  )
}
