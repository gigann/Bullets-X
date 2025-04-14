import { useEffect, useState } from 'react';
import '../Packages/Packages.css';
import { useLocalStorage } from "@uidotdev/usehooks";
import IconButton from '@mui/material/IconButton';
import CopyAllIcon from '@mui/icons-material/CopyAll';

const Packages = () => {
  const [loggedIn, setLoggedIn] = useLocalStorage('loggedIn');
  const [awards, setAwards] = useState([])
  const [bullets, setBullets] = useState([]);
  const [tableData, setTableData] = useState();
  const [refresh, setRefresh] = useState(1);
  const [awardName, setAwardName] = useState('');

  useEffect(() => {
    fetch(`http://localhost:3001/user_award/${loggedIn.id}/awards`)
      .then(res => res.json())
      .then(data => setAwards(data))
      .catch(err => console.log("Error: ", err));
  }, [refresh])

  useEffect(() => {
    fetch(`http://localhost:3001/bullet/users/${loggedIn.id}`)
      .then(res => res.json())
      .then(data => setBullets(data))
      .catch(err => console.log("Error: ", err));
  }, [awards]);

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
      newTableData.push(row);
    }
    setTableData(newTableData);
  }, [awards])

  const handleRemove = (i) => {
    fetch(`http://localhost:3001/user_award/${awards[i].id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(res => res.json())
    .then(data => {
      if(data.message){
        alert(data.message)
      }
      refresh == 1? setRefresh(0):setRefresh(1)
    })
    .catch(err => console.log(err))
  }

  const handleName = (event) => {
    setAwardName(event.target.innerText);
  }

  const handleCopy = () => {
    let text = document.getElementById('bullet-body').innerText;
    navigator.clipboard.writeText(text);
  }

  return (
    <>
      <h2 className='page-title'>Packages</h2>
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
                <th className='award-th'>Interested</th>
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
                            <p className='award-name-btn' onClick={handleName}>{item}</p>
                          </td>
                        )
                      case 6:
                        return null;
                      default:
                        return <td className='award-td' key={j}>{item}</td>;
                    }
                  })}
                  <td className='award-td'><button key={i} onClick={() => handleRemove(i)}>Remove</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        null // loading spinner could go here
      )}
      <div className='bullet-div'>
        {
          awardName == ''
            ? <h3></h3>
            : <div className='bullet-header'>
                <h3>Bullets for {awardName}</h3>
                <IconButton onClick={handleCopy}><CopyAllIcon/></IconButton>
              </div>
        }
        <ul id='bullet-body'>
          {
            bullets
            .filter(bullet => bullet.award_name == awardName)
            .map((filteredBullet, i) => {
              return <li>{filteredBullet.action}, {filteredBullet.impact}--{filteredBullet.result}</li>
            })
          }
        </ul>
      </div>
    </>
  )
}
export default Packages;
