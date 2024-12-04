import { createTamagui, TamaguiProvider, View } from '@tamagui/core'
import { config } from '@tamagui/config/v3'
import { Button, H1, Paragraph, YStack } from 'tamagui'
import { StyleSheet, Image } from "react-native";
import { useAuthGuard } from "./hooks/useAuthGuard";
import { useEffect } from 'react';
import { router } from 'expo-router';

const tamaguiConfig = createTamagui(config)

type Conf = typeof tamaguiConfig
declare module '@tamagui/core' {
  interface TamaguiCustomConfig extends Conf {}
}

export default function Home() {
  const { user, signIn } = useAuthGuard();

  useEffect(() => {
    if (user) {
      router.push('/establishment');
    }
  }, [user]);

  return (
    <TamaguiProvider config={tamaguiConfig}>
      <View style={styles.container} backgroundColor="$background">
        <YStack space="$4" style={styles.heroSection}>
          <Image 
            source={require('../assets/images/logo.png')}
            style={styles.logo}
          />
          <H1 style={styles.title}>ClubBonus</H1>
          <Paragraph style={styles.subtitle}>
            Ganhe recompensas a cada visita em nossas lojas parceiras
          </Paragraph>
        </YStack>

        <YStack space="$4" style={styles.buttonContainer}>
          {/* <Button 
            size="$6" 
            theme="active" 
            onPress={() => signIn('customer')}
            style={styles.button}
          >
            Entrar como Cliente
          </Button> */}
          
          <Button 
            size="$6" 
            theme="alt2" 
            onPress={() => signIn('establishment')}
            style={styles.button}
          >
            Entrar como Estabelecimento
          </Button>
        </YStack>
      </View>
    </TamaguiProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
  },
  heroSection: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 40,
  },
  logo: {
    width: 120,
    height: 120,
    marginBottom: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#1a1a1a",
    textAlign: "center",
  },
  subtitle: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
    marginTop: 10,
    paddingHorizontal: 20,
  },
  buttonContainer: {
    width: "100%",
    paddingBottom: 40,
  },
  button: {
    width: "100%",
    height: 56,
    borderRadius: 12,
  },
});
