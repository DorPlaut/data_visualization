import { configureStore } from '@reduxjs/toolkit';
import currentPageSlice from './currentPageSlice';

export const store = configureStore({
  reducer: {
    currentPage: currentPageSlice,
  },
});
