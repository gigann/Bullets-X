import { useEffect, useState } from 'react';
import '../Upcoming/Upcoming.css';
import { useLocalStorage } from "@uidotdev/usehooks";

const Awards = () => {
  const [loggedIn, setLoggedIn] = useLocalStorage('loggedIn');
  const [awards, setAwards] = useState([])
  const [bullets, setBullets] = useState([]);
  const [tableData, setTableData] = useState();

  useEffect(() => {
    fetch(`http://localhost:3001/user_award/${loggedIn.id}/awards`)
      .then(res => res.json())
      .then(data => setAwards(data))
      .catch(err => console.log("Error: ", err));
  }, [])

  useEffect(() => {
    fetch(`http://localhost:3001/bullet/users/${loggedIn.id}`)
      .then(res => res.json())
      .then(data => setBullets(data))
      .catch(err => console.log("Error: ", err));
  }, []);

  useEffect(() => {
    let newTableData = [];

    for (let award of awards) {

      let row = [
        award.name,
        award.description,
        award.bullet_minimum,
        award.bullet_maximum,
        new Date(award.due_date).toLocaleDateString(),
        award.status,
      ]

      let bulletData = [];

      for (let bullet of bullets) {
        if (bullet.award_id == award.award_id) {
          bulletData.push(`${bullet.action}, ${bullet.impact}--${bullet.result}`);
        }
      }

      row.push(bulletData);
      newTableData.push(row);
    }
    setTableData(newTableData);
  }, [awards, bullets])

  return (
    <>
      <h1>My Awards</h1>
      {(tableData !== undefined) ? (
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
              {tableData?.map((row, i) => (
                <tr className='award-tr' key={i}>
                  {row.map((item, j) => {
                    switch (j) {
                      case 0:
                        return (
                          <td className='award-td' key={j}>
                            {(row[6]?.length > 0) ? (
                              <details className='award-details'>
                                <summary>{item}</summary>
                                Your Assigned Bullets:
                                <ul>
                                  {row[6].map((bullet, k) => (
                                    <li key={k}>
                                      {bullet}
                                    </li>
                                  ))}
                                </ul>
                              </details>
                            ) : (
                              <p>{item}</p>
                            )}

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
        </div>
      ) : (
        null // loading spinner could go here
      )}
    </>
  )
}

export default Awards;