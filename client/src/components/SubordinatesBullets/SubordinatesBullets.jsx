import "./SubordinatesBullets.css";
import { useState, useEffect } from "react";
import { useLocalStorage } from "@uidotdev/usehooks";
import { useNavigate } from "react-router-dom";

export default function SubordinatesBullets() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [subordinateData, setSubordinateData] = useState([]);
  const [subordinateAwards, setSubordinateAwards] = useState([]);
  const [subordinateAwardNames, setSubordinateAwardNames] = useState([]);
  const [subordinateBullets, setSubordinateBullets] = useState([]);
  const [newBullet, setNewBullet] = useState("");
  const [action, setAction] = useState("");
  const [impact, setImpact] = useState("");
  const [result, setResult] = useState("");
  const [loggedIn, setLoggedIn] = useLocalStorage("loggedIn");
  const navigate = useNavigate();

  const backButton = () => {
    navigate(-1);
  };

  const userID = loggedIn?.id;

  useEffect(() => {
    if (!userID) {
      setLoading(false);
      setError("User not logged in.");
      return;
    }

    fetch(`http://localhost:3001/users/supervisor/${userID}`)
      .then((res) => res.json())
      .then((data) => {
        console.log("Fetched items data:", data);
        setSubordinateData(data);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        setError(error.message);
        console.error("Error fetching data:", error);
      });
  }, [userID]);

  useEffect(() => {
    if (Array.isArray(subordinateData) && subordinateData.length > 0) {
      const fetchAwards = async () => {
        try {
          const awardsPromises = subordinateData.map((subordinate) =>
            fetch(
              `http://localhost:3001/user_award/users/${subordinate.id}`
            ).then((res) => {
              if (!res.ok) {
                throw new Error(
                  `Failed to fetch awards for user ID ${subordinate.id}`
                );
              }
              return res.json();
            })
          );

          const awardsData = await Promise.all(awardsPromises);
          //console.log("subordinateData ID is this", subordinateData[0].id)
          console.log("Fetched ready for review data:", awardsData);
          setSubordinateAwards(awardsData.flat());
        } catch (error) {
          setError(error.message);
        }
      };

      fetchAwards();
    }
  }, [subordinateData]);
  // window.location.reload();

  useEffect(() => {
    if (Array.isArray(subordinateData) && subordinateData.length > 0) {
      const fetchBullets = async () => {
        try {
          const bulletsPromises = subordinateData.map((subordinate) =>
            fetch(
              `http://localhost:3001/bullet/completed/${subordinate.id}`
            ).then((res) => {
              if (!res.ok) {
                throw new Error(
                  `Failed to fetch awards for award ID ${awardInfo.id}`
                );
              }
              return res.json();
            })
          );

          const bulletsData = await Promise.all(bulletsPromises);
          console.log("Fetched awards data:", bulletsData);
          setSubordinateBullets(bulletsData.flat());
          setLoading(false);
        } catch (error) {
          setError(error.message);
          setLoading(false);
        }
      };

      fetchBullets();
    }
  }, [subordinateAwards]);

  useEffect(() => {
    // const timeout = setTimeout(() => {
    if (Array.isArray(subordinateData) && subordinateData.length > 0) {
      const fetchAwardNames = async () => {
        try {
          const awardNamesPromises = subordinateAwards.map((awardInfo) =>
            fetch(`http://localhost:3001/award/${awardInfo.award_id}`).then(
              (res) => {
                if (!res.ok) {
                  throw new Error(
                    `Failed to fetch awards for award ID ${awardInfo.id}`
                  );
                }
                return res.json();
              }
            )
          );

          const awardNamesData = await Promise.all(awardNamesPromises);
          console.log("Fetched awards data:", awardNamesData);
          setSubordinateAwardNames(awardNamesData.flat());
          setLoading(false);
        } catch (error) {
          setError(error.message);
          setLoading(false);
        }
      };

      fetchAwardNames();
    }
  }, [subordinateAwards]);
  // }, 1000);

  const handleAddBullet = () => {
    const emptyFieldsCheck = !action.trim() && !impact.trim() && !result.trim();
    if (emptyFieldsCheck) {
      alert("Please fill in the fields");
      return;
    }
    fetch("http://localhost:3001/bullet", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user_id: subordinateData[0].id,
        name: "New Bullet Added by Supervisor",
        action: action,
        impact: impact,
        result: result,
        status: "Drafting",
        drafting: true,
      }),
    })
      .then((res) => {
        setAction("");
        setImpact("");
        setResult("");
      })
      .catch((err) => {
        console.log(err);
        alert("Error adding bullet");
      });
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!Array.isArray(subordinateData) || subordinateData.length === 0)
    return <p>You have no subordinates</p>;

  return (
    <>
      <div className="subordinates-bullets-page-container">
        {subordinateBullets.map((bu, i) => (
          <div key={i} className="subordinate-bullet-card">
            <p className="subordinate-bullet-title">{bu.name}</p>
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
        ))}
        <div className="subordinate-bullet-card">
          <h2>Add a bullet for this member</h2>
          <h3>Action:</h3>

          <input
            type="text"
            value={action}
            className="new-bullet-input"
            onChange={(e) => setAction(e.target.value)}
          />

          <br></br>
          <h3>Impact:</h3>

          <input
            type="text"
            value={impact}
            className="new-bullet-input"
            onChange={(e) => setImpact(e.target.value)}
          />

          <br></br>
          <h3>Result:</h3>

          <input
            type="text"
            value={result}
            className="new-bullet-input"
            onChange={(e) => setResult(e.target.value)}
          />

          <br></br>
          <button onClick={handleAddBullet}>Add Bullet</button>
        </div>
        <button onClick={backButton}>Back</button>
      </div>
    </>
  );
}
