import {useState, useEffect} from 'react';
import { useLocalStorage } from "@uidotdev/usehooks";

function Bullets() {
  const [loggedIn] = useLocalStorage('loggedIn');
  const userID = loggedIn.id;
  const [bullets, setBullets] = useState([]);
  const [newBullet, setNewBullet] = useState('');
  const [loading, setLoading] = useState(true);

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
    if (newBullet.trim()) {
      fetch('http://localhost:3001/bullet', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user_id: userID,
          name: 'New Bullet',
          description: newBullet,
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
        setNewBullet('');
      })
      .catch(err => {
        console.log(err);
        alert('Error adding bullet');
      });
    }
  };

  const handleEditBullet = (id, newText) => {
    const updatedBullets = bullets.map(bullet => {
      if (bullet.id === id) {
        return {id:bullet.id, description: newText};
      }
      return bullet;
    });
    setBullets(updatedBullets);

    const bulletToUpdate = bullets.find(bullet => bullet.id === id);
  if (bulletToUpdate) {
    fetch(`http://localhost:3001/bullet/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        user_id: userID,
        name: bulletToUpdate.name || 'Updated Bullet',
        description: newText,
        status: bulletToUpdate.status || 'Drafting',
        award_id: bulletToUpdate.award_id
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
  }
  };

  const handleDeleteBullet = (id) => {
    const updatedBullets = bullets.filter(bullet => bullet.id !== id);
    setBullets(updatedBullets);

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

  return (
    <div className="bullets-container">
      <div className="header">
        <h1>Bullets</h1>
      </div>

      <div className="add-bullet">
        <input
          type="text"
          value={newBullet}
          onChange={function (event) {
            setNewBullet(event.target.value);
          }}
          placeholder="Add a new bullet"
        />
        <button onClick={handleAddBullet}>Add</button>
      </div>

      <div className="bullet-list">
        <ul>
          {bullets.map(function (bullet) {
            return (
              <li key={bullet.id}>
                <input
                  type="text"
                  value={bullet.description}
                  onChange={function (event) {
                    handleEditBullet(bullet.id, event.target.value);
                  }}
                />
                <button onClick={function () {
                  handleDeleteBullet(bullet.id);
                }}>
                  Delete
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );

}


export default Bullets;