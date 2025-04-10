import { useEffect, useState } from 'react';
import './WinningBullets.css';

const WinningBullets = () => {
  const [wins, setWins] = useState([])

  useEffect(() => {
    fetch('http://localhost:3001/bullet/latest-awarded')
    .then(rawData => rawData.json())
    .then(data => setWins(data))
  }, [])

  return(
    <>
    <h2>Award Winning Bullets</h2>
    <div className="winning-bullets-div">
      { wins.length == 0
        ? <p>No recently awarded bullets.</p>
        : wins.map((win, i)=>{
          return(
            <div key={i}>
              <h3>{win.award_name}</h3>
              <p>{win.action}; {win.impact}--{win.result}</p>
            </div>
          )
        })
      }
    </div>
    </>
  )
}

export default WinningBullets;