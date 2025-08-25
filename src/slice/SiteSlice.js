import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import config from '../config';

export const createSite = createAsyncThunk(
    "createSite",
    async(args, { rejectWithValue }) => { 
      try
      {
        const token = sessionStorage.getItem('token');

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', Authorization: "Bearer " + token },
            body: JSON.stringify(args)
        };
        const response = await fetch(config.API_URL + 'Site', requestOptions);
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

  export const modifySite = createAsyncThunk(
    "modifySite",
    async(args, { rejectWithValue }) => { 
      try
      {
        const token = sessionStorage.getItem('token');

        const requestOptions = {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json', Authorization: "Bearer " + token },
            body: JSON.stringify(args)
        };
        const response = await fetch(config.API_URL + 'Site', requestOptions);
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

  export const getSingleSite = createAsyncThunk(
    "getSite",
    async(args, { rejectWithValue }) => {
        try
        {
        const token = sessionStorage.getItem('token');

          const requestOptions = {
              method: 'GET',
              headers: { 'Content-Type': 'application/json', Authorization: "Bearer " + token },
          };
          const response = await fetch(config.API_URL + 'Site/' + args, requestOptions);
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

  export const getSite = createAsyncThunk(
    "getSite",
    async(args, { rejectWithValue }) => {
        try
        {
        const token = sessionStorage.getItem('token');

          const requestOptions = {
              method: 'GET',
              headers: { 'Content-Type': 'application/json', Authorization: "Bearer " + token },
          };
          const response = await fetch(config.API_URL + 'Site' + args, requestOptions);
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

export const SiteSlice = createSlice({
  name: "SiteSlice",
  initialState: {
      siteData: [],
  },
reducers:{},
    extraReducers: (builder) => {
        // builder.addCase(loginUser.pending, (state) =>{
        //     state.loading = true;
        // }).
        // addCase(loginUser.fulfilled, (state, action) =>{
        //   state.loading = false;
        //   state.userData = action.payload;
        // }).
        // addCase(loginUser.rejected, (state, action) =>{
        //   state.loading = false;
        //   state.error = action.error.message;;
        // })
    }
});

export const {
} = SiteSlice.actions;
export default SiteSlice.reducer;
