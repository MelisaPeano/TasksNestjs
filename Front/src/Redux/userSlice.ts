import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Task {
  title: string;
  description: string;
  id: string;
  userId: string;
}
interface User {
  password: string;
  email: string;
  id: string;
  username: string;
  tasks: Task[];
}

interface UserState {
  user: User | null;
  token: string | null;
  login: boolean
}
const initialState: UserState = {
  user: null, 
  token: null,
  login: false
}
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    createUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
    },
    login: (state, action: PayloadAction<{ user: User, token: string }>) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.login = true;
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.login = false;
    }
  }
})

export const { login, logout, createUser } = userSlice.actions;
export default userSlice.reducer;