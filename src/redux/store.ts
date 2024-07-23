import {configureStore} from '@reduxjs/toolkit';
import {favoritesReducer} from './reducers/FavoritesReducer/FavoritesReducer';
import {usersReducer} from './reducers/UsersReducer/UserReducer';

export const store = configureStore({
  reducer: {
    users: usersReducer,
    favorites: favoritesReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
