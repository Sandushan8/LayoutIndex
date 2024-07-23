import {createSlice} from '@reduxjs/toolkit';
import {FavoritesReducerState} from './FavoritesReducer.types';

const initialState: FavoritesReducerState = {
  favorites: [],
};

export const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    addFavorite: (state, action) => {
      console.log('Add favorite called', action.payload);
      state.favorites.push(action.payload);
    },
    removeFavorite: (state, action) => {
      console.log('Remove favorite called', action.payload);
      state.favorites = state.favorites.filter(
        favorite => favorite.id !== action.payload.id,
      );
    },
  },
});

export const {addFavorite, removeFavorite} = favoritesSlice.actions;

export const favoritesReducer = favoritesSlice.reducer;
