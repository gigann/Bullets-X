import { useEffect, useState } from "react";
import TextareaAutosize from 'react-textarea-autosize';

import './Home.css';
import WinningBullets from '../WinningBullets/WinningBullets.jsx'
import { useLocalStorage } from "@uidotdev/usehooks";
import { useNavigate, Link } from 'react-router-dom';

function Home() {
  const [loggedIn, setLoggedIn] = useLocalStorage('loggedIn');
  const navigate = useNavigate();

  const [upcomingAwards, setUpcomingAwards] = useState();

  useEffect(() => {
    fetch('http://localhost:3001/award')
      .then(res => res.json())
      .then(data => setUpcomingAwards(data))
  }, []);

  const addActivity = (name, description) => {
    if (!name || !description) {
      alert('Missing one or more fields!');
      return;
    }
    fetch('http://localhost:3001/activity', {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        user_id: loggedIn.id,
        name: name,
        description: description
      })
    })
      .then(res => {

        res.json();
        if (res.ok) {
          alert('Activity added!');
          window.location.reload();
        }
      })
  }

  return (
    <>
      {(loggedIn.id > 0) ? (
        <>
          <h2 className="page-title">Home</h2>
          <div className='home-page'>
            <div>
              <div className='award-winning-bullets'>
                <WinningBullets />
              </div>
              <div className='home-sub-page'>
                <div className='my-bullets'>
                  <h3 className='my-bullets-link'><a onClick={() => {
                    navigate(`/bullets/${loggedIn.id}`);
                  }}>My Bullets</a></h3>
                </div>
                <div className='add-a-quick-action'>
                  <b>Add Activity:</b>
                  <input id='quick-name' type='text' placeholder='Name' />
                  <TextareaAutosize id='quick-description' placeholder='Description' minRows={3} />
                  <button id="hbtn" onClick={() => {
                    let name = document.querySelector('#quick-name').value;
                    let description = document.querySelector('#quick-description').value;
                    addActivity(name, description);
                  }}>Add</button>
                </div>
              </div>
            </div>
            <div className='upcoming-awards'>
              <h3>Upcoming Awards</h3>
              {upcomingAwards?.map((award, i) => (
                <div
                  className='award-card'
                  key={i}
                  onClick={() => {
                    navigate(`/upcoming/${loggedIn.id}`);
                  }}
                >
                  <h3>{award.name}</h3>
                  <span>{new Date(award.due_date).toLocaleDateString()}</span>
                </div>
              ))}
            </div>
          </div>
        </>
      ) : (
        <div className='login-warning'>
          <h1><strong>You must login in to do that.</strong></h1>
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