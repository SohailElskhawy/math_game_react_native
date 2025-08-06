import { COLOR_MAP, THEME_COLORS } from "@/constants";
import useSettingsStore from "@/store/settings.store";
import { Tabs } from 'expo-router';
import React from 'react';
import { Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const TabBarIcon = ({ focused, icon, title, colorTheme, theme }: { 
    focused: boolean, 
    icon: string, 
    title: string,
    colorTheme: string,
    theme: string 
}) => {
    const themeColors = THEME_COLORS[theme as keyof typeof THEME_COLORS]
    const accentColor = COLOR_MAP[colorTheme as keyof typeof COLOR_MAP]
    
    return (
        <View className='tab-icon'>
            <Icon 
                name={icon} 
                size={22} 
                color={focused ? accentColor : themeColors.textSecondary} 
            />
            <Text 
                className='text-sm font-quicksand-bold'
                style={{ 
                    color: focused ? accentColor : themeColors.textSecondary 
                }}
            >
                {title}
            </Text>
        </View>
    )
}

const TabLayout = () => {
    const { theme, colorTheme } = useSettingsStore()
    const themeColors = THEME_COLORS[theme as keyof typeof THEME_COLORS]
    
    return (
        <Tabs screenOptions={{
            headerShown: false,
            tabBarShowLabel: false,
            tabBarStyle: {
                backgroundColor: themeColors.surface,
                borderTopColor: themeColors.border,
                borderTopWidth: 1,
            },
            tabBarActiveBackgroundColor: "transparent",
        }}>
            <Tabs.Screen
                name='index'
                options={{
                    title: "Home",
                    tabBarIcon: ({ focused }) => (
                        <TabBarIcon 
                            focused={focused} 
                            title='Home' 
                            icon={"home"} 
                            colorTheme={colorTheme}
                            theme={theme}
                        />
                    )
                }}
            />
            <Tabs.Screen
                name='settings'
                options={{
                    title: "Settings",
                    tabBarIcon: ({ focused }) => (
                        <TabBarIcon 
                            focused={focused} 
                            title='Settings' 
                            icon={"cog"} 
                            colorTheme={colorTheme}
                            theme={theme}
                        />
                    )
                }}
            />
        </Tabs>
    );
}

export default TabLayout;
