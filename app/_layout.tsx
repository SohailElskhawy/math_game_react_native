import useSettingsStore from '@/store/settings.store';
import { useFonts } from 'expo-font';
import { SplashScreen, Stack } from "expo-router";
import { useEffect } from 'react';
import "./global.css";


export default function RootLayout() {
    const {initializeSettings} = useSettingsStore() 
    const [fontsLoaded, error] = useFonts({
    "Quicksand-Regular": require("../assets/fonts/Quicksand-Regular.ttf"),
    "Quicksand-Bold": require("../assets/fonts/Quicksand-Bold.ttf"),
    "Quicksand-SemiBold": require("../assets/fonts/Quicksand-SemiBold.ttf"),
    "Quicksand-Light": require("../assets/fonts/Quicksand-Light.ttf"),
    "Quicksand-Medium": require("../assets/fonts/Quicksand-Medium.ttf"),
  })

  useEffect(() => {
    if (fontsLoaded) SplashScreen.hideAsync();
  }, [fontsLoaded, error]);

  useEffect(()=>{
    initializeSettings()
  },[])

    if(!fontsLoaded) return null


  return <Stack screenOptions={{ headerShown: false }} initialRouteName='(tabs)'/>;
}
