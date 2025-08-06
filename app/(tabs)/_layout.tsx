import cn from "clsx";
import { Tabs } from 'expo-router';
import React from 'react';
import { Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const TabBarIcon = ({ focused, icon, title }: { focused: boolean, icon: string, title: string }) => (
    <View className='tab-icon'>
        <Icon name={icon} size={22} color={"#3b82f6"} />
        <Text className={cn('text-sm font-quicksand-bold', focused)}>
            {title}
        </Text>
    </View>
)

const TabLayout = () => {
    return (
        <Tabs screenOptions={{
            headerShown: false,
            tabBarShowLabel: false,
            tabBarActiveBackgroundColor: "#f0f0f0",
        }}>
            <Tabs.Screen
                name='index'
                options={{
                    title: "Home",
                    tabBarIcon: ({ focused }) => (<TabBarIcon focused={focused} title='Home' icon={"home"} />)
                }}
            />
            <Tabs.Screen
                name='settings'
                options={{
                    title: "Settings",
                    tabBarIcon: ({ focused }) => (<TabBarIcon focused={focused} title='Settings' icon={"cog"} />)
                }}
            />
        </Tabs>
    );
}

export default TabLayout;
