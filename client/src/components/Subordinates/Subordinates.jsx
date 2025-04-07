import "./Subordinates.css";
import { useState, useEffect } from 'react';


function Subordinates() {
  const [readyForReview, setReadyForReview] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [subordinateData, setSubordinateData] = useState([]);

  // useEffect(() => {
  //       fetch(`http://localhost:3001/subordinates`)
  //       .then((res) => {
  //           console.log(res.status)
  //           return res.json()
  //       })
  //       .then((data) => {
  //         console.log("Fetched items data:", data);
  //         setLoading(false)
  //         setSubordinateData(data)
  //       })
  //       .catch((error) => {
  //         setLoading(false);
  //         setError(error.message);
  //         console.error('Error fetching data:', error);
  //   });
  // }, []);
  return (
<>
  <div className = "subordinates-page-container">
    {/* {subordinateData.length > 0 ? (
      subordinateData.map((subordinate) => ( */}
    <div className = "subordinates-container">
      <div className="subordinate-item">
        <p className="subordinate-title">Name</p>
        <p className="subordinate-name">Jimmy Buffett</p>
        <p className="subordinate-name">Guy Guyson</p>
        <p className="subordinate-name">Dude Dudeguy</p>
        {/* <p className="subordinate-name">{subordinate.subordinate_name}</p> */}
      </div>
      <div className="subordinate-item">
        <p className="subordinate-title">Rank</p>
        <p className="subordinate-rank">O-40</p>
        <p className="subordinate-rank">E-2</p>
        <p className="subordinate-rank">O-4</p>

        {/* <p className="subordinate-rank">{subordinate.subordinate_rank}</p> */}
      </div>
      <div className="subordinate-item">
        <p className="subordinate-title">Awards Nominated</p>
        <p className="subordinate-awards-nominated">400</p>
        <p className="subordinate-awards-nominated">2</p>
        <p className="subordinate-awards-nominated">a mil</p>
        {/* <p className="subordinate-awards-nominated">{subordinate.awards_nominated}</p> */}
      </div>
      <div className="subordinate-item">
        <p className="subordinate-title">Ready For Review?</p>
        <td className="subordinate-ready-for-review">
          <input type = "checkbox"></input>
        </td>
	    </div>
    </div>
    {/* ))
  ) : (
		<p>No Items found.</p>
  )} */}
  </div>
</>
  )
}

export default Subordinates;