
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import config from '../config';
import { checkLogin } from "./AuthSlice";



  export const getRAG = createAsyncThunk(
    "getRAG",
    async(args, { rejectWithValue, dispatch }) => {
        try
        {
        const token = sessionStorage.getItem('token');

          const requestOptions = {
              method: 'GET',
              headers: { 'Content-Type': 'application/json', Authorization: "Bearer " + token },
          };
          const response = await fetch(config.API_URL + 'Misc/RAG/' + args, requestOptions);
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


  export const saveRAG = createAsyncThunk(
    "saveRAG",
    async(args, { rejectWithValue, dispatch }) => { 
      try
      {
        const token = sessionStorage.getItem('token');

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', Authorization: "Bearer " + token },
            body: JSON.stringify(args.data)
        };
        const response = await fetch(config.API_URL + 'Misc/RAG/' + args.raid, requestOptions);
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

export const RAGSlice = createSlice({
  name: "RAGSlice",
  initialState: {

  },
reducers:{},
    extraReducers: (builder) => {

    }
});

export const {
} = RAGSlice.actions;
export default RAGSlice.reducer;
