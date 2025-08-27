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



export const AuthSlice = createSlice({
  name: "AuthSlice",
  initialState: {
      userData: [],
      loading: false,
      error: null,

      mySite: null,
      myRa: null

  },
reducers:{
    setMySite: (state, { payload }) => {
      state.mySite = payload;
      sessionStorage.setItem("site", payload);
    },
    setMyRa: (state, { payload }) => {
      state.myRa = payload;
      sessionStorage.setItem("ra", payload);
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
  setMySite,
  setMyRa
} = AuthSlice.actions;
export default AuthSlice.reducer;
