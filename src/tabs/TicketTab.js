import { collection, getDocs, query, where } from 'firebase/firestore'
import moment from 'moment'
import React, { useEffect, useState } from 'react'
import { RefreshControl, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native'
import { Card, Paragraph, Title } from 'react-native-paper'
import { useSelector } from 'react-redux'
import SafeViewAndroid from '../components/SafeViewAndroid'
import { theme } from '../core/theme'
import { db } from '../utils/firebase'

const SearchTab = () => {
	const [ticket, setTicket] = useState([])
	const [refresh, setRefresh] = useState(false)
	const user = useSelector(state => state.user)

	const fetchTicket = async () => {
		setTicket([])
		const querySnapshot = await getDocs(query(collection(db, 'pembelian'), where('user.id', '==', user.id), where('status', '==', true)))
		querySnapshot.forEach(doc => {
			setTicket(prev => ([...prev, {...doc.data(), id: doc.id}]))
			// console.log(doc.data())
		})
	}

	const handleRefresh = () => {
		setRefresh(true)
		fetchTicket()
		setRefresh(false)
	}

	useEffect(() => {
		fetchTicket()
	}, [])
	return (
		<SafeAreaView style={SafeViewAndroid.AndroidSafeArea}>
			<View>
				<View style={{paddingHorizontal: 20}}>
					<Text style={styles.title}>Tiket Saya</Text>
				</View>
				{
					user.isLogged && (
						<ScrollView style={styles.container} refreshControl={
							<RefreshControl refreshing={refresh} onRefresh={handleRefresh} />
						}>
							{ticket.map(data => (
								<Card key={data.id} style={{marginVertical: 10, elevation: 10, marginHorizontal: 10}}>
									<Card.Cover source={{ uri: data.ticket.movie.img }} />
									<Card.Content>
										<Title>{data.ticket.movie.title}</Title>
										<Paragraph>Kode: {data.kodeTransaksi}</Paragraph>
										<Paragraph>Kursi: {data.kursi.length == 2 ? data.kursi.join(' & ') : data.kursi.join(', ')}</Paragraph>
										<Paragraph>Studio: {data.ticket.studio.name}</Paragraph>
										<Paragraph>{moment(data.tanggalMain.toDate()).format('dddd, Do MMM YYYY')} - {data.jamMain}</Paragraph>
									</Card.Content>
								</Card>
							))}
						</ScrollView>
					)
				}
			</View>
		</SafeAreaView>
	)
}

export default SearchTab

const styles = StyleSheet.create({
	container: {paddingHorizontal: 10, marginBottom: 50},
	surface: {elevation: 4, marginVertical: 5},
	title: {
		fontSize: 30,
		fontWeight: '700',
		marginBottom: 15,
		color: theme.colors.primary
	}
})