import React, { useState, useEffect } from "react";
import axios from "axios";
import Navigation from "../Navigation";
import Court from "../Court";
import { Button } from "../Button";
import Add from "./Add";
import loadingImage from "../loading.gif"; // Import your loading image


function ManageCourts() {
  const [dataArray, setDataArray] = useState([]);
  const [isLoading, setIsLoading] = useState(false); // Add loading state
  const [selectedOption, setSelectedOption] = useState("none"); 
  

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
    
  };
  const handleAdd = () => {
    window.history.pushState({}, "", "/Main/ManageCourts/Add");
    window.location.reload();
    return;
  };
  
  const handleModify = (index) => {
    const newUrl = `/Main/ManageCourts/Modify?index=${dataArray[index].id}`;
    window.history.pushState({}, "", newUrl);
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
      url: `http://localhost:8080/owner/${us}`,
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
      }
      );
  
    }, []); // Empty dependency array to run the effect only once


    useEffect(() => {  
      let us = localStorage.getItem("username");
      setIsLoading(true);
      axios({
        url: `http://localhost:8080/sorted/owner/${us}/${selectedOption}`,
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
  

return (
    <div style={{
      
    }}>
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
    backgroundColor: '#4CAF50',
    border: 'none',
    color: 'white',
    padding: '15px 32px',
    textAlign: 'center',
    textDecoration: 'none',
    display: 'inline-block',
    fontSize: '16px',
    margin: '4px 2px',
    cursor: 'pointer',
    borderRadius: '8px',
    boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.2)',
    transition: 'background-color 0.3s',
  }}
  onMouseOver={(e) => (e.target.style.backgroundColor = '#5cbf62')}
  onMouseLeave={(e) => (e.target.style.backgroundColor = '#4CAF50')}
>
  Add New Court!
</button>


<select
  value={selectedOption}
  onChange={handleOptionChange}
  style={{
    backgroundColor: '#f2f2f2',
    border: 'none',
    color: '#333',
    padding: '10px',
    borderRadius: '8px',
    boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.2)',
    marginRight: '10px',
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
            <div key={item.key}>
              <Court obiect={item} />
              <div className="butoane">
              <div
  style={{
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: '#f2f2f2',
    borderRadius: '0px 0px 8px 8px',
    padding: '10px',
    width: '170px',
    height: '50px',
    marginBottom: '10px',
    marginLeft: '22px'
  }}
>
  <button
    onClick={() => handleModify(index)}
    style={{
      backgroundColor: '#2196F3',
      border: 'none',
      color: 'white',
      padding: '10px 20px',
      borderRadius: '8px',
      cursor: 'pointer',
      marginBottom: '5px',
      transition: 'background-color 0.3s',
    }}
    onMouseOver={(e) => (e.target.style.backgroundColor = '#64B5F6')}
    onMouseLeave={(e) => (e.target.style.backgroundColor = '#2196F3')}
  >
    Modify
  </button>

  <button
    id={'button' + index}
    onClick={() => handleDelete(index)}
    style={{
      backgroundColor: '#F44336',
      border: 'none',
      color: 'white',
      padding: '10px 20px',
      borderRadius: '8px',
      marginBottom: '5px',
      cursor: 'pointer',
      transition: 'background-color 0.3s',
    }}
    onMouseOver={(e) => (e.target.style.backgroundColor = '#E57373')}
    onMouseLeave={(e) => (e.target.style.backgroundColor = '#F44336')}
  >
    Delete
  </button>
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
export default ManageCourts;
