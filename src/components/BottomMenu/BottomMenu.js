import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import theme from '../../theme'; // Certifique-se de que está importando seu tema corretamente

export default function BottomMenu() {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('List')}>
        <Ionicons name="home-outline" size={24} color={theme.COLORS.BLUE} />
        <Text style={styles.text}>Home</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Profile')}>
        <Ionicons name="person-outline" size={24} color={theme.COLORS.BLUE} />
        <Text style={styles.text}>Perfil</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: theme.COLORS.WHITE,
    borderTopWidth: 1,
    borderTopColor: theme.COLORS.GRAY_02,
    paddingVertical: 10,
    width: '100%',
    position: 'absolute',
    bottom: 0,
  },
  button: {
    alignItems: 'center',
  },
  text: {
    color: theme.COLORS.BLACK,
    fontSize: 12,
    marginTop: 4,
  },
});
