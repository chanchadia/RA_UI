import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import config from '../config';

export const loginUser = createAsyncThunk(
    "loginUser",
    async(args, { rejectWithValue }) => { 
      try
      {

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(args)
        };
        const response = await fetch(config.API_URL + 'User/Login', requestOptions);
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

export const AuthSlice = createSlice({
  name: "AuthSlice",
  initialState: {
      userData: [],
      loading: false,
      error: null,
      siteData: [],
  },
reducers:{},
    extraReducers: (builder) => {
        builder.addCase(loginUser.pending, (state) =>{
            state.loading = true;
        }).
        addCase(loginUser.fulfilled, (state, action) =>{
          state.loading = false;
          state.userData = action.payload;
        }).
        addCase(loginUser.rejected, (state, action) =>{
          state.loading = false;
          state.error = action.error.message;;
        })
    }
});

export const {
} = AuthSlice.actions;
export default AuthSlice.reducer;
