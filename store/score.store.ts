import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from "zustand";


type ScoreStore = {
    randomScore: number,
    additionScore: number,
    subtractionScore: number,
    multiplicationScore: number,
    divisionScore: number,
    setRandomScore: (value: number) => Promise<void>,
    setAdditionScore: (value: number) => Promise<void>,
    setSubtractionScore: (value: number) => Promise<void>,
    setMultiplicationScore: (value: number) => Promise<void>,
    setDivisionScore: (value: number) => Promise<void>,
    resetScores: () => Promise<void>,
    initializeScores: () => Promise<void>
}

const useScoreStore = create<ScoreStore>((set) => ({
    randomScore: 0,
    additionScore: 0,
    subtractionScore: 0,
    multiplicationScore: 0,
    divisionScore: 0,

    setRandomScore: async (value) => {
        set({ randomScore: value })
        await AsyncStorage.setItem("randomScore", JSON.stringify(value))
    },
    setAdditionScore: async (value) => {
        set({ additionScore: value })
        await AsyncStorage.setItem("additionScore", JSON.stringify(value))
    },
    setSubtractionScore: async (value) => {
        set({ subtractionScore: value })
        await AsyncStorage.setItem("subtractionScore", JSON.stringify(value))
    },
    setMultiplicationScore: async (value) => {
        set({ multiplicationScore: value })
        await AsyncStorage.setItem("multiplicationScore", JSON.stringify(value))
    },
    setDivisionScore: async (value) => {
        set({ divisionScore: value })
        await AsyncStorage.setItem("divisionScore", JSON.stringify(value))
    },
    resetScores: async () => {
        set({
            randomScore: 0,
            additionScore: 0,
            subtractionScore: 0,
            multiplicationScore: 0,
            divisionScore: 0
        })
        await Promise.all([
            AsyncStorage.setItem("randomScore", JSON.stringify(0)),
            AsyncStorage.setItem("additionScore", JSON.stringify(0)),
            AsyncStorage.setItem("subtractionScore", JSON.stringify(0)),
            AsyncStorage.setItem("multiplicationScore", JSON.stringify(0)),
            AsyncStorage.setItem("divisionScore", JSON.stringify(0))
        ])
    },
    initializeScores: async () => {
        try {
            const storedRandomScore = await AsyncStorage.getItem("randomScore");
            const storedAdditionScore = await AsyncStorage.getItem("additionScore");
            const storedSubtractionScore = await AsyncStorage.getItem("subtractionScore");
            const storedMultiplicationScore = await AsyncStorage.getItem("multiplicationScore");
            const storedDivisionScore = await AsyncStorage.getItem("divisionScore");

            set({
                randomScore: storedRandomScore !== null ? JSON.parse(storedRandomScore) : 0,
                additionScore: storedAdditionScore !== null ? JSON.parse(storedAdditionScore) : 0,
                subtractionScore: storedSubtractionScore !== null ? JSON.parse(storedSubtractionScore) : 0,
                multiplicationScore: storedMultiplicationScore !== null ? JSON.parse(storedMultiplicationScore) : 0,
                divisionScore: storedDivisionScore !== null ? JSON.parse(storedDivisionScore) : 0,
            })
        } catch (error) {
            console.log("Error Loading Scores", error)
        }
    }
}))

export default useScoreStore