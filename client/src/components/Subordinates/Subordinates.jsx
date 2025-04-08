import "./Subordinates.css";
import { useState, useEffect } from 'react';


function Subordinates() {
  const [readyForReview, setReadyForReview] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [subordinateData, setSubordinateData] = useState([]);

  const userID = 1;

  useEffect(() => {
    if (userID) {
        fetch(`http://localhost:3001/users/supervisor/${userID}`, )
        .then((res) => res.json())
        .then((data) => {
          console.log("Fetched items data:", data);
          setLoading(false)
          setSubordinateData(data)
        })
        .catch((error) => {
          setLoading(false);
          setError(error.message);
          console.error('Error fetching data:', error);
      });
    }
  }, [userID]);


  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!Array.isArray(subordinateData)) return <p>You have no subordinates</p>;

  return (
<>
  <div className="subordinates-page-container">
      <div className="subordinates-container">
        <div className="subordinate-item">
          <p className="subordinate-item-name-rank"></p>
          <p className="subordinate-title">Name</p>
          {subordinateData.map((sub, i) => (
            <p key={i} className="subordinate-name">
              {`${sub.first_name} ${sub.last_name}`}
            </p>
          ))}
        </div>

        <div className="subordinate-item">
          <p className="subordinate-item-name-rank"></p>
          <p className="subordinate-title">Rank</p>
          {subordinateData.map((sub, i) => (
            <p key={i} className="subordinate-rank">
              {sub.rank}
            </p>
          ))}
        </div>

        <div className="subordinate-item">
          <p className="subordinate-title">Awards Nominated</p>
          {subordinateData.map((sub, i) => (
            <p key={i} className="subordinate-awards-nominated">
              {/* {sub.profile_picture} */}
            </p>
          ))}
        </div>

        <div className="subordinate-item">
          <p className="subordinate-title">Ready For Review?</p>
          {subordinateData.map((_, i) => (
            <label key={i} className="subordinate-ready-for-review">
              <input type="checkbox" />
            </label>
          ))}
        </div>
      </div>
    </div>
</>
  );
}

export default Subordinates;