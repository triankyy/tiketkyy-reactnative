import firebase from 'firebase/compat/app'
import { getFirestore } from 'firebase/firestore'
import 'firebase/compat/auth'
import 'firebase/compat/firestore'

const app = firebase.initializeApp({
	apiKey: 'AIzaSyDHryWH1AwIh-k3wcLXmaLq3WZ-_su6O8c',
	authDomain: 'kyytiket.firebaseapp.com',
	projectId: 'kyytiket',
	storageBucket: 'kyytiket.appspot.com',
	messagingSenderId: '585349065773',
	appId: '1:585349065773:web:0518dba3814cda85809ca4'
})

export const db = getFirestore(app)
export const auth = firebase.auth()
export const firestore = firebase.firestore()