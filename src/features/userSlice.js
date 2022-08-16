import { createSlice } from '@reduxjs/toolkit'

const initialState = {
	id: null,
	name: null,
	email: null,
	isLogged: false,
}

const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		setActiveUser: (state, action) => {
			state.id = action.payload.id
			state.name = action.payload.name
			state.email = action.payload.email
			state.isLogged = true
		},
		setUerLogOutState: state => {
			state.id = null
			state.name = null
			state.email = null
			state.isLogged = false
		}
	}
})

export const { setActiveUser, setUerLogOutState } = userSlice.actions
export const selectId = state => state.user.id
export const selectUserName = state => state.user.userName
export const selectUserEmail = state => state.user.userEmail
export default userSlice.reducer