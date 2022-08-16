import { collection, getDocs, query, where } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import {
	RefreshControl, SafeAreaView,
	ScrollView,
	StyleSheet, Text, View
} from 'react-native'
import { ActivityIndicator } from 'react-native-paper'
import MovieCard from '../components/MovieCard'
import SafeViewAndroid from '../components/SafeViewAndroid'
import { theme } from '../core/theme'
import { db } from '../utils/firebase'

const MovieTab = ({ navigation }) => {
	const [refresh, setRefresh] = useState(false)
	const [loading, setLoading] = useState(false)
	const [ticketList, setTicketList] = useState([])

	const getMoviesList = async () => {
		setTicketList([])
		const querySnapshot = await getDocs(query(collection(db, 'ticket'), where('status', '==', true)))
		querySnapshot.forEach(doc => {
			setTicketList(prevMovie => ([...prevMovie, { id: doc.id, ...doc.data() }]))
		})
	}
	const handleRefresh = () => {
		setRefresh(true)
		getMoviesList()
		setRefresh(false)
	}

	useEffect(() => {
		setLoading(true)
		getMoviesList()
		setLoading(false)
	}, [])
	return (
		<SafeAreaView style={[{padding: 20}, SafeViewAndroid.AndroidSafeArea]}>
			{loading
				? (<ActivityIndicator animating={loading} size={30} color={theme.colors.primary} />)
				: (<ScrollView
					showsVerticalScrollIndicator={false}
					refreshControl={
						<RefreshControl refreshing={refresh} onRefresh={handleRefresh} />
					}>
					<View style={styles.container}>
						<Text style={styles.title}>List Film</Text>
						<View style={styles.movieContainer}>
							{ticketList.map(ticket => (
								<MovieCard
									key={ticket.movie?.title}
									uri={ticket.movie?.img}
									onPress={() => navigation.navigate('MovieDetail', { ticket })}
								/>
							))}
						</View>
					</View>
				</ScrollView>)
			}
		</SafeAreaView>
	)
}

export default MovieTab

const styles = StyleSheet.create({
	container: {
		width: '100%',
	},
	movieContainer: {
		flexDirection: 'row',
		flexWrap: 'wrap',
		justifyContent: 'center',
	},
	title: {
		fontSize: 30,
		fontWeight: '700',
		marginBottom: 15,
		color: theme.colors.primary
	}
})