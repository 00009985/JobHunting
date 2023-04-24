import React, { useState } from 'react';
import './components.css';
import { Link, useNavigate } from 'react-router-dom';
import newRequest from '../../utils/newRequest';

const Navbar = () => {
  //state hook for opening menu
  const [open, setOpen] = useState(false);

  const currentUser = JSON.parse(localStorage.getItem('currentUser'));
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await newRequest.post('/auth/logout');
      localStorage.setItem('currentUser', null);
      navigate('/');
    } catch (error) {
      console.log(err);
    }
  };

  return (
    <div className="navbar">
      <div className="container">
        <div className="logo">
          <Link to="/">
            <span className="logo_heading">JobHunting</span>
          </Link>
        </div>
        <div className="links">
          <ul className="navbar_list">
          </ul>
          {currentUser ? (
            <div className="user" onClick={() => setOpen(!open)}>
              <span>{currentUser?.username}</span>
              {open && (
                <div className="menu">
                  {currentUser?.isRecruiter && (
                    <>
                      <Link className="menu_link" to="/myJobs">
                        Jobs
                      </Link>
                      <Link className="menu_link" to="/addjob">
                        Add new job
                      </Link>
                      <Link className="menu_link" to="/applicationcompany">
                        Applications
                      </Link>
                      <Link className="menu_link" to="/messages">
                        Messages
                      </Link>
                      <Link
                        className="menu_link"
                        to="/logout"
                        onClick={handleLogout}
                      >
                        Logout
                      </Link>
                    </>
                  )}

                  {!currentUser?.isRecruiter && (
                    <>
                      <Link className="menu_link" to="/myresumes">
                        My resumes
                      </Link>
                      <Link className="menu_link" to="/addresume">
                        Add new resume
                      </Link>
                      <Link className="menu_link" to="/applications">
                        Applications
                      </Link>
                      <Link className="menu_link" to="/messages">
                        Messages
                      </Link>
                      <Link className="menu_link" to="/favorite">
                        Favorite List
                      </Link>
                      <Link
                        className="menu_link"
                        to="/logout"
                        onClick={handleLogout}
                      >
                        Logout
                      </Link>
                    </>
                  )}
                </div>
              )}
            </div>
          ) : (
            <>
              <Link to="/login" >
                <button className="link">Sign in</button> 
              </Link>
              <Link  to="/register">
                <button className="link">Join</button>
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
