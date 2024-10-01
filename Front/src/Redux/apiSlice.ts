import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

 interface Task {
   id: string;
   title: string;
   description: string;
   isCompleted : boolean;
 }

export const taskSlice = createApi({
  reducerPath: 'task',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3000/tasks',
    prepareHeaders: (headers) => {
      headers.set('Content-Type', 'application/json');
      return headers;
    }
  }),
  endpoints: (builder) => ({
    getNotes: builder.query<Task[], void>({
      query: () => '/',
    }),
    addNote: builder.mutation<Task, Partial<Task>>({
      query: (note) => ({
        url: '/create',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: note
      }),
    }),
    updateNote: builder.mutation<Task, Partial<Task>>({
      query: (note) => ({
        url: `/${note.id}`,
        method: 'PUT',
        body: {
          title: note.title,
          description: note.description,
        }
      }),
    }),
    removeNote: builder.mutation<void, string>({
      query: (id) => ({
        url: `/delete/${id}`,
        method: 'DELETE',
      }),
    }),
    taskByUser: builder.query<Task[], string>({
      query: (userId) => ({
        url: `/get/${userId}`,
        method: 'GET',
      }),
    }),
    changeStatus: builder.mutation<void, { id: string; isCompleted: boolean }>({
      query: ({ id, isCompleted }) => ({
        url: `/${id}`,
        method: 'PATCH',
        body: {
          isCompleted: isCompleted
        }
      }),
    })
  }),
});

export const {
  useGetNotesQuery,
  useAddNoteMutation,
  useUpdateNoteMutation,
  useRemoveNoteMutation,
  useTaskByUserQuery,
  useChangeStatusMutation
} = taskSlice;