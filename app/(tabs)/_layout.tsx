import { View, Text, ImageBackground, Image } from 'react-native'
import React from 'react'
import { Tabs } from 'expo-router'
import { StatusBar } from 'expo-status-bar' // Import StatusBar
import { images } from '@/constants/images'
import { icons } from '@/constants/icons'

const TabIcon = ({
    focused,
    icon,
    title,
}: {
    focused: boolean
    icon: typeof icons.home
    title: string
}) => {
    if (focused)
        return (
            <ImageBackground
                source={images.highlight}
                className=" flex flex-row w-full flex-1 min-w-[112px] min-h-16 mt-4 justify-center items-center rounded-full overflow-hidden"
            >
                <Image
                    source={icon}
                    tintColor={'#151312'}
                    className=" size-5"
                />
                <Text className="text-secondary text-base font-semibold ml-2">
                    {title}
                </Text>
            </ImageBackground>
        )
    return (
        <View className="size-full justify-center items-center mt-4 rounded-full">
            <Image source={icon} tintColor={'#A8B5DB'} className="size-5" />
        </View>
    )
}

const _Layout = () => {
    return (
        <View style={{ flex: 1, backgroundColor: '#0f0d23' }}>
            {/* Transparent Status Bar */}
            <StatusBar
                translucent
                backgroundColor="transparent"
                style="light"
            />

            <Tabs
                screenOptions={{
                    tabBarShowLabel: false,
                    tabBarItemStyle: {
                        width: '100%',
                        height: '100%',
                        justifyContent: 'center',
                        alignItems: 'center',
                    },
                    tabBarStyle: {
                        backgroundColor: '#0f0d23',
                        borderRadius: 50,
                        marginHorizontal: 20,
                        marginBottom: 36,
                        height: 52,
                        position: 'absolute',
                        overflow: 'hidden',
                        borderWidth: 1,
                        borderColor: '#0f0d23',
                    },
                }}
            >
                <Tabs.Screen
                    name="index"
                    options={{
                        headerShown: false,
                        tabBarIcon: ({ focused }) => (
                            <TabIcon
                                focused={focused}
                                icon={icons.home}
                                title="Home"
                            />
                        ),
                    }}
                />
                <Tabs.Screen
                    name="search"
                    options={{
                        headerShown: false,
                        tabBarIcon: ({ focused }) => (
                            <TabIcon
                                focused={focused}
                                icon={icons.search}
                                title="Search"
                            />
                        ),
                    }}
                />
                <Tabs.Screen
                    name="save"
                    options={{
                        headerShown: false,
                        tabBarIcon: ({ focused }) => (
                            <TabIcon
                                focused={focused}
                                icon={icons.save}
                                title="Save"
                            />
                        ),
                    }}
                />
                <Tabs.Screen
                    name="profile"
                    options={{
                        headerShown: false,
                        tabBarIcon: ({ focused }) => (
                            <TabIcon
                                focused={focused}
                                icon={icons.person}
                                title="Profile"
                            />
                        ),
                    }}
                />
            </Tabs>
        </View>
    )
}

export default _Layout
