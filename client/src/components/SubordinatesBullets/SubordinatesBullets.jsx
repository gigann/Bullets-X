import "./SubordinatesBullets.css";
import { useState, useEffect, useContext } from "react";
import { useLocalStorage } from "@uidotdev/usehooks";
import { useNavigate } from "react-router-dom";
import SubordinateContext from '../Context/SubordinateContext';


export default function SubordinatesBullets() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [subordinateData, setSubordinateData] = useState([]);
  const [subordinateAwards, setSubordinateAwards] = useState([]);
  const [subordinateAwardNames, setSubordinateAwardNames] = useState([]);
  const [subordinateBullets, setSubordinateBullets] = useState([]);
  const [newBullet, setNewBullet] = useState("");
  const [subordinateID, setSubordinateID] = useState(null);
  const [awardID, setAwardID] = useState(null);
  const [name, setName] = useState("");
  const [action, setAction] = useState("");
  const [impact, setImpact] = useState("");
  const [result, setResult] = useState("");
  const [loggedIn, setLoggedIn] = useLocalStorage("loggedIn");
  const {subordinateInfo, setSubordinateInfo} = useContext(SubordinateContext)
  const navigate = useNavigate();
  const [certainAward, setCertainAward] = useLocalStorage('certainAward')
  const [certainSubordinateID, setCertainSubordinateID] = useLocalStorage('certainSubordinateID')
  const [revisedHidden, setRevisedHidden] = useState(true)


  const userID = loggedIn?.id;

  const handleSetSubordinateID = (id, bulletName, awardID) => {
    // setSubordinateID(id);
    setName(bulletName)
    // setAwardID(awardID)
    // setMakeFormVisible(true)
    console.log("Selected Subordinate ID:", id);
    console.log("Selected Award ID:", awardID);
  };

  const backButton = () => {
    navigate(-1);
  };

  useEffect(() => {
    fetch(`http://localhost:3001/bullet/completed/${certainSubordinateID}/${certainAward}`)
      .then((res) =>  {
        if (!res.ok) {
        throw new Error("No bullets found for this user and award.");
      }
      return res.json();
    })
      .then(data => { setSubordinateInfo(data)})
  }, [certainSubordinateID, certainAward])

  const handleChangeStatus = (bulletID) => {
    fetch(`http://localhost:3001/bullet/${bulletID}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      status: "Supervisor Approved",
      drafting: true,
    }),
  })
  .then((res) => {
    if (!res.ok) {
      throw new Error("Failed to update status");
    }
    return res.json();
  })
  .catch((error) => {
    console.error("Error updating status:", error.message);
  });
};



  const handleAddBullet = () => {
    const emptyFieldsCheck = !action.trim() && !impact.trim() && !result.trim();
    if (emptyFieldsCheck) {
      alert("Please fill in the fields");
      return;
    }

    fetch(`http://localhost:3001/bullet`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user_id: certainSubordinateID,
        name: name,
        action: action,
        impact: impact,
        result: result,
        status: "Revised",
        drafting: true,
        award_id: certainAward,
      }),
    })
    .then((res) => res.json())
    .then(() => {
      const awardNamesPromises = subordinateAwards.map((awardInfo) =>
      fetch(`http://localhost:3001/bullet/users/${subordinateID}`)
      .then((res) => res.json())
      .then((data) => {
            setSubordinateBullets(data);
          }));
        setName("");
        setAction("");
        setImpact("");
        setResult("");
        setRevisedHidden(!revisedHidden)
      })
      .catch((err) => {
        console.log(err);
        alert("Error adding bullet");
      });
  };

  // if (loading) return <p>Loading...</p>;
  // if (error) return <p>Error: {error}</p>;
  // if (!Array.isArray(subordinateInfo) || subordinateInfo.length === 0)
  //   return <p>You have no subordinates</p>;

  useEffect(() => {
    if (!subordinateInfo || (Array.isArray(subordinateInfo) && subordinateInfo.length === 0)) {
      navigate(`/subordinates/${userID}`);

    }
  }, [subordinateInfo, userID, navigate]);

  return (
    <>
      {/* <button onClick={() => console.log()}>Console.log</button> */}
      <div className="subordinates-bullets-page-container">
          <div className={!revisedHidden ? "subordinate-bullet-card" : "" } hidden={revisedHidden}>

            <h3>Add a Revised Bullet</h3>

            <h3>Name:</h3>
            <input
              className = "name-suggestion"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              readOnly
            />
            <h3>Action:</h3>

            <input
              type="text"
              value={action}
              onChange={(e) => setAction(e.target.value)}
            />

            <h3>Impact:</h3>

            <input
              type="text"
              value={impact}
              onChange={(e) => setImpact(e.target.value)}
            />

            <h3>Result:</h3>
            <input
              type="text"
              value={result}
              onChange={(e) => setResult(e.target.value)}
            />

            <button onClick={handleAddBullet}>Add Bullet</button>
            {/* <button onClick={() => setMakeFormVisible(false)}>Cancel</button> */}
            <button hidden={revisedHidden} onClick={() => {setRevisedHidden(!revisedHidden)}} className="bullets-xbutton">X</button>
          </div>

      {!subordinateInfo || (Array.isArray(subordinateInfo) && subordinateInfo.length === 0) ? (
        <p className = "no-bullets-message">No completed bullets for this subordinate</p>
      ) : (
        subordinateInfo.map((bu, i) => (
          <div key={i} className="subordinate-bullet-card-ethan">
            <button
              className="suggest"
              onClick={() => {
                handleSetSubordinateID(bu.user_id, bu.award_name, bu.award_id);
                setName(bu.name)
                setAction(bu.action)
                setImpact(bu.impact)
                setResult(bu.result)
                setRevisedHidden(!revisedHidden)
              }}>Suggest</button>
              <button
              className = "approve"
              onClick ={() => {
                handleChangeStatus(bu.id);
                // navigate(`/subordinates/${userID}`)
                window.location.reload()
              }}>Approve</button>
            <p className="subordinate-bullet-title">
              {bu.name}
            </p>
            <p className="subordinate-bullet-section">
              <span className="subordinate-bullet-label">Action:</span>{" "}
              {bu.action}
            </p>
            <p className="subordinate-bullet-section">
              <span className="subordinate-bullet-label">Impact:</span>{" "}
              {bu.impact}
            </p>
            <p className="subordinate-bullet-section">
              <span className="subordinate-bullet-label">Result:</span>{" "}
              {bu.result}
            </p>
            <p className="subordinate-bullet-section">
              <span className="subordinate-bullet-label">Status:</span>{" "}
              {bu.status}
            </p>
          </div>
        ))
      )}
        {/* <button onClick={() => setRevisedHidden(!revisedHidden)}>Add Revised Bullet</button> */}
      <button onClick={backButton}>Back</button>
      </div>
    </>
  );
}
