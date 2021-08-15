import { createSlice } from "@reduxjs/toolkit";

const initialOptionsState = {
  options: {},
};

const optionsSlice = createSlice({
  name: "options",
  initialState: initialOptionsState,
  reducers: {
    addOptions(state, action) {
      state.options = action.payload.options;
    },
  },
});

export const optionsActions = optionsSlice.actions;
export default optionsSlice.reducer;
