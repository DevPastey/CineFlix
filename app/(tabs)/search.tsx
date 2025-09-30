import { StyleSheet, Text, View, Image, FlatList, ActivityIndicator } from 'react-native'
import React from 'react'
import { images } from '@/constants/images'
import useFetch from '@/services/useFetch'
import { fetchMovies } from '@/services/api'
import MovieCard from '@/components/MovieCard'
import { useRouter } from 'expo-router'
import { icons } from '@/constants/icons'
import SearchBar from '@/components/SearchBar'

const Search = () => {
  const router = useRouter();
  

  const {
    data: movies,
    loading: moviesloading,
    error: moviesError
  } = useFetch(() => fetchMovies({
    query: "",
  }))

  return (
    <View className='flex-1 bg-primary'>
      <Image source={images.bg} className='flex-1 absolute w-full z-0' resizeMode='cover'/>
      <Text className='text-white'>search</Text>

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
              <SearchBar placeholder="Search movies..." />
            </View>

            {moviesloading && (
              <ActivityIndicator size='large' color='#0000ff' />
            )}
          </>
        }
      />

    </View>
  )
}

export default Search

const styles = StyleSheet.create({})