import "./Subordinates.css";
import { useState, useEffect, useContext } from 'react';
import { useLocalStorage } from "@uidotdev/usehooks";
import { Link } from 'react-router-dom';
import SubordinateContext from '../Context/SubordinateContext';


function Subordinates() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [subordinateData, setSubordinateData] = useState([]);
  const [subordinateAwards, setSubordinateAwards] = useState([]);
  const [subordinateAwardNames, setSubordinateAwardNames] = useState([]);
  const [loggedIn, setLoggedIn] = useLocalStorage("loggedIn");
  const {subordinateInfo, setSubordinateInfo} = useContext(SubordinateContext)
  const [certainAward, setCertainAward] = useLocalStorage('certainAward')
  const [certainSubordinateID, setCertainSubordinateID] = useLocalStorage('certainSubordinateID')

  const userID = loggedIn?.id;

  // useEffect(() => {
  //   const awardsPromises = subordinateData.map((subordinate) =>
  //     const awardNamesPromises = subordinateAwards.map((awardInfo) =>
  //   fetch(`http://localhost:3001/bullet/completed/${subordinate.id}/${awardInfo.award_id}`)
  //     .then((res) =>  {
  //       if (!res.ok) {
  //       throw new Error("No bullets found for this user and award.");
  //     }
  //     return res.json();
  //   })
  //     .then(data => { setSubordinateInfo(data)})
  // }, [certainSubordinateID, certainAward])

  useEffect(() => {
    if (Array.isArray(subordinateData) && subordinateData.length > 0 && subordinateAwards.length > 0) {
      const fetchBulletsForSubordinates = async () => {
        try {
          const bulletsPromises = subordinateData.map((subordinate) => {
            const awardsForSubordinate = subordinateAwards.filter(
              (awardInfo) => awardInfo.user_id === subordinate.id
            );

            return Promise.allSettled(
              awardsForSubordinate.map((awardInfo) =>
                fetch(`http://localhost:3001/bullet/completed/${subordinate.id}/${awardInfo.award_id}`)
                  .then((res) => {
                    if (!res.ok) {
                      throw new Error(`No bullets found for user ID ${subordinate.id} and award ID ${awardInfo.award_id}`);
                    }
                    return res.json();
                  })
              )
            );
          });

          const bulletsData = await Promise.all(bulletsPromises);

          // Collect only the fulfilled results
          const successfulBullets = bulletsData.flat().filter((result) => result.status === "fulfilled").map((result) => result.value);

          setSubordinateInfo(successfulBullets.flat());
        } catch (error) {
          console.error("Error fetching bullets:", error.message);
        }
      };

      fetchBulletsForSubordinates();
    }
  }, [subordinateData, subordinateAwards]);

  useEffect(() => {
    if (!userID) {
      setLoading(false);
      setError("User not logged in.");
      return;
    }

    fetch(`http://localhost:3001/users/supervisor/${userID}`,)
      .then((res) => res.json())
      .then((data) => {
        // console.log("Fetched subordinates data:", data);
        setSubordinateData(data)
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        setError(error.message);
        // console.error('Error fetching data:', error);
      });
  }, [userID]);


  useEffect(() => {
    if (Array.isArray(subordinateData) && subordinateData.length > 0) {
      const fetchAwards = async () => {
        console.log("awards fetch")
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
          // console.log("Fetched ready for review data:", awardsData);
          setSubordinateAwards(awardsData.flat());
        } catch (error) {
          setError(error.message);
        }
      };

      fetchAwards();
    }
  }, [subordinateData]);

  useEffect(() => {
    // const timeout = setTimeout(() => {
    if (Array.isArray(subordinateData) && subordinateData.length > 0 && subordinateAwards.length > 0) {
      const fetchAwardNames = async () => {
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
          // console.log("Fetched awards data:", awardNamesData);
          setSubordinateAwardNames(awardNamesData.flat());
          setLoading(false)
        } catch (error) {
          setError(error.message);
          setLoading(false);
        }
      };

      fetchAwardNames();
    }
  }, [subordinateAwards]);
  // }, 1000);



