import {configureStore} from '@reduxjs/toolkit';
import {favoritesReducer} from './reducers/FavoritesReducer';

export const store = configureStore({
  reducer: {
    favorites: favoritesReducer,
  },
});
