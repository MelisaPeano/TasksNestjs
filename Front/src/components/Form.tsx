import { useDispatch } from "react-redux";
import { useAddNoteMutation} from "../Redux/apiSlice";
import "./FormStyle.css";
import Todo from "./dto/todoDto";
import { AppDispatch, RootState } from "../Redux/store";
import { addTask } from "../Redux/notesSlice";
import { useSelector } from "react-redux";


interface FormProps {
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
}
const Form: React.FC<FormProps> = ({ setTodos }) => {
  const [ addNote ] = useAddNoteMutation();
  const dispatch = useDispatch<AppDispatch>();
  const user = useSelector((state: RootState) => state.users.user?.id);
  const tasks = useSelector((state: RootState) => state.notes.tasks);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>)=> {
    try {
      e.preventDefault()
      const form1 = e.target as HTMLFormElement
      const titleValue = form1.todo.value;
      const descriptionValue = form1.description.value;

      const newTodo = {
        title: titleValue,
        description: descriptionValue,
        userId: user
      };
      const createdTask = await addNote(newTodo).unwrap();
      dispatch(addTask({...createdTask, userId: user!}));
      setTodos(tasks);
      form1.reset()
    } catch (error) {
      alert(`error al crear la tarea: ${error}`);
    }
  };
  return (
    <form className="form" onSubmit={handleSubmit}>
      <label className="todo">
        <input
          style={{ marginBottom: "1rem" }}
          type="text"
          name="todo"
          id="todo"
          placeholder="Write your title"
        />
        <input
          type="text"
          name="description"
          id="description"
          placeholder="Write your next tasks"
        />
      </label>
      <button>
        <span className="visually-hidden ">+</span>
      </button>
    </form>
  );
}

export default Form;