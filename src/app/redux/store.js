import { configureStore } from '@reduxjs/toolkit'
import authReducer from './auth/authSlice'
import cartReducer from './cart/cartSlice'
import userReducer from './user/userSlice'
import loketlistReducer from './loketlist/loketlistSlice'

export default configureStore({
    reducer: {
        cart: cartReducer,
        user: userReducer,
        loketlist: loketlistReducer,
        auth: authReducer,
    }
})