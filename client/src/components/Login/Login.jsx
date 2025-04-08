import { useEffect, useState } from "react";
import { Link } from 'react-router'
import { useLocalStorage } from "@uidotdev/usehooks"
import './Login.css'
import bcrypt from "bcryptjs-react"

function Login() {
    const [formValues, setFormValues] = useState({username: "", password: ""})
    const [hiddenV, setHiddenV] = useState(true)
    const [loggedIn, setLoggedIn] = useLocalStorage('loggedIn')
    const [data, setData] = useState([])

    // useEffect(() => {
    //     fetch('URLGOES HERE')
    //         .then(res => res.json())
    //         .then(res2 => setData(res2))
    // },[])

    function handleChange(event){
        var { name, value} = event.target
        setFormValues(e => ({...e, [name]: value}))
    }

    function submit(){
        if(formValues.username == "" || formValues.password == ""){
            setHiddenV(false)
            return
        }

        var loggedInbool = false;
        var userid = 0
        if(data){
            for(let i of data){
                if(i.username == username){
                    var salt = bcrypt.genSaltSync(10);
                    var hash = bcrypt.hashSync(password, salt)
                    if(bcrypt.compare(i.password, hash)){
                        alert("Successful Login");
                        setLoggedIn(i)
                        loggedInbool = true;
                        userid = i.id;
                    }
                }
            }
        }

        if(!loggedInbool){
            alert("Incorrect Password or username")
        }else(
            navigate('/home/' + userid)
        )


    }

  return (
    <>
        <div className="login-container">
            <h1 className="headertext">Login</h1>
            <form className="login-form">
                <input type="text" name="username" value={formValues.username} placeholder="USERNAME" onChange={handleChange}/>
                <input type="text" name="password" value={formValues.password} placeholder="PASSWORD" onChange={handleChange}/>
                <p className="login-warning" hidden={hiddenV}>All fields must be filled out</p>
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
