import "./Subordinates.css";
import { useState } from 'react';


function Subordinates() {
  const [readyForReview, setReadyForReview] = useState(false);


  const handleReadyForReview = () => {
    setReadyForReview((readyForReview) => !readyForReview);
  }

  return (
<>
  <div className = "subordinates-page-container">
    <div className = "subordinates-container">
      <div className="subordinate-item">
        <p className="subordinate-title">Name</p>
        <p className="subordinate-name">Jimmy Buffett</p>
      </div>
      <div className="subordinate-item">
        <p className="subordinate-title">Rank</p>
        <p className="subordinate-rank">E-17</p>
      </div>
      <div className="subordinate-item">
        <p className="subordinate-title">Awards Nominated</p>
        <p className="subordinate-awards-nominated">3 Million and a Half</p>
      </div>
      <div className="subordinate-item">
        <p className="subordinate-title">Ready For Review</p>
        <p className="subordinate-ready-for-review">
          <button onClick = {handleReadyForReview}>{readyForReview ? "☑" : "◻"}</button>
        </p>
      </div>
    </div>
  </div>
</>
  )
}

export default Subordinates;
