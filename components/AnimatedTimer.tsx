import { COLOR_MAP, INITIAL_TIME } from "@/constants";
import useSettingsStore from "@/store/settings.store";
import React from "react";
import { Text, View } from "react-native";
import Svg, { Circle } from "react-native-svg";
import MaterialDesignIcons from "react-native-vector-icons/MaterialCommunityIcons";

const AnimatedTimer = ({ time, lives, score, isLives, isTimer }: { time: number, lives: number, score: number, isLives: boolean, isTimer: boolean  }) => {
	const { colorTheme } = useSettingsStore()
	const textColor = COLOR_MAP[colorTheme as keyof typeof COLOR_MAP]
	const size = 40;
	const strokeWidth = 4;
	const radius = (size - strokeWidth) / 2;
	const circumference = 2 * Math.PI * radius;


	const progress = time / INITIAL_TIME;
	const strokeDashoffset = circumference * (1 - progress);

	return (
		<View className="flex-row items-center justify-between px-4 py-2 rounded-full w-full">
			{isLives && (<View className="flex-row items-center space-x-1">
				{Array.from({ length: lives }).map((_, i) => (
					<MaterialDesignIcons
						name="heart"
						color={textColor}
						size={25}
						key={i}
					/>
				))}
			</View>)}
			<View className="flex-row items-center justify-center gap-2">
				<MaterialDesignIcons name="trophy" size={25} color={textColor} />
				<Text className="text-xl font-quicksand-bold" style={{ color: textColor }}>
					{score}
				</Text>
			</View>
			{isTimer && (<View className="relative">
				<Svg width={size} height={size}>
					<Circle
						cx={size / 2}
						cy={size / 2}
						r={radius}
						stroke={textColor}
						opacity={0.3}
						strokeWidth={strokeWidth}
						fill="black"
					/>
					<Circle
						cx={size / 2}
						cy={size / 2}
						r={radius}
						stroke={textColor}
						strokeWidth={strokeWidth}
						fill="transparent"
						strokeDasharray={`${circumference} ${circumference}`}
						strokeDashoffset={strokeDashoffset}
						strokeLinecap="round"
						rotation={-90}
						origin={`${size / 2}, ${size / 2}`}
					/>
				</Svg>
				<View className="absolute inset-0 justify-center items-center">
					<Text className="text-sm font-bold text-white" >
						{Math.ceil(time)}
					</Text>
				</View>
			</View>)}
		</View>
	);
};

export default AnimatedTimer;
