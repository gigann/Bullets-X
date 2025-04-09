import './Activity.css';
import {useEffect, useState, useContext} from 'react';
import Addact from './Add.jsx'
import HandleDelete from './Delete.jsx'
import { useLocalStorage } from "@uidotdev/usehooks"

export default function Activity() {
    const [results, setResults] = useState([]);
    const [user, setUser] = useLocalStorage('loggedIn');
    

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
                <div className='t-div'>
                <table >
                    <thead>
                        <tr>
                            <th className='name'>Name</th>
                            <th className='descrip' >Description</th>
                            <th className='date'>Date</th>
                            <th>Changes</th>
                        </tr>
                    </thead>
                    
                    <tbody>
                            {results.map( (row) => (
                                <tr key={row.id}>
                                <td>{row.name}</td>
                                <td className='description'>{row.description}</td>
                                <td>{new Date(row.created_at).toLocaleDateString()}</td>
                                <td><HandleDelete id={row.id}/></td>
                            </tr>
                        ))}
                    </tbody>
                    
                </table>
                </div>
            </div>
        </>
    )
}
