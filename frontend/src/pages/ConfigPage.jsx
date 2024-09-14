import React from "react";
import { useState } from "react";
import axios from "axios";

const ConfigPage = () => {
  const [text, setText] = useState("");
  const [data, setData] = useState([]);

  const handleSubmit = () => {
    console.log(text);
    axios
      .get(`http://localhost:3000/api/configurations/${text}`)
      .then((response) => {
        console.log(response);
        setData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching config:", error);
      });
  };

  return (
    <div>
      <h1>Fetch Config</h1>
      <p>Config to load (configId)</p>
      <input type="text" onChange={(e) => setText(e.target.value)} />
      <br />
      <button onClick={handleSubmit}>Submit</button>
      {data.length > 0 && (
        <div>
          <h3>Configuration Data:</h3>
          {data.map((subArray, index) => (
            <p key={index}>{subArray.join(", ")}</p>
          ))}
        </div>
      )}
    </div>
  );
};

export default ConfigPage;
