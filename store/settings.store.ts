import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from "zustand";



type SettingsStore = {
    isLives: boolean,
    setIsLives: (value: boolean) => Promise<void>
    isTimer: boolean,
    setIsTimer: (value: boolean) => Promise<void>
    theme: "dark" | "light" | string,
    setTheme: (value: string) => Promise<void>,
    colorTheme: "blue" | "red" | "pink" | "purple" | "orange" | string
    setColorTheme: (value: string) => Promise<void>,
    initializeSettings: () => Promise<void>
}

const useSettingsStore = create<SettingsStore>((set) => ({
    isLives: true,
    isTimer: true,
    theme: "dark",
    colorTheme: "blue",
    setIsLives: async (value) => {
        set({ isLives: value })
        await AsyncStorage.setItem("isLives", JSON.stringify(value))
    },
    setIsTimer: async (value) => {
        set({ isTimer: value })
        await AsyncStorage.setItem("isTimer", JSON.stringify(value))
    },
    setTheme: async (value) => {
        set({ theme: value })
        await AsyncStorage.setItem("theme", value)
    },
    setColorTheme: async (value) => {
        set({ colorTheme: value })
        await AsyncStorage.setItem("colorTheme", value)
    },


    initializeSettings: async () => {
        try {
            const storedIsLives = await AsyncStorage.getItem("isLives")
            const storedIsTimer = await AsyncStorage.getItem("isTimer")
            const storedTheme = await AsyncStorage.getItem("theme")
            const storedColorTheme = await AsyncStorage.getItem("colorTheme")

            set({
                isLives: storedIsLives !== null ? JSON.parse(storedIsLives) : true,
                isTimer: storedIsTimer !== null ? JSON.parse(storedIsTimer) : true,
                theme: storedTheme || "dark",
                colorTheme: storedColorTheme || "blue"
            })
        } catch (error) {
            console.log("Error Loading Settings", error)
        }
    }
}))

export default useSettingsStore