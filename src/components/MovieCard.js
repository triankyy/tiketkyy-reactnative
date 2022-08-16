import React from 'react'
import { Card } from 'react-native-paper'
import { StyleSheet } from 'react-native'
import { TouchableOpacity } from 'react-native'

const MovieCard = ({ uri, onPress }) => {
	return (
		<TouchableOpacity onPress={onPress}>
			<Card  mode='elevated' style={styles.container}>
				<Card.Cover source={{ uri }} style={styles.image} resizeMode="contain" />
			</Card>
		</TouchableOpacity>
	)
}

export default MovieCard

const styles = StyleSheet.create({
	container: {
		margin: 5,
		width: 279 / 1.8,
		height: 402 / 1.8,
		borderRadius: 10
	},
	image: {
		height: '100%',
		borderRadius: 10
	}
})