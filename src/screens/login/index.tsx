import React, {useState} from "react";
import { View, Input, Button, TextButton } from '@components/atoms';
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Image } from 'expo-image';
import styles from './styles';
import {getAuth, signInWithEmailAndPassword} from 'firebase/auth';
import firebaseApp from '@utils/firebase';
import { Alert, ActivityIndicator } from "react-native";
import { StackScreenProps } from '@react-navigation/stack';
import { StackParamList } from "App";

type LoginScreenProps = StackScreenProps<StackParamList, 'Login'>;

export default function LoginScreen({navigation} : LoginScreenProps) : JSX.Element {

    const insets = useSafeAreaInsets();
    const [data, setData] = useState({email: '', password: ''});
    const [loading, setLoading] = useState(false);

    const handleChange = (input: string) => (v : string) => setData((s) => ({...s, [input]: v}));

    const onSubmit = () => {
        setLoading(true);
        const {email, password} = data;
        const auth = getAuth(firebaseApp);
        signInWithEmailAndPassword(auth, email, password).catch(() => {
            Alert.alert('Wrong password!');
        }).finally(() => {
            setLoading(false);
        })
    }

    return (
        <View style={[{paddingTop: insets.top + 32}, styles.container]}>
            <Image
                style={styles.image}
                source={require('../../../assets/images/lego_logo.png')}
                contentFit='contain'
            />
            <View style={styles.inputContainer}>
                <Input inputMode="email" autoCapitalize='none' onChangeText={handleChange('email')} placeholder='email'/>
                <Input onSubmitEditing={() => onSubmit()} onChangeText={handleChange('password')} secureTextEntry placeholder='password'/>
                <Button disabled={loading} onPress={() => onSubmit()} title='Log in'/>
                <TextButton onPress={() => navigation.push('SignIn')} title='Register'/>
            </View>
            <View style={styles.loadingContainer}>
                {loading && (
                    <ActivityIndicator/>
                )}
            </View>
        </View>
    );
}