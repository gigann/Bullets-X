import React, { useState } from "react";
import "./Navbar.css";
import { useNavigate, Link } from "react-router-dom";
import { useEffect } from 'react';
import Hamburger from "hamburger-react";
import { useLocalStorage } from "@uidotdev/usehooks";
import generic from '/generic.jpg'
import Xbutton from './button'
import { DarkModeSwitch } from 'react-toggle-dark-mode';
import "../../App.css";


export default function Navbar() {
  const navigate = useNavigate();
  const [isOpen, setOpen] = useState(false);
  const [profiledetails, setProfileDetails] = useState(false)
  const [loggedIn, setLoggedIn] = useLocalStorage("loggedIn");
  const [darkMode, setDarkMode] = useLocalStorage(true);

  const handleNavigation = (path) => {
    navigate(path);
    //toggle hamburger to close
    setOpen(false);
  };



  const toggleDarkMode = (checked) => {
    setDarkMode(checked);
  };

  useEffect(() => {
    if (darkMode) {
      document.body.classList.add('dark-mode');
      document.body.classList.remove('light-mode');
    }
    else {
      document.body.classList.add('light-mode');
      document.body.classList.remove('dark-mode');
    }
  }, [darkMode])

  return (
    <>
      <nav className="navbar">

        {/* Hamburger */}
        <div className="nav-Hamburger">
          <Hamburger toggled={isOpen} toggle={setOpen} className="nav-Hamburger"/>
        </div>

        {/* TITLE */}
        {!loggedIn && <h1 className="navHeader">BulletsX</h1>}
        {loggedIn && <Link to={`/home/${loggedIn.id}`} className="home-link">
            <h1 className="navHeader">BulletsX</h1>
        </Link>}

        {/* MENU */}
        {<div className={isOpen ? "newnav-menu" : "newnav-menu-closed"}>
            <nav>
              <ul className={!isOpen ? "hidden" : "visable"}>
                <li hidden={!loggedIn}>
                  <button className="nav-btn" onClick={() => {handleNavigation(loggedIn ? `/home/${loggedIn.id}` : ""), setOpen(!isOpen)}}>Home</button>
                </li>
                <li hidden={!loggedIn}>
                  <button className="nav-btn" onClick={() => {handleNavigation(loggedIn ? `/profile/${loggedIn.id}` : "") , setOpen(!isOpen)}}>Profile</button>
                </li>
                <li hidden={!loggedIn}>
                  <button className="nav-btn" onClick={() => {handleNavigation(loggedIn ? `/activity/${loggedIn.id}` : ""), setOpen(!isOpen)} } >Activity</button>
                </li>
                <li hidden={!loggedIn}>
                  <button className="nav-btn"onClick={() => {handleNavigation(loggedIn ? `/bullets/${loggedIn.id}` : ""), setOpen(!isOpen)}}>Bullets</button>
                </li>
                <li hidden={!loggedIn}>
                  <button className="nav-btn"onClick={() => {handleNavigation(loggedIn ? `/upcoming/${loggedIn.id}` : ""), setOpen(!isOpen)}}>Upcoming Awards</button>
                </li>
                <li hidden={!loggedIn}>
                  <button className="nav-btn"onClick={() => {handleNavigation(loggedIn ? `/packages/${loggedIn.id}` : ""), setOpen(!isOpen)}}>Packages</button>
                </li>
                <li hidden={!loggedIn}>
                  <button className="nav-btn"onClick={() => {handleNavigation(loggedIn ? `/subordinates/${loggedIn.id}` : ""), setOpen(!isOpen)}}>Subordinates</button>
                </li>
                <li hidden={loggedIn}>
                  <button className="nav-btn" onClick={() => {handleNavigation("/"), setOpen(!isOpen)}}>Log In</button>
                </li>
              </ul>
            </nav>
          </div>}

        {/* profile picture */}
        <div className="nav-profilePicture">
          <button className="nav-picture-button" onClick={() => setProfileDetails(!profiledetails)}><img src={loggedIn ? loggedIn.profile_picture : generic } alt="" className="nav-picture" /></button>
        </div>

        {/* div for the picture menu */}
        <div className="nav-profile-details" hidden={!profiledetails} >
          {/* Logged In Version */}
          {loggedIn &&
            <div>
                <div className="nav-profile-details-name">
                  <p>{loggedIn ? loggedIn.first_name + " " + loggedIn.last_name : ""}</p>
                  <p className="navbar-username">{loggedIn ? loggedIn.username : ""}</p>
                </div>
                <div className="nav-profile-details-buttons" hidden={!loggedIn}>
                  <button onClick={() => {navigate("/profile/" + loggedIn.id), setProfileDetails(!profiledetails)}}>Edit Profile</button>
                  <button onClick={() => {setLoggedIn(), navigate("/");}}>log-out</button>
                </div>
            </div>
          }

          {/* Logged out Version */}
          {!loggedIn &&
            <div className="nav-profile-details-buttons">
              <button>Log In</button>
            </div>
          }

          {/* Visable in both verisons */}
          {/* Night Mode Switch */}
          <div className="Xbutton">
            <Xbutton/>
          </div>
        </div>


      </nav>
    </>
  );
}
