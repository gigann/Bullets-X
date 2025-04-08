import { useEffect, useState } from "react";
import { Link, useNavigate } from 'react-router'
import { useLocalStorage } from "@uidotdev/usehooks"
import './Profile.css'


export default function Profile() {
    const [loggedIn, setLoggedIn] = useLocalStorage('loggedIn')
    const [email, setEmail] = useState()
    const [unit, setUnit] = useState('')
    const [supervisor, setSupervisor] = useState('')
    const [subordinates, setSubordinates] = useState([])

    useEffect(()=>{
      fetch(`http://localhost:3001/users/2`)
      .then(res => res.json())
      .then(data => {
        console.log(data)
        setUnit(data[0].unit_name);

        fetch(`http://localhost:3001/users/${data[0].supervisor_id}`)
        .then(res => res.json())
        .then(data => {
          setSupervisor(data[0].first_name)
        })
      })
    }, [])


    return (
      <>
        <div className="Profile-contianer">
            <div className="picture-and-name">
                <img src="../thumbs-up-emoji-transparent.png" alt="profile-picture" id='profile-picture'/>
                <h1>Name</h1>
            </div>
            <div>
              <h2>Unit: {unit}</h2> 
              <h2>Supervisor: {supervisor}</h2>
            </div>
            
        </div>
      </>
    )
  }
