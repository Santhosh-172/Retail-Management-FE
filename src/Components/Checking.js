import axios from "axios";
import React, { useEffect, useState } from "react";

const Checking = () => {
  const [checkGet, setCheckGet] = useState("");
  const [checkPost, setCheckPost] = useState("");
  const [checkId, setCheckId] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:7000/inventory-service/hello")
      .then((response) => setCheckGet(response.data))
      .catch((error) => console.log(error));

    const name = "santhosh";

    axios
      .post(`http://localhost:7000/inventory-service/checkpost/${name}`)
      .then((response) => setCheckPost(response.data))
      .catch((error) => console.log(error));
  }, []);

  useEffect(() => {
    if (checkId !== "") {
      axios
        .post(`http://localhost:7000/inventory-service/checkposti/${checkId}`)
        .then((response) => setCheckPost(response.data))
        .catch((error) => console.log(error));
    }
  }, [checkId]);

  console.log(checkId);
  const handle = (event) => {
    setCheckId(event.target.value);
  };

  return (
    <div>
      <h1>{checkGet}</h1>
      <h1>{checkPost}</h1>
      <div>
        Enter the Id:
        <input type="number" onChange={handle}></input>
        <button onChange={(event) => setCheckId(event.target.value)}>
          click
        </button>
      </div>
    </div>
  );
};

export default Checking;
