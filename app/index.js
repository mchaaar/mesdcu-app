import React, { useState } from 'react';
import { SafeAreaView, View, Text, StyleSheet } from 'react-native';
import { TextInput, Button, Checkbox } from 'react-native-paper';
import { useRouter } from 'expo-router';
import { useAuthStore } from '../store';

export default function LoginScreen() {
  const router = useRouter();
  const { login } = useAuthStore();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);

  const handleLogin = async () => {
    if (!email.trim() || !password) {
      alert("Please fill in all fields.");
      return;
    }

    setLoading(true);
    try {
      await login(email.trim(), password);
      router.replace('/dashboard');
    } catch (error) {
      alert("Login failed. Check your credentials.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>Sign in to your account</Text>

        <Text style={styles.label}>Email</Text>
        <TextInput
          value={email}
          onChangeText={setEmail}
          mode="outlined"
          keyboardType="email-address"
          autoCapitalize="none"
          style={styles.input}
          outlineColor="#cfd7df"
          activeOutlineColor="#635bff"
        />

        <Text style={styles.label}>Password</Text>
        <TextInput
          value={password}
          onChangeText={setPassword}
          mode="outlined"
          secureTextEntry
          style={styles.input}
          outlineColor="#cfd7df"
          activeOutlineColor="#635bff"
        />

        <View style={styles.rememberMeContainer}>
          <Checkbox
            status={rememberMe ? 'checked' : 'unchecked'}
            color="#635bff"
            onPress={() => setRememberMe(!rememberMe)}
          />
          <Text style={styles.rememberMeText}>Remember me on this device</Text>
        </View>

        <Button
          mode="contained"
          loading={loading}
          onPress={handleLogin}
          style={styles.button}
          labelStyle={styles.buttonLabel}
        >
          Sign in
        </Button>

        <Button
          mode="text"
          onPress={() => router.navigate('/register')}
          style={styles.textButton}
          labelStyle={styles.textButtonLabel}
        >
          Don't have an account? Create one here!
        </Button>
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
    fontWeight: '600',
    color: '#32325d',
    marginBottom: 6,
  },
  input: {
    backgroundColor: '#f9fcff',
    marginBottom: 16,
  },
  rememberMeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  rememberMeText: {
    fontSize: 14,
    color: '#32325d',
  },
  button: {
    backgroundColor: '#635bff',
    paddingVertical: 8,
    borderRadius: 8,
    marginTop: 10,
  },
  buttonLabel: {
    color: '#ffffff',
    fontWeight: 'bold',
  },
  textButton: {
    marginTop: 15,
  },
  textButtonLabel: {
    color: '#635bff',
  },
});
