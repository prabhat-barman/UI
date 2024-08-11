import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import loginApisCall from "../../../apis/loginApis/loginApis.service";

const initialState = {
  value: {},
  libraries: [],
  error: false,
  loading: false,
};

export const getLoginData = createAsyncThunk(
  "Login",
  async (_, { rejectWithValue }) => {
    try {
      const res = await loginApisCall.loginApiCall();
      return res.data.data;
    } catch (err) {
      rejectWithValue("Error in Response");
    }
  }
);

const LoginDataSlice = createSlice({
  name: "LoginDataRedux",
  initialState,
  reducers: {
    setLoginData: (state, action) => {
      state.value = { ...action.payload };
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getLoginData.fulfilled, (state: any, action) => {
      state.libraries = action.payload;
      state.loading = false;
    });
  },
});

export const { setLoginData } = LoginDataSlice.actions;

export default LoginDataSlice.reducer;
