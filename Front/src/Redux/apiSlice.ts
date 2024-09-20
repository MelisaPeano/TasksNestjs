import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

 interface Task {
   id: string;
   content: string;
 }

export const taskSlice = createApi({
  reducerPath: 'task',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3000/tasks' }),
  endpoints: (builder) => ({
    getNotes: builder.query<Task[], void>({
      query: () => '/',
    }),
    addNote: builder.mutation<Task, Partial<Task>>({
      query: (note) => ({
        url: '/create',
        method: 'POST',
        body: note,
      }),
    }),
    updateNote: builder.mutation<Task, Partial<Task>>({
      query: (note) => ({
        url: `/${note.id}`,
        method: 'PUT',
        body: note,
      }),
    }),
    removeNote: builder.mutation<void, string>({
      query: (id) => ({
        url: `/delete/${id}`,
        method: 'DELETE',
      }),
    }),
  }),
});

export const {
  useGetNotesQuery,
  useAddNoteMutation,
  useUpdateNoteMutation,
  useRemoveNoteMutation,
} = taskSlice;