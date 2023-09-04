import React, { useState, useEffect } from "react";
import axios from "axios";
import Navigation from "../Navigation";
import Court from "../Court";
import loadingImage from "../loading.gif"; // Import your loading image

function Book() {
  const [dataArray, setDataArray] = useState([]);
  const [selectedOption, setSelectedOption] = useState("none");
  const [isLoading, setIsLoading] = useState(false); // Add loading state

  const handleReserve = (index) => {
    if (localStorage.getItem("token") === null) {
      return;
    }
    const newUrl = `/Main/Book/Reservation?index=${dataArray[index].id}`;
    window.history.pushState({}, "", newUrl);
    window.location.reload();
    return;
  };

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  useEffect(() => {
    let us = localStorage.getItem("username");
    setIsLoading(true);
    axios({
      url: `http://localhost:8080/sorted/${selectedOption}`,
      method: "GET",
      // TODO Token?????????
    })
      .then((res) => {
        setDataArray(res.data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
      });
  }, [selectedOption]); // Dependency array with selectedOption as a dependency

  useEffect(() => {
    setIsLoading(true);
    axios({
      url: "http://localhost:8080/fields",
      method: "GET",
      // TODO Token?????????
    }).then((res) => {
      setDataArray(res.data);
    });

    setIsLoading(false);
  }, []);
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
        <select
          value={selectedOption}
          onChange={handleOptionChange}
          style={{
            padding: "8px",
            borderRadius: "4px",
            border: "1px solid #ccc",
            fontSize: "16px",
            width: "200px",
            backgroundColor: "#f2f2f2",
          }}
        >
          <option value="none">none</option>
          <option value="price asc">price asc</option>
          <option value="price desc">price desc</option>
          <option value="basketball">basketball</option>
          <option value="football">football</option>
          <option value="tennis">tennis</option>
        </select>
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
            <>
              <Court obiect={item} key={item.key} />
              <div
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  background: "#f2f2f2",
                  borderRadius: "0px 0px 8px 8px",
                  padding: "10px",
                  width: "120px",
                  height: "50px",
                  marginBottom: "10px",
                  marginLeft: "22px",
                }}
              >
                <button
                  onClick={() => handleReserve(index)}
                  style={{
                    backgroundColor: "#2196F3",
                    border: "none",
                    color: "white",
                    padding: "10px 20px",
                    borderRadius: "8px",
                    cursor: "pointer",
                    marginBottom: "5px",
                    transition: "background-color 0.3s",
                  }}
                  onMouseOver={(e) =>
                    (e.target.style.backgroundColor = "#64B5F6")
                  }
                  onMouseLeave={(e) =>
                    (e.target.style.backgroundColor = "#2196F3")
                  }
                >
                  {" "}
                  Rezerva{" "}
                </button>
              </div>
            </>
          ))}
        </div>
      </div>
      {isLoading && (
        <div className="loading-container">
          <div className="loading-overlay" />
          <div className="loading-box">
            <img src={loadingImage} alt="Loading" className="loading-image" />
          </div>
        </div>
      )}
    </div>
  );
}
export default Book;