// useEffect(() => {
//   if (Array.isArray(subordinateData) && subordinateData.length > 0) {
//     const fetchBulletsForSubordinates = async (subordinateId) => {
//       console.log(`Fetching bullets for subordinate ID: ${subordinateId}`)
//       try {
//         const awardsForSubordinate = subordinateAwards.filter((award) => award.user_id === subordinateId);

//         const bulletsPromises = awardsForSubordinate.map((award) =>
//           fetch(`http://localhost:3001/bullet/completed/${subordinateId}/${award.award_id}`)
//             .then((res) => {
//               if (!res.ok) {
//                 throw new Error(`Failed to fetch bullets for user ID ${subordinateId} and award ID ${award.award_id}`);
//               }
//               return res.json();
//             })
//         );

//         const bulletsData = await Promise.all(bulletsPromises);
//         console.log(`Fetched bullets for subordinate ID ${subordinateId}:`, bulletsData);
//         setSubordinateInfo((prevInfo) => [...prevInfo, ...bulletsData.flat()]);
//       } catch (error) {
//         console.error("Error fetching bullets:", error.message);
//         setError(error.message);
//         setLoading(false);
//       }
//     };
//   }
// }, [subordinateData, subordinateAwards, setSubordinateInfo]);


  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!Array.isArray(subordinateData) || subordinateData.length === 0)
    return <p>You have no subordinates</p>;

  return (
    <>
      <h2 className="page-title">Subordinates</h2>
      <div className="subordinates-page-container">
  <div className="subordinates-table">
    <div className="subordinate-header">
      <p>Name</p>
      <p>Rank</p>
      <p>Awards Nominated</p>
      <p>Needs Review</p>
      <p>Eligible to Submit?</p>
    </div>
    {subordinateData.map((sub, i) => {
      const userAwards = subordinateAwards.filter((award) => award.user_id === sub.id);
      return (
        <div key={i} className="subordinate-row">
          <p className="subordinate-name">{`${sub.first_name} ${sub.last_name}`}</p>
          <p className="subordinate-rank">{sub.rank}</p>
          <div className="subordinate-awards-wrapper">
            {userAwards.map((award, j) => {
              const awardName = subordinateAwardNames.find((aw) => aw.id === award.award_id);
              const linkStuff = subordinateInfo.some((info) => info.user_id === sub.id && info.award_id === award.award_id);
              return (
                <p key={j} className="subordinate-awards-nominated">
                  {linkStuff && awardName ? (
                    <Link
                      to={`/subordinates/bullet/${sub.id}`}
                      onClick={() => {
                        setCertainAward(award.award_id);
                        setCertainSubordinateID(award.user_id);
                      }}
                    >
                      {awardName.name}
                    </Link>
                  ) : (
                    awardName?.name
                  )}
                </p>
              );
            })}
          </div>

          {/* <div className="subordinate-status-wrapper">
          {userAwards.map((award, k) => (
          <div key={k} className="subordinate-status">
            <p>{award.status}</p>
          </div>
          ))}
        </div> */}

      <div className="subordinate-review-wrapper">
        {userAwards.map((award, k) => {
          const hasSupervisorReviewBullets = subordinateInfo.some(
            (info) =>
              info.user_id === sub.id &&
              info.award_id === award.award_id &&
              info.status === "Supervisor Review"
          );

          return (
            <label key={k} className="subordinate-ready-for-review">
              <input
                type="checkbox"
                className="subordinate-checkbox"
                checked={hasSupervisorReviewBullets}
                readOnly
              />
              <label className="subordinate-checkbox-label" htmlFor="award-checkbox"></label>
            </label>
          );
        })}
      </div>

          <div className="subordinate-review-wrapper">
            {userAwards.map((award, k) => (
              <label key={k} className="subordinate-eligible-for-submit">
                <input
                  type="checkbox"
                  className="subordinate-checkbox"
                  checked={award?.status === "Eligible to Submit"}
                  readOnly
                />
                <label className="subordinate-checkbox-label" htmlFor="award-checkbox"></label>
              </label>
            ))}
          </div>
        </div>
      );
    })}
  </div>
</div>

    </>
  );
}

export default Subordinates;