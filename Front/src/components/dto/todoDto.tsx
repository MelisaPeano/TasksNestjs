interface Todo {
  title: string;
  description: string;
  id: string;  
  isCompleted: boolean;
  userId?: string;
}
export default Todo;