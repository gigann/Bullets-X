import './Activity.css';
import {useEffect, useState, useContext} from 'react';
import Addact from './Add.jsx'
import HandleDelete from './Delete.jsx'

export default function Activity() {
    const [results, setResults] = useState([]);

    useEffect(() => {
        if (!user) return;
        fetch("http://localhost:3001/activity")
        .then(res => res.json())
        .then((data) => {
            const filteredData =data.filter((activity) => activity.user_id === user?.id)
            setResults(filteredData);
        })
        .catch((err) => console.error('Error fetching:', err))
    }, [user])
    
    return(
        <>
            <div className='activity-con'>
                <h2>My Activity</h2>
                <Addact/>
                <table >
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Description</th>
                            <th>Date</th>
                            <th>Changes</th>
                        </tr>
                    </thead>
                    <tbody>
                            {results.map( (row) => (
                                <tr key={row.id}>
                                <td>{row.name}</td>
                                <td>{row.description}</td>
                                <td>{new Date(row.created_at).toLocaleDateString()}</td>
                                <td><HandleDelete id={row.id}/></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
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