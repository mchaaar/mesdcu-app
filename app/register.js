import React, { useState, useEffect } from 'react';
import { SafeAreaView, StyleSheet, Alert } from 'react-native';
import { TextInput, Button, Card } from 'react-native-paper';
import { useRouter } from 'expo-router';
import { useAuthStore } from '../store';

export default function RegisterScreen() {
  const router = useRouter();
  const { register } = useAuthStore();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    if (!firstName || !lastName || !email || !phone || !password || !confirmPassword) {
      Alert.alert("Error", "All fields are required.");
      return;
    }
    if (password !== confirmPassword) {
      Alert.alert("Error", "Passwords do not match.");
      return;
    }

    setLoading(true);
    try {
      await register(firstName, lastName, email, phone, password);
      Alert.alert(
        "Success",
        "Account created successfully! You will be redirected to the login page.",
        [{ text: "OK", onPress: () => router.replace('/') }]
      );
    } catch (error) {
      console.log("API Error Response:", error.response?.data);

      let errorMessage = error.response?.data?.error || error.response?.data?.message || "An error occurred.";

      if (errorMessage.toLowerCase().includes("user already exists")) {
        errorMessage = "This email or phone number is already registered.";
      }

      Alert.alert("Registration Failed", errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Card style={styles.card}>
        <Card.Title title="Register" />
        <Card.Content>
          <TextInput label="First Name" value={firstName} onChangeText={setFirstName} mode="outlined" style={styles.input} />
          <TextInput label="Last Name" value={lastName} onChangeText={setLastName} mode="outlined" style={styles.input} />
          <TextInput label="Email" value={email} onChangeText={setEmail} mode="outlined" keyboardType="email-address" autoCapitalize="none" style={styles.input} />
          <TextInput label="Phone" value={phone} onChangeText={setPhone} mode="outlined" keyboardType="phone-pad" style={styles.input} />
          <TextInput label="Password" value={password} onChangeText={setPassword} mode="outlined" secureTextEntry style={styles.input} />
          <TextInput label="Confirm Password" value={confirmPassword} onChangeText={setConfirmPassword} mode="outlined" secureTextEntry style={styles.input} />
          <Button mode="contained" loading={loading} onPress={handleRegister} style={styles.button}>
            Register
          </Button>
          <Button onPress={() => router.replace('/')} style={styles.textButton}>
            Already have an account? Log in
          </Button>
        </Card.Content>
      </Card>
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
    backgroundColor: '#f9fcff',
    marginBottom: 16,
    borderRadius: 6,
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
    marginTop: 10,
  },
  textButtonLabel: {
    color: '#635bff',
  },
});

