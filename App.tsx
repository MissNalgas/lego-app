import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '@screens/home';
import LoginScreen from '@screens/login';
import useTheme, { ThemeProvider } from '@utils/hooks/useTheme';
import '@utils/firebase';
import useAuth, { AuthProvider } from '@utils/hooks/useAuth';
import SignInScreen from '@screens/signin';
import DetailScreen from '@screens/detail';
import { Product } from '@utils/types';
import { StoreProvider } from '@utils/hooks/useStore';
import { StatusBar } from 'expo-status-bar';
import { createSharedElementStackNavigator } from 'react-navigation-shared-element';


const Stack = createSharedElementStackNavigator<StackParamList>();

function App() {

	const auth = useAuth();
	const theme = useTheme();

	if (auth === null) return <></>


	return (
		<NavigationContainer>
			<Stack.Navigator screenOptions={{headerStyle: {backgroundColor: theme.cardColor}, headerTitleStyle: {color: theme.textColor}, headerTintColor: theme.textColor}}>
				{auth ? (
					<>
						<Stack.Screen name='Home' options={{headerShown: false}} component={HomeScreen}/>
						<Stack.Screen 
							name='Detail' 
							options={{
								presentation: 'modal',
								cardStyleInterpolator: ({current: {progress}}) => {
									return {cardStyle: {opacity: progress}};
								}
							}} 
							component={DetailScreen}
							sharedElements={(route) => {
								const {product} = route.params;
								return [product.image];
							}}
						/>
					</>
				) : (
					<>
						<Stack.Screen name='Login' options={{headerShown: false}} component={LoginScreen}/>
						<Stack.Screen name='SignIn' component={SignInScreen}/>
					</>
				)}
			</Stack.Navigator>
		</NavigationContainer>
	);
}

export default function AppWrapper() {
	return (
		<ThemeProvider>
			<AuthProvider>
				<StoreProvider>
					<StatusBar style='auto'/>
					<App/>
				</StoreProvider>
			</AuthProvider>
		</ThemeProvider>
	);
}

export type StackParamList = {
	Home: undefined;
	Detail: {product : Product};
	Login: undefined;
	SignIn: undefined;
};