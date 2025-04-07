import { useEffect, useState } from "react";
import { Link, useNavigate } from 'react-router'
import { useLocalStorage } from "@uidotdev/usehooks"
import './SignUp.css'
import bcrypt from "bcryptjs-react"

function Signup() {
    const [postValues, setPostValues ] = useState({firstname: '', lastname: '', username: '', password: '', rank: '', unit: '', supervisor: ''})
    const [userData, setUserData] = useState([])
    const navigate = useNavigate()
    const saltRounds = 10;

    useEffect(() => {
        fetch("URL GOES HERE")
            .then(res => res.json())
            .then(res2 => setUserData(res2))
    }, [])

    function handleChange(event){
        var { name, value} = event.target
        setPostValues(e => ({...e, [name]: value}))
    }

    function submit(){

        //checks for empty fields in the form
        if(postValues.firstname = "",postValues.lastname = "",postValues.username = "",postValues.password = "", postValues.rank = "", postValues.unit = "", postValues.supervisor = ""){
            alert("all fields must be filled out")
            return
        }

        //checks if a user already exists with username
        for(let i of userData){
            if(i.username == postValues.username){
                alert("User already exist with that username, choose another one")
                return
            }
        }

        postValues.password = bcrypt.hashSync(postValues.password, saltRounds)

        fetch('URL GOES HERE', {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                first_name: postValues.firstname,
                last_name: postValues.lastname,
                user_name: postValues.username,
                password: postValues.password,
                rank: postValues.rank,
                unit: postValues.unit,
                supervisor: postValues.supervisor
            })
        })
            .then(res => res.json())
            .then(data => console.log("Server Response: ", data))
            .then(dummy => {if(data.success == true){alert("Account Successfully created"); navigate("/login")}})

    }

    return (
      <>
        <div className="signup-container">
            <h1>Create User</h1>
            <form className="signup-form">
                <div className="signup-names">
                    <input type="text" name="first_name" placeholder="First Name" value={postValues.firstname} onChange={handleChange}/>
                    <input type="text" name="last_name" placeholder="Last Name" value={postValues.lastname} onChange={handleChange}/>
                </div>
                <div className="signup-passwords">
                    <input type="text" name="user_name" placeholder="Username" value={postValues.username} onChange={handleChange}/>
                    <input type="text" name="password" placeholder="Password" value={postValues.password} onChange={handleChange}/>
                </div>
                <select name="rank" placeholder="Rank" onChange={handleChange}> 
                    <option value="E-1">E-1</option>
                    <option value="E-2">E-2</option>
                    <option value="E-3">E-3</option>
                    <option value="E-4">E-4</option>
                    <option value="E-5">E-5</option>
                    <option value="E-6">E-6</option>
                    <option value="E-7">E-7</option>
                    <option value="E-8">E-8</option>
                    <option value="E-9">E-9</option>
                    <option value="O-1">O-1</option>
                    <option value="O-2">O-2</option>
                    <option value="O-3">O-3</option>
                    <option value="O-4">O-4</option>
                    <option value="O-5">O-5</option>
                    <option value="O-6">O-6</option>
                    <option value="O-7">O-7</option>
                    <option value="O-8">O-8</option>
                    <option value="O-9">O-9</option>
                    <option value="W-1">W-1</option>
                    <option value="W-2">W-2</option>
                    <option value="W-3">W-3</option>
                    <option value="W-4">W-4</option>
                    <option value="W-5">W-5</option>
                </select>
                <select name="unit" onChange={handleChange}>
                    <option value="71st ISRS">71st ISRS</option>
                    <option value="72nd ISRS">72nd ISRS</option>
                    <option value="73rd ISRS">73rd ISRS</option>
                    <option value="74th ISRS">74th ISRS</option>
                    <option value="75th ISRS">75th ISRS</option>
                </select>
                <select name="supervisor">
                    <option value="Damon as a Supervisor" onChange={handleChange}>Badass Supervisor</option>
                    <option value="Brooke as a Supervisor" onChange={handleChange}>Absolute DOGSHIT supervisor</option>
                </select>
                <button className="signup-submit" onClick={() => {submit()}}>SUBMIT</button>
            </form>
            {/* <button onClick={() => console.log(postValues)}>Console.log</button> */}
            <div className="signup-links">
                <Link to="/">Back to Login</Link>
            </div>
        </div>
      </>
    )
  }
  
  export default Signup;
