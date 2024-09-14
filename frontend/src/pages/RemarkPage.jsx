import React, { useState } from "react";
import axios from "axios";

const RemarkPage = () => {
  const [text, setText] = useState("");
  const [remark, setRemark] = useState("");
  const [message, setmessage] = useState("");

  const handleSubmit = () => {
    if (text && remark) {
      axios
        .put(`http://localhost:3000/api/configurations/${text}`, { remark })
        .then((response) => {
          console.log("Remark updated:", response.data);
          setmessage("success");
          alert("Remark updated successfully!");
        })
        .catch((error) => {
          console.error("Error updating remark:", error);
          alert("Failed to update remark.");
        });
    } else {
      alert("Please provide both Config ID and Remark.");
    }
  };

  return (
    <>
      <h1>Update Remark</h1>
      <p>Config to load (configId):</p>
      <input
        type="text"
        onChange={(e) => setText(e.target.value)}
        placeholder="Enter configId"
      />

      <p>Remark:</p>
      <textarea
        onChange={(e) => setRemark(e.target.value)}
        placeholder="Enter remark"
      ></textarea>
      <br />
      <button onClick={handleSubmit}>Submit</button>
      <p>{message}</p>
    </>
  );
};

export default RemarkPage;
