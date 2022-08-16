import React from 'react'
import { ImageBackground, StyleSheet, KeyboardAvoidingView, SafeAreaView, ScrollView } from 'react-native'
import { theme } from '../core/theme'

export default function Background({ children }) {
	return (
		<ImageBackground
			source={require('../assets/background_dot.png')}
			resizeMode="repeat"
			style={styles.background}
		>
			<SafeAreaView>
				<ScrollView>
					<KeyboardAvoidingView style={styles.container} behavior="padding">
						{children}
					</KeyboardAvoidingView>
				</ScrollView>
			</SafeAreaView>
		</ImageBackground>
	)
}

const styles = StyleSheet.create({
	background: {
		flex: 1,
		width: '100%',
		backgroundColor: theme.colors.surface,
	},
	container: {
		padding: 20,
		width: '100%',
		maxWidth: 340,
		alignSelf: 'center',
		justifyContent: 'center',
	},
})
