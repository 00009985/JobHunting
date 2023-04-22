import React, { useState } from 'react'
import "./components.css"
import { useNavigate } from 'react-router-dom';

const Header = () => {
    const [input, setInput] = useState("");
    const navigate = useNavigate()

    const handleSubmit = () => {
        navigate(`/jobs?search=${input}`)
    }
  return (
    <div className='header'>
        <div className="header_container">
            <h1 className='header_heading'>Find your dream job</h1>
            <div className="search">
                <div className="search_input">
                    <img className='search_img' src="./images/search.png" alt="" />
                    <input type="text" placeholder='search' onChange={(e) => setInput(e.target.value)}/>
                </div>
                <button className='button_search'onClick={handleSubmit}>Search</button>
            </div>
            <div className="header_popular">
                <span className='header_popular'>Popular:</span>
                <button className='button_popular'>Sales Manager</button>
                <button className='button_popular'>Internship</button>
                <button className='button_popular'>Audit</button>
                <button className='button_popular'>Teacher</button>
            </div>
        </div>
    </div>
  )
}

export default Header