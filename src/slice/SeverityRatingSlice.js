import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import config from '../config';



  export const getSeverity = createAsyncThunk(
    "getSeverity",
    async(args, { rejectWithValue }) => {
        try
        {
        const token = sessionStorage.getItem('token');

          const requestOptions = {
              method: 'GET',
              headers: { 'Content-Type': 'application/json', Authorization: "Bearer " + token },
          };
          const response = await fetch(config.API_URL + 'Severity/' + args, requestOptions);
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

export const saveSeverity = createAsyncThunk(
    "saveSeverity",
    async(args, { rejectWithValue }) => { 
      try
      {
        const token = sessionStorage.getItem('token');

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', Authorization: "Bearer " + token },
            body: JSON.stringify(args)
        };

       // const response = await fetch(config.API_URL + 'Severity/' + args.site_id, requestOptions);
        const response = await fetch(config.API_URL + 'Severity/'+ args[0].ra_id , requestOptions);
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

export const SeverityRatingSlice = createSlice({
  name: "SeverityRatingSlice",
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
} = SeverityRatingSlice.actions;
export default SeverityRatingSlice.reducer;
