import { useEffect, useState } from "react";
import { Link, useNavigate } from 'react-router'
import { useLocalStorage } from "@uidotdev/usehooks"
import './Profile.css'


export default function Profile() {
    const [loggedIn, setLoggedIn] = useLocalStorage('loggedIn')


    return (
      <>
        <div className="Profile-contianer">
            <div className="Profile-picture">
                {/* <img src="" alt="" /> */}
                <h1>Name</h1>
            </div>
            
        </div>
      </>
    )
  }
