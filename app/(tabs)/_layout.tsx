import { Image, ImageBackground, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Tabs } from 'expo-router'
import { images } from '@/constants/images'
import { icons } from '@/constants/icons'
import { TabIconProps } from '@/types/componentProps'


const TabIcon = ({ focused, icon, title }: TabIconProps) => {
    if (focused) {
      return (
        <ImageBackground source={images.highlight} className='flex flex-row w-full flex-1 min-w-[112px] min-h-14 mt-[18px] ml-1 justify-center items-center rounded-full overflow-hidden'>
          <Image source={icon} tintColor="#151312"  className='size-5' />
          <Text className='text-secondary text-base font-semibold ml-2'>{ title }</Text>
        </ImageBackground>
      )
    }else {
      return (
        <View className='size-full mt-4 justify-center items-center rounded-full'>
          <Image source={icon} tintColor="#A8B5DB"  className='size-5' />
        </View>
      )
    }
}



const _layout = () => {
  
  return (
    <Tabs screenOptions={{ 
       headerShown: false, 
       tabBarShowLabel: false,
       tabBarItemStyle: {
        width: "100%",
        height: "100%",
        justifyContent: "center",
        alignItems: "center",
       },
       tabBarStyle: {
        backgroundColor: "#0f0d23",
        borderRadius: 50,
        height: 56,
        marginHorizontal: 10,
        marginBottom: 14,
        position: "absolute",
        overflow: "hidden",
        borderWidth: 1,
        borderColor: "#0f0d23",
       }
      }}>

      <Tabs.Screen name="index" options={{ title: 'Home',
        tabBarIcon: ({focused}) =>(
          <>
            <TabIcon focused={focused} icon={icons.home} title="Home" />
          </>
        )
      }}/>

      <Tabs.Screen name="search" options={{ title: 'Search', 
        tabBarIcon: ({focused}) =>(
          <>
            <TabIcon focused={focused} icon={icons.search} title="Search" />
          </>
        )
      }} />

      <Tabs.Screen name="saved" options={{ title: 'Saved',
        tabBarIcon: ({focused}) =>(
          <>
            <TabIcon focused={focused} icon={icons.save} title="Saved" />
          </>
        )
      }} />

      <Tabs.Screen name="profile" options={{ title: 'Profile', 
        tabBarIcon: ({focused}) =>(
          <>
            <TabIcon focused={focused} icon={icons.person} title="Profile" />
          </>
        )
      }} />
    </Tabs>
  )
}

export default _layout

const styles = StyleSheet.create({})