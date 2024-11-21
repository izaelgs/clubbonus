import { router } from "expo-router";
import { createTamagui, TamaguiProvider, Text, View } from '@tamagui/core'
import { GoogleSignin, isErrorWithCode, statusCodes } from '@react-native-google-signin/google-signin';
import { config } from '@tamagui/config/v3'
import { Button, H1, Paragraph, YStack } from 'tamagui'
import { StyleSheet, Image } from "react-native";
import { useEffect, useState } from "react";

const tamaguiConfig = createTamagui(config)

type Conf = typeof tamaguiConfig
declare module '@tamagui/core' {
  interface TamaguiCustomConfig extends Conf {}
}

export default function Home() {
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    GoogleSignin.configure({
      webClientId: '948259889257-c5v0q3jn6h7mbchaae2n9s24ftlfg3ft.apps.googleusercontent.com',
      offlineAccess: false,
    });
  }, []);

  const signIn = async (type: 'customer' | 'establishment') => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      if (type === 'customer') {
        router.push("./customer");
      } else {
        router.push("./establishment");
      }
      console.log(userInfo);
    } catch (error) {
      if (isErrorWithCode(error)) {
        switch (error.code) {
          case statusCodes.IN_PROGRESS:
            console.log('Operation is in progress already');
            // operation (eg. sign in) already in progress
            break;
          case statusCodes.PLAY_SERVICES_NOT_AVAILABLE:
            console.log('Play services not available');
            // Android only, play services not available or outdated
            break;
          default:
            console.log('Some other error:', error.message);
            // some other error happened
        }
      } else {
        console.log('Else error:', error);
        // an error that's not related to google sign in occurred
      }
    }
  };

  const signOut = async () => {
    try {
      await GoogleSignin.signOut();
      setUserInfo(null);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <TamaguiProvider config={tamaguiConfig}>
      <View style={styles.container}>
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
          <Button 
            size="$6" 
            theme="active" 
            onPress={() => signIn('customer')}
            style={styles.button}
          >
            Entrar como Cliente
          </Button>
          
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
    backgroundColor: "#fff",
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
