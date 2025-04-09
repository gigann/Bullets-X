import { useEffect, useState } from "react";
import { Link, useNavigate } from 'react-router-dom'
import { useLocalStorage } from "@uidotdev/usehooks"
import './Login.css'
import bcrypt from "bcryptjs-react"

function Login() {
    const [formValues, setFormValues] = useState({username: "", password: ""})
    const [hiddenV, setHiddenV] = useState(true)
    const [loggedIn, setLoggedIn] = useLocalStorage('loggedIn')
    const [data, setData] = useState([])
    const [loginError, setLoginError] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        fetch('http://localhost:3001/users')
            .then(res => res.json())
            .then(res2 => setData(res2))
    },[])

    function handleChange(event){
        var { name, value } = event.target
        setFormValues(e => ({...e, [name]: value}))
    }

    function submit(event){
        if (event) event.preventDefault();

        if(formValues.username === "" || formValues.password === ""){
            setHiddenV(false)
            return
        }

        fetch('http://localhost:3001/users/login', {
            method: 'POST',
            mode: 'cors',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: formValues.username,
                password: formValues.password,
            })
        })
            .then((res) => {
                if (!res.ok) {
                    if (res.status === 401) {
                        throw new Error("Invalid username or password");
                  }
                  throw new Error("An unexpected error occurred");
                }
            return res.json();
            })
            .then((data) => {
                console.log("Server Response: ", data);
                setLoggedIn(data.user)
                navigate("/home/" + data.user.id.toString())
            })
            .catch((error) => {
                console.error("Login error:", error.message);
                setHiddenV(true);
                setLoginError(true);
              });
    }

  return (
    <>
        <div className="login-container">
            <h1 className="headertext">Login</h1>
            <form className="login-form" onSubmit={submit}>
                <input type="text" name="username" value={formValues.username} placeholder="USERNAME" onChange={handleChange}/>
                <input type="password" name="password" value={formValues.password} placeholder="PASSWORD" onChange={handleChange}/>
                <p className="login-warning" hidden={hiddenV}>All fields must be filled out</p>
                <p className="login-error" hidden={!loginError}>Invalid Credentials</p>
            <button type="submit">SUBMIT</button>
            </form>
            <div className="login-links">
                <Link to="/signup">Create Account</Link>
            </div>
        </div>
    </>
  )
}

export default Login;
