import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Task {
  title: string;
  description: string;
  id: string;
  userId: string;
  isCompleted: boolean;
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
    addTask: (state, action: PayloadAction<Task>) => {
      const newTodo: Task = {
        ...action.payload,
      };
      state.tasks.push(newTodo);
    },
    removeTask: (state, action: PayloadAction<string>) => {
       state.tasks = state.tasks.filter(note => note.id !== action.payload);
    },
    updateTask: (state, action) => {
      const existingNote = state.tasks.find(note => note.id === action.payload.id);
      if (existingNote) {
        existingNote.title = action.payload.title;
        existingNote.description = action.payload.description;
        existingNote.isCompleted = action.payload.isCompleted;
      }
    },
  },
});

export const { addTask, removeTask, updateTask } = notesSlice.actions;
export default notesSlice.reducer;