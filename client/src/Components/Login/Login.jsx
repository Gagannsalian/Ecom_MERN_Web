import { useState , useEffect} from "react";
import './Login.css';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();  // Fix the incorrect hook usage


  
      useEffect(()=>{
          const auth = localStorage.getItem('user');
          if(auth){
              navigate('/');
  
          }
      })

  const handleLogin = async (e) => {
    e.preventDefault();  // Prevent the default form submission behavior
    console.warn("email, password", email, password);

    let result = await fetch("http://localhost:8082/login", {
      method: 'POST',
      body: JSON.stringify({ email, password }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    result = await result.json();
    console.warn(result);

    if (result.name) {
      localStorage.setItem("user", JSON.stringify(result));  // Corrected to setItem
      navigate('/');  // Corrected navigation
    } else {
      alert("Please login");
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2 className="login-title">Login</h2>
        <form onSubmit={handleLogin}> {/* Use onSubmit to trigger handleLogin */}
          <div className="input-group">
            <label htmlFor="email">Email</label>
            <input 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              type="email" 
              id="email" 
              placeholder="Enter your email" 
              required 
            />
          </div>
          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              type="password" 
              id="password" 
              placeholder="Enter your password" 
              required 
            />
          </div>
          <button type="submit" className="login-button">Login</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
