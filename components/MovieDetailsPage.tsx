import { icons } from '@/constants/icons';
import { MovieDetails } from '@/interfaces/interfaces';
import React from 'react';
import { View, Text, Image, ScrollView, Pressable } from 'react-native';
import { MoveRight } from "lucide-react-native";
import { Link } from 'expo-router';




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
      <Text className='text-accent font-semibold'>{value}</Text>
    </View>
  )
}

function ProductionDetails ({ title, items }: { title: string; items: string[] }){
  return (
    <View >
      <Text className='text-light-300'>{title}</Text>
      <View className='flex-row flex flex-wrap'>
        {items.map((item, i) => (
          <View className='flex-row items-center' key={i}>
            
            <Text className='text-accent font-bold rounded-sm flex py-1 justify-center items-center'>{item}</Text>
                     
          
            {i < items.length - 1 && (<Text className='text-light-300 mr-1'> &#8226;	</Text>)}
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
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false} contentContainerStyle={{
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

        <View className='px-4'>

          <View className='gap-3'>
            <Text className='text-white font-bold text-2xl mt-2'>{title}</Text>
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

          <View className='gap-5 mt-6'>

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
            
            {budget | revenue ? (
              <View className='flex-row gap-6'>
                {budget > 0 && (
                  <Details label="Budget" value={
                    budget >= 1_000_000_000
                      ? `$${Math.round(budget / 1_000_000_000)} Billion`
                    : budget >= 1_000_000
                      ? `$${Math.round(budget / 1_000_000)} Million`
                    : budget >= 1_000
                      ? `$${Math.round(budget / 1_000)} Thousand`
                    : `$${budget}`
                   } />
                )}
                
                {revenue > 0 && (
                  <Details label="Revenue" value={
                    revenue >= 1_000_000_000
                      ? `$${Math.round(revenue / 1_000_000_000)} Billion`
                    : revenue >= 1_000_000
                      ? `$${Math.round(revenue / 1_000_000)} Million`
                    : revenue >= 1_000
                      ? `$${Math.round(revenue / 1_000)} Thousand`
                    : `$${revenue}`
                  } />
                )}
                
              </View>
            ): null}
            

            {tagline && tagline.trim().length > 0 && (
              <Details label="Tagline" value={tagline} />
            )}

            <ProductionDetails title='Production Companies' items={production_companies.map((c) => c.name)} />

            
            <Link className='bg-accent py-4 flex-1 w-full flex-row gap-4 rounded' href={'/'} asChild>
              <Pressable className='flex-row justify-center items-center flex'>
                <Text className='font-semibold text-center'> Visit Homepage</Text>

                <MoveRight />
              </Pressable>
            </Link> 
            

          </View>

        </View>

        
      </ScrollView>
    </View>
  );
}
