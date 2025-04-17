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
  const [awardStatusCounts, setAwardStatusCounts] = useState([]);
  const [readyToSubmitAwards, setReadyToSubmitAwards] = useState([]);

  const formatBulletText = (action, impact, result) => {
    return `${action}; ${impact} — ${result}`.trim();
  }

  const calculateCharacterCount = (action, impact, result) => {
    const formattedBulletText = formatBulletText(action, impact, result);
    return formattedBulletText.length;
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

  //fetching user's bullets
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

  //fetching Award Packages that they have been nominated for
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

  //fetching bullet status of "Complete" counts for each award
  useEffect(() => {
    if (userID) {
      fetch(`http://localhost:3001/bullet/status/${userID}`)
        .then(res => res.json())
        .then(data => {
          setAwardStatusCounts(data);
        })
        .catch(err => {
          console.log(err);
          alert('Error fetching award count');
        });
    }
  }, [userID]);

  //patch the status of the award to "Eligible to Submit" if count of "Supervisor Approved" bullets is >= bullet_minimum
  useEffect(() => {
    if (!userAwards || !userAwards.length) return;
    const awardsToUpdate = userAwards.filter(award => {
      const statusCount = awardStatusCounts.find(status => status.award_id === award.award_id);
      return (statusCount && statusCount.approved_status_count >= award.bullet_minimum && !readyToSubmitAwards.includes(award.award_id) && award.status !== 'Ready to Submit');
    })

    if (awardsToUpdate.length === 0) return;

    awardsToUpdate.forEach(award => {
      fetch(`http://localhost:3001/user_award/${award.award_id}`, {
        method: "PATCH",
        headers: {
          'Content-Type': 'application/json'},
        body: JSON.stringify({status: "Eligible to Submit Package"}),
      })
      .then(res => res.json())
      .then(updatedAwardStatus => {
        setReadyToSubmitAwards(prev => [...prev, award.award_id]);
        console.log("Award status updated:", updatedAwardStatus);
      })
      .catch(err => {
        console.error('Error updating award status:', err);
        alert('Error updating award status');
      })
    })
  }, [userAwards, awardStatusCounts]);

  const handleAddBullet = () => {
    const emptyFieldsCheck = (!action.trim() || !impact.trim() || !result.trim());
    if (emptyFieldsCheck) {
      alert('Please fill in the fields');
      return;
    }

    // const characterCount = calculateCharacterCount(action, impact, result);
    // if (characterCount > 115) {
    //   alert('Bullet exceeds 115 character limit. Please shorten your bullet.');
    //   return;
    // }

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

    // if (fieldName === "action" || fieldName === "impact" || fieldName === "result") {
    //   const currentBullet = bullets.find(bullet => bullet.id === id);
    //   if (currentBullet) {
    //     const updatedAction = fieldName === "action" ? newText : currentBullet.action;
    //     const updatedImpact = fieldName === "impact" ? newText : currentBullet.impact;
    //     const updatedResult = fieldName === "result" ? newText : currentBullet.result;

    //     const characterCount = calculateCharacterCount(updatedAction, updatedImpact, updatedResult);
    //     if (characterCount > 115) {
    //       alert('Bullet exceeds 115 character limit.');
    //     }
    //   }
    // }

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
      <div className="bullets-page-container">
        

        <table className="bullets-table">
          <thead>
            <tr>
              {/* <th>ID</th> */}
              <th>Name</th>
              <th>Description</th>
              <th>Last Updated</th>
              <th>Award Package</th>
              <th>Status</th>
              <th>Supervisor Viewable</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {bullets.map((bullet) => {
              const formattedDate = new Date(bullet.updated_at).toLocaleDateString() + " " + new Date(bullet.updated_at).toLocaleTimeString();
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
                        <p>{descriptionBulletPreview}</p>
                      </p>
                      <div className="character-counter">
                      <strong>Character Count:</strong>
                      <p>{calculateCharacterCount(bullet.action, bullet.impact, bullet.result)}/115 characters</p>
                      {calculateCharacterCount(bullet.action, bullet.impact, bullet.result) > 115 ? (
                        <span className="character-limit-exceeded"> (Exceeds recommended limit)</span>
                      ) : null}
                    </div>
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
              ) : (() => {
                const awardFound = userAwards.find(award => award.award_id === bullet.award_id);
                const statusCount = awardStatusCounts.find(status => status.award_id === bullet.award_id);
                if (awardFound && statusCount && statusCount.approved_status_count >= awardFound.bullet_minimum) {
                  return (
                  <span>
                    {awardFound.name} - Eligible to Submit Package
                  </span>
                  );
                } else {
                  return awardFound ? awardFound.name : "No award package assigned";
                }
              })();

              const statusElement = bullet.status
              //dropdown logic for statusElement
              // const statusElement = isEditing ? (
              //   <select
              //     value={bullet.status}
              //     onChange={(e) => handleEditBullet(bullet.id, "status", e.target.value)}
              //   >
              //     <option value="Drafting">Drafting</option>
              //     <option value="Supervisor Review">Supervisor Review</option>
              //     <option value="Returned">Returned</option>
              //     <option value="Supervisor Approved">Supervisor Approved</option>
              //   </select>
              // ) : (bullet.status);

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
                      style={{ background: "red" }}
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
            <h3>Preview: </h3>
            <p>{newBulletPreview || "(Your new bullet will appear here...)"}</p>
            <div className="character-counter">
              <h3> Character Count: </h3>
              <p>{calculateCharacterCount(action, impact, result)}/115 characters</p>
              {calculateCharacterCount(action, impact, result) > 115 ? (
                <span className="character-limit-exceeded"> (Exceeds recommended limit)</span>
              ) : null}
            </div>
          </div>
          <button onClick={handleAddBullet}>Add Bullet</button>
        </div>
        <button onClick={() => {setHiddenBullet(!hiddenBullet)}}>Add New Bullet</button>
      </div>

    </>
  );

}


export default Bullets;