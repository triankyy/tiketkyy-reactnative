import { useEffect, useState } from 'react'
import { Dimensions } from 'react-native'

export default function useOrientation () {
	const [screenInfo, setScreenInfo] = useState(Dimensions.get('screen'))

	useEffect(() => {
		const onChange = res => setScreenInfo(res.screen)

		Dimensions.addEventListener('change', onChange)

		return () => Dimensions.removeEventListener('change', onChange)
	}, [])

	return {
		...screenInfo,
		isPotrait: screenInfo.height > screenInfo.width,
	}
}