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
import { passwordValidator } from '../helpers/passwordValidator'
import { auth, firestore } from '../utils/firebase'
import { useDispatch } from 'react-redux'
import { setActiveUser } from '../features/userSlice'

export default function LoginScreen({ navigation }) {
	const dispatch = useDispatch()
	const [email, setEmail] = useState({ value: '', error: '' })
	const [password, setPassword] = useState({ value: '', error: '' })
	const [loading, setLoading] = useState(false)
	const [error, setError] = useState('')

	const onLoginPressed = async () => {
		setLoading(true)
		const emailError = emailValidator(email.value)
		const passwordError = passwordValidator(password.value)
		if (emailError || passwordError) {
			setEmail({ ...email, error: emailError })
			setPassword({ ...password, error: passwordError })
			setLoading(false)
			return
		}
		await auth.signInWithEmailAndPassword(email.value, password.value).catch((err) => {
			setLoading(false)
			setError(err.message.replace(/Firebase: | *\([^)]*\) */g, ''))
		}).then(async result => {
			const userRef = await firestore.doc(`users/${result.user.uid}`)
			const user = (await userRef.get()).data()
			if (user) {
				setLoading(false)
				dispatch(setActiveUser({
					id: result.user.uid,
					name: user.username, email: user.email
				}))
				navigation.reset({
					index: 0,
					routes: [{ name: 'HomeScreen' }],
				})
			}
		})
	}
	return (
		<Background>
			<BackButton goBack={navigation.goBack} />
			<Logo />
			<Header>Selamat Datang Di TiketKyy.</Header>
			<Text>Masuk Untuk Melanjutkan ke Aplikasi TiketKyy</Text>
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
			<View style={styles.forgotPassword}>
				<TouchableOpacity
					onPress={() => navigation.navigate('ResetPasswordScreen')}
					disabled={loading}
				>
					<Text style={styles.forgot}>Lupa Password?</Text>
				</TouchableOpacity>
			</View>
			<Button mode="contained" loading={loading} onPress={onLoginPressed} disabled={loading}>
        Login
			</Button>
			<View style={styles.row}>
				<Text>Tidak punya akun? </Text>
				<TouchableOpacity
					disabled={loading}
					onPress={() => navigation.navigate('RegisterScreen')}>
					<Text style={styles.link}>Daftar</Text>
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
	forgotPassword: {
		width: '100%',
		alignItems: 'flex-end',
		marginBottom: 24,
	},
	row: {
		flexDirection: 'row',
		marginTop: 4,
	},
	forgot: {
		fontSize: 13,
		color: theme.colors.secondary,
	},
	link: {
		fontWeight: 'bold',
		color: theme.colors.primary,
	},
})
