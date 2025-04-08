import { useState } from "react";
import TextareaAutosize from 'react-textarea-autosize';

import './Home.css';
import { useLocalStorage } from "@uidotdev/usehooks";

// [question] what's the point if we have a navbar
function Home() {
  const [loggedIn, setLoggedIn] = useLocalStorage('loggedIn');

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
                <b>Add a quick action</b>
                <input id='quick-name' type='text' placeholder='Name' />
                <TextareaAutosize id='quick-description' placeholder='Description' minRows={3} />
                <button onClick={() => {
                  let name = document.querySelector('#quick-name').value;
                  let description = document.querySelector('#quick-description').value;
                  addActivity(name, description);
                }}>Add</button>
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