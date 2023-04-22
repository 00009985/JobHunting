import React, { useState } from 'react';
import "./pages.css";
import newRequest from '../../utils/newRequest';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const handleSubmit = async (e) =>{
    //to not refresh the page
    e.preventDefault();
    try {
      const res = await newRequest.post("/auth/login", {username, password})
      localStorage.setItem("currentUser", JSON.stringify(res.data));
      navigate("/")
    } catch (err) {
      setError(err.response.data);
    }
  };
  return (
    <div className='login'>
      <form onSubmit={handleSubmit}>
        <h1>sign in</h1>
        <label htmlFor="">username</label>
        <input type="text" name='username' placeholder='nastya' onChange={e => setUsername(e.target.value)}/>
        <label htmlFor="">password</label>
        <input type="password" name='password' onChange={e => setPassword(e.target.value)}/>
        <button type='Submit'>Login</button>
        {error && error}
      </form>
    </div>
  );
}

export default Login