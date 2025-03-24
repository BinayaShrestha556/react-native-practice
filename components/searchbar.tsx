import { View, Text, Image, TextInput } from 'react-native'
import React from 'react'
import { icons } from '@/constants/icons'
interface SearchbarProps {
    onPress?: () => void
    placeholder: string
    onChange?: (text: string) => void
    value?: string
}
const Searchbar = ({
    onPress,
    placeholder,
    value,
    onChange,
}: SearchbarProps) => {
    return (
        <View className="flex-row bg-dark-200 items-center  px-5 py-2 rounded-lg">
            <Image
                source={icons.search}
                className="size-5"
                resizeMode="contain"
                tintColor="#ab8bff"
            />
            <TextInput
                onPress={onPress}
                placeholder={placeholder}
                value={value}
                onChangeText={onChange}
                placeholderTextColor="#a8b5db"
                className="flex-1 ml-2 text-white"
            />
        </View>
    )
}
export default Searchbar
