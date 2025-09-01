import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import config from '../config';
import { checkLogin } from "./AuthSlice";



  export const getRiskAssessment = createAsyncThunk(
    "getRiskAssessment",
    async(args, { rejectWithValue, dispatch }) => {
        try
        {
        const token = sessionStorage.getItem('token');

          const requestOptions = {
              method: 'GET',
              headers: { 'Content-Type': 'application/json', Authorization: "Bearer " + token },
          };
          const response = await fetch(config.API_URL + 'RiskAssessment/' + args, requestOptions);
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


  export const saveRiskAssessment = createAsyncThunk(
    "saveRiskAssessment",
    async(args, { rejectWithValue, dispatch }) => { 
      try
      {
        const token = sessionStorage.getItem('token');

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', Authorization: "Bearer " + token },
            body: JSON.stringify(args.data)
        };
        const response = await fetch(config.API_URL + 'RiskAssessment/' + args.raid, requestOptions);
        if (response.ok) 
        {
          return await response.json();
        } 
        else 
        {
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

export const RiskAssessmentSlice = createSlice({
  name: "RiskAssessmentSlice",
  initialState: {
  },
reducers:{},
    extraReducers: (builder) => {
    }
});

export const {
} = RiskAssessmentSlice.actions;
export default RiskAssessmentSlice.reducer;
