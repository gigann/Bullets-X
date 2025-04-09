import "./SubordinatesBullets.css";
import { useState, useEffect } from 'react';
import { useLocalStorage } from "@uidotdev/usehooks";

export default function SubordinatesBullets() {

  // useEffect(() => {
  //   if (!userID) {
  //     setLoading(false);
  //     setError("User not logged in.");
  //     return;
  //   }

  //       fetch(`http://localhost:3001/users/supervisor/${userID}`, )
  //       .then((res) => res.json())
  //       .then((data) => {
  //         console.log("Fetched items data:", data);
  //         setSubordinateData(data)
  //         setLoading(false);
  //       })
  //       .catch((error) => {
  //         setLoading(false);
  //         setError(error.message);
  //         console.error('Error fetching data:', error);
  //     });
  // }, [userID]);

return (
<>
    <div>Hello</div>
</>
  )
}