import React from 'react'
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native'
import moment from 'moment'
import { theme } from '../core/theme'
moment.locale('id')

export default function SelectHour({ setSelectedHour, selectedHour, hours }) {
	return (
		<View>
			<ScrollView
				style={{
					marginBottom: 15,
					paddingVertical: 5
				}}
				horizontal={true}
				showsHorizontalScrollIndicator={false}>
				{hours.map(hour => (
					<TouchableOpacity
						key={hour.id}
						onPress={() => setSelectedHour(hour.tayang)}
						disabled={selectedHour === hour.tayang}
						style={[
							styles.customButton,
							selectedHour === hour.tayang && styles.customButtonActive
						]}>
						<Text
							style={{
								color: selectedHour === hour.tayang ? 'white' : theme.colors.primary
							}}>
							{hour.tayang}
						</Text>
					</TouchableOpacity>
				))}
			</ScrollView>
		</View>
	)
}

const styles = StyleSheet.create({
	customButton: {
		borderColor: theme.colors.primary,
		borderWidth: 1,
		padding: 10,
		marginHorizontal: 5,
		borderRadius: 10
	},
	customButtonActive: {
		backgroundColor: theme.colors.primary,
		shadowColor: '#000',
		shadowOffset: { width: 1, height: 1 },
		shadowOpacity: 0.4,
		shadowRadius: 2,
		elevation: 2,
	}
})