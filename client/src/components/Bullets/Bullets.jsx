import {useState, useEffect} from 'react';
import { useLocalStorage } from "@uidotdev/usehooks";

function Bullets() {
  const [loggedIn] = useLocalStorage('loggedIn');
  const userID = loggedIn.id;
  const [bullets, setBullets] = useState([]);
  const [newBullet, setNewBullet] = useState('');
  const [loading, setLoading] = useState(true);
  const [action, setAction] = useState('');
  const [impact, setImpact] = useState('');
  const [result, setResult] = useState('');
  // const combinedBulletText = `${action} — ${impact}; ${result}`.trim();


  useEffect(() => {
    // console.log("Login state:", loggedIn);
    // console.log("User ID:", userID);
    if (userID) {
      fetch(`http://localhost:3001/bullet/users/${userID}`)
        .then(res => res.json())
        .then(data => {
          setBullets(data);
          setLoading(false);
        })
        .catch(err => {
          console.log(err);
          setLoading(false);
          alert('Error fetching bullets');
        });
    } else {
      setLoading(false);
    }
  }, [userID]);

  const handleAddBullet = () => {
    const emptyFieldsCheck = (!action.trim() && !impact.trim() && !result.trim());
    if (emptyFieldsCheck) {
      alert('Please fill in the fields');
      return;
    }
    fetch('http://localhost:3001/bullet', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        user_id: userID,
        name: 'New Bullet',
        action: action,
        impact: impact,
        result: result,
        status: 'Drafting'
      }),
    })
    .then(res => res.json())
    .then(() => {
      fetch(`http://localhost:3001/bullet/users/${userID}`)
        .then(res => res.json())
        .then(data => {
          setBullets(data);
        });
      setAction('');
      setImpact('');
      setResult('');
    })
    .catch(err => {
      console.log(err);
      alert('Error adding bullet');
    });
  }

  const handleEditBullet = (id, fieldName, newText) => {
    setBullets(prevBullets => {
      return prevBullets.map(bullet => {
        if (bullet.id === id) {
          return {...bullet, [fieldName]: newText};
        }
        return bullet;
      })
    });

    fetch(`http://localhost:3001/bullet/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        user_id: userID,
        [fieldName]: newText,
      }),
    })
    .then(res => {
      if (!res.ok) {
        throw new Error('Failed to update bullet');
      }
      return res.json();
    })
    .catch(err => {
      console.error('Error updating bullet:', err);
      alert('Error updating bullet. Changes may not be saved.');
    });

  };

  const handleDeleteBullet = (id) => {
    setBullets(prevBullets => prevBullets.filter(bullet => bullet.id !== id));

    fetch(`http://localhost:3001/bullet/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      }
    })
    .then(res => {
      if (!res.ok) {
        throw new Error('Failed to delete bullet');
      }
      return res.json();
    })
    .catch(err => {
      console.error('Error deleting bullet:', err);
      alert('Error deleting bullet. It may not be removed from the database.');
      fetch(`http://localhost:3001/bullet/users/${userID}`)
        .then(res => res.json())
        .then(data => {
          setBullets(data);
        });
    });
  }

  if (loading) return <p>Loading...</p>;
  if (!userID) return <p>Please log in to add bullets</p>;

  const newBulletPreview = `${action} — ${impact}; ${result}`.trim();

  return (
    <div className="bullets-container">
      <h2>New Bullet</h2>
      <div className="bullet-inputs">
        <label>
          Action:
          <input type="text" value={action} onChange={(e) => setAction(e.target.value)} />
        </label>
        <label>
          Impact:
          <input type="text" value={impact} onChange={(e) => setImpact(e.target.value)} />
        </label>
        <label>
          Result:
          <input type="text" value={result} onChange={(e) => setResult(e.target.value)} />
        </label>
      </div>
      <div className="live-preview">
        {/* <h3>New Bullet</h3> */}
        <p>{newBulletPreview || "(Your new bullet will appear here...)"}</p>
      </div>
      <button onClick={handleAddBullet}>Add Bullet</button>
      <h1>My Bullets</h1>
      <table className="bullets-table">
        <thead>
          <tr>
            <th>Action</th>
            <th>Impact</th>
            <th>Result</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {bullets.map((bullet) => (
            <tr key={bullet.id}>
              <td>
                <input
                  type="text"
                  value={bullet.action}
                  onChange={(e) => handleEditBullet(bullet.id, "action", e.target.value)}
                />
              </td>
              <td>
                <input
                  type="text"
                  value={bullet.impact}
                  onChange={(e) => handleEditBullet(bullet.id, "impact", e.target.value)}
                />
              </td>
              <td>
                <input
                  type="text"
                  value={bullet.result}
                  onChange={(e) => handleEditBullet(bullet.id, "result", e.target.value)}
                />
              </td>
              <td>
                <button onClick={() => handleDeleteBullet(bullet.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

}


export default Bullets;