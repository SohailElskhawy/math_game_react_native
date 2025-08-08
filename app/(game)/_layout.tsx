import { Stack } from 'expo-router';
import React from 'react';

function GameLayout() {
 return <Stack screenOptions={{ headerShown: false }} initialRouteName='questions' />;
}

export default GameLayout