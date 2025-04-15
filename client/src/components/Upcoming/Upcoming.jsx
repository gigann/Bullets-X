import { useEffect, useState } from "react";
import "./Upcoming.css";
import { useLocalStorage } from "@uidotdev/usehooks";
// data needed for this page
// award table for most data
// bullet table (filter by award id)
// user_award table for status

function Upcoming() {

  const [loggedIn, setLoggedIn] = useLocalStorage("loggedIn");
  const [awardName, setAwardName] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState(null);
  const [bulletMin, setBulletMin] = useState(null);
  const [bulletMax, setBulletMax] = useState(null);
  const [hiddenAward, setHiddenAward] = useState(false);
  const [awardData, setAwardData] = useState([]);
  const [userAwardData, setUserAwardData] = useState([]);
  const [bulletData, setBulletData] = useState([]);


  const [tableData, setTableData] = useState();

  useEffect(() => {
    fetch(`http://localhost:3001/award/`)
      .then((res) => res.json())
      .then((data) => setAwardData(data));
  }, []);

  //add new award
  const handleAddAward = () => {
    const emptyFieldsCheck = !awardName.trim() || !description.trim();
    if (emptyFieldsCheck) {
      alert("Please fill in the fields");
      return;
    }

    fetch("http://localhost:3001/award", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: awardName.trim() || "New Award",
        description: description,
        due_date: dueDate || "2030-01-01",
        bullet_minimum: bulletMin || 0,
        bullet_maximum: bulletMax || 100,
      }),
    })
      .then((res) => res.json())
      .then(() => {
        fetch(`http://localhost:3001/award`)
          .then((res) => res.json())
          .then((data) => {
            console.log("Award added successfully:", data);
            setAwardData(data);
          });
        setAwardName("");
        setDescription("");
        setDueDate(null);
        setBulletMin(0);
        setBulletMax(0);
        setHiddenAward(false);
      })
      .catch((err) => {
        console.log(err);
        alert("Error adding award");
      });
  };

  // for status of awards
  useEffect(() => {
    fetch(`http://localhost:3001/user_award/`)
      .then((res) => res.json())
      .then((data) => setUserAwardData(data));
  }, []);

  // for user bullets
  useEffect(() => {
    fetch(`http://localhost:3001/bullet/users/${loggedIn.id}`)
      .then((res) => res.json())
      .then((data) => setBulletData(data));
  }, []);

  // update table data
  useEffect(() => {
    let newTableData = [];

    // iterate through award data and add relevant data to the table.
    for (let i in awardData) {
      let newRow = [
        awardData[i].name,
        awardData[i].description,
        awardData[i].bullet_minimum,
        awardData[i].bullet_maximum,
        new Date(awardData[i].due_date).toLocaleDateString(),
      ];

      // for (let j in userAwardData) {
      //   if (awardData[i].id === userAwardData[j].award_id) {
      //     newRow.push(userAwardData[j].status);
      //     break;
      //   }
      // }

      // add bullets assigned to this award
      // let bullets = [];

      // for (let k in bulletData) {
      //   if (awardData[i].id === bulletData[k].award_id) {
      //     bullets.push(bulletData[k]);
      //   }
      // }
      // newRow.push(bullets);

      newTableData.push(newRow);
    }

    setTableData(newTableData);
  }, [awardData, bulletData, userAwardData]);

  const isSelected = (awardId) => {
    const userAwards = userAwardData.filter(
      (userAward) => userAward.user_id === loggedIn.id
    );
  
    return userAwards.some((userAward) => userAward.award_id === awardId);
  };

  const handleSelect = (i) => {
    let request = {
      user_id: loggedIn.id,
      award_id: awardData[i].id,
      status: "Drafting",
    };
    fetch("http://localhost:3001/user_award", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(request),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.message) {
          alert(data.message);
        }
      })
      .catch((err) => console.log(err));
      window.location.reload()
  };

  const handleDelete = (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this award?"
    );

    if (!confirmDelete) {
      return;
    }

    setAwardData((prevAwards) => prevAwards.filter((award) => award.id !== id));

    fetch(`http://localhost:3001/award/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to delete award");
        }
        return res.json();
      })
      .catch((err) => {
        console.error("Error deleting award:", err);
        alert("Error deleting award. It may not be removed from the database.");
        fetch(`http://localhost:3001/award`)
          .then((res) => res.json())
          .then((data) => {
            setAwardData(data);
          });
      });
  };

  return (
    <>
      <h2 className="page-title">Upcoming Awards</h2>
      <div className="award-page">
        <div
          className={hiddenAward ? "subordinate-bullet-card" : ""}
          hidden={!hiddenAward}
        >
          <h2>New Award</h2>{" "}
          <button
            onClick={() => {
              setHiddenAward(!hiddenAward);
            }}
            className="bullet-exitbutton"
          >
            X
          </button>
          <h3>Name:</h3>
          <input
            type="text"
            value={awardName}
            onChange={(e) => setAwardName(e.target.value)}
          />
          <h3>Description:</h3>
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <h3>Due Date:</h3>
          <input
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
          />
          <h3>Bullet Min:</h3>
          <input
            type="number"
            value={bulletMin}
            onChange={(e) => setBulletMin(e.target.value)}
          />
          <h3>Bullet Max:</h3>
          <input
            type="number"
            value={bulletMax}
            onChange={(e) => setBulletMax(e.target.value)}
          />
          <h3 style={{ color: "red" }}>
            WARNING: As a designated administrator, you have been given access
            to add and remove awards to and from the database. These awards will
            be viewable by all users. Therefore, please look over the
            information in this award before you submit. You will not be able to
            change an award once it has been submitted.
          </h3>
          <button onClick={handleAddAward}>Submit</button>
        </div>

        {
          tableData !== undefined ? (
            <table className="award-table">
              <thead className="award-thead">
                <tr className="award-tr">
                  <th className="award-th">Name</th>
                  <th className="award-th">Description</th>
                  <th className="award-th">Min Bullets</th>
                  <th className="award-th">Max Bullets</th>
                  <th className="award-th">Due Date</th>
                  {/* <th className='award-th'>Status</th> */}
                  <th className="award-th">Interested</th>
                  <th
                    className={loggedIn.admin ? "award-th" : ""}
                    hidden={!loggedIn.admin}
                  >
                    ADMIN
                  </th>
                </tr>
              </thead>
              <tbody className="award-tbpdy">
                {tableData.map((row, i) => (
                  <tr className="award-tr" key={i}>
                    {row.map((item, j) => {
                      switch (j) {
                        case 0:
                          return (
                            <td className="award-td" key={j}>
                              {row[6]?.length > 0 ? (
                                <details className="award-details">
                                  <summary>{item}</summary>
                                  Your Assigned Bullets:
                                  <ul>
                                    {row[6].map((bullet, k) => (
                                      <li key={k}>{bullet.name}</li>
                                    ))}
                                  </ul>
                                </details>
                              ) : (
                                <p>{item}</p>
                              )}
                            </td>
                          );
                        case 6:
                          return null;
                        default:
                          return (
                            <td className="award-td" key={j}>
                              {item}
                            </td>
                          );
                      }
                    })}
                    <td className='award-td' id='award-button'>
                           {awardData[i]?.id && isSelected(awardData[i]?.id) ? (
                     <span className='selected-text'>Selected</span>
                   ) : (
                     <button
                       onClick={() => handleSelect(i)}
                       className='interested-button'
                     >
                       Select
                     </button>
                   )}
                     </td>
                    <td className="award-td" id="award-button">
                      <button
                        key={i}
                        style={{ background: "red" }}
                        onClick={() => handleDelete(i)}
                        className={loggedIn.admin ? "interested-button" : ""}
                        hidden={!loggedIn.admin}
                      >
                        DELETE
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : null
          // loading spinner could go here
        }

        {/* this could be its own component */}
        {/* <div className='upcoming-awards'>
        <h3>Upcoming Awards</h3>
        <div className='award-card'>
          <input className='award-checkbox' type='checkbox' />
          <h3>Award #1</h3>
        </div>
        <div className='award-card'>
          <h3>Award #2</h3>
          <span>April 2025</span>
        </div>
        <div className='award-card'>
          <h3>Award #3</h3>
          <span>April 2025</span>
        </div>
        <div className='award-card'>
          <h3>Award #4</h3>
          <span>April 2025</span>
        </div>
        <div className='award-card'>
          <h3>Award #5</h3>
          <span>April 2025</span>
        </div>
      </div> */}
        <button
          style={loggedIn && loggedIn.admin ? {} : { display: "none" }}
          onClick={() => {
            setHiddenAward(!hiddenAward);
          }}
        >
          Add New Award
        </button>
      </div>
    </>
  );
}

export default Upcoming;

// TODO
// sorting table
// adding assigned bullets in dropdowns (details)

// conditional btn:
// style={loggedIn && loggedIn.admin ? { display: 'none' } : {}}
