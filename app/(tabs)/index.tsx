import { COLOR_MAP, GAME_MODES, THEME_COLORS } from "@/constants";
import useScoreStore from "@/store/score.store";
import useSettingsStore from "@/store/settings.store";
import { router } from "expo-router";
import { FlatList, Pressable, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import FontA from 'react-native-vector-icons/FontAwesome6';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
export default function Index() {
	const { theme, colorTheme } = useSettingsStore()
	const { randomScore, additionScore, subtractionScore, multiplicationScore, divisionScore } = useScoreStore()
	const themeColors = THEME_COLORS[theme as keyof typeof THEME_COLORS]
	const scores = {
		"Random":randomScore,
		"Addition": additionScore,
		"Subtraction":subtractionScore,
		"Multiplication":multiplicationScore,
		"Division":divisionScore
	}

	return (
		<SafeAreaView
			className="flex-1"
			style={{ backgroundColor: themeColors.background }}
		>
			<FlatList
				data={GAME_MODES}
				renderItem={({ item }) => <GameModeButton name={item.name} colorTheme={colorTheme} icon={item.icon} theme={theme} score={scores[item.name as keyof typeof scores]} />}
				extraData={[colorTheme, theme]}
				keyExtractor={item => item.name}
				contentContainerStyle={{ paddingBottom: 120, paddingHorizontal: 20 }}
				showsVerticalScrollIndicator={false}
				ListHeaderComponent={() => (
					<View className="mt-2">
						<Text
							className="text-center text-2xl font-quicksand-bold"
							style={{ color: COLOR_MAP[colorTheme as keyof typeof COLOR_MAP] }}
						>
							Boost Your Brain With Math
						</Text>
					</View>
				)}
			/>
		</SafeAreaView>
	);
}

const GameModeButton = ({ name, colorTheme, icon, theme, score }: { name: string, colorTheme: string, icon: string, theme: string, score: number }) => {
	const themeColors = THEME_COLORS[theme as keyof typeof THEME_COLORS]
	const accentColor = COLOR_MAP[colorTheme as keyof typeof COLOR_MAP]

	return (
		<View className="my-6">
			<Pressable
				className="border mx-2 my-2 font-medium rounded-lg px-5 py-2.5 text-center"
				style={{
					borderColor: accentColor,
					backgroundColor: theme === 'dark' ? themeColors.surface : themeColors.background
				}}
				android_ripple={{ color: accentColor + '22' }}
				onPress={() => router.push({
                    pathname: '/questions',
                    params: { gameMode: name.toLowerCase() }
                })}
			>
				<View className="flex-1 flex-row items-center justify-between">
					{
						icon === "divide" ? (
							<FontA name={icon} size={21} color={accentColor} />
						) : <MaterialIcon name={icon} size={25} color={accentColor} />
					}
					<Text
						className="text-center font-quicksand-bold text-4xl"
						style={{ color: accentColor }}
					>
						{name}
					</Text>
					{
						icon === "divide" ? (
							<FontA name={icon} size={21} color={accentColor} />
						) : <MaterialIcon name={icon} size={25} color={accentColor} />
					}
				</View>
				{
					score > 0 && (
						<Text
							className="text-center font-quicksand-light text-sm"
							style={{ color: themeColors.textSecondary }}
						>
							High Score: {score}
						</Text>
					)
				}
			</Pressable>
		</View>
	)
}