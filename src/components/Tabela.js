import React, { useState } from "react";
import "./Tabela.css";

const Table = ({ data }) => {
  const [checkedItems, setCheckedItems] = useState({});
  const [showButton, setShowButton] = useState(false);

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

  const handleConfirmReservation = () => {
    const selectedNumbers = Object.keys(checkedItems).filter(
      (key) => checkedItems[key]
    );
    console.log("Selected numbers:", selectedNumbers);
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

  return (
    <table className="tabb">
      <thead>
        <tr>
          <th>Time Interval</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {data.map((value, index) => (
          <tr key={index}>
            <td>{getTimeInterval(index)}</td>
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
    </table>
  );
};

export default Table;
