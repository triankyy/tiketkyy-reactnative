import React from 'react'
import { Linking, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native'
import { Button, Card, Title } from 'react-native-paper'
import { theme } from '../core/theme'
import { useSelector } from 'react-redux'
import SafeViewAndroid from '../components/SafeViewAndroid'
import toRupiah from '../helpers/toRupiah'
import moment from 'moment'

const MovieDetailScreen = ({ route, navigation }) => {
	const { params: { ticket } } = route
	const user = useSelector(state => state.user)
	const _goToURL = (url) => {
		Linking.canOpenURL(url).then(supported => {
			if (supported) {
				Linking.openURL(url)
			}
		})
	}

	return (
		<SafeAreaView style={[{ backgroundColor: theme.colors.surface }, SafeViewAndroid.AndroidSafeArea]}>
			<ScrollView>
				<View style={{paddingHorizontal: 20, paddingVertical: 10}}>
					<View style={styles.imageContainer}>
						<Card style={styles.card}>
							<Card.Cover source={{ uri: ticket.movie.img }} style={styles.image} resizeMode="contain" />
						</Card>
					</View>
					<View style={styles.descriptionContainer}>
						<View style={{ marginBottom: 30 }}>
							<Title style={styles.title}>
								{ticket.movie.title}
							</Title>
						</View>
						<View style={{ marginBottom: 30 }}>
							<Text style={{ fontSize: 18, textAlign: 'justify', marginBottom: 20 }}>
								{ticket.movie.storyline}
							</Text>

							<Text style={{ fontSize: 15, textAlign: 'justify', marginBottom: 20 }}>Tayang pada hari {moment(ticket.date.toDate()).format('dddd, Do MMMM YYYY')}</Text>
							<View>
								<Text
									style={{ color: theme.colors.primary, fontSize: 18 }}
									onPress={() => _goToURL(ticket.movie.trailer)}
								>
									Lihat Trailer
								</Text>
							</View>
						</View>
						<View style={styles.boxHarga}>
							<Text style={{ fontSize: 20, fontWeight: '500' }}>Harga:</Text>
							<Text style={{ fontSize: 20, fontWeight: '500' }}>{toRupiah(ticket.harga)}</Text>
						</View>
						<View style={styles.buttonContainer}>
							<Button
								mode='contained'
								disabled={moment(moment().format('YYYYMMDD'), 'YYYYMMDD').isSameOrAfter(moment(moment(ticket.date.toDate()).format('YYYYMMDD'), 'YYYYMMDD')) }
								style={{ padding: 5 }}
								onPress={() => user.isLogged
									? navigation.navigate('BuyTicket', { ticket })
									: navigation.navigate('LoginScreen')}
							>
								Beli Sekarang
							</Button>
						</View>
					</View>
				</View>
			</ScrollView>
		</SafeAreaView>
	)
}

export default MovieDetailScreen

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 20,
		width: '100%',
		maxWidth: 340,
		alignSelf: 'center',
	},
	imageContainer: {
		alignItems: 'center',
		marginVertical: 10
	},
	descriptionContainer: {
		marginTop: 30
	},
	card: {
		width: 279,
		height: 402,
		borderRadius: 10,
	},
	image: {
		height: '100%',
		borderRadius: 10
	},
	title: {
		color: theme.colors.primary,
		fontSize: 25,
		fontWeight: '700',
		textAlign: 'center',
		marginBottom: 10
	},
	buttonContainer: {
		marginTop: 30
	},
	button: {
		alignItems: 'center',
		justifyContent: 'center'
	},
	boxHarga: {
		// borderWidth: 1,
		// borderColor: theme.colors.disabled,
		padding: 20,
		borderRadius: 5,
		elevation: 5,
		shadowColor: '#000',
		shadowOffset: { width: 0, height: 0 },
		shadowOpacity: .15,
		shadowRadius: 6,
		backgroundColor: theme.colors.surface,
		justifyContent: 'space-between',
		flex: 1,
		flexDirection: 'row',
	},
	category: {
		backgroundColor: theme.colors.disabled,
		margin: 3,
		padding: 10,
		borderRadius: 200
	}
})