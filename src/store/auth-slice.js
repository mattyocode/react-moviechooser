import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { client } from "../utils/axios-client";

const initialAuthState = {
  token: null,
  refreshToken: null,
  account: null,
  status: "idle",
  error: null,
};

export const handleAuth = createAsyncThunk(
  "auth/handleAuth",
  async ({ email, password, endpoint }) => {
    const response = await client.post(`auth/${endpoint}`, {
      email,
      password,
    });
    return response;
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: initialAuthState,
  reducers: {
    setAuthTokens(state, action) {
      state.refreshToken = action.payload.refreshToken;
      state.token = action.payload.token;
    },
    // setAccount(state, action) {
    //   state.account = action.payload;
    // },
    setLogout(state) {
      state.account = null;
      state.refreshToken = null;
      state.token = null;
      state.status = "idle";
      state.error = null;
    },
  },
  extraReducers: {
    [handleAuth.pending]: (state, action) => {
      state.status = "loading";
    },
    [handleAuth.fulfilled]: (state, action) => {
      state.token = action.payload.access;
      state.refreshToken = action.payload.refresh;
      state.account = action.payload.user;
      state.status = "succeeded";
    },
    [handleAuth.rejected]: (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    },
  },
});

export const { setAuthTokens, setLogout } = authSlice.actions;
// export const authActions = authSlice.actions;
export default authSlice.reducer;
