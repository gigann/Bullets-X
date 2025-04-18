
import { Route, Routes } from 'react-router-dom';
import * as ReactDOM from 'react-dom';
import { DarkModeSwitch } from 'react-toggle-dark-mode';
import { useEffect, useState, useContext } from 'react';
import { useLocalStorage } from '@uidotdev/usehooks';

import Login from './components/Login/Login';
import SignUp from './components/SignUp/SignUp';
import Profile from './components/Profile/Profile';
import Home from './components/Home/Home';
import Activity from './components/Activity/Activity';
import Bullets from './components/Bullets/Bullets';
import Upcoming from './components/Upcoming/Upcoming';
import Subordinates from './components/Subordinates/Subordinates';
import Packages from './components/Packages/Packages';
import Navbar from './components/Navbar/Navbar';
import SubordinatesBullets from './components/SubordinatesBullets/SubordinatesBullets';
import SubordinateContext from './components/Context/SubordinateContext';

import "./App.css";

function App() {

  const [subordinateInfo, setSubordinateInfo] = useState([]);
  const subordinateState = {subordinateInfo, setSubordinateInfo};
  const [theme, setTheme] = useLocalStorage('theme', true)

  const [darkMode, setDarkMode] = useLocalStorage('darkMode') || false;

  const toggleDarkMode = (checked) => {
    setDarkMode(checked);
  };

  

  useEffect(() => {
    if (darkMode) {
      document.body.classList.add('dark-mode');
      document.body.classList.remove('light-mode');
      setTheme(true)
    }
    else {
      document.body.classList.add('light-mode');
      document.body.classList.remove('dark-mode');
      setTheme(false)
    }
  }, [darkMode])


  return (
    <>
    <SubordinateContext.Provider value = {subordinateState}>
      <Navbar />
      <Routes>
        <Route path='/' element={<Login />}></Route>
        <Route path='/signup' element={<SignUp />}></Route>
        <Route path='/profile/:id' element={<Profile />}></Route>
        <Route path='/home/:id' element={<Home />}></Route>
        <Route path='/activity/:id' element={<Activity />}></Route>
        <Route path='/bullets/:id' element={<Bullets />}></Route>
        <Route path='/upcoming/:id' element={<Upcoming />}></Route>
        <Route path='/packages/:id' element={<Packages />}></Route>
        <Route path='/subordinates/:id' element={<Subordinates />}></Route>
        <Route path='/subordinates/bullet/:id' element={<SubordinatesBullets />}></Route>
      </Routes>
    </SubordinateContext.Provider>
    </>
  );
}

export default App;
