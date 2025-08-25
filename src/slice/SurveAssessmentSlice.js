import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import config from '../config';



  export const getSiteWiseSA = createAsyncThunk(
    "getSiteWiseSA",
    async(args, { rejectWithValue }) => {
        try
        {
        const token = sessionStorage.getItem('token');

          const requestOptions = {
              method: 'GET',
              headers: { 'Content-Type': 'application/json', Authorization: "Bearer " + token },
          };
          const response = await fetch(config.API_URL + 'SiteTran/' + args, requestOptions);
          if (response.ok) {
          return await response.json();
          } else {
          return rejectWithValue(response.json());
          }
        }
        catch (error)
        {
            return rejectWithValue(error);
        }
    }
);

export const createSiteTran = createAsyncThunk(
    "createSiteTran",
    async(args, { rejectWithValue }) => { 
      try
      {
        const token = sessionStorage.getItem('token');

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', Authorization: "Bearer " + token },
            body: JSON.stringify(args)
        };
        const response = await fetch(config.API_URL + 'SiteTran/' + args.site_id, requestOptions);
        if (response.ok) 
        {
          return await response.json();
        } 
        else 
        {
          return rejectWithValue(await response.json());
        }
      }
      catch (error)
      {
        return rejectWithValue(error);
      }
    }
  );

  export const modifySiteTran = createAsyncThunk(
    "modifySiteTran",
    async(args, { rejectWithValue }) => { 
      try
      {
        const token = sessionStorage.getItem('token');

        const requestOptions = {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json', Authorization: "Bearer " + token },
            body: JSON.stringify(args)
        };
        const response = await fetch(config.API_URL + 'SiteTran/' + args.site_id, requestOptions);
        if (response.ok) 
        {
          return await response.json();
        } 
        else 
        {
          return rejectWithValue(await response.json());
        }
      }
      catch (error)
      {
        return rejectWithValue(error);
      }
    }
  );
  export const getSingleSiteTran = createAsyncThunk(
    "getSingleSiteTran",
    async(args, { rejectWithValue }) => {
        try
        {
        const token = sessionStorage.getItem('token');

          const requestOptions = {
              method: 'GET',
              headers: { 'Content-Type': 'application/json', Authorization: "Bearer " + token },
          };
          const response = await fetch(config.API_URL + 'SiteTran/' + args.site_id + '/' + args.tranid, requestOptions);
          if (response.ok) {
          return await response.json();
          } else {
          return rejectWithValue(response.json());
          }
        }
        catch (error)
        {
            return rejectWithValue(error);
        }
    }
  );

export const SurveAssessmentSlice = createSlice({
  name: "SurveAssessmentSlice",
  initialState: {
    //   SAData: [],
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
} = SurveAssessmentSlice.actions;
export default SurveAssessmentSlice.reducer;
