
import { icons } from "@/constants/icons";
import { images } from "@/constants/images";
import { fetchMovies } from "@/services/api";
import useFetch from "@/services/useFetch";
import { useRouter } from "expo-router";
import { ActivityIndicator, Image, ScrollView, Text, View } from "react-native";

export default function Index() {
  const router = useRouter();

  const {
    data: movies,
    loading: moviesloading,
    error: moviesError
  } = useFetch(() => fetchMovies({
    query: ''
  }))
  return (
    <View
      className="flex-1 bg-primary"
    >
      <Image source={images.bg} className="z-0 w-full absolute" />
      <ScrollView className="px-5 flex-1" showsVerticalScrollIndicator={false} contentContainerStyle={{
        minHeight: "100%",
        paddingBottom: 10
      }}>
        <Image source={icons.logo} className="w-12 h-10 mt-20 mb-5 mx-auto" />

        {moviesloading ? (
          <ActivityIndicator 

          />) : (
            <Text />
          )
        }
      </ScrollView>
      
    </View>
  );
}
