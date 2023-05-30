import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import "./Tabela.css";

const Table = ({ data }) => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const index = queryParams.get("index");
  const [selectedNumbers, setSelectedNumbers] = useState([]);

  const [checkedItems, setCheckedItems] = useState({});
  const [showButton, setShowButton] = useState(false);
  const [question, setQuestion] = useState(false);

  const handleCheckboxChange = (event, value) => {
    setCheckedItems({ ...checkedItems, [value]: event.target.checked });

    // Check if at least one checkbox is checked
    const checkedValues = Object.values({
      ...checkedItems,
      [value]: event.target.checked,
    });
    const isChecked = checkedValues.some((isChecked) => isChecked);
    setShowButton(isChecked);
  };

  const handleConfirmReservation = async () => {
    setSelectedNumbers(
      Object.keys(checkedItems).filter((key) => checkedItems[key])
    );
    setShowButton(false);
    setQuestion(true);
  };

  if (data.length === 0) {
    return (
      <table>
        <tbody>
          <tr>
            <td>Not available</td>
          </tr>
        </tbody>
      </table>
    );
  }

  const getTimeInterval = (index) => {
    const startHour = index.toString().padStart(2, "0");
    const endHour = (index + 1).toString().padStart(2, "0");
    return `${startHour}:00 - ${endHour}:00`;
  };

  const handleConfirmation = async () => {
    // Handle the confirmation logic here
    // This function will be called when the user clicks "Yes"
    console.log("Booking confirmed");
    setQuestion(false);

    const formData = new FormData();
    formData.append("idTeren", index.toString());
    formData.append("emailClient", localStorage.getItem("email"));
    formData.append("interval", selectedNumbers);
    formData.append("data", localStorage.getItem("dataBook"));

    const formData2 = new FormData();
    formData2.append("idTeren", index.toString());
    formData2.append("interval", selectedNumbers);
    formData2.append("data", localStorage.getItem("dataBook"));

    console.log(index);
    console.log("Email:", localStorage.getItem("email"));
    console.log("intervale selectate", selectedNumbers);
    console.log("data:", localStorage.getItem("dataBook"));
    await axios
      .post("http://localhost:8080/rezervari", formData)
      .then((res) => {
        console.log("Solutia domnule");
        console.log(res);
      })
      .catch((error) => {
        console.log(error);
      });

    await axios
      .put("http://localhost:8080/rezervariTeren/add", formData2)
      .then((res) => {
        console.log(res);
        window.location.reload();
      })
      .catch((err) => console.log(err));
    // Close the popup
  };

  const handleCancellation = () => {
    // Handle the cancellation logic here
    // This function will be called when the user clicks "No"
    console.log("Booking cancelled");
    // Close the popup
    setQuestion(false);
    setShowButton(true);
  };

  return (
    <table className="tabb">
      <thead>
        <tr>
          <th>Time Interval</th>
          <th>Check your time!</th>
        </tr>
      </thead>
      <tbody>
        {data.map((value, index) => (
          <tr key={index}>
            <td>{getTimeInterval(value)}</td>
            <td>
              <input
                type="checkbox"
                checked={checkedItems[value] || false}
                onChange={(event) => handleCheckboxChange(event, value)}
              />
            </td>
          </tr>
        ))}
      </tbody>
      {showButton && (
        <tfoot>
          <tr>
            <td colSpan="2">
              <button onClick={handleConfirmReservation}>
                Confirm Reservation
              </button>
            </td>
          </tr>
        </tfoot>
      )}

      {question && (
        <td colSpan="2">
          <div className="popup">
            <div className="popup-content">
              <p>Are you sure you want to confirm the booking?</p>
              <div className="popup-buttons">
                <button onClick={handleConfirmation}>Yes</button>
                <button onClick={handleCancellation}>No</button>
              </div>
            </div>
          </div>
        </td>
      )}
    </table>
  );
};

export default Table;
