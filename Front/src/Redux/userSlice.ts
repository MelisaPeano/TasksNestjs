import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface User {
  password?: string;
  email: string;
}

interface UserState {
  user: User;
  token: string | null;
  login: boolean
}
const initialState: UserState = {
  user: {
    password: "",
    email: "",
  },
  token: null,
  login: false
}
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state, action: PayloadAction<{ user: UserState['user'], token: string }>) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.login = true;
    },
    logout: (state) => {
      state.user = {
        password: "",
        email: "",
      }
      state.token = null
      state.login = false
    },
    loginGoogle: (state, action: PayloadAction<{ email: string, token: string }>) => {
      console.log('Dispatching loginGoogle with:', action.payload); 
      state.user.email = action.payload.email;
      state.token = action.payload.token;
      state.login = true;
    }
  }
})

export const { login, logout, loginGoogle } = userSlice.actions;
export default userSlice.reducer;