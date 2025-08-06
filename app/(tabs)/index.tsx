import { COLOR_MAP, GAME_MODES } from "@/constants";
import useSettingsStore from "@/store/settings.store";
import cn from 'clsx';
import { FlatList, Pressable, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import FontA from 'react-native-vector-icons/FontAwesome6';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
export default function Index() {
	const { theme, colorTheme } = useSettingsStore()

	return (
		<SafeAreaView className={cn("flex-1", theme)}>
			<FlatList
				data={GAME_MODES}
				renderItem={({ item }) => <GameModeButton name={item.name} colorTheme={colorTheme} icon={item.icon}/>}
				extraData={colorTheme}
				keyExtractor={item => item.name}
				contentContainerClassName="pb-28 px-5"
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

const GameModeButton = ({ name, colorTheme, icon }: { name: string, colorTheme: string, icon: string }) => {
	return (
		<View className="my-6">
			<Pressable className={cn("game-mode-btn", colorTheme)} android_ripple={{ color: '#fffff22' }}>
				<View className="flex-1 flex-row items-center justify-between">
					{
						icon === "divide" ? (
							<FontA name={icon} size={21} color={COLOR_MAP[colorTheme as keyof typeof COLOR_MAP]} />
						): 	<MaterialIcon name={icon} size={25} color={COLOR_MAP[colorTheme as keyof typeof COLOR_MAP]} />
					}
					<Text
						className="text-center font-quicksand-bold text-4xl"
						style={{ color: COLOR_MAP[colorTheme as keyof typeof COLOR_MAP] }}
					>
						{name}
					</Text>
					{
						icon === "divide" ? (
							<FontA name={icon} size={21} color={COLOR_MAP[colorTheme as keyof typeof COLOR_MAP]} />
						): 	<MaterialIcon name={icon} size={25} color={COLOR_MAP[colorTheme as keyof typeof COLOR_MAP]} />
					}
				</View>
				{/* if there is high score show */}
				<Text className="text-center font-quicksand-light text-sm">High Score: 1212</Text>
			</Pressable>
		</View>
	)
}