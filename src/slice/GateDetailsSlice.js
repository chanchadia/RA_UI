
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import config from '../config';
import { checkLogin } from "./AuthSlice";



  export const getGateDetails = createAsyncThunk(
    "getGateDetails",
    async(args, { rejectWithValue, dispatch }) => {
        try
        {
        const token = sessionStorage.getItem('token');

          const requestOptions = {
              method: 'GET',
              headers: { 'Content-Type': 'application/json', Authorization: "Bearer " + token },
          };
          const response = await fetch(config.API_URL + 'Misc/GateDetails/' + args, requestOptions);
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


  export const saveGateDetails = createAsyncThunk(
    "saveGateDetails",
    async(args, { rejectWithValue, dispatch }) => { 
      try
      {
        const token = sessionStorage.getItem('token');

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', Authorization: "Bearer " + token },
            body: JSON.stringify(args.data)
        };
        const response = await fetch(config.API_URL + 'Misc/GateDetails/' + args.raid, requestOptions);
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

export const GateDetailsSlice = createSlice({
  name: "GateDetailsSlice",
  initialState: {

  },
reducers:{},
    extraReducers: (builder) => {

    }
});

export const {
} = GateDetailsSlice.actions;
export default GateDetailsSlice.reducer;
