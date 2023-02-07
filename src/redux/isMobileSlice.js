import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  value: false,
};

export const isMobileSlice = createSlice({
  name: 'isMobile',
  initialState,
  reducers: {
    setIsMobile: (state, action) => {
      state.value = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setIsMobile } = isMobileSlice.actions;

export default isMobileSlice.reducer;
