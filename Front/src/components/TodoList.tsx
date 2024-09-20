import "./TodoListStyle.css"
// import { useState } from "react";
import Todo from "../components/dto/todoDto";
import edit from "../assets/editar.png";
import deleteIcon from "../assets/delete.png";

interface ItemProps {
  item: Todo;
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
}
const Item: React.FC<ItemProps> = ({ item, setTodos }) => {
  // const [editing, setEditing] = useState<boolean>(false);
  const completeTodo = () => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === item.id
          ? { ...todo, is_completed: !todo.is_completed }
          : todo
      )
    );
  };
  return (
    <li id={item?.id} className="todo_item">
      <button className="todo_item_button" onClick={completeTodo}>
        <div>
          <svg className="todo_item_circle" fill={item.is_completed ? "#22C55E" : "#0d0d0d"}>
            <circle cx="11.998" cy="11.998" fillRule="nonzero" r="9.998" />
          </svg>
        </div>
        <p style={item.is_completed ? { textDecoration: "line-through" } : {}}
        >{item?.title}</p>
      </button>
      <div className="todo_items_right">
        <button style={{display:"grid", gridTemplateColumns: "2fr 1fr"}}>
          <span >Edit</span>
          <img className="icon" src={edit}></img>
        </button>
        <button style={{display:"grid", gridTemplateColumns: "2fr 1fr"}}>
          <span>Delete</span>
          <img className="icon" src={deleteIcon} />
        </button>
      </div>
    </li>
  )
}
interface TodoListProps {
  todos: Todo[];
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
}
const TodoList: React.FC<TodoListProps> = ({ todos, setTodos }) => {
  return (
    <ol className="todo_list">
      {todos && todos.length > 0 ? (
        todos?.map((item, index) => <Item key={index} item={item} setTodos={setTodos} />)
      ) : (
        <p>Seems lonley in here, what are you up to?</p>
      )}
    </ol>
  )
}

export default TodoList;