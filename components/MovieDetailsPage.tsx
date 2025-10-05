import { icons } from '@/constants/icons';
import { MovieDetails } from '@/interfaces/interfaces';
import React from 'react';
import { View, Text, Image } from 'react-native';

interface DetailsProp {
  label: string,
  value: string| null |number,
}
function Details ({label,  value}:DetailsProp ) {
  return (
    <View>
      <Text className='text-light-300 mb-1'>{label}</Text>
      <Text className='text-light-100'>{value}</Text>
    </View>
  )
}

export default function MovieDetailsPage({poster_path, title, release_date, runtime, vote_average, vote_count, overview, status, genres, production_countries, budget, revenue, tagline, production_companies } :MovieDetails) {
     const formattedReleaseDate = new Date(release_date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
     });
  return (
    
    <View className='pb-20'>
      <Image source={{
        uri: poster_path
        ? `https://image.tmdb.org/t/p/w500${poster_path}`
        : "https://placehold.co/600x400/1a1a1a/ffffff.png"
      }} 
      className='w-full h-[447px] rounded-lg'
      resizeMode='stretch'
      />

      <View className='ml-4 gap-3'>
        <Text className='text-white font-bold text-2xl'>{title}</Text>
        <View className='flex flex-row gap-2'>
          <Text className='text-light-300'>{release_date?.split("-")[0]}</Text>
          <Text className='text-light-300'>&#8226;	</Text>
          <View className='flex flex-row gap-2'>
            <Text className='text-light-300'>{Math.round(Number(runtime) / 60)}h</Text>
            <Text className='text-light-300'>{Number(runtime) % 60}m</Text>
          </View>
          
          {/* <Text className='text-light-300'>{Math.round(Number(runtime) / 60)}</Text> */}
          {/* <Text className='text-light-300'>{runTime}</Text> */}
        </View>

        <View className='text-light-300 bg-light-100/25 w-[8rem] rounded-sm flex text-center py-2 justify-center items-center flex-row'>
          <Image source={icons.star} className='size-4 z-3' />
          <Text className='font-bold text-white' > {Number(vote_average).toFixed(1)} </Text>
          <Text className='text-light-300 -ml-[5px]' > /10 &#40; {Math.round(Number(vote_count) / 1000)}K &#41;  </Text>
        </View>

        
        

      </View>

      <View className='ml-4 gap-5 mt-6'>

        <View>
          <Text className='text-light-300 mb-2'>Overview</Text>
          <Text className='text-white'>{overview}</Text> 
        </View>

        <View className='flex-row gap-6'>
          <Details label="Release date" value={formattedReleaseDate} />
          <Details label="Status" value={status} />
        </View>
        
        <View className='flex-row gap-6'>
          <Details label="Budget" value={`$${Math.round(budget / 1000000)} Million`} />
          <Details label="Revenue" value={`$${Math.round(revenue / 1000000)} Million`} />
        </View>


      </View>
      
    </View>
  );
}
