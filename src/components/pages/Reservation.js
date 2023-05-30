import React, { useState, useEffect } from "react";
import axios from "axios";
import Navigation from "../Navigation";
import Court from "../Court";
import { Button } from "../Button";
import { useLocation } from "react-router-dom";
import "./Reservation.css";
import Tabela from "../Tabela";

function Reservation() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const index = queryParams.get("index");
  const [response, setResponse] = useState(null);
  const [done, setDone] = useState(false);
  const [valabile, setValabile] = useState([]);
  const [showIntervals, setShowIntervals] = useState(0);

  const [selectedDate, setSelectedDate] = useState("");

  const generateDates = () => {
    const today = new Date();
    const endDate = new Date();
    endDate.setDate(today.getDate() + 14);

    const dates = [];
    while (today <= endDate) {
      dates.push({
        value: today.toISOString().split("T")[0],
        text: today.toDateString(),
      });
      today.setDate(today.getDate() + 1);
    }
    return dates;
  };

  const handleDateChange = (event) => {
    setSelectedDate(event.target.value);
  };

  const handleConfirm = async () => {
    localStorage.setItem("dataBook", selectedDate);
    console.log(index);
    console.log(selectedDate);
    try {
      const resp = await axios.get(
        `http://localhost:8080/rezervariTeren/${index}/${selectedDate}`
      );
      console.log(resp);
      setValabile(resp.data);
      setShowIntervals(1);
    } catch (error) {
      console.log(error);
    }
  };

  // cerere cu datele terenului dupa id-ul din URL
  const fetchData = async () => {
    try {
      setResponse(await axios.get(`http://localhost:8080/id/${index}`));
      setDone(true);
      //console.log(response);
    } catch (error) {}
  };

  useEffect(() => {
    fetchData();
  });

  useEffect(() => {
    console.log(valabile);
    localStorage.setItem("valabile", valabile);
  }, [valabile]);

  return (
    <div>
      <div>
        <Navigation></Navigation>
      </div>
      <div  className="container">
        <div>
              {response ? <Court obiect={response.data}></Court> : <p>Loading...</p>}
          <h3>Choose the day of your booking</h3>
          <div>
            <h1>Date Selection</h1>

            <label htmlFor="date">Select a Date:</label>
            <select id="date" onChange={handleDateChange}>
              <option value="">Select a date</option>
              {generateDates().map((date) => (
                <option key={date.value} value={date.value}>
                  {date.text}
                </option>
              ))}
            </select>

            <button onClick={handleConfirm} disabled={!selectedDate}>
              Confirm
            </button>
          </div>
        </div>

        {showIntervals != 0 && <Tabela data={valabile}></Tabela>}
      </div>
    </div>
  );
}

export default Reservation;
