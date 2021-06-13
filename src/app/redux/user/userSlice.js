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
    }
})
export const { setToken, setUuid } = userSlice.actions

export default userSlice.reducer