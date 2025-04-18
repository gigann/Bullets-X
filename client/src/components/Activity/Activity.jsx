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
        <h2 className='page-title'>My Activity</h2>
            <div className='activity-con'>
                <Addact/>
                <div className='t-div'>
                <table className='act-table'>
                    <thead>
                        <tr className='act-tr'>
                            <th className='name'>Name</th>
                            <th className='descrip' >Description</th>
                            <th className='date'>Date</th>
                            <th>Changes</th>
                        </tr>
                    </thead>

                    <tbody>
                            {results.map( (row) => (
                                <tr key={row.id} className='act-tr'>
                                <td className='act-td'>{row.name}</td>
                                <td className='act-td' id='description'>{row.description}</td>
                                <td className='act-td'>{new Date(row.created_at).toLocaleDateString()}</td>
                                <td className='act-td-del-btn'><HandleDelete id={row.id}/></td>
                            </tr>
                        ))}
                    </tbody>

                </table>
                </div>
            </div>
        </>
    )
}
