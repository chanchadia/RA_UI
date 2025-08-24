import AuthSlice from '../slice/AuthSlice'
import { configureStore } from '@reduxjs/toolkit';

export const store = configureStore({
  reducer: {
    auth: AuthSlice,
  },
});