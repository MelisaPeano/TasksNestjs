import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { RootState } from './store';

interface User {
  username: string;
  password: string;
  email: string;
}
interface AuthResponse {
  access_token: string;
  user: User;
}
export const userApiSlice = createApi({
  reducerPath: 'user',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:3000',
    prepareHeaders: (headers, { getState }) => {
      const state = getState() as RootState;
      const token = state.users.token;
      if (token) {
        headers.set('authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getUser: builder.query<User[], void>({
      query: () => '/users'
    }),
    createUser: builder.mutation<User, Partial<User>>({
      query: (user) => ({
        url: '/users/create',
        method: 'POST',
        body: user,
      }),
    }),
      loginUser: builder.mutation<AuthResponse, Partial<User>>({
      query: (user) => ({
        url: 'auth/login',
          method: 'POST',
          body: user.email && user.password ? user : {
            email: user.email,
            password: user.password
          },
        }),
      }),
      loginWithGoogle: builder.mutation<AuthResponse, string>({
        query: () => ({
          url: 'auth/google',
          method: 'POST',
        }),
      }),
      profileUser: builder.query<User, void>({
        query: () => ({
          url: 'auth/profile',
          method: 'GET',
        })

      }),
      })
  
  })

  export const { useGetUserQuery, useCreateUserMutation, useLoginUserMutation, useProfileUserQuery, useLoginWithGoogleMutation} = userApiSlice