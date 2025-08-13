import { COLOR_MAP } from "@/constants";
import useSettingsStore from "@/store/settings.store";
import React, { useEffect, useState } from "react";
import { Text, View } from "react-native";
import Svg, { Circle } from "react-native-svg";
import MaterialDesignIcons from "react-native-vector-icons/MaterialCommunityIcons";

const AnimatedTimer = ({ initialTime, lives, score }: { initialTime: number, lives: number, score: number }) => {
	const { colorTheme } = useSettingsStore()
	const textColor = COLOR_MAP[colorTheme as keyof typeof COLOR_MAP]
	const [time, setTime] = useState(initialTime);

	const size = 40;
	const strokeWidth = 4;
	const radius = (size - strokeWidth) / 2;
	const circumference = 2 * Math.PI * radius;

	useEffect(() => {
		if (time <= 0) return;
		const timer = setInterval(() => {
			setTime((prev) => ((prev > 0 ? +(prev - 0.01).toFixed(2) : 0)));
		}, 10);
		return () => clearInterval(timer);
	}, []);

	const progress = time / initialTime;
	const strokeDashoffset = circumference * (1 - progress);

	return (
		<View className="flex-row items-center justify-between px-4 py-2 rounded-full w-full">
			<View className="flex-row items-center space-x-1">
				{Array.from({ length: lives }).map((_, i) => (
					<MaterialDesignIcons
						name="heart"
						color={textColor}
						size={25}
						key={i}
					/>
				))}
			</View>
			<View className="flex-row items-center justify-center gap-2">
				<MaterialDesignIcons name="trophy" size={25} color={textColor} />
				<Text className="text-xl font-quicksand-bold" style={{ color: textColor }}>
					{score}
				</Text>
			</View>
			<View className="relative">
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
			</View>
		</View>
	);
};

export default AnimatedTimer;
