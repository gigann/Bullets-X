import "./Subordinates.css";
import { useState, useEffect } from 'react';


function Subordinates() {
  const [readyForReview, setReadyForReview] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [subordinateData, setSubordinateData] = useState([]);
  const [subordinateID, setSubordinateID] = useState([]);
  const [subordinateAwards, setSubordinateAwards] = useState([]);

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


  useEffect(() => {
    if (Array.isArray(subordinateData) && subordinateData.length > 0) {
      const fetchAwards = async () => {
        try {
          const awardsPromises = subordinateData.map((subordinate) =>
            fetch(`http://localhost:3001/user_award/users/${subordinate.id}`)
              .then((res) => {
              if (!res.ok) {
                throw new Error(`Failed to fetch awards for user ID ${subordinate.id}`);
              }
              return res.json();
            })
          );

          const awardsData = await Promise.all(awardsPromises);
          console.log("Fetched awards data:", awardsData);
          setSubordinateAwards(awardsData);
        } catch (error) {
          setError(error.message);
        }
      };

      fetchAwards();
    }
  }, [subordinateData]);

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
          {subordinateData.map((_, i) => (
            <p key={i} className="subordinate-awards-nominated">
              Hi
            </p>
          ))}
        </div>

        <div className="subordinate-item">
          <p className="subordinate-title">Ready For Review?</p>
          {subordinateData.map((sub, i) => {
            const award = subordinateAwards.find((aw) => aw.user_id === sub.id);
              console.log(award)
            return (
            <label key={i} className="subordinate-ready-for-review">
              <input type = "checkbox"
                checked = {award?.status === "Drafting"}
                readOnly
              />
            </label>
            )
          })}
        </div>
      </div>
    </div>
</>
  );
}

export default Subordinates;