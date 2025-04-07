import { forwardRef, useEffect, useState } from "react";
import { Link } from 'react-router'
import { useLocalStorage } from "@uidotdev/usehooks"
import './login.css'
import bcrypt from "bcryptjs-react"

function Login() {
    const [formValues, setFormValues] = useState({username: "", password: ""})
    const [hiddenV, setHiddenV] = useState(true)

    function handleChange(event){
        var { name, value} = event.target
        setFormValues(e => ({...e, [name]: value}))
    }

    function submit(){
        if(formValues.username == "" || formValues.password == ""){
            setHiddenV(false)
            return
        }

        
    }

  return (
    <>
        <div className="login-container">
            <h1 className="headertext">Login</h1>
            <form className="login-form">
                <input type="text" name="username" value={formValues.username} placeholder="USERNAME" onChange={handleChange}/>
                <input type="text" name="password" value={formValues.password} placeholder="PASSWORD" onChange={handleChange}/>
                <button className="login-submit" onClick={()=>{submit()}}>SUBMIT</button>
            </form>
            <div className="login-links">
                <Link to="/signup">Create Account</Link>
            </div>
        </div>
    </>
  )
}

export default Login;
