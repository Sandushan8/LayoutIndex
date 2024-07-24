import {configureStore} from '@reduxjs/toolkit';
import {favoritesReducer} from './reducers/FavoritesReducer/FavoritesReducer';
import {usersReducer} from './reducers/UsersReducer/UserReducer';
import {persistReducer} from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import persistStore from 'redux-persist/es/persistStore';
import {Storage} from '@mui/icons-material';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
};

const persistedReducer = persistReducer(persistConfig, favoritesReducer);

export const store = configureStore({
  reducer: {
    users: usersReducer,
    favorites: persistedReducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);
