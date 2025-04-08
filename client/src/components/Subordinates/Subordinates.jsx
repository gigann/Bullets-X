import "./Subordinates.css";
import { useState, useEffect } from 'react';


function Subordinates() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [subordinateData, setSubordinateData] = useState([]);
  const [subordinateAwards, setSubordinateAwards] = useState([]);
  const [subordinateAwardNames, setSubordinateAwardNames] = useState([]);

  const userID = 1;

  useEffect(() => {
    if (userID) {
        fetch(`http://localhost:3001/users/supervisor/${userID}`, )
        .then((res) => res.json())
        .then((data) => {
          console.log("Fetched items data:", data);
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
    // const timeout = setTimeout(() => {
      if (Array.isArray(subordinateData) && subordinateData.length > 0) {
      const fetchAwards = async () => {
        try {
          const awardNamesPromises = subordinateAwards.map((awardInfo) =>
            fetch(`http://localhost:3001/award/${awardInfo.award_id}`)
              .then((res) => {
              if (!res.ok) {
                throw new Error(`Failed to fetch awards for award ID ${awardInfo.id}`);
              }
              return res.json();
            })
          );

          const awardNamesData = await Promise.all(awardNamesPromises);
          console.log("Fetched awards data:", awardNamesData);
          setSubordinateAwardNames(awardNamesData.flat());
          setLoading(false)
        } catch (error) {
          setError(error.message);
          setLoading(false);
        }
      };

      fetchAwards();
    }
  }, [subordinateAwards]);
// }, 1000);



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
          {subordinateData.map((ra, i) => (
            <p key={i} className="subordinate-rank">
              {ra.rank}
            </p>
          ))}
        </div>

        <div className="subordinate-item">
          <p className="subordinate-title">Awards Nominated</p>
          {subordinateAwardNames.map((aw, i) => (
          <p key={i} className="subordinate-awards-nominated">
            {aw.name}
          </p>
            ))}
        </div>

        <div className="subordinate-item">
          <p className="subordinate-title">Ready For Review?</p>
          {subordinateAwards.map((re, i) => (
            <label key={i} className="subordinate-ready-for-review">
            <input type = "checkbox"
              checked = {re?.status === "Submitted"}
              readOnly
            />
          </label>
            ))}
        </div>
        {/* <div className="subordinate-item">
          <p className="subordinate-title">Ready For Review?</p>
          {subordinateData.map((sub, i) => {
            const award = subordinateAwards.find((aw) => aw.user_id === sub.id);
              // console.log("blah", award)
            return (
            <label key={i} className="subordinate-ready-for-review">
              <input type = "checkbox"
                checked = {award?.status === "Submitted"}
                readOnly
              />
            </label>
            )
          })}
        </div> */}
      </div>
    </div>
</>
  );
}

export default Subordinates;