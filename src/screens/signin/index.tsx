import { View, Text, Input, Button } from "@components/atoms";
import React, {useState} from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import styles from "./styles";
import { getAuth, createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { Alert, ActivityIndicator } from "react-native";

export default function SignInScreen() {

    const insets = useSafeAreaInsets();
    const [data, setData] = useState({email: '', password: '', name: '', password2: ''});
    const [loading, setLoading] = useState(false);

    const handleChange = (input: string) => (value: string) => setData(s => ({...s, [input]: value}));

    

    const register = () => {
        const { email, password, name, password2 } = data;
        if (password !== password2) {
            return Alert.alert('The passwords don\'t match');
        }
        setLoading(true);

        const auth = getAuth();
        createUserWithEmailAndPassword(auth, email, password).then((userCredential) => {
            updateProfile(userCredential.user, {displayName: name.trim()}).catch(() => console.error);
        }).catch(() => {
            Alert.alert('Error!')
        }).finally(() => setLoading(false));
    }

    return (
        <View style={[styles.container, {paddingTop: insets.top, paddingBottom: insets.bottom + 16}]}>
            <View style={styles.header}>
                <Text style={styles.headerTitle}>Register</Text>
                <Text>
                    Join using an email and password
                </Text>
            </View>
            <View style={styles.form}>
                <Input onChangeText={handleChange('name')} placeholder='Fullname'/>
                <Input inputMode="email" autoCapitalize='none' onChangeText={handleChange('email')} placeholder='Email'/>
                <Input secureTextEntry onChangeText={handleChange('password')} placeholder='Password'/>
                <Input secureTextEntry onChangeText={handleChange('password2')} placeholder='Repeat password'/>
            </View>
            <View style={styles.loadingContainer}>
                {loading && <ActivityIndicator/>}
            </View>
            <Button onPress={() => register()} title='Create account'/>
        </View>
    );
}