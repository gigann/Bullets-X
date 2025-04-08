import {useEffect, useState, useContext} from 'react'


export default function Addact() {

    
    const [formData, setFormData] = useState({
        name: '',
        description: '',        
    });

    

    const inputChange =(event) => {
        const {name, value} = event.target;
        setFormData({
            ...formData,
            [name]: value
        })
    }

    const addinv = async () => {

        if(!formData.name || !formData.description ){
            alert('Missing one or more fields!');
            return;
        }
        try {
        const response = await fetch('http://localhost:3001/activity', {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                user_id: user?.id,
                name: formData.name,
                description: formData.description,
            })
        })

        const data = await response.json()
            if (response.ok) {
                alert('Activity added!')
                window.location.reload();
            } 
        } catch(error) {
            console.error('Error:', error);
            alert('An error occured')
        }
    }

    

    return(
    <>
        <div className='add-act'>
            <h2>Add Item to inventory:</h2>
            <input
             className='txtbox'
              placeholder='Activity Name'
               type='text'
                name='name'
                 value={formData.name}
                  onChange={inputChange}
                  ></input>
            <input
             className='descrip'
                placeholder='description'
                 type='text'
                  name='description'
                    value={formData.description}
                     onChange={inputChange}
                     ></input>
            
            <button onClick={addinv}>Add Activity!</button>
        </div>
    </>
    )
    }

    let user = {
        "id": 1,
        "first_name": "Mickey",
        "last_name": "Mouse",
        "unit_name": "Launch",
        "username": "mickeymouse1",
        "password": "789abc",
        "rank": "O-5",
        "profile_picture": "something.png",
        "supervisor_id": null,
        "is_supervisor": true
      }