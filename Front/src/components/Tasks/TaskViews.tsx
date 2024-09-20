import Header from "../Heder";
import TodoHero from "../TodoHero";
import Form from "../Form";
import TodoList from "../TodoList";
import { useState } from "react";
import Todo from "../dto/todoDto";
import { useSelector } from "react-redux";
import { RootState } from "../../Redux/store";
const TaskViews = () => {
  const user = useSelector((state: RootState) => state.users);
  const [todos, setTodos] = useState<Todo[]>([]);
  const todos_completed = todos.filter((todo) => todo.is_completed === true).length;
  const total_todos = todos.length;
  console.log(user)
   return (
    <div style={{
     height: "70vh",
     width: "100%",
     display: "grid",

    }}>
        <div>
        <Header/>
        <TodoHero todos_completed={todos_completed} total_todos={total_todos} />
        <Form setTodos={setTodos}/>
        <TodoList todos={todos} setTodos={setTodos}/>
      </div>
    </div>
  )
}

export default TaskViews;