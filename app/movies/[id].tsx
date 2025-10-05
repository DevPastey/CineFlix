import { ScrollView, StyleSheet, Text, View, Image, ActivityIndicator } from 'react-native'
import React, { useEffect } from 'react'
import { useLocalSearchParams } from 'expo-router'
import useFetch from '@/services/useFetch';
import { fetchMovieDetails } from '@/services/api';
import MovieDetailsPage from '@/components/MovieDetailsPage';

const MovieDetails = () => {
    const { id } = useLocalSearchParams();

    const {
      data: movieDetails,
      error: movieDetailsError,
      loading:movieDetailsLoading
    } = useFetch(() => fetchMovieDetails(id));

    
    useEffect(() => {
      fetchMovieDetails(id)
    }, [id]);
  return (
    <ScrollView contentContainerStyle={{
        // justifyContent: "center",
        // alignItems: "center",
        height: "100%",
      }} 
      className='bg-primary flex'

      {...movieDetailsLoading && (
        <ActivityIndicator size='large' color='#0000ff' />
      )}

      {...movieDetailsError && (
        <Text  className='text-red-500 px-5 my-3'> Error: {movieDetailsError.message} </Text>
      )}
    >
      {!movieDetailsLoading && !movieDetailsError && (
      <MovieDetailsPage  {...movieDetails} />
      )}

    </ScrollView>
  )
}

export default MovieDetails

const styles = StyleSheet.create({})