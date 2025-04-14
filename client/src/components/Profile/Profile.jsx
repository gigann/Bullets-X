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
    const [patchValues, setPatchValues] = useState({id: loggedIn.id, first_name: loggedIn.first_name, last_name: loggedIn.last_name, username: loggedIn.username, supervisor_id: loggedIn.supervisor_id, unit_name: loggedIn.unit_name, rank: loggedIn.rank, profile_picture: loggedIn.profile_picture, is_supervisor: loggedIn.is_supervisor})
    const [updateLocalStorage, setUpdateLocalStorage] = useState(0)
    const [unit, setUnit] = useState(loggedIn.unit_name)
    const [supervisor, setSupervisor] = useState(loggedIn.supervisor_id)
    const [isHidden, setIsHidden] = useState(true)
    const [name, setName] = useState(patchValues.first_name? patchValues.first_name: loggedIn.first_name)
    const [lastName, setLastName] = useState(loggedIn.last_name)
    const imageArray = ['/donald.jpg', '/daisy.jpg', '/generic.jpg', '/alien.png', '/rocket.png', '/telescope.png', '/mitochondria.png', '/astronaut.png']
    const [profileImg, setProfileImg] = useState(loggedIn.profile_picture? loggedIn.profile_picture : imageArray[2])
    const testArray = [1, 2, 2]
    const [supervisorName, setSupervisorName] = useState('')
    const [supervisorList, setSupervisorList] = useState()
    const [unitList, setUnitList] = useState([])
    const [updatePicutre, setUpdatePicture] = useState(false)
    const [iterator, setIterator] = useState(imageArray.indexOf(profileImg))

    //updatest the localstorage everytime the patch is sent
    useEffect(() => {
        setLoggedIn({id: patchValues.id, first_name: patchValues.first_name, last_name: patchValues.last_name, username: patchValues.username, supervisor_id: patchValues.supervisor_id, unit_name: patchValues.unit_name, rank: patchValues.rank, profile_picture: profileImg, is_supervisor: patchValues.is_supervisor})
        console.log('setting local storage')
    }, [updateLocalStorage])

    //changes the patch values 
    function handleChange(event){
      var {name, value} = event.target
      console.log(name, value)
      setPatchValues(e => ({...e, [name]: value}))
    }

    useEffect(() => {
      fetch(`http://localhost:3001/unit`)
        .then(rawData => rawData.json())
        .then(data => setUnitList(data))
        .catch(err => console.log("error: ",err))
    }, [])

    useEffect(()=>{
      console.log(supervisor)
        fetch(`http://localhost:3001/users/${supervisor}`)
          .then(res => res.json())
          .then(data => {
            console.log(data[0].first_name)
            setSupervisorName(data[0].first_name + ' ' + data[0].last_name + '  (' + data[0].rank + ')')
        })

        fetch(`http://localhost:3001/users/byunit/${patchValues.unit_name}`)
            .then(res => res.json())
            .then(data => {
                //500
                setSupervisorList(data)
                console.log("user data:", supervisorList)
            })
            .catch(err => console.log("error: ",err))
    }, [supervisor, patchValues.unit_name, patchValues.supervisor_id])

    const editProfile = async ()=>{
      try{
        // if(updatePicutre === false){
        //   console.log("if")
        //   const response = await fetch(`http://localhost:3001/users/${loggedIn.id}`, {
        //     method: 'PATCH',
        //     headers: {
        //       Accept: "application/json",
        //       "Content-Type": "application/json",
        //     },
        //     body: JSON.stringify(patchValues),
        //   })
        // }else{

          const response = await fetch(`http://localhost:3001/users/${loggedIn.id}`, {
            method: 'PATCH',
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
            body: JSON.stringify({id: patchValues.id, first_name: patchValues.first_name, last_name: patchValues.last_name, username: patchValues.username, supervisor_id: patchValues.supervisor_id, unit_name: patchValues.unit_name, rank: patchValues.rank, profile_picture: profileImg, is_supervisor: patchValues.is_supervisor}),
          })
        // }

      setIsHidden(!isHidden)
      
      }catch(err){
        console.log(err)
      }


      //calls to update local storage
      setUpdateLocalStorage(updateLocalStorage + 1)

      

      
    }

    

    return (
      <>
        {/* <button onClick={() => console.log(loggedIn)}>Console log</button> */}
        <div className="profile-container">
          <h1 className="profile-title">Your Profile</h1>
          <div className="profile-info">
            <div className="profile-header">
              <img src={profileImg} alt="profile-picture" id='profile-picture'/>
              <h1 hidden={!isHidden}>{name + " " + lastName}</h1>
            </div>
            <div className="profile-data">
              <h2 className="profile-data-item">Rank: {patchValues.rank}</h2>
              <h2 className="profile-data-item">Supervisor: {supervisorName}</h2>
              <h2 className="profile-data-item">Unit: {patchValues.unit_name}</h2>
            </div>
          </div>
          
          <div className="profile-edit">
            <div className="edit-name">
              <input type="text" name="first_name" value={patchValues.first_name}  onChange={(e) => {setName(e.target.value), handleChange(e)}} hidden={isHidden}/>
              <input type="text" name="last_name" value={patchValues.last_name}  onChange={(e) => {setLastName(e.target.value), handleChange(e)}} hidden={isHidden}/>
            </div>
            
            <div className="edit-selectors">
              <select name="rank" value={patchValues.rank} hidden={isHidden} onChange={(e) => {handleChange(e)}}>
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
              <select name="supervisor_id" value={patchValues.supervisor_id} hidden={isHidden} onChange={(e) => {setSupervisor(e.target.value), handleChange(e)}} >
              <option key={0} value={supervisor}>Select Supervisor</option>
                {supervisorList?.map((user, i) => {
                            if(user.id == patchValues.id){
                              return
                            }else{
                              return <option key={i} value={user.id} className="profile-dropdown">{user.first_name} {user.last_name} ({user.rank})</option>
                            }
                        })}
              </select>
              <select name="unit_name" value={patchValues.unit_name} hidden={isHidden} onChange={(e) => handleChange(e)} >
                  {unitList?.map((unit, i) => {
                            return <option key={i} value={unit.name}>{unit.name}</option>
                        })}``
              </select>
            </div>
            <div className="edit-arrows" hidden={isHidden}>
              {!isHidden && <IconButton onClick={() => {
                let temp = iterator
                temp === imageArray.length-1? temp = 0: temp++
                setProfileImg(imageArray[temp])
                setIterator(temp)
                setUpdatePicture(true)
              }}><ArrowUpwardIcon/></IconButton>}
              {!isHidden && <IconButton onClick={() => {

                let temp2 = iterator
                temp2 === 0? temp2 = (imageArray.length - 1): temp2--
                setProfileImg(imageArray[temp2])
                setIterator(temp2)
                setUpdatePicture(true)  
              }}><ArrowDownwardIcon/></IconButton>}
            </div>
            <div className="edit-button">
              <IconButton onClick={() => setIsHidden(!isHidden)} ><EditIcon/></IconButton>
            </div> 
            <div className="edit-save">
              {!isHidden && <IconButton onClick={() => editProfile()} className="profile-icon"><SaveIcon className="profile-icon"/></IconButton>}
            </div>
          </div>
          
        </div>


      </>
    )
  }
