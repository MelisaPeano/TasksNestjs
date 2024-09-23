
import Todo from "../components/dto/todoDto";
import edit from "../assets/editar.png";
import deleteIcon from "../assets/delete.png";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../Redux/store";
import { addTask, removeTask, updateTask } from "../Redux/notesSlice";
import { useAddNoteMutation, useUpdateNoteMutation, useRemoveNoteMutation } from "../Redux/apiSlice";

interface ItemProps {
  item: Todo;
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
}
const Item: React.FC<ItemProps> = ({ item, setTodos }) => {
  const [editing, setEditing] = useState<boolean>(false);
  const [newTitle, setNewTitle] = useState<string>(item.title);
  const [newDescription, setNewDescription] = useState<string>(item.description);
  const dispatch = useDispatch<AppDispatch>();
  const [addNote] = useAddNoteMutation();
  const [removeNote] = useRemoveNoteMutation();
  const [updateNote] = useUpdateNoteMutation();
  const completeTodo = () => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === item.id
          ? { ...todo, is_completed: !todo.is_completed }
          : todo
      )
    );
    dispatch(addTask({
      id: item.id,
      title: newTitle,
      description: newDescription,
      is_completed: true
    }));
    addNote(item);
    console.log("este es mi titulo",newTitle);
    console.log("esta es mi descripcion",newDescription);
  };
  const handleDelete = () => {
    setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== item.id));
    dispatch(removeTask(item.id));
    removeNote(item.id);
  }
  const handleEdit = async () => {
    try {
      if (editing) {
        setTodos((prevTodos) =>
          prevTodos.map((todo) =>
            todo.id === item.id ? { ...todo, title: newTitle, description: newDescription} : todo
          )
        );
      await updateNote({
        id: item.id,
        title: newTitle,
        description: newDescription,
      }as Partial<Todo>).unwrap();
      dispatch(updateTask({ id: item.id, title: newTitle, description: newDescription }));
      alert("Task updated successfully");
    }
    setEditing(!editing);
      } catch (error) {
        console.error("An error occurred while updating the task.", error);
        alert("Failed to update task.");
    }
  };
  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleEdit(); // Guardar el nuevo título
    }
  };
  return (
    <li id={item?.id} className="card basis-2/4">
      <button className="todo_item_button">
        <div onClick={completeTodo}>
          <svg className="todo_item_circle" fill={item.is_completed ? "#22C55E" : "#0d0d0d"}>
            <circle cx="11.998" cy="11.998" fillRule="nonzero" r="9.998" />
          </svg>
        </div>
        {editing ? (
          <>
          <input
            style={{color: "black"}}
            type="text"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            onKeyDown={handleKeyPress}
            onBlur={handleEdit} 
          />
          <input
            style={{color: "black"}}
            type="text"
            value={newDescription}
            onChange={(e) => setNewDescription(e.target.value)}
            onKeyDown={handleKeyPress}
            onBlur={handleEdit}
          />
          </>
        ) : (
          <>
          <div>
          <p style={item.is_completed ? { textDecoration: "line-through" } : {}}>{item?.title}</p>
          <p style={item.is_completed ? { textDecoration: "line-through" } : {}}>{item?.description}</p>
          </div>
          </>
        )}
      </button>
      <div className="todo_items_right">
        <button onClick={handleEdit} style={{display:"grid", gridTemplateColumns: "2fr 1fr"}}>
          <span >Edit</span>
          <img className="icon" src={edit}></img>
        </button>
        <button style={{display:"grid", gridTemplateColumns: "2fr 1fr"}} onClick={handleDelete}>
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