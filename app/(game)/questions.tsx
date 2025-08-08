import { useLocalSearchParams } from 'expo-router'
import React from 'react'
import { Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

function Questions() {
  const { gameMode } = useLocalSearchParams<{ gameMode: string }>()
  
  return (
    <SafeAreaView className="flex-1">
      <View className="flex-1 justify-center items-center">
        <Text className="text-2xl font-quicksand-bold">
          Questions Screen
        </Text>
        <Text className="text-lg font-quicksand-medium mt-4">
          Game Mode: {gameMode}
        </Text>
      </View>
    </SafeAreaView>
  )
}

export default Questions