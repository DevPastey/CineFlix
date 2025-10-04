import { icons } from '@/constants/icons';
import { TrendingCardProps } from '@/interfaces/interfaces';
import { Link } from 'expo-router';
import React from 'react';
import { Text, View, Image, TouchableOpacity } from 'react-native';

export default function TrendingMovieCard({movie: {poster_url, title, movie_id, count }, index}: TrendingCardProps) {

  return (
    <Link href={`/movies/${movie_id}`} asChild>
        <TouchableOpacity className='w-28 relative mr-5' >
           <Image 
                source={{
                    uri: poster_url
                }} 
                className='w-28 h-48 rounded-lg'
                resizeMode='cover'
            />
            <Text numberOfLines={1} className='text-white font-bold mt-3'>{title}</Text>

            <View className='flex-row items-center justify-between '>
                <Text className='text-xs text-light-300 mt-1 font-medium'> Genre </Text>
                {/* <Text className='text-xs text-light-300 mt-1 font-medium'> {genres.map(genre) =>  } </Text> */}

                {/* <Text className='text-xs font-medium text-light-300 uppercase'> Movie </Text> */}
            </View>
      </TouchableOpacity>
     </Link>
  );
}
