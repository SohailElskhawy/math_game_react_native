import { GAME_MODES } from "@/constants";
import { FlatList, Pressable, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
export default function Index() {
  return (
    <SafeAreaView className="flex-1 bg-white">
        <FlatList
          data={GAME_MODES}
          renderItem={({ item }) => <GameModeButton name={item.name}/>}
          keyExtractor={item => item.name}
          contentContainerClassName="pb-28 px-5"
          ListHeaderComponent={() => (
            <View className="mt-2">
              <Text className="text-center text-blue-500 text-2xl font-quicksand-bold">Boost Your Brain With Math</Text>
            </View>
          )}
        />
    </SafeAreaView>
  );
}

const GameModeButton = ({name}: {name: string}) => {
  return (
    <View className="my-6">
      <Pressable className="game-mode-btn" android_ripple={{ color: '#fffff22' }}>
          <Text className="text-center font-quicksand-bold text-4xl text-blue-500">{name}</Text>
          {/* if there is high score show */}
          <Text className="text-center font-quicksand-light text-sm">High Score: 1212</Text>
      </Pressable>
    </View>
  )
}