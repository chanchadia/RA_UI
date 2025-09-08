import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import config from '../config';
import { checkLogin } from "./AuthSlice";



  export const getRaSummary = createAsyncThunk(
    "getRaSummary",
    async(args, { rejectWithValue, dispatch }) => {
        try
        {
        const token = sessionStorage.getItem('token');

          const requestOptions = {
              method: 'GET',
              headers: { 'Content-Type': 'application/json', Authorization: "Bearer " + token },
          };
          const response = await fetch(config.API_URL + 'RiskAssessmentDashboard/' + args, requestOptions);
          if (response.ok) {
          return await response.json();
          } else {
                      const errResp = await response.json();
                      dispatch(checkLogin(errResp));
                      return rejectWithValue(errResp);
          }
        }
        catch (error)
        {
            return rejectWithValue(error);
        }
    }
);

  export const getRaAMSummary = createAsyncThunk(
    "getRaAMSummary",
    async(args, { rejectWithValue, dispatch }) => {
        try
        {
        const token = sessionStorage.getItem('token');

          const requestOptions = {
              method: 'GET',
              headers: { 'Content-Type': 'application/json', Authorization: "Bearer " + token },
          };
          const response = await fetch(config.API_URL + 'RiskAssessmentDashboard/am/' + args, requestOptions);
          if (response.ok) {
          return await response.json();
          } else {
                      const errResp = await response.json();
                      dispatch(checkLogin(errResp));
                      return rejectWithValue(errResp);
          }
        }
        catch (error)
        {
            return rejectWithValue(error);
        }
    }
);

  export const getRaDetails = createAsyncThunk(
    "getRaDetails",
    async(args, { rejectWithValue, dispatch }) => {
        try
        {
        const token = sessionStorage.getItem('token');

          const requestOptions = {
              method: 'GET',
              headers: { 'Content-Type': 'application/json', Authorization: "Bearer " + token },
          };
          const response = await fetch(config.API_URL + `RiskAssessmentDashboard/${args.ra_id}/${args.severity}/${args.risk}`, requestOptions);
          if (response.ok) {
          return await response.json();
          } else {
                      const errResp = await response.json();
                      dispatch(checkLogin(errResp));
                      return rejectWithValue(errResp);
          }
        }
        catch (error)
        {
            return rejectWithValue(error);
        }
    }
);

//============================================================================================================================

export const RADashboardSlice = createSlice({
  name: "RADashboardSlice",
  initialState: {
  },
reducers:{},
    extraReducers: (builder) => {
    }
});

export const {
} = RADashboardSlice.actions;
export default RADashboardSlice.reducer;
