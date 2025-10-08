import { icons } from '@/constants/icons';
import { InputTextProps } from '@/types/componentProps';
import React, { useState } from 'react';
import { Image, TextInput, View } from 'react-native';

export default function SearchBar( {value, onPress, placeholder, onChangeText}: InputTextProps) {
    
  return (
    <View className='flex-row items-center bg-dark-200 rounded-full px-5 py-4'>
        <Image source={icons.search} className='size-5' resizeMode='contain' tintColor="#ab8bff" />
      <TextInput 
        onPress={onPress}
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        placeholderTextColor="a8b5db"
        className='flex-1 flex-white ml-2 text-white'
        autoCorrect={false}
        autoCapitalize="none"
        clearButtonMode='always'
    
      />
     </View>
  );
}
