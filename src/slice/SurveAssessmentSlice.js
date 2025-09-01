import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import config from '../config';
import { checkLogin } from "./AuthSlice";



  export const getSiteWiseSA = createAsyncThunk(
    "getSiteWiseSA",
    async(args, { rejectWithValue, dispatch }) => {
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

export const createSiteTran = createAsyncThunk(
    "createSiteTran",
    async(args, { rejectWithValue, dispatch }) => { 
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

  export const modifySiteTran = createAsyncThunk(
    "modifySiteTran",
    async(args, { rejectWithValue, dispatch }) => { 
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
  export const getSingleSiteTran = createAsyncThunk(
    "getSingleSiteTran",
    async(args, { rejectWithValue, dispatch }) => {
        try
        {
        const token = sessionStorage.getItem('token');

          const requestOptions = {
              method: 'GET',
              headers: { 'Content-Type': 'application/json', Authorization: "Bearer " + token },
          };
          const response = await fetch(config.API_URL + 'SiteTran/' + args.site_id + '/' + args.raid, requestOptions);
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

//------------------------------------------------------------------------------------------------------------

  export const getWeightage = createAsyncThunk(
    "getWeightage",
    async(args, { rejectWithValue, dispatch }) => {
        try
        {
        const token = sessionStorage.getItem('token');

          const requestOptions = {
              method: 'GET',
              headers: { 'Content-Type': 'application/json', Authorization: "Bearer " + token },
          };
          const response = await fetch(config.API_URL + 'Survey/config/' + args, requestOptions);
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


  export const saveWeightage = createAsyncThunk(
    "saveWeightage",
    async(args, { rejectWithValue, dispatch }) => { 
      try
      {
        const token = sessionStorage.getItem('token');

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', Authorization: "Bearer " + token },
            body: JSON.stringify(args)
        };
        const response = await fetch(config.API_URL + 'Survey/config/' + args[0].site_id, requestOptions);
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

    export const getSurveyAssessment = createAsyncThunk(
    "getSurveyAssessment",
    async(args, { rejectWithValue, dispatch }) => {
        try
        {
        const token = sessionStorage.getItem('token');
          const requestOptions = {
              method: 'GET',
              headers: { 'Content-Type': 'application/json', Authorization: "Bearer " + token },
          };
          const response = await fetch(config.API_URL + 'Survey/assess/' + args, requestOptions);
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

export const saveSurveyAssessment = createAsyncThunk(
    "saveSurveyAssessment",
    async(args, { rejectWithValue, dispatch }) => { 
      try
      {
        const token = sessionStorage.getItem('token');

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', Authorization: "Bearer " + token },
            body: JSON.stringify(args.data)
        };
        const response = await fetch(config.API_URL + 'Survey/assess/' + args.raid, requestOptions);
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
