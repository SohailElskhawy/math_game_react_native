import AsyncStorage from "@react-native-async-storage/async-storage";

export const getScore = async (gameMode:string) => {
    let score;
    switch (gameMode) {
        case "addition":
            score = await AsyncStorage.getItem("additionScore");
            break;
        case "subtraction":
            score = await AsyncStorage.getItem("subtractionScore");
            break;
        case "multiplication":
            score = await AsyncStorage.getItem("multiplicationScore");
            break;
        case "division":
            score = await AsyncStorage.getItem("divisionScore");
            break;
        case "random":
            score = await AsyncStorage.getItem("randomScore");
            break;
        case "equation":
            score = await AsyncStorage.getItem("equationScore");
            break;
        default:
            return 0;
    }
    return score;
}

export const setScore = async (gameMode:string, value:number) => {
    switch (gameMode) {
        case "addition":
            return await AsyncStorage.setItem("additionScore", JSON.stringify(value))
        case "subtraction":
            return  await AsyncStorage.setItem("subtractionScore", JSON.stringify(value))
        case "multiplication":
            return await AsyncStorage.setItem("multiplicationScore", JSON.stringify(value))
        case "division":
            return await AsyncStorage.setItem("divisionScore", JSON.stringify(value))
        case "random":
            return await AsyncStorage.setItem("randomScore", JSON.stringify(value))
        case "equation":
            return await AsyncStorage.setItem("equationScore", JSON.stringify(value))
        default:
            return 0;
    }
}


export const resetScores = async () => {
    await Promise.all([
        AsyncStorage.setItem("randomScore", JSON.stringify(0)),
        AsyncStorage.setItem("additionScore", JSON.stringify(0)),
        AsyncStorage.setItem("subtractionScore", JSON.stringify(0)),
        AsyncStorage.setItem("multiplicationScore", JSON.stringify(0)),
        AsyncStorage.setItem("divisionScore", JSON.stringify(0))
        , AsyncStorage.setItem("equationScore", JSON.stringify(0))
    ])
}