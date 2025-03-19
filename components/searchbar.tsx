import {View, Text, Image, TextInput} from 'react-native'
import React from 'react'
import {icons} from "@/constants/icons";
interface SearchbarProps {
   onPress: () => void;
   placeholder: string;

}
const Searchbar = ({onPress,placeholder}:SearchbarProps) => {
   return (
      <View className="flex-row bg-dark-200 items-center rounded-full px-5 py-4">

         <Image source={icons.search} className="size-5" resizeMode="contain" tintColor="#ab8bff"/>
      <TextInput onPress={onPress} placeholder={placeholder} value="" onChangeText={()=>{}}
                 placeholderTextColor="#a8b5db"
      className="flex-1 ml-2 text-white"/>
      </View>
   )
}
export default Searchbar
