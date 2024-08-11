import { configureStore } from "@reduxjs/toolkit";
import { setLoginData } from "./slice/login/loginSlice";

export const store = configureStore({
  reducer: { LoginData: setLoginData },
});
