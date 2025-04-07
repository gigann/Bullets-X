import './Activity.css';

export default function Activity() {
    
    return(
        <>
            <div className='activity-con'>
                <h2>My Activity</h2>
                
                <table >
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Date</th>
                            <th>Description</th>
                            <th>Changes</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td><input placeholder='Name'></input></td>
                            <td><input placeholder='Date format: YYYY-MM-DD'></input></td>
                            <td><input className='descrip' placeholder='Give a Description of your work!'></input></td>
                            <td><button>Add Activity!</button></td>
                            
                        </tr>
                        <tr>
                            <td>Example</td>
                            <td>Example</td>
                            <td>Example</td>
                            <td><button>Edit</button> <button>X</button></td>
                            
                        </tr>
                        
                    </tbody>
                </table>
            </div>
        </>
    )
}
