import {createSlice} from '@reduxjs/toolkit';
import {UserReducerState} from './UserReducer.types';

const initialState: UserReducerState = {
  users: [],
};

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setUsers: (state, action) => {
      state.users = action.payload;
    },
    addUser: (state, action) => {
      state.users = [...state.users, action.payload].sort(
        (a, b) => a.id - b.id,
      );
    },
    removeUsers: state => {
      state.users = [];
    },
  },
});
export const {setUsers, removeUsers, addUser} = usersSlice.actions;

export const usersReducer = usersSlice.reducer;
