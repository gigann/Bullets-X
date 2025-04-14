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

  const fetchBulletsForSubordinates = async (subordinateId) => {

    console.log(`Fetching bullets for subordinate ID: ${subordinateId}`)
      try {
        console.log("subordinate awards", subordinateAwards)
        const awardsForSubordinate = subordinateAwardNames.filter((award) => award.user_id === subordinateId);
        console.log("Awards for Subordinate: ", awardsForSubordinate)


        const bulletsPromises = awardsForSubordinate.map((award) =>
          fetch(`http://localhost:3001/bullet/completed/${subordinateId}/${award.id}`)
            .then((res) => {
              if (!res.ok) {
                console.log(subordinateId, award.award_id)
                throw new Error(`Failed to fetch bullets for user ID ${subordinateId} and award ID ${award.award_id}`);
              }
              return res.json();
            })
        );

        const bulletsData = await Promise.all(bulletsPromises);
        console.log(`Fetched bullets for subordinate ID ${subordinateId}:`, bulletsData);
        setSubordinateInfo((prevInfo) => [...prevInfo, ...bulletsData.flat()]);
      } catch (error) {
        console.error("Error fetching bullets:", error.message);
        setError(error.message);
        setLoading(false);
      }
  }

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
  // window.location.reload();

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
      <button onClick={() => console.log(subordinateInfo)}>Console log</button>
      <h2 className="page-title">Subordinates</h2>
      <div className="subordinates-page-container">
        <div className="subordinates-container">
          <div className="subordinate-item">
            <p className="subordinate-item-name-rank"></p>
            <p className="subordinate-title">Name</p>

            {/* {subordinateData.map((re, i) => {
              const award = subordinateAwards.find((aw) => aw.user_id === re.id && aw.status === "Submitted");
              const awardName = award ? subordinateAwardNames.find((awName) => awName.id === award.award_id) : null;
              return (
                <p key={i} className="subordinate-name">
                  {award && awardName ? (
                    <Link to={`/subordinates/bullet/${re.id}`}>{`${re.first_name} ${re.last_name}`}</Link>
                  ) : (
                    `${re.first_name} ${re.last_name}`
                  )}
                </p>
              );
            })}
          </div> */}

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
            {subordinateData.map((sub, i) => {
              const userAwards = subordinateAwards.filter((award) => award.user_id === sub.id);
              const processedAwardIds = new Set();

              return (
                <div key={i}>
                    {userAwards.map((re, j) => {
                      if (processedAwardIds.has(re.award_id)) {
                        return null;
                      }
                      processedAwardIds.add(re.award_id);
                      const awardName = subordinateAwardNames.find((aw) => aw.id === re.award_id);
                      return (
                        <p key={j} className="subordinate-awards-nominated">
                          {re?.drafting === false && awardName ? (
                            <Link
                              to={`/subordinates/bullet/${re.user_id}`}
                              onClick={() => {
                              setCertainAward(re.award_id)
                              setCertainSubordinateID(re.user_id)
                            }}>{awardName.name}
                              </Link>
                              ) : (
                            awardName?.name
                          )}
                        </p>
                      );
                    })}
                </div>
              );
  })}
</div>

          <div className="subordinate-item">
            <p className="subordinate-title">Ready For Review?</p>
            {/* {(() => { */}
            {subordinateAwards.map((re, i) => (
              // if (processedAwardIds.has(re.award_id)) {
              // return null;
              //   }
              //   processedAwardIds.add(re.award_id);
              // return (
              <label key={i} className="subordinate-ready-for-review">
                <input type="checkbox" className="subordinate-checkbox"
                  checked={re?.drafting === false}
                  readOnly
                />
                <label className='subordinate-checkbox-label' htmlFor='award-checkbox'></label>
              </label>
              ))}
            {/* });
         })()} */}
       </div>
          {/* <div className="subordinate-item">
          <p className="subordinate-title">Ready For Review?</p>
          {subordinateData.map((sub, i) => {
            const award = subordinateAwards.find((aw) => aw.user_id === sub.id);
              // console.log("blah", award)
            return (
            <label key={i} className="subordinate-ready-for-review">
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