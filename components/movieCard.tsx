import { View, Text, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { Link } from 'expo-router'
import { icons } from '@/constants/icons'

const MovieCard = ({
    id,
    poster_path,
    release_date,
    title,
    vote_average,
}: Movie) => {
    return (
        <Link href={`/movie/${id}`} asChild>
            <TouchableOpacity className="w-[32%]">
                <Image
                    source={{
                        uri: poster_path
                            ? `https://image.tmdb.org/t/p/w500${poster_path}`
                            : 'https://placehold.co/600x600/1a1a1a/ffffff.png',
                    }}
                    className="w-full h-52 rounded-lg"
                    resizeMode="cover"
                />
                <Text
                    className="text-sm mt-2 font-bold text-white"
                    numberOfLines={1}
                >
                    {title}
                </Text>
                <View className="flex-row items-center justify-between">
                    <View className="flex-row items-center justify-start gap-x-1">
                        <Image source={icons.star} className="size-4" />
                        <Text className=" text-xs font-bold text-white">
                            {(vote_average / 2).toFixed(2)}
                        </Text>
                    </View>
                    <View className="flex-row items-center justify-between ">
                        <Text className="text-xs font-medium text-light-300">
                            {release_date.split('-')[0]}
                        </Text>
                        {/*<Text className="text-xs font-medium text-light-300 uppercase">*/}
                        {/*    {' '}*/}
                        {/*    Movie*/}
                        {/*</Text>*/}
                    </View>
                </View>
            </TouchableOpacity>
        </Link>
    )
}
export default MovieCard
