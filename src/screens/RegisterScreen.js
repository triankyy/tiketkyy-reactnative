import React, { useState } from 'react'
import { StyleSheet, TouchableOpacity, View } from 'react-native'
import { Snackbar, Text } from 'react-native-paper'
import BackButton from '../components/BackButton'
import Background from '../components/Background'
import Button from '../components/Button'
import Header from '../components/Header'
import Logo from '../components/Logo'
import TextInput from '../components/TextInput'
import { theme } from '../core/theme'
import { emailValidator } from '../helpers/emailValidator'
import { nameValidator } from '../helpers/nameValidator'
import { passwordValidator } from '../helpers/passwordValidator'
import { auth, firestore } from '../utils/firebase'

export default function RegisterScreen({ navigation }) {
	const [name, setName] = useState({ value: '', error: '' })
	const [email, setEmail] = useState({ value: '', error: '' })
	const [password, setPassword] = useState({ value: '', error: '' })
	const [loading, setLoading] = useState(false)
	const [error, setError] = useState('')

	const onSignUpPressed = async () => {
		setLoading(true)
		const nameError = nameValidator(name.value)
		const emailError = emailValidator(email.value)
		const passwordError = passwordValidator(password.value)
		if (emailError || passwordError || nameError) {
			setName({ ...name, error: nameError })
			setEmail({ ...email, error: emailError })
			setPassword({ ...password, error: passwordError })
			setLoading(false)
			return
		}
		await auth.createUserWithEmailAndPassword(email.value, password.value).catch((err) => {
			setLoading(false)
			setError(err.message.replace(/Firebase: | *\([^)]*\) */g, ''))
			return
		}).then(async (result) => {
			if (result) {
				try {
					const userRef = firestore.doc(`users/${result.user.uid}`)
					const snapshot = await userRef.get()
					if (!snapshot.exists) {
						userRef.set({
							username: name.value,
							email: result.user.email,
							created: new Date(),
							roles: ['user']
						}).then(() => {
							setLoading(false)
							navigation.reset({
								index: 1,
								routes: [{name: 'StartScreen'},{ name: 'LoginScreen' }],
							})
						})
					}
				} catch (error) {
					setLoading(false)
					setError(error?.message)
				}
			}
		})
	}

	return (
		<Background>
			<BackButton goBack={navigation.goBack} />
			<Logo />
			<Header>Daftar Sekarang Juga !</Header>
			<TextInput
				label="Nama Lengkap"
				returnKeyType="next"
				value={name.value}
				onChangeText={(text) => setName({ value: text, error: '' })}
				error={!!name.error}
				errorText={name.error}
			/>
			<TextInput
				label="Masukkan Alamat Email"
				returnKeyType="next"
				value={email.value}
				onChangeText={(text) => setEmail({ value: text, error: '' })}
				error={!!email.error}
				errorText={email.error}
				autoCapitalize="none"
				autoCompleteType="email"
				textContentType="emailAddress"
				keyboardType="email-address"
			/>
			<TextInput
				label="Masukkan Password"
				returnKeyType="done"
				value={password.value}
				onChangeText={(text) => setPassword({ value: text, error: '' })}
				error={!!password.error}
				errorText={password.error}
				secureTextEntry
			/>
			<Button
				mode="contained"
				onPress={onSignUpPressed}
				style={{ marginTop: 24 }}
				disabled={loading}
				loading={loading}
			>
        Daftar
			</Button>
			<View style={styles.row}>
				<Text>Sudah Punya Akun? </Text>
				<TouchableOpacity disabled={loading} onPress={() => navigation.replace('LoginScreen')}>
					<Text style={styles.link}>Masuk</Text>
				</TouchableOpacity>
			</View>
			<Snackbar
				visible={error.length > 0}
				onDismiss={() => setError('')}
				action={{
					label: 'Tutup',
					onPress: () => {
						setError('')
					},
				}}>
				{error.length > 0 && error}
			</Snackbar>
		</Background>
	)
}

const styles = StyleSheet.create({
	row: {
		flexDirection: 'row',
		marginTop: 4,
	},
	link: {
		fontWeight: 'bold',
		color: theme.colors.primary,
	},
})
