import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import config from '../config';
import { checkLogin } from "./AuthSlice";



  export const getDashboardDD = createAsyncThunk(
    "getDashboardDD",
    async(args, { rejectWithValue, dispatch }) => {
        try
        {
        const token = sessionStorage.getItem('token');

          const requestOptions = {
              method: 'GET',
              headers: { 'Content-Type': 'application/json', Authorization: "Bearer " + token },
          };
          const response = await fetch(config.API_URL + 'SurveyDashboard/' + args, requestOptions);
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
  export const getSAComponentALL = createAsyncThunk(
    "getSAComponentALL",
    async(args, { rejectWithValue, dispatch }) => {
        try
        {
        const token = sessionStorage.getItem('token');

          const requestOptions = {
              method: 'GET',
              headers: { 'Content-Type': 'application/json', Authorization: "Bearer " + token },
          };
          const response = await fetch(config.API_URL + 'SurveyDashboard/' + args.raid +"/"+args.comp, requestOptions);
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

  export const getSAComponentWise = createAsyncThunk(
    "getSAComponentWise",
    async(args, { rejectWithValue, dispatch }) => {
        try
        {
        const token = sessionStorage.getItem('token');

          const requestOptions = {
              method: 'GET',
              headers: { 'Content-Type': 'application/json', Authorization: "Bearer " + token },
          };
          const response = await fetch(config.API_URL + 'SurveyDashboard/ComponentWise/' + args, requestOptions);
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


export const SADashboardSlice = createSlice({
  name: "SADashboardSlice",
  initialState: {
    //   SRData: [],
    //   loading: false,
    //   error: null
  },
reducers:{},
    extraReducers: (builder) => {
        // builder.addCase(getSiteWiseSA.pending, (state) =>{
        //     state.loading = true;
        // }).
        // addCase(getSiteWiseSA.fulfilled, (state, action) =>{
        //   state.loading = false;
        //   state.SAData = action.payload;
        // }).
        // addCase(getSiteWiseSA.rejected, (state, action) =>{
        //   state.loading = false;
        //   state.error = action.error.message;;
        // })
    }
});

export const {
} = SADashboardSlice.actions;
export default SADashboardSlice.reducer;
