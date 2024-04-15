import {createSlice} from '@reduxjs/toolkit';

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    data: null,
  },
  reducers: {
    setUser: (state, action) => {
      state.data = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const {setUser} = userSlice.actions;

export default userSlice.reducer;