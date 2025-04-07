import { useEffect, useState } from "react";
import { Link, useNavigate } from 'react-router'
import { useLocalStorage } from "@uidotdev/usehooks"
import '../Login/Login.css'
import bcrypt from "bcryptjs-react"

function Signup() {
    const [postValues, setPostValues ] = useState({first_name: '', last_name: '', user_name: '', password: '', rank: '', unit: '', supervisor: ''})
    const [userData, setUserData] = useState([])
    const navigate = useNavigate()
    const saltRounds = 10;

    function handleChange(event){
        var { name, value} = event.target
        setFormValues(e => ({...e, [name]: value}))
    }


    return (
      <>
        <div className="login-container">
            <h1>Create User</h1>
            <form className="login-form">
                <input type="text" name="first_name" placeholder="First Name" value={postValues.first_name} onChange={handleChange}/>
                <input type="text" name="last_name" placeholder="Last Name" value={postValues.last_name} onChange={handleChange}/>
                <input type="text" name="user_name" placeholder="Username" value={postValues.user_name} onChange={handleChange}/>
                <input type="text" name="password" placeholder="Password" value={postValues.password} onChange={handleChange}/>
                <input type="text" name="rank" placeholder="Rank" value={postValues.rank} onChange={handleChange}/>
                <select name="rank" placeholder="Rank"> 
                    <option value="E1">E1</option>
                    <option value="E2">E2</option>
                    <option value="E3">E3</option>
                    <option value="E4">E4</option>
                    <option value="E5">E5</option>
                    <option value="E6">E6</option>
                    <option value="E7">E7</option>
                    <option value="E8">E8</option>
                    <option value="E9">E9</option>
                    <option value="O1">O1</option>
                    <option value="O2">O2</option>
                    <option value="O3">O3</option>
                    <option value="O4">O4</option>
                    <option value="O5">O5</option>
                    <option value="O6">O6</option>
                    <option value="O7">O7</option>
                    <option value="O8">O8</option>
                    <option value="O9">O9</option>
                    <option value="10">10</option>
                </select>
                <select name="unit">
                    <option value="71st ISRS">71st ISRS</option>
                    <option value="72nd ISRS">72nd ISRS</option>
                    <option value="73rd ISRS">73rd ISRS</option>
                    <option value="74th ISRS">74th ISRS</option>
                    <option value="75th ISRS">75th ISRS</option>
                </select>
                <input type="text" name="supervisor" placeholder="Supervisor" value={postValues.supervisor} onChange={handleChange}/>
                <button className="login-submit" onClick={() => {submit()}}>SUBMIT</button>
            </form>
            <div className="login-links">
                <Link to="/Login">Back to Login</Link>
            </div>
        </div>
      </>
    )
  }
  
  export default Signup;