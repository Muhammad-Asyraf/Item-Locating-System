import { createSlice } from "@reduxjs/toolkit"

export const userSlice = createSlice({
    name: 'user',
    initialState:{
        uuid: '',
        token: 'test'
    },
    reducers: {
        setToken: (state, action) => {
            state.token = action.payload
        },
        setUuid: (state, action) => {
            state.uuid = action.payload
        },
        removeUser: (state) => {
            state.token = ""
            state.uuid = ""
        }
    }
})
export const { setToken, setUuid, removeUser} = userSlice.actions

export default userSlice.reducer