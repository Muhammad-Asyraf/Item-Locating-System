import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import { combineReducers } from '@reduxjs/toolkit';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import hardSet from 'redux-persist/lib/stateReconciler/hardSet';
import cartReducer from './cart/cartSlice';
import userReducer from './user/userSlice';
import loketlistReducer from './loketlist/loketlistSlice';

// Storage engine to persist states
import AsyncStorage from '@react-native-async-storage/async-storage';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
};

const rootReducer = combineReducers({
  cart: cartReducer,
  user: userReducer,
  loketlist: loketlistReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

//{ ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],}
export default () => {
  let store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: false,
      }),
  });
  let persistor = persistStore(store);
  return { store, persistor };
};
