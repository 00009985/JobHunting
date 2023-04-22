import React from 'react'
import "./components.css"
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <div className='footer'>
      <div className="footer_container">
        <div className="footer_top">
          <div className="footer_item">
            <h2>Search for job</h2>
            <span>Create a resume</span>
            <span>Help</span>
          </div>
          <div className="footer_item">
            <h2>Search for employee</h2>
            <span>Post a job</span>
            <span>Read terms of use</span>
          </div>
          <div className="footer_item">
            <h2>Helpful</h2>
            <Link className='menu_link' to='/contact'><span>Contact us</span></Link>
            <span>FAQ</span>
          </div>
        </div>
        <div className="footer_bottom">  
            <h2>JobHunting</h2>
            <span>© 2023 WIUT BISP</span> 
        </div>
      </div>
    </div>
  )
}

export default Footer