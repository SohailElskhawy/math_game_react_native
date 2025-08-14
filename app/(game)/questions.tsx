import AnimatedTimer from '@/components/AnimatedTimer'
import { COLOR_MAP, INITIAL_TIME, THEME_COLORS, TOTAL_LIVES } from '@/constants'
import useSettingsStore from '@/store/settings.store'
import { generateQuestion } from '@/utils/question.util'
import { router, useLocalSearchParams } from 'expo-router'
import React, { useEffect, useMemo, useState } from 'react'
import { BackHandler, Text, TouchableOpacity, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

function Questions() {
	const { theme, colorTheme, isLives, isTimer } = useSettingsStore()
	const { gameMode } = useLocalSearchParams<{ gameMode: string }>()
	const themeColors = THEME_COLORS[theme as keyof typeof THEME_COLORS]
	const textColor = COLOR_MAP[colorTheme as keyof typeof COLOR_MAP]
	const [score, setScore] = useState(0)
	const [isGameOver, setIsGameOver] = useState(false)
	const [time, setTime] = useState(INITIAL_TIME)
	const [lives, setLives] = useState(TOTAL_LIVES);

	useEffect(() => {
		if (!isTimer) return;
		
		if (time <= 0) {
			setIsGameOver(true);
			return;
		}
		const timer = setInterval(() => {
			setTime((prev) => {
				const newTime = prev > 0 ? +(prev - 0.01).toFixed(2) : 0;
				if (newTime <= 0) {
					setIsGameOver(true);
				}
				return newTime;
			});
		}, 10);
		return () => clearInterval(timer);
	}, [time, isTimer]);

	const livesForQuestion = isLives ? lives : 0;
	
	const { question, answer, choices } = useMemo(
		() => generateQuestion(gameMode, score),
		[gameMode, score, livesForQuestion]
	)

	const handleChoicePress = (choice: number) => {
		if (choice === answer) {
			setScore(score + 100);
		} else {
			if (isLives) {
				setLives(lives - 1);
			}
		}

		if (isTimer) {
			setTime((prev) => Math.min(prev + 5, INITIAL_TIME));
		}
	}


	useEffect(() => {
		const shouldEndFromLives = isLives && lives === 0;
		const shouldEndFromTimer = isTimer && isGameOver;
		
		if (!isLives && !isTimer) return;
		

		if (shouldEndFromLives || shouldEndFromTimer) {
			router.replace({
				pathname: '/(game)/gameover',
				params: { gameMode, score: score.toString() }
			});
		}
	}, [lives, isGameOver, isLives, isTimer, gameMode, score]);


	useEffect(() => {
		const backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
			router.replace({
			pathname: '/(game)/gameover',
			params: { gameMode, score: score.toString() }
		});
			return true
		})

		return () => backHandler.remove()
	}, [gameMode, score])

	return (
		<SafeAreaView className="flex-1" style={{ backgroundColor: themeColors.background }} >
			<View className="items-center">
				<Text className="text-2xl font-quicksand-bold mt-4"
					style={{ color: textColor }}
				>
					{gameMode.toUpperCase()}
				</Text>
				<AnimatedTimer
					time={time}
					lives={lives}
					score={score}
					isLives={isLives}
					isTimer={isTimer}
				/>
			</View>
			{/* Question in the middle */}
			<View className='flex-1 items-center justify-center'>
				<Text className="text-6xl font-quicksand-bold" style={{ color: textColor }} >
					{question}
				</Text>
			</View>

			{/* Choices at the bottom */}
			<View className='pb-8'>
				<View className='flex-row justify-center gap-4 px-8'>
					<View className='flex-1 gap-4'>
						{choices.map((choice, i) =>
							i % 2 === 0 && (
								<TouchableOpacity
									key={i}
									className='rounded-2xl px-8 py-4 items-center justify-center shadow-lg'
									style={{ backgroundColor: textColor }}
									activeOpacity={0.8}
									onPress={() => handleChoicePress(choice)}
								>
									<Text className='text-3xl text-white font-quicksand-bold'>{choice}</Text>
								</TouchableOpacity>
							)
						)}
					</View>
					<View className='flex-1 gap-4'>
						{choices.map((choice, i) =>
							i % 2 === 1 && (
								<TouchableOpacity
									key={i}
									className='rounded-2xl px-8 py-4 items-center justify-center shadow-lg'
									style={{ backgroundColor: textColor }}
									activeOpacity={0.8}
									onPress={() => handleChoicePress(choice)}
								>
									<Text className='text-3xl text-white font-quicksand-bold'>{choice}</Text>
								</TouchableOpacity>
							)
						)}
					</View>
				</View>
			</View>
		</SafeAreaView>
	)
}

export default Questions