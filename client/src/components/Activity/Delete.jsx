import {useEffect, useState} from 'react';

export default function HandleDelete({ id }) {
    const [status, setStatus] = useState(null);

    const handleDelete = () => {
        const confirmDelete = window.confirm('Do you REALLY want to delete this?')

        if (confirmDelete) {
            fetch(`http://localhost:3001/activity/${id}`, {
                method: 'DELETE',
                mode: 'cors',
                headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            })
            .then((res) => {
                if (res.ok) {
                    alert('Activity deleted!')
                    window.location.reload()
                } else {
                    setStatus('failed to delete')
                }
            })
        } else {
            console.log('Delete action canceled')
        }
    }
    
    return(
        
            <button onClick={handleDelete}> Delete</button>
        
    );
}