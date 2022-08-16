import { addDoc, collection, doc, getDoc, getDocs, orderBy, query, updateDoc } from 'firebase/firestore'
import 'moment/locale/id'
import React, { useEffect, useState } from 'react'
import {
	RefreshControl, SafeAreaView,
	ScrollView,
	StyleSheet, View
} from 'react-native'
import { Button, Text } from 'react-native-paper'
import SelectDropdown from 'react-native-select-dropdown'
import { useSelector } from 'react-redux'
import BoxHarga from '../components/BoxHarga'
import SafeViewAndroid from '../components/SafeViewAndroid'
import Seats from '../components/Seats'
import SelectHour from '../components/SelectHour'
import { theme } from '../core/theme'
import { db } from '../utils/firebase'

export default function BuyTicketScreen({ route, navigation }) {
	const user = useSelector(state => state.user)

	const { params: { ticket } } = route
	const [selectedSeats, setSelectedSeats] = useState([])
	const [occupied, setOccupied] = useState([])
	const [loading, setLoading] = useState(false)
	const [refresh, setRefresh] = useState(false)
	const [selectedHour, setSelectedHour] = useState('')
	const [hours, setHours] = useState([])
	const [pembayaran, setPembayaran] = useState('')
	const handleSelectedState = seat => {
		const isSelected = selectedSeats.includes(seat)
		if (isSelected) {
			setSelectedSeats(selectedSeats.filter(selectedSeat => selectedSeat !== seat))
		} else {
			setSelectedSeats([...selectedSeats, seat])
		}
	}
	const getTicketDoc = async () => {
		setOccupied([])
		setLoading(true)
		const docRef = doc(db, 'ticket', ticket.id)
		await getDoc(docRef).then(doc => {
			setOccupied(doc.data().occupied)
			setSelectedSeats(selectedSeats.filter(selected => selected !== doc.data().occupied))
			setLoading(false)
		})
	}
	const getHours = async () => {
		setHours([])
		setLoading(true)
		const querySnapshot = await getDocs(query(collection(db, 'jam'), orderBy('tayang', 'asc')))
		querySnapshot.forEach(doc => {
			setHours(prev => ([...prev, { id: doc.id, ...doc.data() }]))
		})
	}
	const handleRefresh = () => {
		setRefresh(true)
		getTicketDoc()
		getHours()
		setRefresh(false)
	}
	const handleSubmit = async () => {
		const data = {
			movie: ticket.movie,
			studio: ticket.studio,
			tanggalMain: ticket.date,
			jamMain: selectedHour,
			kursi: selectedSeats,
			harga: ticket.harga * selectedSeats.length
		}
		await getDoc(doc(db, 'users', user.id)).then(async res => {
			const { tanggalMain, jamMain, kursi, harga } = data
			await updateDoc(doc(db, 'ticket', ticket.id), {occupied: [...occupied, ...kursi]}).then(async () => {
				const ticketDoc = await getDoc(doc(db, 'ticket', ticket.id))
				const pembelian = await addDoc(collection(db, 'pembelian'), {
					user: {id: res.id, ...res.data()},
					ticket: ticketDoc.data(),
					tanggalPembelian: new Date(),
					tanggalMain,
					jamMain,
					kursi,
					harga,
					status: true
				})
				await updateDoc(doc(db, 'pembelian', pembelian.id), {kodeTransaksi: pembelian.id.substring(0, 5) + pembelian.id.substring(15, 20)})
				navigation.reset({
					index: 0,
					routes: [{ name: 'InvoiceScreen', params: { data: { ...data, id: pembelian.id.substring(0, 5) + pembelian.id.substring(15, 20) }} }],
				})
			})
		})
	}
	useEffect(() => {
		getTicketDoc()
		getHours()
	}, [])

	const seats = Array.from({ length: ticket.studio.seats }, (_, i) => i + 1)
	return (
		<SafeAreaView style={[{ backgroundColor: theme.colors.surface }, SafeViewAndroid.AndroidSafeArea]}>
			<ScrollView refreshControl={(
				<RefreshControl refreshing={refresh} onRefresh={handleRefresh} />
			)}>
				<View style={{paddingHorizontal: 20, paddingVertical: 10}}>
					<Seats
						ticket={ticket}
						data={seats}
						selectedSeats={selectedSeats}
						occupied={occupied}
						handleSelectedState={handleSelectedState}
					/>
					<Text style={{marginBottom: 10, color: theme.colors.primary}}>Pilih Jam Tayang :</Text>
					<SelectHour
						setSelectedHour={setSelectedHour}
						selectedHour={selectedHour}
						hours={hours}
					/>
					<SelectDropdown
						data={['GOPAY', 'DANA']}
						defaultButtonText='Pilih Metode Pembayaran'
						buttonStyle={{
							width: '100%',
							backgroundColor: 'white',
							borderColor: theme.colors.primary,
							borderWidth: 1,
							borderRadius: 10,
							marginVertical: 20,
						}}
						buttonTextStyle={{color: theme.colors.primary}}
						buttonTextAfterSelection={(item, index) => `Bayar dengan ${item}`}
						onSelect={(selectedItem, index) => setPembayaran(selectedItem)}
					/>
					<BoxHarga
						selectedSeats={selectedSeats}
						ticket={ticket}
					/>

					<View style={styles.buttonContainer}>
						<Button
							mode='contained'
							style={{ padding: 5 }}
							disabled={(selectedSeats.length <= 0 || selectedHour.length <= 0 || loading || pembayaran.length <= 0)}
							onPress={handleSubmit}
							loading={loading}
						>
							Bayar Sekarang
						</Button>
					</View>
				</View>
			</ScrollView>
		</SafeAreaView>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 20,
		width: '100%',
		maxWidth: 340,
		alignSelf: 'center',
	},
	buttonContainer: {
		marginTop: 30
	},
	button: {
		alignItems: 'center',
		justifyContent: 'center'
	},
})