import React, { useState, useEffect } from "react";
import axios from "axios";
import Navigation from "../Navigation";
import Court from "../Court";
import Echipa from "../Echipa";
import { Button } from "../Button";
import Add from "./Add";
import loadingImage from "../loading.gif"; // Import your loading image

function FindTeam() {
  const [dataArray, setDataArray] = useState([]);
  const [isLoading, setIsLoading] = useState(false); // Add loading state
  const [selectedOption, setSelectedOption] = useState("none");
  const [showButtonJoin, setShowButtonJoin] = useState(false);

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const handleAdd = (index) => {
    window.history.pushState({}, "", `/Main/FindTeam/AddTeam`);
    window.location.reload();
    return;
  };

  const handleJoin = (index) => {
    const maxPlayers =
      dataArray[index].numarMembriDoriti - dataArray[index].nrMembriActuali;
    localStorage.setItem("maximumPlayers", maxPlayers);
    window.history.pushState(
      {},
      "",
      `/Main/FindTeam/JoinTeam/?index=${dataArray[index].id}`
    );
    window.location.reload();
    return;
  };

  const handleLeave = async (index) => {
    const formData = new FormData();
    formData.append("id", dataArray[index].id);
    formData.append("email", localStorage.getItem("email"));
    try {
      await axios.put(
        `http://localhost:8080/echipe/remove/${dataArray[index].id}`,
        formData,
        {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        }
      );
      window.history.pushState({}, "", "/Main/FindTeam");
      window.location.reload();
    } catch (err) {
      console.log(err);
    }
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

  useEffect(() => {
    let us = localStorage.getItem("username");
    setIsLoading(true);
    axios({
      url: `http://localhost:8080/echipe`,
      method: "GET",
      // TODO Token?????????
    })
      .then((res) => {
        setDataArray(res.data);
        setIsLoading(false); // Set isLoading to false after the request is completed
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false); // Set isLoading to false if an error occurs
      });
  }, []); // Empty dependency array to run the effect only once

  return (
    <div style={{}}>
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
        <button
          onClick={() => handleAdd()}
          style={{
            backgroundColor: "#4CAF50",
            border: "none",
            color: "white",
            padding: "15px 32px",
            textAlign: "center",
            textDecoration: "none",
            display: "inline-block",
            fontSize: "16px",
            margin: "4px 2px",
            cursor: "pointer",
            borderRadius: "8px",
            boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.2)",
            transition: "background-color 0.3s",
          }}
          onMouseOver={(e) => (e.target.style.backgroundColor = "#5cbf62")}
          onMouseLeave={(e) => (e.target.style.backgroundColor = "#4CAF50")}
        >
          Add new team!
        </button>
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
              <Echipa obiect={item} />
              <div className="butoane">
                <div
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    background: "#f2f2f2",
                    borderRadius: "0px 0px 8px 8px",
                    padding: "10px",
                    width: "170px",
                    height: "50px",
                    marginBottom: "10px",
                    marginLeft: "22px",
                  }}
                >
                  {!item.emailuriParticipant.hasOwnProperty(
                    localStorage.getItem("email").replace(/\./g, ",")
                  ) &&
                    !(localStorage.getItem("email") === item.emailCapitan) && (
                      <button
                        onClick={() => handleJoin(index)}
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
                        Join
                      </button>
                    )}
                  {(item.emailuriParticipant.hasOwnProperty(
                    localStorage.getItem("email").replace(/\./g, ",")
                  ) ||
                    localStorage.getItem("email") === item.emailCapitan) && (
                    <button
                      id={"button" + index}
                      onClick={() => handleLeave(index)}
                      style={{
                        backgroundColor: "#F44336",
                        border: "none",
                        color: "white",
                        padding: "10px 20px",
                        borderRadius: "8px",
                        marginBottom: "5px",
                        cursor: "pointer",
                        transition: "background-color 0.3s",
                      }}
                      onMouseOver={(e) =>
                        (e.target.style.backgroundColor = "#E57373")
                      }
                      onMouseLeave={(e) =>
                        (e.target.style.backgroundColor = "#F44336")
                      }
                    >
                      Leave
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="loading-container">
              <div className="loading-overlay" />
              <div className="loading-box">
                <img
                  src={loadingImage}
                  alt="Loading"
                  className="loading-image"
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
export default FindTeam;
