
import { AppDispatch, RootState } from '../Redux/store';
import { useSelector } from 'react-redux';
import TaskViews from './Tasks/TaskViews';
import { useDispatch } from 'react-redux';
import { logout } from '../Redux/userSlice';
import { useNavigate } from 'react-router-dom';


const Dashboard = () => {
  const user = useSelector((state: RootState) => state.users);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const handleLoout = () => {
    if(user && user.login === true){
      dispatch(logout());
      navigate('/');
    }
  }
  return (
    <div className=' grid grid-cols-2 gap-4 h-[100vh] mx-6 bg-black'>
        <div className='m-8 text-center'>
          <button onClick={handleLoout} style={{ maxWidth: "20vh", margin: "1rem"}}>Logout</button>
          <button style={{ maxWidth: "20vh"}}>Profile</button>
        </div>
        <div style={{ padding: "2rem", background: "#88ab33", color: "white", borderRadius: "10px"}}>
          <h3 style={{ fontSize: "1.5rem"}}>Dashboard</h3>
          <p>Welcome, {user.user?.email}</p>
        </div>
        <div className='m-auto text-center w-full col-span-2'>
        <TaskViews userId={user.user?.id} tasks = {user.user?.tasks}/>

        </div>
    </div>
  )
} 

export default Dashboard;