import { useEffect, useState } from "react";
import { Link, useNavigate } from 'react-router'
import { useLocalStorage } from "@uidotdev/usehooks"
import './SignUp.css'
import bcrypt from "bcryptjs-react"


function Signup() {
    const [postValues, setPostValues ] = useState({firstname: '', lastname: '', username: '', password: '', rank: 'E-1', unit: '', supervisor: ''})
    const [userData, setUserData] = useState([])
    // const [ unit, setUnit ] = useState(postValues.unit);
    const navigate = useNavigate()
    const [loggedin, setLoggedIn] = useLocalStorage('loggedIn')
    const saltRounds = 10;

    // useEffect(() => {
    //     fetch(`http://localhost:3001/users/byunit/${postValues.unit}`)
    //         .then(res => res.json())
    //         .then(res2 => setUserData(res2))
    //         .catch(err => console.log("error: ",err))
    // }, [postValues.unit])

    function handleChange(event){
        var {name, value} = event.target
        if(name == 'unit') {
            fetch(`http://localhost:3001/users/byunit/${value}`)
            .then(res => res.json())
            .then(data => {
                //500
                setUserData(data)
                console.log("user data:", userData)
            })
            .catch(err => console.log("error: ",err))
        }
        setPostValues(e => ({...e, [name]: value}))
        // setUnit(postValues.unit);
    }

    function submit(event){
        //checks for empty fields in the form
        //event.preventDefault()
        if(postValues.firstname == "" || postValues.lastname == "" || postValues.username == "" || postValues.password == "" || postValues.rank == "" || postValues.unit == ""){
            alert("all fields must be filled out")
            return
        }

        //checks if a user already exists with username
        // for(let i of userData){
        //     if(i.username == postValues.username){
        //         alert("User already exist with that username, choose another one")
        //         return
        //     }
        // }

        
        fetch('http://localhost:3001/users', {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: postValues.username,
                password: postValues.password,
                unit_name: postValues.unit,
                first_name: postValues.firstname,
                last_name: postValues.lastname,
                rank: postValues.rank,
                profile_picture: "../public/daisy.jpg",
                supervisor_id: postValues.supervisor,
                is_supervisor: false
            })
        })
            .then(res => res.json())
            .then(data => {
                // console.log("Server Response: ", data);
                alert("Account Created");
                navigate("/");
            })

    }

    return (
      <>
        <div className="signup-container">
            <h1>Sign Up</h1>
            <form className="signup-form">
                <div className="signup-names">
                    <input type="text" name="firstname" placeholder="First Name" value={postValues.firstname} onChange={handleChange}/>
                    <input type="text" name="lastname" placeholder="Last Name" value={postValues.lastname} onChange={handleChange}/>
                </div>
                <div className="signup-passwords">
                    <input type="text" name="username" placeholder="Username" value={postValues.username} onChange={handleChange}/>
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
                    <option value="Select">Select</option>
                    <option value="71st ISRS">71st ISRS</option>
                    <option value="72nd ISRS">72nd ISRS</option>
                    <option value="73rd ISRS">73rd ISRS</option>
                    <option value="74th ISRS">74th ISRS</option>
                    <option value="75th ISRS">75th ISRS</option>
                    <option value="Launch">Launch</option>
                </select>
                <select name="supervisor" onChange={handleChange}>
                    {userData?.map((user, i) => {
                        return <option key={i} value={user.id}>{user.first_name} {user.last_name} ({user.rank})</option>
                    })}
                </select>
                
            </form>
            <button type="submit" className="signup-submit" onClick={() => {submit()}}>SUBMIT</button>
            <div className="signup-links">
                <Link to="/">Back to Login</Link>
            </div>
        </div>
      </>
    )
  }
  
  export default Signup;
