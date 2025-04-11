import { useEffect, useState } from 'react';
import './WinningBullets.css';

const WinningBullets = () => {
  const [wins, setWins] = useState([])
  const [current, setCurrent] = useState(0)
  var counter = 0

  useEffect(() => {
    fetch('http://localhost:3001/bullet/latest-awarded')
    .then(rawData => rawData.json())
    .then(data => {setWins(data) })

  }, [])

  useEffect(() => {
      
      const interval = setInterval(() => {
        console.log(interval)
        if(current == 4 || counter == 4){
          setCurrent(0);
          counter = 0;
        }else{
          setCurrent((prevCurrent) => prevCurrent + 1)
          counter ++
        }
      }, 5000);

      return () => clearInterval(interval)
  }, [wins])

  function scroll(i){
    if(i == -1){
      if(counter == 0){
        setCurrent(wins.length - 1)
        counter = wins.length -1
      }
      else{
        setCurrent((prevCurrent) => prevCurrent - 1)
        counter --
      }
    }else{
      if(current == 5 || counter == 5){
        setCurrent(0);
        counter = 0;
      }else{
        setCurrent((prevCurrent) => prevCurrent + 1)
        counter ++
      }
    }
  }


  return(
    <>
      <h2 className='award-header'>Award Winning Bullets</h2>
      <div className='scrolling-winning-bullets'>
        <div className='displayedAward'>
           {wins.length > current ? <h4 className='award'>{wins[current].action + " " + wins[current].impact + " " + wins[current].result}</h4> : ""}
        </div>
        
        {/* <h1 className='leftArrow' onClick={() => {scroll(-1)}}>{"<"}</h1>

        <h1 className='rightArrow' onClick={() => {scroll(1)}}>{">"}</h1> */}
        
        <div className='dots'>
            {wins.map((item, i) => (
              <h1 id={i} key={i} onClick={() => {setCurrent(i)}} style={i == current ? {color: "#b67ef0"} : {}}>o</h1>
            )

            )}
        </div>
        
      </div>
    </>
  )
}

export default WinningBullets;