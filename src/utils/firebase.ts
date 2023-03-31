import { initializeApp } from 'firebase/app';
import { initializeAuth } from 'firebase/auth';
import { getReactNativePersistence } from 'firebase/auth/react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const firebaseConfig = {
    apiKey: "AIzaSyBfcx4-LcrvEGMSbtEYlPuEwJzhzmvA19Q",
    authDomain: "lego-app-6a36d.firebaseapp.com",
    projectId: "lego-app-6a36d",
    storageBucket: "lego-app-6a36d.appspot.com",
    messagingSenderId: "469389580750",
    appId: "1:469389580750:web:3c220dea2d1885d914f39f"
};

const app = initializeApp(firebaseConfig);
initializeAuth(app, {
    persistence: getReactNativePersistence(AsyncStorage)
})

export default app;