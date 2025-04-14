import {useState, useEffect} from 'react';
import { useLocalStorage } from "@uidotdev/usehooks";
import "./Bullets.css";
import "../SubordinatesBullets/SubordinatesBullets.css";


function Bullets() {
  const [loggedIn] = useLocalStorage('loggedIn');
  const userID = loggedIn.id;
  const [bullets, setBullets] = useState([]);
  const [newBulletAward, setNewBulletAward] = useState(null);
  const [loading, setLoading] = useState(true);
  const [bulletName, setBulletName] = useState('');
  const [action, setAction] = useState('');
  const [impact, setImpact] = useState('');
  const [result, setResult] = useState('');
  const [editingBulletId, setEditingBulletId] = useState(null);
  const [userAwards, setUserAwards] = useState([]);
  const [hiddenBullet, setHiddenBullet] = useState(false)

  const formatBulletText = (action, impact, result) => {
    return `${action} — ${impact}; ${result}`.trim();
  }

  const handleCopyBullet = (bulletText) => {
    navigator.clipboard.writeText(bulletText)
      .then(() => {
        alert('Bullet copied to clipboard');
      })
      .catch(err => {
        console.error('Failed to copy text:', err);
        alert('Failed to copy bullet to clipboard');
      });
  }


  useEffect(() => {
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

  useEffect(() => {
    if (userID) {
      fetch(`http://localhost:3001/user_award/${userID}/awards`)
        .then(res => res.json())
        .then(data => {
          setUserAwards(data);
          setLoading(false);
        })
        .catch(err => {
          console.log(err);
          setLoading(false);
          alert('Error fetching user awards');
        });
    } else {
      setLoading(false);
    }
  }, [userID]);

  const handleAddBullet = () => {
    const emptyFieldsCheck = (!action.trim() || !impact.trim() || !result.trim());
    if (emptyFieldsCheck) {
      alert('Please fill in the fields');
      return;
    }

    const awardId = newBulletAward || (userAwards.length > 0 ? userAwards[0].award_id : null);

    if (!awardId) {
      alert('You need to have at least one award package available to add a bullet.');
      return;
    }

    fetch('http://localhost:3001/bullet', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        user_id: userID,
        name: bulletName.trim() || 'New Bullet',
        action: action,
        impact: impact,
        result: result,
        status: 'Drafting',
        drafting: true,
        award_id: awardId
      }),
    })
    .then(res => res.json())
    .then(() => {
      fetch(`http://localhost:3001/bullet/users/${userID}`)
        .then(res => res.json())
        .then(data => {
          console.log("Bullet added successfully:", data);
          setBullets(data);
        });
      setBulletName('');
      setAction('');
      setImpact('');
      setResult('');
      setNewBulletAward(null);
    })
    .catch(err => {
      console.log(err);
      alert('Error adding bullet');
    });
  }

  const handleEditBullet = (id, fieldName, newText) => {
    let updateData = {
      user_id: userID,
      [fieldName]: newText,
    }

    if (fieldName === "drafting" && newText === false) {
      updateData.status = "Supervisor Review";
      console.log('Changing status to Supervisor Review. Drafting has been set to false.');
    }

    setBullets(prevBullets => {
      return prevBullets.map(bullet => {
        if (bullet.id === id) {
          if (fieldName === "drafting" && newText === false) {
            return {...bullet, [fieldName]: newText, status: "Supervisor Review"};
          }
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
      body: JSON.stringify(updateData),
    })
    .then(res => {
      if (!res.ok) {
        throw new Error('Failed to update bullet');
      }
      return res.json();
    })
    .then(data => {
      console.log('Bullet updated successfully:', id, updateData);
      return fetch(`http://localhost:3001/bullet/users/${userID}`);
    })
    .then(res => res.json())
    .then(data => {
      setBullets(data);
    })
    .catch(err => {
      console.error('Error updating bullet:', err);
      alert('Error updating bullet. Changes may not be saved.');
    });

  };

  const handleDeleteBullet = (id) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this bullet?');

    if (!confirmDelete) {
      return;
    }

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
  };

  const toggleEdit = (id) => {
    if (editingBulletId === id) {
      setEditingBulletId(null);
    } else {
      setEditingBulletId(id);
    }
  }

  if (loading) return <p>Loading...</p>;
  if (!userID) return <p>Please log in to add bullets</p>;

  const newBulletPreview = formatBulletText(action, impact, result);

  return (
    <>
      <h2 className="page-title">My Bullets</h2>
      <div className="subordinates-bullets-page-container">
        <div className={hiddenBullet ? "subordinate-bullet-card" : "" } hidden={!hiddenBullet}>

              <h2>New Bullet</h2> <button onClick={() => {setHiddenBullet(!hiddenBullet)}} className='bullet-exitbutton'>X</button>

              <h3>Name:</h3>
              <input
                type="text"
                value={bulletName}
                onChange={(e) => setBulletName(e.target.value)}
              />
              <h3>Action:</h3>
              <input
                type="text"
                value={action}
                onChange={(e) => setAction(e.target.value)} />

              <h3>Impact:</h3>
              <input
                type="text"
                value={impact}
                onChange={(e) => setImpact(e.target.value)} />

              <h3>Result:</h3>
              <input
                type="text"
                value={result}
                onChange={(e) => setResult(e.target.value)} />

              <h3>Tagged Package:</h3>
              {userAwards.length > 0 ? (
                <select
                  value={newBulletAward || ""}
                  onChange={(e) => setNewBulletAward(parseInt(e.target.value))}
                >
                  {userAwards.map(award => (
                    <option key={award.award_id} value={award.award_id}>
                      {award.name}
                    </option>
                  ))}
                </select>
              ) : (
                <p>No award packages available. Please add an award package first.</p>
              )}

          <div className="live-preview">
            <h3>Preview: {newBulletPreview || "(Your new bullet will appear here...)"}</h3>
          </div>
          <button onClick={handleAddBullet}>Add Bullet</button>
        </div>

        <table className="bullets-table">
          <thead>
            <tr>
              {/* <th>ID</th> */}
              <th>Name</th>
              <th>Description</th>
              <th>Last Updated</th>
              <th>Award Package</th>
              <th>Status</th>
              <th>Submit for Review</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {bullets.map((bullet) => {
              const formattedDate = new Date(bullet.updated_at).toLocaleDateString();
              const isEditing = bullet.id === editingBulletId;
              const descriptionBulletPreview = formatBulletText(bullet.action, bullet.impact, bullet.result);
              const nameElement = isEditing ? (
                    <input
                      type="text"
                      value={bullet.name}
                      onChange={(e) => handleEditBullet(bullet.id, "name", e.target.value)}
                    />
                  ) : bullet.name;
              const descriptionElement = isEditing ? (
                    <>
                      <div className="bullet-edit-fields">
                        <div className="edit-field">
                          <label htmlFor={`action-${bullet.id}`}>Action:</label>
                          <input
                            id={`action-${bullet.id}`}
                            type="text"
                            value={bullet.action}
                            onChange={(e) => handleEditBullet(bullet.id, "action", e.target.value)}
                          />
                        </div>
                        <div className="edit-field">
                          <label htmlFor={`impact-${bullet.id}`}>Impact:</label>
                          <input
                            id={`impact-${bullet.id}`}
                            type="text"
                            value={bullet.impact}
                            onChange={(e) => handleEditBullet(bullet.id, "impact", e.target.value)}
                          />
                        </div>
                        <div className="edit-field">
                          <label htmlFor={`result-${bullet.id}`}>Result:</label>
                          <input
                            id={`result-${bullet.id}`}
                            type="text"
                            value={bullet.result}
                            onChange={(e) => handleEditBullet(bullet.id, "result", e.target.value)}
                          />
                        </div>
                      </div>
                      <p>
                        <strong>Preview:</strong>{" "}
                        {descriptionBulletPreview}
                      </p>
                    </>
                  ) : descriptionBulletPreview;

              const awardElement = isEditing ? (
                userAwards.length > 0 ? (
                  <select
                    value={bullet.award_id || userAwards[0].award_id}
                    onChange={(e) => handleEditBullet(bullet.id, "award_id", parseInt(e.target.value))}
                  >
                    {userAwards.map(award => (
                      <option key={award.award_id} value={award.award_id}>
                        {award.name}
                      </option>
                    ))}
                  </select>
                ) : (
                  <p>No award packages available</p>
                )
              ) : (userAwards.find(award => award.award_id === bullet.award_id)?.name || "No award package assigned");

              const statusElement = isEditing ? (
                <select
                  value={bullet.status || "Status"}
                  onChange={(e) => handleEditBullet(bullet.id, "status", e.target.value)}
                >
                  <option value="Drafting">Drafting</option>
                  <option value="Supervisor Review">Supervisor Review</option>
                  <option value="Returned">Returned</option>
                  <option value="Supervisor Approved">Supervisor Approved</option>
                </select>
              ) : (bullet.status || "Status");

              const submitForReviewElement = isEditing ? (
                <input
                  type="checkbox"
                  checked={!bullet.drafting}
                  onChange={(e) => handleEditBullet(bullet.id, "drafting", !e.target.checked)}
                />
              ) : (!bullet.drafting ? "Yes" : "No");

              return (
                <tr key={bullet.id}>
                  {/* <td>{bullet.id}</td> */}
                  <td>{nameElement}</td>
                  <td>{descriptionElement}</td>
                  <td>{formattedDate}</td>
                  <td>{awardElement}</td>
                  <td>{statusElement}</td>
                  <td>{submitForReviewElement}</td>
                  <td>
                    <button
                      onClick={() => toggleEdit(bullet.id)}
                      className={isEditing ? "btn-done" : "btn-edit"}
                    >
                      {isEditing ? "Done" : "Edit"}
                    </button>
                    <button
                      onClick={() => handleCopyBullet(descriptionBulletPreview)}
                      className="btn-copy"
                    >
                      Copy
                    </button>
                    <button
                      onClick={() => handleDeleteBullet(bullet.id)}
                      className="btn-delete"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <button onClick={() => {setHiddenBullet(!hiddenBullet)}}>Add New Bullet</button>
      </div>

    </>
  );

}


export default Bullets;