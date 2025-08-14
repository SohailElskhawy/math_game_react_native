import { COLOR_MAP, THEME_COLORS } from '@/constants'
import useSettingsStore from '@/store/settings.store'
import { resetScores } from '@/utils/score.util'
import React from 'react'
import { Alert, Pressable, ScrollView, Switch, Text, TouchableOpacity, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import MaterialDesignIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
const Settings = () => {
	const { theme, colorTheme, setTheme, setIsTimer, isTimer, isLives, setIsLives, setColorTheme } = useSettingsStore()
	const themeColors = THEME_COLORS[theme as keyof typeof THEME_COLORS]
	const textColor = COLOR_MAP[colorTheme as keyof typeof COLOR_MAP]

	const onResetScores = () => {
		Alert.alert('Reset Scores', 'Are You Sure You Want To Reset Your Scores ?', [
			{
				text: 'No',
				onPress: () => console.log('Cancel Pressed'),
				style: 'cancel',
			},
			{ text: 'Yes', onPress: async () => await resetScores(), style:"destructive" },
		]);
	}
	return (
		<SafeAreaView
			className="flex-1 p-3"
			style={{ backgroundColor: themeColors.background }}
		>
			<ScrollView className='flex-1'>
				<View>
					<View className='flex-row items-center justify-center'>
						<Text
							className='font-quicksand-bold text-4xl text-center'
							style={{ color: textColor }}
						>
							Settings
						</Text>
					</View>
					<View className='mt-8 flex-row justify-between'>
						<View className='flex-row items-center gap-4'>
							<View className='rounded-3xl p-1'
								style={{ backgroundColor: textColor }}
							>
								<MaterialIcons name='access-time' color={"white"} size={27} />
							</View>
							<Text className='font-quicksand-semibold text-xl' style={{ color: textColor }}>Play With Timer</Text>
						</View>
						<Switch
							value={isTimer}
							onValueChange={(value) => { setIsTimer(value) }}
							thumbColor={textColor}
						/>
					</View>
					<View className='mt-8 flex-row justify-between'>
						<View className='flex-row items-center gap-4'>
							<View className='rounded-3xl p-1'
								style={{ backgroundColor: textColor }}
							>
								<MaterialDesignIcons name='heart' color={"white"} size={27} />
							</View>
							<Text className='font-quicksand-semibold text-xl' style={{ color: textColor }}>Play With Lives</Text>
						</View>
						<Switch
							value={isLives}
							onValueChange={(value) => { setIsLives(value) }}
							thumbColor={textColor}
						/>
					</View>
					<View className='mt-8 flex-row justify-between'>
						<View className='flex-row items-center gap-4'>
							<View className='rounded-3xl p-1'
								style={{ backgroundColor: textColor }}
							>
								<MaterialIcons name='dark-mode' color={"white"} size={27} />
							</View>
							<Text className='font-quicksand-semibold text-xl' style={{ color: textColor }}>Dark Mode</Text>
						</View>
						<Switch
							value={theme === "dark"}
							onValueChange={(value) => {
								if (value) setTheme("dark")
								else setTheme("light")
							}}
							thumbColor={textColor}
						/>
					</View>
				</View>
				<View className='mt-8'>
					<View className='flex-row items-center gap-4'>
						<View className='rounded-3xl p-1'
							style={{ backgroundColor: textColor }}>
							<MaterialIcons name='color-lens' size={27} color={"white"} />
						</View>
						<Text className='font-quicksand-semibold text-xl' style={{ color: textColor }}>
							Theme Color:
						</Text>
					</View>
					<View className='flex-wrap w-96 flex-row mt-3 gap-4'>
						{
							Object.entries(COLOR_MAP).map(([key, color], index) => {
								return (
									<Pressable key={index} className='rounded-xl w-14 h-14 flex items-center justify-center'
										style={{ backgroundColor: color }}
										android_ripple={{ color: textColor + '22' }}
										onPress={() => { setColorTheme(key) }}
									>
										{
											colorTheme === key && <MaterialIcons name='check' size={27} color={"white"} />
										}
									</Pressable>
								)
							})
						}
					</View>
				</View>
				<View className='mt-16 flex items-center justify-center'>
					<TouchableOpacity
						className="border mx-2 my-2 font-medium rounded-lg px-5 py-2.5 text-center"
						style={{
							borderColor: textColor,
							backgroundColor: theme === 'dark' ? themeColors.surface : themeColors.background
						}}
						onPress={onResetScores}
					>
						<Text className='font-quicksand-semibold text-xl' style={{ color: textColor }}>Reset Your Scores</Text>
					</TouchableOpacity>
				</View>
			</ScrollView>
		</SafeAreaView>
	)
}

export default Settings