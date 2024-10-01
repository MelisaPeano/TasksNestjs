import edit from "../assets/editar.png";
import Todo from "../components/dto/todoDto";
import deleteIcon from "../assets/delete.png";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch, RootState} from "../Redux/store";
import { removeTask, updateTask } from "../Redux/notesSlice";
import { useUpdateNoteMutation, useRemoveNoteMutation, useChangeStatusMutation} from "../Redux/apiSlice";
import { useSelector } from "react-redux";


interface ItemProps {
  item: Todo;
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
}
const Item: React.FC<ItemProps> = ({ item, setTodos }) => {
  const user = useSelector((state: RootState) => state.users.user?.id);

  const [editing, setEditing] = useState<boolean>(false);
  const [newTitle, setNewTitle] = useState<string>(item.title);
  const [newDescription, setNewDescription] = useState<string>(item.description);
  const dispatch = useDispatch<AppDispatch>();
  const [removeNote] = useRemoveNoteMutation();
  const [updateNote] = useUpdateNoteMutation();
  const [changeStatus] = useChangeStatusMutation();

  const completeTodo = async () => {
    console.log("Estado actual de item:", item);
    try {
      const newIsCompleted = !item.isCompleted;
      await changeStatus({id:item.id, isCompleted: newIsCompleted }).unwrap()
      if(user) {
        dispatch(updateTask({
          title: item.title,
          description: item.description,
          id: item.id,
          isCompleted: newIsCompleted,
        }));
      }
      setTodos((prevTodos) =>
        prevTodos.map((todo) =>
          todo.id === item.id
            ? { ...todo, isCompleted: newIsCompleted }
            : todo
        )
      );
     console.log("Estado actual de item:", item);
      
    } catch (error) {
      console.log(error)
    }
  };
  const handleDelete = async () => {
    try {
      await removeNote(item.id).unwrap();
      dispatch(removeTask(item.id));
      console.log("tarea eliminada", item.id);
      setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== item.id));
      alert("tarea eliminada");
    } catch (error) {
      alert(`No se pudo eliminar la tarea: ${error}`);
    }
  }
  const handleEdit = async () => {
    if (editing) {
      try {
        const response = await updateNote({
          id: item.id,
          title: newTitle,
          description: newDescription,
        });
        setTodos((prevTodos) =>
          prevTodos.map((todo) =>
            todo.id === item.id ? { ...todo, title: newTitle, description: newDescription } : todo
          )
        );
        if(response) {
          console.log("Response from API:", response);
          dispatch(updateTask({ id: item.id, title: newTitle, description: newDescription, isCompleted: false}));
        }
     } catch (error) {
      console.error("An error occurred while updating the task.", error);
      alert("Failed to update task.");
    }
    setEditing(false);
    }

  };
  const toggleEdit = () => {
    setEditing(!editing);
  };
  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleEdit();
    }
  };
  return (
    <li id={item?.id} className="todo_item m-4 h-20">
      <button className="todo_item_button">
        <div onClick={completeTodo}>
          <svg className="todo_item_circle" fill={item.isCompleted ? "#22C55E" : "#0d0d0d"}>
            <circle cx="11.998" cy="11.998" fillRule="nonzero" r="9.998" />
          </svg>
        </div>
        {editing ? (
          <>
            <input
              style={{ color: "black", marginBottom: "1rem" }}
              type="text"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              onKeyDown={handleKeyPress}
              onBlur={handleEdit}
            />
            <input
              style={{ color: "black", marginBottom: "1rem" }}
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
              <p className="font-extrabold" style={item.isCompleted ? { textDecoration: "line-through" } : {}}>{item?.title}</p>
              <p style={item.isCompleted ? { textDecoration: "line-through" } : {}}>{item?.description}</p>
            </div>
          </>
        )}
      </button>
      <div className="grid grid-cols-2 gap-4 ">
        <button onClick={toggleEdit} >
          <img className="icon" src={edit}></img>
        </button>
        <button onClick={handleDelete}>
          <img className="icon" src={deleteIcon} />
        </button>
      </div>
    </li>
  )
}

export default Item