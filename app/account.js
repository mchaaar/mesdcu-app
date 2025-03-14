import React, { useEffect } from 'react';
import { SafeAreaView, View, Text, StyleSheet } from 'react-native';
import { TextInput } from 'react-native-paper';
import { useAuthStore } from '../store';
import BurgerMenu from './BurgerMenu';

export default function AccountScreen() {
  const user = useAuthStore((state) => state.user);
  const fetchUserData = useAuthStore((state) => state.fetchUserData);

  useEffect(() => {
    fetchUserData();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <BurgerMenu />
      <View style={styles.card}>
        <Text style={styles.title}>My Profil</Text>

        <Text style={styles.label}>First Name</Text>
        <TextInput
          value={user?.first_name || ''}
          mode="outlined"
          disabled
          style={styles.input}
          textColor="#32325d"
          theme={{ colors: { primary: '#635bff' } }}
        />

        <Text style={styles.label}>Last Name</Text>
        <TextInput
          value={user?.last_name || ''}
          mode="outlined"
          disabled
          style={styles.input}
          textColor="#32325d"
          theme={{ colors: { primary: '#635bff' } }}
        />

        <Text style={styles.label}>Email</Text>
        <TextInput
          value={user?.email || ''}
          mode="outlined"
          keyboardType="email-address"
          disabled
          style={styles.input}
          textColor="#32325d"
          theme={{ colors: { primary: '#635bff' } }}
        />

        <Text style={styles.label}>Phone</Text>
        <TextInput
          value={user?.phone || ''}
          mode="outlined"
          keyboardType="phone-pad"
          disabled
          style={styles.input}
          textColor="#32325d"
          theme={{ colors: { primary: '#635bff' } }}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#f6f9fc',
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 20,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#32325d',
    marginBottom: 20,
    textAlign: 'center',
  },
  label: {
    fontSize: 14,
    color: '#32325d',
    marginBottom: 6,
  },
  input: {
    backgroundColor: '#EDF2FC',
    marginBottom: 16,
    borderRadius: 6,
  },
});
