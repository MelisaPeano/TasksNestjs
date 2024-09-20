import { configureStore } from '@reduxjs/toolkit';
import notesReducer from "./notesSlice";
import { taskSlice } from "./apiSlice";
import userSlice from './userSlice';
import { userApiSlice } from './userApiSlice';

export const store = configureStore({
  reducer: {
     [taskSlice.reducerPath]: taskSlice.reducer, 
     [userApiSlice.reducerPath]: userApiSlice.reducer,
      users: userSlice, 
      notes: notesReducer,
   },
   middleware: (getDefaultMiddleware) =>
   getDefaultMiddleware()
   .concat(taskSlice.middleware)
   .concat(userApiSlice.middleware),


});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

