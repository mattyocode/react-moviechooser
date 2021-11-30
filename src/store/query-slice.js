import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { client } from "../utils/axios-refresh";
// import { fetchOptionsData } from "./query-actions";

const initialOptionsState = {
  options: {},
  status: "idle",
  error: null,
};

export const fetchOptions = createAsyncThunk(
  "options/fetchOptions",
  async () => {
    const response = await client.get("api/genres/");
    return response;
  }
);

const optionsSlice = createSlice({
  name: "options",
  initialState: initialOptionsState,
  reducers: {},
  extraReducers: {
    [fetchOptions.pending]: (state, action) => {
      state.status = "loading";
    },
    [fetchOptions.fulfilled]: (state, action) => {
      state.status = "succeeded";
      state.options = action.payload;
    },
    [fetchOptions.rejected]: (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    },
  },
});

export const optionsActions = optionsSlice.actions;
export default optionsSlice.reducer;
