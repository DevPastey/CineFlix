import { StyleSheet, Text, View, Image, FlatList, ActivityIndicator } from 'react-native'
import React, { use, useEffect, useState } from 'react'
import { images } from '@/constants/images'
import useFetch from '@/services/useFetch'
import { fetchMovies } from '@/services/api'
import MovieCard from '@/components/MovieCard'
import { icons } from '@/constants/icons'
import SearchBar from '@/components/SearchBar'
import { updateSearchCount } from '@/services/appwrite'

const Search = () => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  
  const {
    data: movies,
    loading: moviesloading,
    error: moviesError,
    refetch: refetchMovies,
    reset
  } = useFetch(() => fetchMovies({
    query: searchQuery,
  }), false);

  //useFetch(() => TrendingMovies())

  const handlePress = () => {
    //console.log(searchQuery)
    //updateSearchCount(searchQuery, movies);
    //console.log(movies[0].id)
    // refetchMovies();
    //TrendingMovies()
  }

   
    useEffect(() => {
      //updateSearchCount(searchQuery, movies);

      const timeoutId = setTimeout(
        async() =>{
          if (searchQuery.trim() && searchQuery != "") {
            await refetchMovies()
            
          }else{
            reset()
          }
        }, 500)

      return () => {clearTimeout(timeoutId);}
      
    }, [searchQuery])

    useEffect(() => {
      if (searchQuery.trim() && movies?.length > 0 && movies?.[0]) {
        updateSearchCount(searchQuery, movies[0])
      }
    }, [movies])

  
  
  return (
    <View className='flex-1 bg-primary'>
      <Image source={images.bg} className='flex-1 absolute w-full z-0' resizeMode='cover'/>
      

      <FlatList 
        data={movies}
        renderItem={({ item }) => ( <MovieCard {...item} /> )}
        keyExtractor={(item) => item.id.toString()}
        className='px-5'
        numColumns={3}
        columnWrapperStyle={{
          justifyContent: "center",
          marginVertical: 16,
          gap: 16
        }}
        contentContainerStyle={{
          paddingBottom: 100,
        }}

        ListHeaderComponent={
          <>
            <View className='w-full flex-row justify-center mt-20'> 
              <Image source={icons.logo} />
            </View>

            <View className='my-5'>
              <SearchBar 
              value={searchQuery}
              onPress={handlePress} 
              onChangeText={(text: string) => {setSearchQuery(text)}} 
              placeholder="Search movies..."
             />
            </View>

            {moviesloading && (
              <ActivityIndicator size='large' color='#0000ff' />
            )}

            {moviesError && (
              <Text  className='text-red-500 px-5 my-3'> Error: {moviesError.message} </Text>
            )}

            {!moviesloading && !moviesError && searchQuery.trim() && movies?.length > 0 && (
              <Text className='text-xl text-white font-bold'>
                Search result for{' '}
                <Text className='text-accent'>{searchQuery}</Text>
              </Text>
            )} 
          </>
        }

        ListEmptyComponent={
          !moviesloading && !moviesError ? (
            <View className='mt-10 px-5'>
              <Text className='text-center text-gray-500'>
                {searchQuery.trim() ? "No movies found" : 'Search for a movie'}
              </Text>
            </View>
          ): null
          }

      />

    </View>
  )
}

export default Search

const styles = StyleSheet.create({})