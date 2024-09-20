
import { RootState } from '../Redux/store';
import { useSelector } from 'react-redux';
import TaskViews from './Tasks/TaskViews';

const Dashboard = () => {
  const user = useSelector((state: RootState) => state.users);
  console.log(user);
 
 

  return (
    <div style={{
      display: "grid", 
      gridTemplateColumns: "6fr 1fr", 
      padding: "2rem", 
      borderRadius: "10px",
      }}>
        <div style={{
          width: "80wh",
          background: "#1f2937",
        }}>
          <button style={{ maxWidth: "20vh", margin: "1rem"}}>Logout</button>
          <button style={{ maxWidth: "20vh"}}>Profile</button>
        </div>
        <div style={{ background: "#1f2937"}}>
          <h3>Dashboard</h3>
          <p>Welcome, {user.user.email}</p>
        </div>
        <div>
        <TaskViews />

        </div>
    </div>
  )
} 

export default Dashboard;