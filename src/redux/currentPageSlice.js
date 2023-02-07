import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  value: 'home',
};

export const currentPageSlice = createSlice({
  name: 'currentPage',
  initialState,
  reducers: {
    changePage: (state, action) => {
      state.value = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { changePage } = currentPageSlice.actions;

export default currentPageSlice.reducer;
