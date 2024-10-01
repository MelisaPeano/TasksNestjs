import "./TodoListStyle.css"
import Todo from "../components/dto/todoDto";
import { useTaskByUserQuery } from "../Redux/apiSlice";
import Item from "./Item";
import { useEffect } from "react";
interface TodoListProps {
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
  todos: Todo[];
  userId: string;
}
const TodoList: React.FC<TodoListProps> = ({ setTodos, todos, userId }) => {
  const { data, error, isLoading } = useTaskByUserQuery(userId);
  useEffect(() => {
    if (todos) {
      setTodos(todos);
    }
  }, [todos, setTodos]);
  try {
    const tasksUser = data ? data.data : [];
    if (isLoading) return <p>Cargando tareas...</p>;
    if (error) return <p>Error al traer las tareas</p>;
    setTodos(tasksUser);
  } catch (error) {
    console.log(`error: ${error}`);
  }

  return (
    <>
      <div>
        {todos && todos.length > 0 ? (
          todos?.map((item, index) => <Item key={index} item={item} setTodos={setTodos} />)
        ) : (
          <p>No tasks done yet</p>
        )}
      </div>
    </>
  )
}

export default TodoList;