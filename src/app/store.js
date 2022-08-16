import { combineReducers, createStore } from 'redux'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { persistStore, persistReducer } from 'redux-persist'
import userReducer from '../features/userSlice'

const reducers = combineReducers({
	user: userReducer
})

const persistedReducer = persistReducer({key: 'root', storage: AsyncStorage}, reducers)
export const store = createStore(persistedReducer, {})
export const persistor = persistStore(store)