
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
      }}>
        <div style={{
          width: "60wh",
          background: "#1f2937",
          padding: "2rem",
          borderRadius: "10px",
          marginRight: "1rem",
        }}>
          <button style={{ maxWidth: "20vh", margin: "1rem"}}>Logout</button>
          <button style={{ maxWidth: "20vh"}}>Profile</button>
        </div>
        <div style={{ padding: "2rem", background: "#88ab33", color: "white", borderRadius: "10px"}}>
          <h3 style={{ fontSize: "1.5rem"}}>Dashboard</h3>
          <p>Welcome, {user.user.email}</p>
        </div>
        <div>
        <TaskViews />

        </div>
    </div>
  )
} 

export default Dashboard;