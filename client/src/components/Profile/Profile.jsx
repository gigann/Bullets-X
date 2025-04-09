import { useEffect, useState } from "react";
import { Link, useNavigate } from 'react-router'
import { useLocalStorage } from "@uidotdev/usehooks"
import './Profile.css'
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';


export default function Profile() {
    const [loggedIn, setLoggedIn] = useLocalStorage('loggedIn')
    const [unit, setUnit] = useState(loggedIn.unit_name)
    const [supervisor, setSupervisor] = useState('')
    const [isHidden, setIsHidden] = useState(true)
    const [name, setName] = useState(loggedIn.first_name)
    const [lastName, setLastName] = useState(loggedIn.last_name)
    const [patchValues, setPatchValues] = useState({first_name: loggedIn.first_name, last_name: loggedIn.last_name, supervisor_id: loggedIn.supervisor_id, unit_name: loggedIn.unit_name})
    const imageArray = ['/donald.jpg', '/daisy.jpg', '/generic.jpg']
    const [profileImg, setProfileImg] = useState(imageArray[2])
    const testArray = [1, 2, 2]
    const [iterator, setIterator] = useState(0)
    const [supervisorList, setSupervisorList] = useState()

    // useEffect(()=>{
    //   fetch(`http://localhost:3001/users/${loggedIn.id}`)
    //   .then(res => res.json())
    //   .then(data => {
    //     console.log(data)
    //     setUnit(data[0].unit_name);
    //     setName(data[0].first_name + ' ' + data[0].last_name)

    //     fetch(`http://localhost:3001/users/${data[0].supervisor_id}`)
    //     .then(res => res.json())
    //     .then(data => {
    //       setSupervisor(data[0].first_name)
    //     })
    //   })
    // }, [])

    function handleChange(event){
      var {name, value} = event.target
      console.log(name, value)
      setPatchValues(e => ({...e, [name]: value}))
    }

    useEffect(()=>{

        fetch(`http://localhost:3001/users/${loggedIn.supervisor_id}`)
          .then(res => res.json())
          .then(data => {
            setSupervisor(data[0].first_name)
        })

        fetch(`http://localhost:3001/users/byunit/${loggedIn.unit_name}`)
            .then(res => res.json())
            .then(data => {
                //500
                setSupervisorList(data)
                console.log("user data:", supervisorList)
            })
            .catch(err => console.log("error: ",err))
    }, [])

    const editProfile = async ()=>{
      try{
        const response = await fetch(`http://localhost:3001/users/${loggedIn.id}`, {
          method: 'PATCH',
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(patchValues),
        })
      setIsHidden(!isHidden)
      }catch(err){
        console.log(err)
      }


      fetch(`http://localhost:3001/users/${loggedIn.id}`)
        .then(res => res.json())
        .then(data => console.log(data))
      
    }

    

    return (
      <>
        <div className="profile-container">
          <div className="profile-info">
            <div className="profile-header">
              <img src={profileImg} alt="profile-picture" id='profile-picture'/>
              <h1 hidden={!isHidden}>{name + " " + lastName}</h1>
            </div>
            <div className="profile-data">
              <h2>Supervisor: {supervisor}</h2>
              <h2>Unit: {loggedIn.unit_name}</h2>
            </div>
          </div>
          
          <div className="profile-edit">
            <input type="text" name="first_name" value={patchValues.first_name}  onChange={(e) => {setName(e.target.value), handleChange(e)}} hidden={isHidden}/>
            <input type="text" name="last_name" value={patchValues.last_name}  onChange={(e) => {setLastName(e.target.value), handleChange(e)}} hidden={isHidden}/>
            <select name="supervisor_id" value={patchValues.supervisor_id} hidden={isHidden} >
              {supervisorList?.map((user, i) => {
                          return <option key={i} value={user.id}>{user.first_name} {user.last_name} ({user.rank})</option>
                      })}
            </select>
            {!isHidden && <IconButton onClick={() => {
              iterator === imageArray.length-1? setIterator(0): setIterator(iterator+1)
              setProfileImg(imageArray[iterator])

              }}><ArrowUpwardIcon/></IconButton>}
            {!isHidden && <IconButton onClick={() => {
              iterator === 0? setIterator(imageArray.length - 1): setIterator(iterator-1)
              setProfileImg(imageArray[iterator])
              
              }}><ArrowDownwardIcon/></IconButton>}
            <div className="edit-button">
              <IconButton onClick={() => setIsHidden(!isHidden)} ><EditIcon/></IconButton>
            </div> 
            {!isHidden && <IconButton onClick={() => editProfile()}><SaveIcon/></IconButton>}
          </div>
          
        </div>


      </>
    )
  }
