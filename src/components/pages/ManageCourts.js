import React, { useState, useEffect } from "react";
import axios from "axios";
import Navigation from "../Navigation";
import Court from "../Court";
import { Button } from "../Button";

function ManageCourts() {
  let i = 0;
  const [dataArray, setDataArray] = useState([]);

  const handleDelete = async (i) => {
    i--;
    console.log(dataArray[i].id);
    await axios({
      url: "http://localhost:8080/fields",
      method: "DELETE",
      data: {
        id: dataArray[i].id,
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
          {dataArray.map(
            (item) => (
              <div>
                <Court obiect={item} key={item.key} />
                <div className="butoane">
                  <button> Modify </button>
                  <button id={"buton" + i} onClick={() => handleDelete(i)}>
                    {" "}
                    Delete{" "}
                  </button>
                </div>
              </div>
            ),
            i++
          )}
        </div>
      </div>
    </div>
  );
}
export default ManageCourts;
