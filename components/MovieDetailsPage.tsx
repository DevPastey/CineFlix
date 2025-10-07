import { icons } from '@/constants/icons';
import { MovieDetails } from '@/interfaces/interfaces';
import React from 'react';
import { View, Text, Image, ScrollView, FlatList } from 'react-native';

interface DetailsProps {
  label: string,
  value: string| null |number,
}


interface MovieDetailsProps {
  details: MovieDetails
}


function Details ({label,  value}:DetailsProps) {
  return (
    <View>
      <Text className='text-light-300 mb-1'>{label}</Text>
      <Text className='text-light-100'>{value}</Text>
    </View>
  )
}

function ProductionDetails ({ title, items }: { title: string; items: string[] }){
  return (
    <View>
      <Text className='text-light-300 mb-2'>{title}</Text>
      <View className='flex-row gap-3'>
        {items.map((item, i) => (
          <View className='justify-center flex-row items-center gap-2' key={i}>
            <View >
              <Text className='text-accent font-bold rounded-sm flex text-center py-2 justify-center items-center flex-row'>{item}</Text>
            </View>          
          
            {i < item.length - 1 && (<Text className='text-light-300 justify-center items-center'> &#8226;	</Text>)}
        </View>
        ))}
      </View>
    </View>
  )
}


export default function MovieDetailsPage({details}: MovieDetailsProps) {

  if (!details) {
    return (
      <View className="flex-1 justify-center items-center bg-primary">
        <Text className="text-light-300">Loading movie details...</Text>
      </View>
    );
  }

  // ✅ safe destructuring
  const {
    poster_path,
    title,
    release_date,
    runtime,
    vote_average,
    vote_count,
    overview,
    status,
    genres,
    production_countries,
    budget,
    revenue,
    tagline,
    production_companies,
  } = details;


  const formattedReleaseDate = new Date(release_date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  return (
    
    
    <View className="flex-1 bg-primary">
      <ScrollView className="px-5 flex-1" showsVerticalScrollIndicator={false} contentContainerStyle={{
        minHeight: "100%",
        paddingBottom: 32,
      }}>
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
          <View className='flex flex-row'>
            <Text className='text-light-300'>{release_date?.split("-")[0]} </Text>
            <Text className='text-light-300'> &#8226;	</Text>
            
            
            {
              runtime? (
                <View className='flex flex-row gap-2'>
                  <Text className='text-light-300'>{runtime? Math.round(Number(runtime) / 60) : 0}h</Text>
                  <Text className='text-light-300'>{runtime? Number(runtime) % 60 : 0}m</Text>
                </View>
              ) : null
            }
            
          </View>

          <View className='text-light-300 bg-light-100/20 rounded-sm text-center w-[8rem] py-[6px] justify-center items-center flex-row'>
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

          <View>
            <Text className='text-light-300 mb-2'>Genre</Text>
            <View className='flex-row gap-3'>
              {genres?.map((g) => (
                <View key={g.id} >
                  <Text className='text-white font-bold bg-light-100/20 rounded-sm flex text-center px-[10px] py-[6px] justify-center items-center flex-row'>{g.name}</Text>
                </View>
              ))}
            </View>
          </View>

          <ProductionDetails title='Countries' items={production_countries.map((c) => c.name)} />

          {/* {budget > 0 } */}
          
          <View className='flex-row gap-6'>
            <Details label="Budget" value={`$${Math.round(budget / 1000000)} Million`} />
            <Details label="Revenue" value={`$${Math.round(revenue / 1000000)} Million`} />
          </View>
          <Details label="Tagline" value={tagline} />

          <ProductionDetails title='Production Companies' items={production_companies.map((c) => c.name)} />


        </View>
      </ScrollView>
    </View>
  );
}
