import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();
  function navigateToLogin() {
    navigate("/login");
  }
  function navigateToRegister() {
    navigate("/register");
  }
  return (
    <div>
      <h1>Welcome to My Fitness Tracker</h1>
      <p>Track your workouts, monitor progress, and stay motivated.</p>
    <button onClick={navigateToLogin}>Login</button>
    <button onClick={navigateToRegister}>Register</button>

    </div>
  );
}

export default Home;
