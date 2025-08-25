import AuthSlice from '../slice/AuthSlice'
import { configureStore } from '@reduxjs/toolkit';
import { SiteSlice } from '../slice/SiteSlice';
import { SurveAssessmentSlice } from '../slice/SurveAssessmentSlice';

export const store = configureStore({
  reducer: {
    auth: AuthSlice,
    site: SiteSlice,
    sa:SurveAssessmentSlice,
  },
});