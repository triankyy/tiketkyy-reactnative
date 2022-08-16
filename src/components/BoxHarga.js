import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { theme } from '../core/theme'
import toRupiah from '../helpers/toRupiah'

export default function BoxHarga({ selectedSeats, ticket }) {
	return (
		<View style={{ marginVertical: 30 }}>
			<View style={styles.boxHarga}>
				<Text style={{ fontSize: 20, fontWeight: '500' }}>Total Bayar :</Text>
				<Text
					style={{ fontSize: 20, fontWeight: '500' }}
				>
					{selectedSeats.length > 0 ? toRupiah(ticket.harga * selectedSeats.length) : toRupiah(0)}
				</Text>
			</View>
		</View>
	)
}

const styles = StyleSheet.create({
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
})