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

export const logoutUser = createAsyncThunk(
    "logoutUser",
    async(args, { rejectWithValue }) => { 
      try
      {

        const token = sessionStorage.getItem('token');

        const requestOptions = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json', Authorization: "Bearer " + token },
            //body: JSON.stringify(args)
        };
        const response = await fetch(config.API_URL + 'User/logout', requestOptions);
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

export const AuthSlice = createSlice({
  name: "AuthSlice",
  initialState: {
      userData: [],
      loading: false,
      error: null,

      mySite: null,
      myRa: null,
      mySiteName: null,
      mySiteBusiness: null,
      myRaName: null,

      isLogout: true

  },
reducers:{
    checkLogin: (state, { payload }) => {
      if(payload && payload.message && payload.message === 'NO_LOGIN')
      {
        state.isLogout = true;
        sessionStorage.setItem("token", "");
      }
    },
    setLogin: (state, { payload }) => {
      state.isLogout = !payload;
    },
    setMySite: (state, { payload }) => {
      state.mySite = payload;
      sessionStorage.setItem("site", payload);
    },
    setMyRa: (state, { payload }) => {
      state.myRa = payload;
      sessionStorage.setItem("ra", payload);
    },
    setMySiteName: (state, { payload }) => {
      state.mySiteName = payload;
      sessionStorage.setItem("sitename", payload);
    },
    setMySiteBusiness: (state, { payload }) => {
      state.mySiteBusiness = payload;
      sessionStorage.setItem("sitebusiness", payload);
    },
    setMyRaName: (state, { payload }) => {
      state.myRaName = payload;
      sessionStorage.setItem("raname", payload);
    },
  },
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
  checkLogin,
  setLogin,
  setMySite,
  setMyRa,
  setMySiteName,
  setMySiteBusiness,
  setMyRaName
} = AuthSlice.actions;
export default AuthSlice.reducer;
