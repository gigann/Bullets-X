import { useState } from "react";

import './Home.css';

function Home() {
  const [loggedIn, setLoggedIn] = useState(true);
  const [userID, setUserID] = useState(); // context?


  return (
    <>
      <div>hamburger/navbar placeholder</div>
      {(loggedIn) ? (
        <div className='home-page'>
          <div>
            <div className='award-winning-bullets'>
              <img className='test-img' src='...'></img>
              <div className='award-winning-header'><h3>Award-winning Bullets</h3></div>
            </div>
            <div className='home-sub-page'>
              <div className='my-bullets'>
                <h3>My Bullets</h3>
              </div>
              <div className='add-a-quick-action'>
                Add a quick action
              </div>
            </div>
          </div>
          <div className='upcoming-awards'>
            <h3>Upcoming Awards</h3>
            <div className='award-card'>
              <h3>Award #1</h3>
              <span>April 2025</span>
            </div>
            <div className='award-card'>
              <h3>Award #2</h3>
              <span>April 2025</span>
            </div>
            <div className='award-card'>
              <h3>Award #3</h3>
              <span>April 2025</span>
            </div>
            <div className='award-card'>
              <h3>Award #4</h3>
              <span>April 2025</span>
            </div>
            <div className='award-card'>
              <h3>Award #5</h3>
              <span>April 2025</span>
            </div>
          </div>
        </div>
      ) : (
        <div className='login-warning'>
          <h1><strong>You must sign in to do that.</strong></h1>
        </div>
      )}
    </>
  )
}

export default Home;

// TODO
/*
  fetches

  Make award-winning bullets cycle through and show them (every 5 seconds). with arrows to go back and forth

  make bullet/award cards

  not sure what quick action is for yet
*/