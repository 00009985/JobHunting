import React, { useState } from 'react';
import "./pages.css";
import newRequest from '../../utils/newRequest';
import { useNavigate } from 'react-router-dom';

function Register () {
    const [user, setUser] = useState({
      username: "",
      email: "",
      password: "",
      isRecruiter: false,
      phone: "",
      desc: "",
    })
  
    const navigate = useNavigate();
  
    const handleChange = (e) => {
      setUser((prev) => {
        return {...prev, [e.target.name] : e.target.value};
      })
    }
  
    const handleRecruiter = (e) => {
      setUser((prev) => {
        return {...prev, isRecruiter : e.target.checked};
      })
    }
  
    const handleSubmit = async (e) =>{
      e.preventDefault()
      try {
        const res = await newRequest.post("/auth/register", {...user})
        navigate("/")
      } catch (error) {
         console.log(error)
      }
    }



  return (
    <div className='register'>
      <form className='register_form' onSubmit={handleSubmit}>
        <h1>Create a new account</h1>
        <label htmlFor="">Username</label>
        <input type="text" name='username' onChange={handleChange}/>
        <label htmlFor="">Email</label>
        <input type="email" name='email'onChange={handleChange} />
        <label htmlFor="">Password</label>
        <input type="password" name='password' onChange={handleChange} />
        <button type='Submit'>Register</button>

        <h1>I want to become a seller</h1>
          <div className="toggle">
            <label htmlFor="">Activate the seller account</label>
            <label className="switch">
              <input type="checkbox" onChange={handleRecruiter} />
              <span className="slider round"></span>
            </label>
          </div>
          <label htmlFor="">Phone Number</label>
          <input
            name="phone"
            type="text"
            placeholder="+1 234 567 89"
            onChange={handleChange}
          />
          <label htmlFor="">Description</label>
          <textarea
            placeholder="A short description of yourself"
            name="desc"
            id=""
            cols="30"
            rows="10"
            onChange={handleChange}
          ></textarea>
      </form>
    </div>
  )
  }

export default Register