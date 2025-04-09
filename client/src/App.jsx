import { Route, Routes } from 'react-router-dom';
import * as ReactDOM from 'react-dom';
import { DarkModeSwitch } from 'react-toggle-dark-mode';
import { useEffect, useState } from 'react';
import { useLocalStorage } from '@uidotdev/usehooks';

import Login from './components/Login/Login';
import SignUp from './components/SignUp/SignUp';
import Profile from './components/Profile/Profile';
import Home from './components/Home/Home';
import Activity from './components/Activity/Activity';
import Bullets from './components/Bullets/Bullets';
import Upcoming from './components/Upcoming/Upcoming';
import Subordinates from './components/Subordinates/Subordinates';
import Navbar from './components/Navbar/Navbar';



import "./App.css";


function App() {
  const [darkMode, setDarkMode] = useLocalStorage('darkMode') || false;

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
      <Navbar/>
      <Routes>
        <Route path='/' element={<Login />}></Route>
        <Route path='/signup' element={<SignUp />}></Route>
        <Route path='/profile/:id' element={<Profile />}></Route>
        <Route path='/home/:id' element={<Home />}></Route>
        <Route path='/activity/:id' element={<Activity />}></Route>
        <Route path='/bullets/:id' element={<Bullets />}></Route>
        <Route path='/upcoming/:id' element={<Upcoming />}></Route>
        <Route path='/subordinates/:id' element={<Subordinates />}></Route>


      </Routes>

      <footer className='app-footer'>
        <DarkModeSwitch
          checked={darkMode}
          onChange={toggleDarkMode}
          size={64}
        />
      </footer>

    </>
  )
}

export default App;
