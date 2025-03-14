import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { loginUser, fetchUserProfile, registerUser } from './api';

export const useAuthStore = create(persist(
  (set, get) => ({
    user: null,
    token: null,

    register: async (first_name, last_name, email, phone, password) => {
      try {
        const response = await registerUser(first_name, last_name, email, phone, password);
        set({ token: response.token });

        const userProfile = await fetchUserProfile(response.token);
        set({ user: userProfile });
      } catch (error) {
        console.error("Error during registration :", error);
        throw error;
      }
    },

    login: async (email, password) => {
      try {
        const response = await loginUser(email, password);
        set({ token: response.token });
        await AsyncStorage.setItem('token', response.token);

        const userProfile = await fetchUserProfile(response.token);
        set({ user: userProfile });
      } catch (error) {
        console.error("Error during login :", error);
        throw error;
      }
    },

    fetchUserData: async () => {
      try {
        const token = get().token || await AsyncStorage.getItem('token');
        if (!token) return;
        const userProfile = await fetchUserProfile(token);
        set({ user: userProfile });
      } catch (error) {
        console.error("Error fetching user profile :", error);
      }
    },

    logout: async () => {
      await AsyncStorage.removeItem('token');
      set({ user: null, token: null });
    },
  }),
  {
    name: 'auth-storage',
    getStorage: () => AsyncStorage,
  }
));
