import React from 'react'
import { SafeAreaView, ScrollView, Text, View } from 'react-native'
import { Avatar, Divider, List } from 'react-native-paper'
import { useDispatch, useSelector } from 'react-redux'
import Button from '../components/Button'
import SafeViewAndroid from '../components/SafeViewAndroid'
import { theme } from '../core/theme'
import { setUerLogOutState } from '../features/userSlice'
import { auth } from '../utils/firebase'

const AccountTab = ({ navigation }) => {
	const user = useSelector(state => state.user)
	const dispatch = useDispatch()
	const handleLogOut = async () => {
		await auth.signOut()
		dispatch(setUerLogOutState())
		navigation.reset({
			index: 0,
			routes: [{ name: 'StartScreen' }]
		})
	}
	return (
		<SafeAreaView style={SafeViewAndroid.AndroidSafeArea}>
			<View style={{padding: 20}}>
				{
					user.isLogged ? (
						<View>
							<View style={{ marginBottom: 30 }}>
								<List.Item
									title={user.name}
									description={user.email}
									left={props => <Avatar.Icon {...props} icon='account' color='white' />}
								/>
							</View>
							<Divider />
							<ScrollView>
								{/* <Divider />
								<List.Item
									title='Pengaturan akun'
									description='Edit informasi akun'
									left={props => <List.Icon {...props} icon='cog' />}
									onPress={() => navigation.navigate('EditAccount')}
								/>
								<Divider />
								<List.Item
									title='Pesanan Saya'
									description='Detail pesanan saya'
									left={props => <List.Icon {...props} icon='receipt' />}
									onPress={() => navigation.navigate('OrderScreen')}
								/> */}
								<Divider />
								<List.Item
									title='Log out'
									left={props => <List.Icon {...props} icon='logout' />}
									onPress={handleLogOut}
								/>
								<Divider />
								<Text style={{ textAlign: 'center', marginTop: 10, color: theme.colors.disabled }}>
									TiketKyy • Dev 0.0.1
								</Text>
							</ScrollView>
						</View>
					) : (
						<View style={{ justifyContent: 'center', alignItems: 'center' }}>
							<Text>Anda Belum Login Silahkan Login Terlebih Dahulu</Text>
							<Button mode='contained' onPress={() => navigation.navigate('LoginScreen')}>
								Login
							</Button>
						</View>
					)
				}
			</View>
		</SafeAreaView>
	)
}

export default AccountTab

// const styles = StyleSheet.create({
// 	container: {
// 		// flex: 1,
// 		padding: 20,
// 		width: '100%',
// 		maxWidth: 340,
// 		alignSelf: 'center',
// 	},
// })