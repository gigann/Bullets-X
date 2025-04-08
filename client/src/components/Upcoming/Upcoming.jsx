import { useEffect, useState } from 'react';

import './Upcoming.css';

// data needed for this page
// award table for most data
// bullet table (filter by award id)
// user_award table for status

function Upcoming() {
  const [awardData, setAwardData] = useState({});
  const [bulletData, setBulletData] = useState({});
  const [userAwardData, setUserAwardData] = useState({});

  const [tableData, setTableData] = useState();

  useEffect(() => {
    fetch(`http://localhost:3001/award/`)
      .then(res => res.json())
      .then(data => setAwardData(data));
  }, []);

  useEffect(() => {
    for (let i in awardData) {
      let awardID = awardData[i].id;

      fetch(`http://localhost:3001/bullet/award/${awardID}`)
        .then(res => res.json())
        .then(data => setBulletData(data));
    }
  }, [awardData]);

  // for status of awards
  useEffect(() => {
    fetch(`http://localhost:3001/user_award/`)
      .then(res => res.json())
      .then(data => setUserAwardData(data));
  }, []);

  // update table data
  useEffect(() => {
    let newTableData = [];

    // iterate through award data and add relevant data to the table.
    for (let i in awardData) {
      let newRow = [
        awardData[i].name,
        awardData[i].description,
        awardData[i].bullet_minimum,
        awardData[i].bullet_maximum,
        awardData[i].due_date,
      ];

      for (let j in userAwardData) {
        if (awardData[i].id === userAwardData[j].award_id) {
          newRow.push(userAwardData[j].status);
          break;
        }
      }

      // add bullets assigned to this award
      let bullets = [];

      for (let k in bulletData) {
        if (awardData[i].id === bulletData[k].award_id) {
          bullets.push(bulletData[k].name);
        }
      }
      newRow.push(bullets);

      newTableData.push(newRow);
    }

    setTableData(newTableData);
  }, [awardData]);

  return (
    <div className='award-page'>

      {(tableData !== undefined) ? (
        <table className='award-table'>
          <thead className='award-thead'>
            <tr className='award-tr'>
              <th className='award-th'>Name</th>
              <th className='award-th'>Description</th>
              <th className='award-th'>Min Bullets</th>
              <th className='award-th'>Max Bullets</th>
              <th className='award-th'>Due Date</th>
              <th className='award-th'>Status</th>
              <th className='award-th'>Selected</th>
            </tr>
          </thead>
          <tbody className='award-tbpdy'>
            {tableData.map((row, i) => (
              <tr className='award-tr' key={i}>
                {row.map((item, j) => {
                  switch (j) {
                    case 0:
                      return (
                        <td className='award-td' key={j}>
                          <details>
                            <summary>{item}</summary>
                            Bullets:
                            <ul>
                              {/* todo: bullet card here */}
                            </ul>
                          </details>
                        </td>
                      )
                    case 6:
                      return null;
                    default:
                      return <td className='award-td' key={j}>{item}</td>;
                  }
                })}
                <td className='award-td'><input className='award-checkbox' type='checkbox'></input></td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        null
        // loading spinner could go here
      )}



      {/* this could be its own component */}
      {/* <div className='upcoming-awards'>
        <h3>Upcoming Awards</h3>
        <div className='award-card'>
          <input className='award-checkbox' type='checkbox' />
          <h3>Award #1</h3>
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
      </div> */}
    </div>
  )
}

export default Upcoming;

// TODO
// sorting table
// adding assigned bullets in dropdowns (details)
