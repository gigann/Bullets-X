import {useState, useEffect} from 'react';

function Bullets() {
  const [bullets, setBullets] = useState([]);
  const [newBullet, setNewBullet] = useState('');
  const [loading, setLoading] = useState(true);

  const userID = 1

  useEffect(() => {
    fetch(`http://localhost:3001/bullet/users/${userID}`)
      .then(res => res.json())
      .then(data => {
        setBullets(data);
        setLoading(false);
      })
      .catch(err => {
        console.log(err);
        alert('Error fetching bullets');
      })

  }, [userID]);

  const handleAddBullet = () => {
    if (newBullet.trim()) {
      const updatedBullets = [...bullets, {description: newBullet}];
      setBullets(updatedBullets);
      setNewBullet('');
    }
  }

  const handleEditBullet = (id, newText) => {
    const updatedBullets = bullets.map(bullet => {
      if (bullet.id === id) {
        return {id:bullet.id, description: newText};
      }
      return bullet;
    });
    setBullets(updatedBullets);
  };

  const handleDeleteBullet = (id) => {
    const updatedBullets = bullets.filter(bullet => bullet.id !== id);
    setBullets(updatedBullets);
  }

  if (loading) return <p>Loading...</p>;
  if (!bullets.length) return <p>No bullets found.</p>;

  return (
    <div className="bullets-page-container">
      <div className="bullets-container">
        <h1>My Bullets</h1>
        <div className="bullets-list">
          {bullets.map(bullet => (
            <div key={bullet.id} className="bullet-item">
              <p>{bullet.description}</p>
              <button onClick={() => handleAddBullet()}>Add</button>
              <button onClick={() => handleEditBullet(bullet.id, prompt('New text:', bullet.description))}>Edit</button>
              <button onClick={() => handleDeleteBullet(bullet.id)}>Delete</button>
            </div>
          ))}
        </div>

      </div>
    </div>
  )

}


export default Bullets;