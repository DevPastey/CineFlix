import { MovieDetails } from '@/interfaces/interfaces';
import React from 'react';
import { View, Text, Image } from 'react-native';

export default function MovieDetailsPage({poster_path, title, release_date, runtime, vote_average, overview, status, genres, production_countries, budget, revenue, tagline, production_companies } :MovieDetails) {
  
  const runTime = runtime
   
  return (
    
    <View >
      <Image source={{
        uri: poster_path
        ? `https://image.tmdb.org/t/p/w500${poster_path}`
        : "https://placehold.co/600x400/1a1a1a/ffffff.png"
      }} 
      className='w-full h-[447px] rounded-lg'
      resizeMode='stretch'
      />
      <View>
        <Text className='text-white font-bold text-2xl'>{title}</Text>
        <View className='flex flex-row gap-3'>
          <Text className='text-light-300'>{release_date?.split("-")[0]}</Text>
          <Text className='text-light-300'>{Math.round(Number(runtime) / 60)}h &nbsp; {Number(runTime) % 60}m</Text>
          {/* <Text className='text-light-300'>{Math.round(Number(runtime) / 60)}</Text> */}
          {/* <Text className='text-light-300'>{runTime}</Text> */}

          


        </View>

      </View>
    </View>
  );
}
