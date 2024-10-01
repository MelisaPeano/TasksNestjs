import Header from "../Heder";
import TodoHero from "../TodoHero";
import Form from "../Form";
import TodoList from "../TodoList";
import { useEffect, useState } from "react";
import Todo from "../dto/todoDto";
import { useSelector } from "react-redux";
import { RootState } from "../../Redux/store";
import { useTaskByUserQuery } from "../../Redux/apiSlice";
interface TaskViewsProps {
  tasks: {
    title: string;
    description: string;
    id: string;
    userId: string;
  }
}
const TaskViews: React.FC<TaskViewsProps>  = () => {
  const userId = useSelector((state: RootState) => state.users.user?.id)
  const { data: taskUser, error, isLoading } = useTaskByUserQuery(userId!);
  const [todos, setTodos] = useState<Todo[]>([]);
  
  useEffect(() => {
    if (taskUser) {
      setTodos(taskUser); 
    }
  }, [taskUser]);
  const todos_completed = todos.filter((todo) => todo.isCompleted === true).length || 0;
  const total_todos = todos.length || 0;

  if (isLoading) return <div>Cargando...</div>;
  if (error) return <div>Ocurrió un error al cargar las tareas</div>;
  
   return (
    <div className=" lg:grid grid-cols-2 gap-10 w-full">
      <div>
        <div>
        <Header/>
        <TodoHero todos_completed={todos_completed} total_todos={total_todos} />
        <Form setTodos={setTodos}/>
        </div>
      </div>
      <div style = {{ background :"black", width: "100wh", height: "100vh"}}>
         <TodoList todos={todos} userId={userId!} setTodos={setTodos}/>
      </div>
    </div>
  )
}

export default TaskViews;