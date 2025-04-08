import React, { useState } from "react";
import "./Navbar.css";
import { useNavigate, Link } from "react-router-dom";
import Hamburger from "hamburger-react";
import { useLocalStorage } from "@uidotdev/usehooks";

export default function Navbar() {
  const navigate = useNavigate();
  const [isOpen, setOpen] = useState(false);
  const [loggedIn, setLoggedIn] = useLocalStorage("loggedIn");

  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <>
      <nav className="navbar">
        <Link to="/home">
          <h1 className="navHeader">BulletsX</h1>
        </Link>
        {isOpen && (
          <ul>

                <li hidden={!loggedIn} ><button className='nav-btn' onClick={() => handleNavigation(loggedIn ? `/home/${loggedIn.id}` : "")}>Home</button></li>
                <li hidden={!loggedIn} ><button className='nav-btn' onClick={() => handleNavigation(loggedIn ? `/profile/${loggedIn.id}` : "")}>Profile</button></li>
                <li hidden={!loggedIn} ><button className='nav-btn' onClick={() => handleNavigation(loggedIn ? `/activity/${loggedIn.id}` : "")}>Activity</button></li>
                <li hidden={!loggedIn} ><button className='nav-btn' onClick={() => handleNavigation(loggedIn ? `/bullets/${loggedIn.id}` : "")}>Bullets</button></li>
                <li hidden={!loggedIn} ><button className='nav-btn' onClick={() => handleNavigation(loggedIn ? `/upcoming/${loggedIn.id}` : "")}>Upcoming</button></li>
                <li hidden={!loggedIn} ><button className='nav-btn' onClick={() => handleNavigation(loggedIn ? `/subordinates/${loggedIn.id}` : "")}>Subordinates</button></li>
                <li hidden={!loggedIn} ><button onClick={() => {setLoggedIn(), navigate('/')}}>Log Out</button></li>
                <li hidden={loggedIn}><button className='nav-btn' onClick={() => handleNavigation('/')}>Log In</button></li>

          </ul>
        )}
        <Hamburger toggled={isOpen} toggle={setOpen} />
      </nav>
    </>
  );
}
