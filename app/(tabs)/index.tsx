import {
    ActivityIndicator,
    FlatList,
    Image,
    ScrollView,
    StatusBar,
    Text,
    View,
} from 'react-native'
import { Link } from 'expo-router'
import { images } from '@/constants/images'

import { icons } from '@/constants/icons'
import Searchbar from '@/components/searchbar'
import { useRouter } from 'expo-router'
import useFetch from '@/Services/useFetch'
import { fetchMovies } from '@/Services/api'
import MovieCard from '@/components/movieCard'
import { getTrendingMovies } from '@/Services/appwrite'
import TrendingCard from '@/components/trendingCard'

export default function Index() {
    const router = useRouter()
    const {
        data: trendingData,
        loading: trendingLoading,
        error: trendingError,
    } = useFetch(getTrendingMovies)
    const {
        data: movies,
        loading: moviesLoading,
        error: moviesError,
    } = useFetch(() => fetchMovies({ query: '' }))

    return (
        <View className="flex-1 bg-primary ">
            <Image source={images.bg} className="absolute w-full z-0" />
            <ScrollView
                className="flex-1 px-3"
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{
                    minHeight: '100%',
                    paddingBottom: 10,
                }}
            >
                <Image
                    source={icons.logo}
                    className="w-12 h-10 mt-20 mb-5 mx-auto"
                />
                {moviesLoading || trendingLoading ? (
                    <ActivityIndicator
                        size="large"
                        color="#0000ff"
                        className="mt-10 self-center"
                    />
                ) : moviesError || trendingError ? (
                    <Text>Error/l {moviesError?.message}</Text>
                ) : (
                    <View className="flex-1 mt-5 text-white">
                        <Searchbar
                            onPress={() => router.push('/search')}
                            placeholder="Search for a movie."
                        />
                        {trendingData && (
                            <View className={'mt-10'}>
                                <Text
                                    className={
                                        'text-lg text-white font-bold mb-3'
                                    }
                                >
                                    Trending Movies
                                </Text>
                            </View>
                        )}
                        <FlatList
                            horizontal={true}
                            data={trendingData}
                            showsHorizontalScrollIndicator={false}
                            ItemSeparatorComponent={() => (
                                <View className={'w-4'} />
                            )}
                            keyExtractor={(item) => item.movie_id.toString()}
                            renderItem={({ item, index }) => (
                                <TrendingCard movie={item} />
                            )}
                        />
                        <Text className="text-lg text-white font-bold mt-5 mb-3">
                            Latest movies
                        </Text>
                        <FlatList
                            data={movies}
                            renderItem={({ item }) => <MovieCard {...item} />}
                            keyExtractor={(item) => item.id}
                            numColumns={3}
                            columnWrapperStyle={{
                                justifyContent: 'space-between',

                                rowGap: 20,
                                // paddingRight: 5,
                                marginVertical: 14,
                            }}
                            className="mt-2 w-full pb-32"
                            scrollEnabled={false}
                        />
                    </View>
                )}
            </ScrollView>
        </View>
    )
}
