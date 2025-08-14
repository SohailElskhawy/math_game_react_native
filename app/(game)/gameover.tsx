import { COLOR_MAP, THEME_COLORS } from '@/constants'
import useSettingsStore from '@/store/settings.store'
import { getScore, setScore } from '@/utils/score.util'
import { router, useLocalSearchParams } from 'expo-router'
import { useEffect, useState } from 'react'
import { BackHandler, Text, TouchableOpacity, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import Icon from 'react-native-vector-icons/FontAwesome'

function GameOver() {
    const { theme, colorTheme } = useSettingsStore()
    const themeColors = THEME_COLORS[theme as keyof typeof THEME_COLORS]
    const textColor = COLOR_MAP[colorTheme as keyof typeof COLOR_MAP]
    const { gameMode, score } = useLocalSearchParams<{ gameMode: string, score: string }>()

    const [currentHighScore, setCurrentHighScore] = useState<number>(0)
    const [isNewHighScore, setIsNewHighScore] = useState(false)
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        const backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
            router.replace('/(tabs)')
            return true
        })

        return () => backHandler.remove()
    }, [])

    useEffect(() => {
        const handleScoreLogic = async () => {
            try {
                // Get the previous high score
                const previousHighScore = await getScore(gameMode)
                const currentScore = Number(score) || 0
                const prevHigh = Number(previousHighScore) || 0

                // Set initial high score
                setCurrentHighScore(prevHigh)

                // Check if current score is a new high score
                if (currentScore > prevHigh) {
                    await setScore(gameMode, currentScore)
                    setCurrentHighScore(currentScore)
                    setIsNewHighScore(true)
                }

                setIsLoading(false)
            } catch (error) {
                console.error('Error handling score:', error)
                setIsLoading(false)
            }
        }

        if (gameMode && score) {
            handleScoreLogic()
        }
    }, [gameMode, score])

    const handleGoHome = () => {
        router.replace('/(tabs)')
    }

    const handlePlayAgain = () => {
        router.push({
            pathname: '/(game)/questions',
            params: { gameMode: gameMode.toLowerCase() }
        })
    }

    if (isLoading) {
        return (
            <SafeAreaView className='flex-1' style={{ backgroundColor: themeColors.background }}>
                <View className='flex-1 items-center justify-center'>
                    <Text className="text-xl font-quicksand-bold" style={{ color: textColor }}>
                        Loading...
                    </Text>
                </View>
            </SafeAreaView>
        )
    }

    return (
        <SafeAreaView className='flex-1' style={{ backgroundColor: themeColors.background }}>
            <View className="items-center">
                <Text className="text-2xl font-quicksand-bold mt-4"
                    style={{ color: textColor }}
                >
                    {gameMode.toUpperCase()}
                </Text>
            </View>
            <View className='flex-1 items-center justify-center'>
                {isNewHighScore && (
                    <Text className="text-center font-quicksand-bold text-2xl mb-4" style={{ color: textColor }}>
                        🎉 New High Score! 🎉
                    </Text>
                )}
                <Text className="text-center font-quicksand-bold text-2xl mb-4" style={{ color: textColor }}>
                    Score: {score}
                </Text>
                <Text className="text-center font-quicksand-bold text-2xl mb-4" style={{ color: textColor }}>
                    High Score: {currentHighScore}
                </Text>
            </View>

            <View className='flex-1 flex-row items-center justify-center gap-4'>
                <TouchableOpacity
                    className='rounded-2xl px-8 py-4 items-center justify-center shadow-lg'
                    style={{ backgroundColor: textColor }}
                    activeOpacity={0.8}
                    onPress={handleGoHome}
                >
                    <Icon name="home" size={30} color={"white"} />
                </TouchableOpacity>

                <TouchableOpacity
                    className='rounded-2xl px-8 py-4 items-center justify-center shadow-lg'
                    style={{ backgroundColor: textColor }}
                    activeOpacity={0.8}
                    onPress={handlePlayAgain}
                >
                    <Icon name="repeat" size={30} color={"white"} />
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}

export default GameOver