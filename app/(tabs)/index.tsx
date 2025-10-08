
import MovieCard from "@/components/MovieCard";
import SearchBar from "@/components/SearchBar";
import TrendingMovieCard from "@/components/TrendingMovieCard";
import { icons } from "@/constants/icons";
import { images } from "@/constants/images";
import { fetchMovies } from "@/services/api";
import { TrendingMovies } from "@/services/appwrite";
import useFetch from "@/services/useFetch";
import { useRouter } from "expo-router";
import { useCallback, useState } from "react";
import { ActivityIndicator, FlatList, Image, RefreshControl, ScrollView, Text, View } from "react-native";

export default function Index() {
 
  const router = useRouter();

  const [refreshing, setRefreshing] = useState(false)
  

  const {
    data: movies,
    loading: moviesloading,
    error: moviesError,
    refetch: refetchMovies,
  } = useFetch(() => fetchMovies({
    query: ''
  }))

  const {
    data: trendingMovies,
    loading: trendingMoviesloading,
    error: trendingMovieserror,
    refetch: refetchTrending,
  } = useFetch(() => TrendingMovies());


  // --- Refresh handler ---
  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    try {
      await Promise.all([
        refetchMovies?.(),
        refetchTrending?.(),
      ]);
    } catch (error) {
      console.error("Refresh error:", error);
    } finally {
      setRefreshing(false);
    }
  }, [refetchMovies, refetchTrending]);

 

  return (
    <View
      className="flex-1 bg-primary"
    >
      <Image source={images.bg} className="z-0 w-full absolute" />
      <ScrollView className="px-5 flex-1" showsVerticalScrollIndicator={false} contentContainerStyle={{
        minHeight: "100%",
        paddingBottom: 10,
      }}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor="#fff" />
      }
      >
        <Image source={icons.logo} className="w-12 h-10 mt-20 mb-5 mx-auto" />

        {moviesloading || trendingMoviesloading ? (
          <ActivityIndicator 
            size="large"
            color="#0000ff"
            className="mt-10 self-center"
          />) : moviesError || trendingMovieserror ? (
            <Text> Error: ${moviesError?.message}</Text>
          ) : (
            <View className="flex-1 mt-5">
              <SearchBar
                onPress={() => router.push("/search")}
                placeholder="Search for a movie"
              />

              <>
                <View>
                  <Text className="text-lg text-white font-bold mt-5 mb-3">Popular Movies</Text>
              
                  <FlatList 
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    data={trendingMovies}
                    renderItem={({item, index}) => (
                      <TrendingMovieCard  movie={item} index={index} />
                    )}
                    keyExtractor={(item) => item.movie_id.toString()}
                    className="mb-4 mt-3"
                  />
                  
                </View>
              
              
                <Text className="text-lg text-white font-bold mt-5 mb-3"> Latest Movies </Text>
                <FlatList
                  data={movies}
                  renderItem={({item}) => (
                    <MovieCard 
                    movie={item}
                    />
                  )}
                  keyExtractor={(item) => item.id.toString()}
                  numColumns={3}
                  columnWrapperStyle={{
                    justifyContent: 'flex-start',
                    gap: 20,
                    marginBottom: 10,
                  }}
                  className="mt-2 pb-32"
                  scrollEnabled={false}
                />
              </>
            </View>
          )
        }
      </ScrollView>
      
    </View>
  );
}
