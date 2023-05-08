import React, { useState, useEffect } from "react";
import axios from "axios";
import Navigation from "../Navigation";
import Court from "../Court";
import { Button } from "../Button";
import Add from "./Add";

function ManageCourts() {
  const [dataArray, setDataArray] = useState([]);

  const handleAdd = () => {
    window.history.pushState({}, "", "/Main/ManageCourts/Add");
    window.location.reload();
    return;
  };

  const handleDelete = async (index) => {
    //console.log(dataArray[i].id);
    await axios({
      url: "http://localhost:8080/fields",
      method: "DELETE",
      data: {
        id: dataArray[index].id,
      },
    }).catch((err) => console.log(err));
    window.location.reload();
  };

  let us = localStorage.getItem("username");
  axios({
    url: `http://localhost:8080/owner/${us}`,
    method: "GET",
    // TODO Token?????????
  })
    .then((res) => {
      setDataArray(res.data);
    })
    .catch((err) => console.log(err));
  return (
    <div>
      <div>
        <Navigation></Navigation>
      </div>
      <div
        style={{
          backgroundColor: "gray",
          position: "fixed",
          marginTop: "80px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
        }}
      >
        <button onClick={() => handleAdd()}>Add New Court!</button>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div
          className="courts-container"
          style={{
            marginTop: "10%",
            width: "50%",
            position: "relative",
          }}
        >
          {dataArray.map((item, index) => (
            <div key={item.key}>
              <Court obiect={item} />
              <div className="butoane">
                <button> Modify </button>
                <button
                  id={"buton" + index}
                  onClick={() => handleDelete(index)}
                >
                  {" "}
                  Delete{" "}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
export default ManageCourts;
