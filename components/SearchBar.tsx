import { icons } from '@/constants/icons';
import React from 'react';
import { Image, TextInput, View } from 'react-native';

export default function SearchBar({onPress, placeholder}) {
  return (
    <View className='flex-row items-center bg-dark-200 rounded-full px-5 py-4'>
        <Image source={icons.search} className='size-5' resizeMode='contain' tintColor="#ab8bff" />
      <TextInput 
        onPress={() => {}}
        placeholder='Search'
        value=''
        onChangeText={e => {}}
        placeholderTextColor="#a8b5db"
        className='flex-1 flex-white ml-2'
      />
     </View>
  );
}
