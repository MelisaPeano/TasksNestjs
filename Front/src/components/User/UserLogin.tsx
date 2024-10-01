import { ChangeEvent, FormEvent, useState } from "react";
import { useLoginUserMutation } from "../../Redux/userApiSlice";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../Redux/store";
import { useNavigate } from "react-router-dom";
import { login } from "../../Redux/userSlice";


const UserLogin = () => {
  const [error, setError] = useState<{email: string, password: string}>({email: "", password: ""});
  const [ loginUser ] = useLoginUserMutation();
  const dispatch = useDispatch<AppDispatch>();
  const navig = useNavigate();
  const [values, setValues] = useState({
    email: "",
    password: "",
    password2: "",
  });

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    let hasError = false;
    const newError = { email: "", password: "" };

    if (!values.email) {
      newError.email = "El email es requerido";
      hasError = true;
    }

    if (!values.password) {
      newError.password = "La contraseña es requerida";
      hasError = true;
    }


    setError(newError);

    if (!hasError) {
      try {
        const loginUs =  await loginUser(values).unwrap();
        console.log("loginUs", loginUs);
        const { access_token, user } = loginUs;
        dispatch(login({ user: user , token: access_token }));
        navig('/dashboard');
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
      <button type="submit">Sign Up</button>
    </form>
  )
}

export default UserLogin;