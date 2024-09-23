import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Task {
  id: string;
  title: string;
  description: string;
}
interface TaskState {
  tasks: Task[];
}
const initialState: TaskState = {
  tasks: [],
};
const notesSlice = createSlice({
  name: 'Tasks',
  initialState,
  reducers: {
    addTask: (state, action) => {
      const newTask = {
        id: action.payload.id,
        title: action.payload.title,
        description: action.payload.description,
        is_completed: false,
      };
      state.tasks.push(newTask);
    },
    removeTask: (state, action: PayloadAction<string>) => {
       state.tasks = state.tasks.filter(note => note.id !== action.payload);
    },
    updateTask: (state, action: PayloadAction<{ id: string, title: string, description: string}>) => {
      const { id, title, description} = action.payload;
      const existingNote = state.tasks.find(note => note.id === id);
      if (existingNote) {
        existingNote.title = title;
        existingNote.id = id;
        existingNote.description = description;
      }
    },
  },
});

export const { addTask, removeTask, updateTask } = notesSlice.actions;
export default notesSlice.reducer;