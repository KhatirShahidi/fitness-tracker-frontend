import { useNavigate } from 'react-router-dom';

function Home() {
  const navigate = useNavigate();

  function navigateToLogin() {
    navigate('/login');
  }

  function navigateToRegister() {
    navigate('/register');
  }

  return (
    <div className="home-container">
      <div className="home-content">
        <h1 className="home-title">Welcome to My Fitness Tracker</h1>
        <p className="home-description">
          Track your workouts, monitor progress, and stay motivated.
        </p>
        <div className="button-group">
          <button
            className="home-button login-button"
            onClick={navigateToLogin}
          >
            Login
          </button>
          <button
            className="home-button register-button"
            onClick={navigateToRegister}
          >
            Register
          </button>
        </div>
      </div>
    </div>
  );
}

export default Home;
