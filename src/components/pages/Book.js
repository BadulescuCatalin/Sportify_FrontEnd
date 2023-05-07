import React, { useState, useEffect } from "react";
import axios from "axios";
import Navigation from "../Navigation";
import Court from "../Court";

function Book() {
  const [dataArray, setDataArray] = useState([]);
  axios({
    url: "http://localhost:8080/fields",
    method: "GET",
    // TODO Token?????????
  }).then((res) => {
    setDataArray(res.data);
  });
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
          {dataArray.map((item) => (
            <Court obiect={item} key={item.key} />
          ))}
        </div>
      </div>
    </div>
  );
}
export default Book;
