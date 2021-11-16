import { createSlice, createAsyncThunk, current } from "@reduxjs/toolkit";
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
  async ({ username, email, password, endpoint, recaptchaKey }) => {
    if (endpoint === "register/") {
      const response = await client.post(`auth/${endpoint}`, {
        username,
        email,
        password,
        recaptcha_key: recaptchaKey,
      });
      return response;
    } else {
      const response = await client.post(`auth/${endpoint}`, {
        email,
        password,
      });
      return response;
    }
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
    clearStatus(state, action) {
      state.status = "idle";
      state.error = null;
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
      state.error = null;
    },
    [handleAuth.fulfilled]: (state, action) => {
      state.status = "succeeded";
      state.token = action.payload.access;
      state.refreshToken = action.payload.refresh;
      state.account = action.payload.user;
      state.error = null;
    },
    [handleAuth.rejected]: (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
      console.log(current(state));
    },
  },
});

export const { clearStatus, setAuthTokens, setLogout } = authSlice.actions;
// export const authActions = authSlice.actions;
export default authSlice.reducer;
