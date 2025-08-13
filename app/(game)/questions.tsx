import AnimatedTimer from '@/components/AnimatedTimer'
import { COLOR_MAP, INITIAL_TIME, THEME_COLORS, TOTAL_LIVES } from '@/constants'
import useSettingsStore from '@/store/settings.store'
import { useLocalSearchParams } from 'expo-router'
import React, { useState } from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

function Questions() {
	const { theme, colorTheme } = useSettingsStore()
	const { gameMode } = useLocalSearchParams<{ gameMode: string }>()
	const themeColors = THEME_COLORS[theme as keyof typeof THEME_COLORS]
	const textColor = COLOR_MAP[colorTheme as keyof typeof COLOR_MAP]
	const [lives, setLives] = useState(TOTAL_LIVES);
	const [score, setScore] = useState(0)
	const [question, setQuestion] = useState("20 + 32")
	const [choices, setChoice] = useState(["52", "54", "56", "50"])


	return (
		<SafeAreaView className="flex-1" style={{ backgroundColor: themeColors.background }} >
			<View className="items-center">
				<Text className="text-2xl font-quicksand-bold mt-4"
					style={{ color: textColor }}
				>
					{gameMode.toUpperCase()}
				</Text>
				<AnimatedTimer initialTime={INITIAL_TIME} lives={lives} score={score} />
			</View>
			{/* Question in the middle */}
			<View className='flex-1 items-center justify-center'>
				<Text className="text-6xl font-quicksand-bold" style={{ color: textColor }} >
					{question}
				</Text>
			</View>

			{/* Choices at the bottom */}
			<View className='pb-8'>
				<View className='flex-row flex-wrap justify-center gap-8 px-8'>
					{
						choices.map((choice, i) =>
						(
							<TouchableOpacity
								key={i}
								className='rounded-2xl px-8 py-4 min-w-[140px] items-center justify-center shadow-lg'
								style={{ backgroundColor: textColor }}
								activeOpacity={0.8}
							>
								<Text className='text-3xl text-white font-quicksand-bold'>{choice}</Text>
							</TouchableOpacity>
						)
						)
					}
				</View>
			</View>
		</SafeAreaView>
	)
}

export default Questions