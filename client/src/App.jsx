import { Route, Routes } from 'react-router-dom';

import Login from './components/Login/Login';
import SignUp from './components/SignUp/SignUp';
import Profile from './components/Profile/Profile';
import Home from './components/Home/Home';
import Activity from './components/Activity/Activity';
import Bullets from './components/Bullets/Bullets';
import Upcoming from './components/Upcoming/Upcoming';
import Subordinates from './components/Subordinates/Subordinates';
import Awards from './components/Awards/Awards';
import Navbar from './components/Navbar/Navbar';



import "./App.css";


function App() {

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
        <Route path='/awards/:id' element={<Awards />}></Route>
        <Route path='/subordinates/:id' element={<Subordinates />}></Route>
      </Routes>
    </>
  )
}

export default App;
