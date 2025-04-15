import { useEffect, useState, useContext } from "react";
import { useLocalStorage } from "@uidotdev/usehooks";

export default function Addact() {
  const [user, setUser] = useLocalStorage("loggedIn");
  const [formData, setFormData] = useState({
    name: "",
    description: "",
  });

  const inputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const addinv = async () => {
    if (!formData.name || !formData.description) {
      alert("Missing one or more fields!");
      return;
    }
    try {
      const response = await fetch("http://localhost:3001/activity", {
        method: "POST",
        mode: "cors",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user_id: user?.id,
          name: formData.name,
          description: formData.description,
        }),
      });

      const data = await response.json();
      if (response.ok) {
        alert("Activity added!");
        
        setFormData({
          ...formData,
          ['description']: '',
          ['name']: ''
        });
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occured");
    }
  };

  return (
    <>
      <div className="add-act">
        <input
          className="txtbox"
          placeholder="Activity Name"
          type="text"
          name="name"
          id="add-name"
          value={formData.name}
          onChange={inputChange}
        ></input>
        <input
          className="descrip"
          placeholder="Description"
          type="text"
          name="description"
          id="add-description"
          value={formData.description}
          onChange={inputChange}
        ></input>

        <button onClick={addinv}>Add Activity</button>
      </div>
    </>
  );
}
