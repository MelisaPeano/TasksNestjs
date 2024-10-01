import {  RootState } from "../../Redux/store";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import Modal from "react-modal";
import "./userPerfil.css";
import { useNavigate } from "react-router-dom";

Modal.setAppElement('#root');
const UserPerfil: React.FC = () => {
  const navigate = useNavigate();
  const [modalIsOpen, setModalIsOpen] = useState(true);
  const user = useSelector((state: RootState) => state.users.user);
  console.log(user)
  console.log('Current user:', user)
  
  useEffect(() => {
    if (user !== null) {
      setModalIsOpen(false);
    } else {
      setModalIsOpen(true)
    }
  }, [user]);

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };
  const handleLogin = () => {
    setTimeout(() => {
      navigate('/auth/login');
    }, 100); 
  }
  const handleRegister = () => {
    setTimeout(() => {
      navigate('/auth/register');
    }, 100);
  }

  return (
    <div>
      { user == null && (
        <>
        <section style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "100vh"}}>
        <h1 style={{ marginTop: "2rem", fontSize: "3rem"}}>Bienvnido a Tasks To Do</h1>
        <p style={{fontWeight: "bold", fontSize: "1.5rem", margin:"1rem"}}>LLeva al máximo tu eficiencia con Tasks To Do, aquí podrás agendar tus tareas diarias </p>
        <button style = {{width: "20vh", marginTop: "2rem"}} onClick={openModal}>Iniciar Sesion</button>
        </section>
        </>
      )}
      {modalIsOpen && (
        <Modal
          isOpen={modalIsOpen}
          contentLabel="User Authentication"
          onRequestClose={closeModal}
          className="modal"
          overlayClassName="overlay"

        >
          <h1 className="title">Tus tareas diarias</h1>
          <div>
            <div className="button">
              <button onClick={handleLogin}>Inicia Sesión</button>
              <button onClick={handleRegister}>Registrate</button>
            </div>
          </div>
        </Modal>
      )
      }
      {user && (
        <h1>{user.email}</h1>
      )}

    </div>
  )
}

export default UserPerfil;