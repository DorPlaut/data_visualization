import { configureStore } from '@reduxjs/toolkit';
import currentPageSlice from './currentPageSlice';
import isMobileSlice from './isMobileSlice';

export const store = configureStore({
  reducer: {
    currentPage: currentPageSlice,
    isMobile: isMobileSlice,
  },
});
