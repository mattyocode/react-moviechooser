import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { client } from "../utils/axios-refresh";

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
  extraReducers: (builder) => {
    builder
      .addCase(fetchOptions.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchOptions.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.options = action.payload;
      })
      .addCase(fetchOptions.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const optionsActions = optionsSlice.actions;
export default optionsSlice.reducer;
