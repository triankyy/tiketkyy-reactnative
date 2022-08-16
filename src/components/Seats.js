import React from 'react'
import { View, Text, StyleSheet, ScrollView, FlatList, TouchableOpacity } from 'react-native'
import { Title } from 'react-native-paper'
import { theme } from '../core/theme'
import useOrientation from '../hooks/useOrientation'

export default function Seats({ ticket, data, selectedSeats, occupied, handleSelectedState }) {
	const orientation = useOrientation()
	return (
		<View style={{ marginBottom: 30 }}>
			<View>
				<Title style={styles.title}>
					Pilih Kursi
				</Title>
				<Text style={{ textAlign: 'center' }}>
					Studio {ticket.studio.name}
				</Text>
			</View>
			<View style={{ marginVertical: 20 }}>
				<View style={{ flexDirection: 'row', alignItems: 'center' }}>
					<View style={[styles.kursi, { marginRight: 10 }]}>
						<Text>\</Text>
					</View>
					<Text>Tersedia</Text>
				</View>
				<View style={{ flexDirection: 'row', alignItems: 'center' }}>
					<View style={[styles.kursi, styles.selected, { marginRight: 10 }]}>
						<Text style={{ color: 'white' }}>\</Text>
					</View>
					<Text>Terpilih</Text>
				</View>
				<View style={{ flexDirection: 'row', alignItems: 'center' }}>
					<View style={[styles.kursi, styles.occupied, { marginRight: 10 }]}>
						<Text>\</Text>
					</View>
					<Text>Tidak Tersedia</Text>
				</View>
			</View>
			<ScrollView
				horizontal={true}
				// scrollEnabled={false}
				contentContainerStyle={{ paddingHorizontal: 14, flexDirection: 'column', alignItems: 'center', width: '100%' }}
			>
				<View style={{ backgroundColor: theme.colors.secondary, width: orientation.width / 2, alignItems: 'center', marginVertical: 20, paddingVertical: 2, borderRadius: 10 }}>
					<Text style={{ color: 'white' }}>
						Layar
					</Text>
				</View>
				<FlatList
					data={data}
					numColumns={8}
					scrollEnabled={false}
					contentContainerStyle={{ alignItems: 'center' }}
					// horizontal={true}
					keyExtractor={item => item}
					renderItem={({ item }) => (
						<TouchableOpacity
							disabled={occupied.includes(item)}
							style={[
								styles.kursi,
								selectedSeats.includes(item) && styles.selected,
								occupied.includes(item) && styles.occupied
							]}
							onPress={() => handleSelectedState(item)}
						>
							<Text
								style={{
									alignItems: 'center',
									color: selectedSeats.includes(item)
										? theme.colors.surface
										: theme.colors.text
								}}
							>
								{item}
							</Text>
						</TouchableOpacity>
					)}
				/>
			</ScrollView>
			<View style={{ marginTop: 30, paddingHorizontal: 15 }}>
				{selectedSeats.length > 0 && (
					<View style={{ alignItems: 'center' }}>
						<Text>Terpilih :</Text>
						<ScrollView horizontal={true}>
							{selectedSeats.map(seat => (
								<View
									style={[
										styles.kursi,
										styles.selected,
										{ marginRight: 2 }
									]}
									key={seat}
								>
									<Text style={{ color: 'white' }}>{seat}</Text>
								</View>
							))}
						</ScrollView>
					</View>
				)}
			</View>
		</View>
	)
}

const styles = StyleSheet.create({
	title: {
		color: theme.colors.primary,
		fontSize: 25,
		fontWeight: '700',
		textAlign: 'center',
		marginBottom: 10
	},
	kursi: {
		margin: 2,
		padding: 5,
		width: 30,
		height: 40,
		justifyContent: 'center',
		alignItems: 'center',
		// backgroundColor: theme.colors.background,
		borderWidth: 1,
		borderColor: theme.colors.primary,
		borderTopStartRadius: 10,
		borderTopEndRadius: 10
	},
	selected: {
		backgroundColor: theme.colors.primary,
	},
	occupied: {
		backgroundColor: theme.colors.disabled,
		borderColor: theme.colors.disabled
	}
})