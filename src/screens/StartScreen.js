import React, { useEffect } from 'react'
import { TouchableOpacity, Text } from 'react-native'
import { theme } from '../core/theme'
import Background from '../components/Background'
import Logo from '../components/Logo'
import Header from '../components/Header'
import Button from '../components/Button'
import Paragraph from '../components/Paragraph'
import { useSelector } from 'react-redux'

export default function StartScreen({ navigation }) {
	const user = useSelector(state => state.user)
	useEffect(() => {
		if (user.isLogged) {
			navigation.reset({
				index: 1,
				routes: [{ name: 'HomeScreen' }],
			})
		}
	}, [])
	return (
		<Background>
			<Logo />
			<Header>TiketKyy</Header>
			<Paragraph>
        Aplikasi Pemesanan Tiket Bioskop Paling Family Friendly Dengan Harga Termurah
			</Paragraph>
			<Button
				mode="contained"
				onPress={() => navigation.navigate('LoginScreen')}
			>
        Masuk
			</Button>
			<Button
				mode="outlined"
				onPress={() => navigation.navigate('RegisterScreen')}
			>
        Daftar
			</Button>
			<TouchableOpacity style={{ marginTop: 30 }} onPress={() => navigation.reset({
				index: 1,
				routes: [{ name: 'HomeScreen' }],
			})}>
				<Text style={{color: theme.colors.primary}}>Lihat List Film</Text>
			</TouchableOpacity>
		</Background>
	)
}