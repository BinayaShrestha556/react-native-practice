import { View, Text, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { Link } from 'expo-router'

const TrendingCard = ({ movie }: { movie: TrendingMovie }) => {
    console.log(movie)

    return (
        <Link href={`/movie/${movie.movie_id}`} asChild>
            <TouchableOpacity className={'w-32 relative pl-5'}>
                <Image
                    source={{ uri: movie.poster_url }}
                    className={'w-32 h-48 rounded-lg'}
                    resizeMode="cover"
                />
                <Text
                    className={'text-sm text-white font-semibold mt-2'}
                    numberOfLines={2}
                >
                    {movie.title}
                </Text>
            </TouchableOpacity>
        </Link>
    )
}
export default TrendingCard
