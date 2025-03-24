import { View, Text, Image, FlatList, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import { images } from '@/constants/images'
import MovieCard from '@/components/movieCard'
import useFetch from '@/Services/useFetch'
import { fetchMovies } from '@/Services/api'
import { useRouter } from 'expo-router'
import { icons } from '@/constants/icons'
import Searchbar from '@/components/searchbar'
import { updateSearchCount } from '@/Services/appwrite'

const Search = () => {
    const [searchValue, setSearchValue] = useState('')
    const router = useRouter()
    const {
        data: movies,
        loading: moviesLoading,
        error: moviesError,
        refetch: moviesRefetch,
        reset,
    } = useFetch(() => fetchMovies({ query: searchValue }), false)
    useEffect(() => {
        const func = setTimeout(async () => {
            if (searchValue.trim()) {
                await moviesRefetch()
            } else {
                reset()
            }
        }, 700)
        return () => clearTimeout(func)
    }, [searchValue])
    useEffect(() => {
        if (movies?.length > 0 && movies[0]) {
            updateSearchCount(searchValue, movies[0])
        }
    }, [movies])
    return (
        <View className="flex-1 bg-primary">
            <Image
                source={images.bg}
                className="flex-1 absolute w-full z-0"
                resizeMode="cover"
            />
            <FlatList
                renderItem={({ item }) => <MovieCard {...item} />}
                data={movies}
                keyExtractor={(item) => item.id}
                className="px-5"
                numColumns={3}
                columnWrapperStyle={{
                    justifyContent: 'space-between',

                    marginVertical: 16,
                }}
                ListHeaderComponent={
                    <>
                        <View className="w-full flex-row justify-center mt-20 items-center">
                            <Image source={icons.logo} className="w-12 h-12" />
                        </View>
                        <View className="my-5">
                            <Searchbar
                                placeholder="Search movies..."
                                onChange={(text: string) =>
                                    setSearchValue(text)
                                }
                                value={searchValue}
                            />
                        </View>
                        {moviesLoading && (
                            <ActivityIndicator
                                size="large"
                                color="#0000ff"
                                className="my-3"
                            />
                        )}
                        {moviesError && (
                            <Text className="text-red-600">
                                Error : {moviesError.message}
                            </Text>
                        )}
                        {!moviesError &&
                            !moviesLoading &&
                            searchValue.trim() && (
                                <Text className="text-xl text-white font-bold">
                                    Search Result for{' '}
                                    <Text className="text-accent">
                                        {searchValue}
                                    </Text>
                                </Text>
                            )}
                    </>
                }
                ListEmptyComponent={
                    !moviesLoading && !moviesError ? (
                        <View className="mt-10 px-5">
                            <Text className="text-center text-gray-500">
                                {searchValue.trim()
                                    ? 'No movies found'
                                    : 'Search for a movie'}
                            </Text>
                        </View>
                    ) : null
                }
            />
        </View>
    )
}
export default Search
