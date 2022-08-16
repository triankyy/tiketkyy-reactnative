import React, { useEffect, useState } from 'react'
import { View, Text } from 'react-native'
import { Picker } from '@react-native-picker/picker'
import { getDocs, collection } from 'firebase/firestore'
import { db } from '../utils/firebase'

export default function SelectDayScreen() {
	const [jam, setJam] = useState([])
	const [selectedValue, setSelectedValue] = useState('js')
	const _jam = async () => {
		setJam([])
		await getDocs(collection(db, 'jam')).then(docs => {
			docs.forEach(doc => setJam(prev => ([...prev, doc.data().tayang])))
		})
	}
	useEffect(() => {
		_jam()
		// console.log(new Date().getHours())
	}, [])
	return (
		<View>
			<Picker
				selectedValue={selectedValue}
				style={{ height: 50, width: 150 }}
				onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}
			>
				<Picker.Item label="Java" value="java" />
				<Picker.Item label="JavaScript" value="js" />
			</Picker>
			{jam.map(data => (<Text key={data}>{data}</Text>))}
		</View>
	)
}
