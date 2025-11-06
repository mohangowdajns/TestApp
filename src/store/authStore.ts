import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import AsyncStorage from '@react-native-async-storage/async-storage'

interface AuthState {
    isLoggedIn: boolean
    login: (username: string, password: string) => boolean
    logout: () => void
}

export const useAuthStore = create<AuthState>()(
    persist(
        (set) => ({
            isLoggedIn: false,

            login: (username, password) => {
            if (username === 'arka' && password === '1234') {
                set({ isLoggedIn: true });
                return true;  
            }
            return false;  
            },



            logout: () => {
                set({ isLoggedIn: false })
                AsyncStorage.removeItem('auth-storage')
            },
        }),
        {
            name: 'auth-storage',
            storage: createJSONStorage(() => AsyncStorage),
        }
    )
)
