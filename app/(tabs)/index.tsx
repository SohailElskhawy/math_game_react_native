import { COLOR_MAP, GAME_MODES, THEME_COLORS } from "@/constants";
import useSettingsStore from "@/store/settings.store";
import { getScore } from "@/utils/score.util";
import { router, useFocusEffect } from "expo-router";
import { useCallback, useEffect, useState } from "react";
import { FlatList, Pressable, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import FontA from 'react-native-vector-icons/FontAwesome6';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
export default function Index() {
	const { theme, colorTheme } = useSettingsStore()
	const themeColors = THEME_COLORS[theme as keyof typeof THEME_COLORS]
	return (
		<SafeAreaView
			className="flex-1"
			style={{ backgroundColor: themeColors.background }}
		>
			<FlatList
				data={GAME_MODES}
				renderItem={({ item }) => <GameModeButton name={item.name} colorTheme={colorTheme} icon={item.icon} theme={theme} />}
				extraData={[colorTheme, theme]}
				keyExtractor={item => item.name}
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

const GameModeButton = ({ name, colorTheme, icon, theme }: { name: string, colorTheme: string, icon: string, theme: string }) => {
	const themeColors = THEME_COLORS[theme as keyof typeof THEME_COLORS]
	const accentColor = COLOR_MAP[colorTheme as keyof typeof COLOR_MAP]
	const [score, setScore] = useState<number>(0);

	const fetchScore = useCallback(async () => {
		try {
			const highScore = await getScore(name.toLowerCase());
			setScore(Number(highScore) || 0);
		} catch (error) {
			console.error('Error fetching score:', error);
		}
	}, [name]);

	useEffect(() => {
		fetchScore();
	}, [fetchScore]);

	// Refresh scores when screen comes into focus
	useFocusEffect(
		useCallback(() => {
			fetchScore();
		}, [fetchScore])
	);
	
	return (
		<View className="mx-4 my-3">
			<Pressable
				className="border rounded-lg px-5 py-6"
				style={{
					borderColor: accentColor,
					backgroundColor: theme === 'dark' ? themeColors.surface : themeColors.background,
					minHeight: 100
				}}
				android_ripple={{ color: accentColor + '22' }}
				onPress={() => router.push({
                    pathname: '/(game)/questions',
                    params: { gameMode: name.toLowerCase()}
                })}
			>
				<View className="flex-row items-center justify-between mb-2">
					{
						icon === "divide" ? (
							<FontA name="divide" size={24} color={accentColor} />
						) : (
							<MaterialIcon name={icon} size={28} color={accentColor} />
						)
					}
					<Text
						className="text-center font-quicksand-bold text-3xl flex-1 mx-4"
						style={{ color: accentColor }}
					>
						{name}
					</Text>
					{
						icon === "divide" ? (
							<FontA name="divide" size={24} color={accentColor} />
						) : (
							<MaterialIcon name={icon} size={28} color={accentColor} />
						)
					}
				</View>
				{
					(score > 0) && (
						<Text
							className="text-center font-quicksand-light text-sm mt-2"
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