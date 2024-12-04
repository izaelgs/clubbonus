import { useEffect, useState } from "react";
import { router } from "expo-router";
import { GoogleSignin, isErrorWithCode, statusCodes, User } from '@react-native-google-signin/google-signin';
import { establishmentService } from "../services/establishmentService";
import { Establishment } from "../types/establishment";

export function useAuthGuard() {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null);
  const [establishment, setEstablishment] = useState<Establishment | null>(null);

  const checkUserSignIn = async () => {
    try {
      const currentUser = await GoogleSignin.getCurrentUser();
      if (!currentUser) {
        router.replace("/");
        return;
      }

      const establishment = await establishmentService.getEstablishmentProfile();
      
      setEstablishment(establishment);
      setUser(currentUser);
      setLoading(false);
    } catch (error) {
      console.error("Error checking sign-in status:", error);
      router.replace("/");
    }
  };

  const signIn = async (type: 'customer' | 'establishment') => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = (await GoogleSignin.signIn()).data;

      if (!userInfo) {
        throw new Error("User info is null");
      }
      
      if (type === 'establishment') {
        // Try to login first
        try {
          const establishment = await establishmentService.login(
            userInfo.user.email,
            userInfo.user.id
          );

          setEstablishment(establishment);          
          setUser(userInfo);
          return;
        } catch (loginError: any) {
          // If login fails with 404, try to register
          if (loginError.status === 404) {
            const establishment = await establishmentService.register({
              name: userInfo.user.name || ""  ,
              email: userInfo.user.email || "",
              google_oauth_key: userInfo.user.id || "",
              logo_url: userInfo.user.photo || undefined
            });
            
            setEstablishment(establishment);
            setUser(userInfo);
            return;
          }
          throw loginError;
        }
      } else {
        setUser(userInfo);
      }
    } catch (error) {
      console.error('Error during sign in:', error);
      if (isErrorWithCode(error)) {
        switch (error.code) {
          case statusCodes.IN_PROGRESS:
            console.error('Operation is in progress already');
            break;
          case statusCodes.PLAY_SERVICES_NOT_AVAILABLE:
            console.error('Play services not available');
            break;
          default:
            console.error('Some other error:', error.message);
        }
      } else {
        console.error('Authentication error:', error);
      }
    }
  };

  const signOut = async () => {
    try {
      if (user) {
        // Call the backend logout first
        await establishmentService.logout();
      }
      
      // Then sign out from Google
      await GoogleSignin.signOut();
      setUser(null);
      setEstablishment(null);
      router.replace("/");
    } catch (error) {
      console.error("Error during sign out:", error);
    }
  };

  useEffect(() => {
    GoogleSignin.configure({
      webClientId: '948259889257-c5v0q3jn6h7mbchaae2n9s24ftlfg3ft.apps.googleusercontent.com',
      offlineAccess: false,
    });
  }, []);

  useEffect(() => {
    checkUserSignIn();
  }, []);

  return { loading, user, establishment, setUser, setEstablishment, signIn, signOut };
} 