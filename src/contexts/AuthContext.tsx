import React, { createContext, useState, ReactNode } from 'react';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

type RootStackParamList = {
  Login: undefined;
  Auth: undefined;
  VagasList: undefined;
};

interface AuthContextType {
  signedIn: boolean;
  signIn: (email: string, password: string) => Promise<boolean>;
  signOut: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthContextProvider = ({ children }: { children: ReactNode }) => {
  const [signedIn, setSignedIn] = useState(false);
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const signIn = async (email: string, password: string): Promise<boolean> => {
    try {
      const userJson = await AsyncStorage.getItem('user');
      if (userJson) {
        const user = JSON.parse(userJson);
        if (user.email === email && user.password === password) {
          setSignedIn(true);
          navigation.navigate('VagasList');
          return true;
        }
      }
      return false;
    } catch (error) {
      console.error('Erro ao verificar o login:', error);
      return false;
    }
  };

  const signOut = () => {
    setSignedIn(false);
    navigation.navigate('Login');
  };

  return (
    <AuthContext.Provider value={{ signedIn, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};
