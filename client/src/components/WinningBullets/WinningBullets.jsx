import { useEffect, useState } from 'react';

const WinningBullets = () => {
  const [wins, setWins] = useState([])

  useEffect(() => {
    fetch('http://localhost:3001/bullet/latest-awarded')
    .then(rawData => rawData.json())
    .then(data => setWins(data))
  }, [])

  return(
    <>
    <div className="winning-bullets-div">
      <h2>Award Winning Bullets</h2>
      {
        wins.map((win, i)=>{
          return(
            <>
              <h3>{win.award_name}</h3>
              <p>{win.description}</p>
            </>
          )
        })
      }
    </div>
    </>
  )
}

export default WinningBullets;