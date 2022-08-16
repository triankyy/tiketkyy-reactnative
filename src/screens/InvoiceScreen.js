import moment from 'moment'
import React from 'react'
import { SafeAreaView, StyleSheet, Text, View } from 'react-native'
import { Divider, Surface, Title } from 'react-native-paper'
import Button from '../components/Button'
import SafeViewAndroid from '../components/SafeViewAndroid'
import { theme } from '../core/theme'
import toRupiah from '../helpers/toRupiah'
import { CommonActions } from '@react-navigation/native'

export default function InvoiceScreen({ route, navigation }) {
	const { params: { data } } = route
	const detailPesanan = [
		{ judul: 'Kode Tiket', text: data.id },
		{ judul: 'Judul Film', text: data.movie.title.substring(0, 10)+'...' },
		{ judul: 'Studio', text: data.studio.name },
		{ judul: 'Kursi', text: data.kursi.join(', ') },
		{ judul: 'Tanggal Tayang', text: moment(data.tanggalMain.toDate()).format('dddd, Do MMM YYYY') },
		{ judul: 'Jadwal Tayang', text: data.jamMain },
		{ judul: 'Harga', text: toRupiah(data.harga)},
		{ judul: 'Tanggal Pembelian', text: moment().format('dddd, Do MMM YYYY')}
	]

	const ticketNav = () => {
		navigation.dispatch(CommonActions.reset({
			index: 0,
			routes: [{
				name: 'HomeScreen',
				state: {
					routes: [{name: 'Tiket Saya'}]
				}
			}]
		}))
	}
	return (
		<SafeAreaView style={[SafeViewAndroid.AndroidSafeArea]}>
			<View style={{paddingVertical: 10, paddingHorizontal: 20, flex: 1}}>
				<View style={{marginBottom: 20}}>
					<Title style={{textAlign: 'center', fontSize: 25, color: theme.colors.primary}}>Pembayaran Berhasil</Title>
					<Text style={{ textAlign: 'justify', marginTop: 10, fontSize: 15 }}>Berikut adalah detail pemesanan kamu, untuk melihat tiket yang sudah kamu beli silahkan cek halaman <Text style={{color: '#000', textDecorationLine: 'underline'}}>tiket saya</Text></Text>
				</View>
				<Surface style={{ borderRadius: 5, padding: 5 }}>
					<Title style={{paddingHorizontal: 5}}>Detail Pemesanan</Title>
					{detailPesanan.map(detail => (
						<View key={detail.judul}>
							<Divider />
							<View style={styles.detail}>
								<Text>{detail.judul}</Text>
								<Text>{detail.text}</Text>
							</View>
						</View>
					))}
				</Surface>
				<View style={{ position: 'absolute', width: '100%', alignSelf: 'center', bottom: 0 }}>
					<View>
						<Button mode='contained' onPress={ticketNav}>cek tiket saya</Button>
					</View>
				</View>
			</View>
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
	detail: {
		justifyContent: 'space-between',
		flexDirection: 'row',
		paddingVertical: 10,
		paddingHorizontal: 5
	}
})