import { Stack } from "expo-router";
import { TamaguiProvider } from 'tamagui'
import config from '../tamagui.config'

export default function RootLayout() {
  return (
    <TamaguiProvider config={config}>
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="customer" options={{ headerShown: false }} />
        <Stack.Screen name="establishment" options={{ headerShown: false }} />
      </Stack>
    </TamaguiProvider>
  );
}
