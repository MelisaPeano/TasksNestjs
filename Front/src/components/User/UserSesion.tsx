import { ChangeEvent, FormEvent, useState } from "react";
import { useCreateUserMutation } from "../../Redux/userApiSlice";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../Redux/store";
import { useNavigate } from "react-router-dom";


const UserSesion = () => {
  const [error, setError] = useState<{email: string, password: string, passwordrepeat: string, username: string}>({email: "", password: "", passwordrepeat: "", username: ""});
  const [ createUser ] = useCreateUserMutation();
  const dispatch = useDispatch<AppDispatch>();
  const navig = useNavigate();
  const [values, setValues] = useState({
    username: "",
    email: "",
    password: "",
    passwordrepeat: "",
  });

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    let hasError = false;
    const newError = { username: "", email: "", password: "", passwordrepeat: "" };
    
    if (!values.username){
      newError.username = "username requerido";
      hasError = true; 
    }

    if (!values.email) {
      newError.email = "El email es requerido";
      hasError = true;
    }

    if (!values.password) {
      newError.password = "La contraseña es requerida";
      hasError = true;
    }

    if (values.passwordrepeat !== values.password) {
      newError.passwordrepeat = "La contraseña no coincide";
      hasError = true;
    }

    setError(newError);

    if (!hasError) {
      try {
        const { username, password, email } = values;
        const createdOneUser =  await createUser({username, password, email}).unwrap();
        dispatch({ type: "user/createUser", payload: createdOneUser })
        console.log(createUser)
        navig("/auth/login")
      } catch (error) {
        console.error("Error login user:", error);
      }
    }

  }
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
    setError((prevError) => ({
      ...prevError,
      [name]: "",
    }));
  }


  return (
    <form className="flex flex-col bg-gray-200 p-8 border border-gray-300 rounded" onSubmit={handleSubmit}>
      <label style={{ marginBottom: ".5rem", fontSize: "1.2rem", color: "black" }} htmlFor="username">Username</label>
      <input
      style={{ marginBottom: "1rem", color: "black", padding: ".5rem", borderRadius: "5px" }}
        id="username"
        placeholder= "username"
        name="username"
        type="username"
        value={values.username}
        onChange={handleChange}
      />
      {error.email && <div style={{ color: "red" }}>{error.email}</div>}
      <label style={{ marginBottom: ".5rem", fontSize: "1.2rem", color: "black" }} htmlFor="email">Email</label>
      <input
      style={{ marginBottom: "1rem", color: "black", padding: ".5rem", borderRadius: "5px" }}
        id="email"
        placeholder="Email"
        name="email"
        type="email"
        value={values.email}
        onChange={handleChange}
      />
      {error.email && <div style={{ color: "red" }}>{error.email}</div>}
      <label style={{ marginTop: "1rem", marginBottom: ".5rem", fontSize: "1.2rem", color: "black" }} htmlFor="password">Password</label>
      <input
        style={{ marginBottom: "1rem", color: "black", padding: ".5rem", borderRadius: "5px"}}
        id="password"
        name="password"
        type="password"
        placeholder="Password"
        value={values.password}
        onChange={handleChange}
      />
      {error.password && <div style={{ color: "red" }}>{error.password}</div>}
      <label style={{ marginTop: "1rem", marginBottom: ".5rem", fontSize: "1.2rem", color: "black" }} htmlFor="passwordrepeat"> Repeat Password</label>
      <input
        style={{ marginBottom: "1rem", color: "black", padding: ".5rem", borderRadius: "5px"}}
        id="passwordrepeat"
        name="passwordrepeat"
        type="password"
        placeholder="repeat password"
        value={values.passwordrepeat}
        onChange={handleChange}
      />
      {error.passwordrepeat && <div style={{ color: "red" }}>{error.passwordrepeat}</div>}
      <button type="submit">Sign Up</button>
    </form>
  )
}

export default UserSesion;