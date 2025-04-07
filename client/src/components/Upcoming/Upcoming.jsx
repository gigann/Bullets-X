import { useState } from 'react';

import './Upcoming.css';

function Upcoming() {
  const [tableData, setTableData] = useState(
    [['CGO of the Year', 'Lorem ipsum, dolor sit amet consectetur adipisicing elit.', 5, 10, '18 Apr, 2025', 'Submitted to Supervisor'],
    ['Polaris Award', 'Lorem ipsum, dolor sit amet consectetur adipisicing elit.', 5, 15, '25 May, 2025', 'Ready to Submit'],
    ['Lifesaver Award', 'Lorem ipsum, dolor sit amet consectetur adipisicing elit.', 20, 20, '11 June, 2025', 'Not Ready to Submit']]);

  return (
    <div className='award-page'>
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
                          {/* show bullets user has assigned to award here */}
                          <ul>
                            <li>Bullet #1</li>
                            <li>Bullet #2</li>
                            <li>Bullet #3</li>
                          </ul>
                        </details>
                      </td>
                    )
                  default:
                    return <td className='award-td' key={j}>{item}</td>;
                }
              })}
              <td className='award-td'><input className='award-checkbox' type='checkbox'></input></td>
            </tr>
          ))}
        </tbody>
      </table>

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