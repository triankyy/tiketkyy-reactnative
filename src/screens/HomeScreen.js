import { Ionicons } from '@expo/vector-icons'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import React from 'react'
import { theme } from '../core/theme'
import { AccountTab, MovieTab, TicketTab } from '../tabs'

const Tab = createBottomTabNavigator()

export default function HomeScreen() {
	return (
		<Tab.Navigator
			sceneContainerStyle={{ backgroundColor: theme.colors.surface }}
			screenOptions={({ route }) => ({
				headerShown: false,
				tabBarIcon: ({ focused, color, size }) => {
					let iconName

					if (route.name === 'Beranda') {
						iconName = focused
							? 'home'
							: 'home-outline'
					} else if (route.name === 'Tiket Saya') {
						iconName = focused ? 'albums' : 'albums-outline'
					} else if (route.name === 'Akun') {
						iconName = focused ? 'md-person' : 'md-person-outline'
					}
					return <Ionicons name={iconName} size={size} color={color} />
				},
				tabBarActiveTintColor: theme.colors.primary,
				tabBarInactiveTintColor: 'gray',
			})}>
			<Tab.Screen name="Beranda" component={MovieTab} />
			<Tab.Screen name="Tiket Saya" component={TicketTab} />
			<Tab.Screen name="Akun" component={AccountTab} />
		</Tab.Navigator>
	)
}

