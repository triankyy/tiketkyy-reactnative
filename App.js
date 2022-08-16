import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { StatusBar } from 'expo-status-bar'
import React from 'react'
import { LogBox } from 'react-native'
import { Provider } from 'react-native-paper'
import { Provider as ReduxProvider } from 'react-redux'
import { PersistGate } from 'redux-persist/lib/integration/react'
import { persistor, store } from './src/app/store'
import { theme } from './src/core/theme'
import {
	BuyTicket, Dashboard, EditAccount, HomeScreen, InvoiceScreen, LoginScreen, MovieDetail, RegisterScreen,
	ResetPasswordScreen, StartScreen
} from './src/screens'

LogBox.ignoreLogs(['Setting a timer'])

const Stack = createNativeStackNavigator()

export default function App() {
	return (
		<ReduxProvider store={store}>
			<PersistGate loading={null} persistor={persistor}>
				<Provider theme={theme}>
					<StatusBar style='dark' />
					<NavigationContainer>
						<Stack.Navigator
							initialRouteName="StartScreen"
							screenOptions={{ headerShown: false }}
						>
							<Stack.Screen
								name="StartScreen"
								component={StartScreen}
							/>
							<Stack.Screen
								name="LoginScreen"
								component={LoginScreen}
							/>
							<Stack.Screen
								name="RegisterScreen"
								component={RegisterScreen}
							/>
							<Stack.Screen
								name="HomeScreen"
								component={HomeScreen}
							/>
							<Stack.Screen
								name="Dashboard"
								component={Dashboard}
							/>
							<Stack.Screen
								name="MovieDetail"
								component={MovieDetail}
							/>
							<Stack.Screen
								name="BuyTicket"
								component={BuyTicket}
							/>
							<Stack.Screen
								name="EditAccount"
								component={EditAccount}
							/>
							<Stack.Screen
								name="InvoiceScreen"
								component={InvoiceScreen}
							/>
							<Stack.Screen
								name="ResetPasswordScreen"
								component={ResetPasswordScreen}
							/>
						</Stack.Navigator>
					</NavigationContainer>
				</Provider>
			</PersistGate>
		</ReduxProvider>
	)
}