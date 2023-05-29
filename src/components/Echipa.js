import React from "react";
import "./Echipa.css";

function Echipa({ obiect, key }) {
  //console.log(obiect);
  var id = obiect.id;
  var numeEchipa = obiect.numeEchipa;
  var descriereEchipa = obiect.descriereEchipa;
  var nrMembriActuali = obiect.nrMembriActuali;
  var numarMembriDoriti = obiect.numarMembriDoriti;
  var emailCapitan = obiect.emailCapitan;
  var emailuriParticipant = obiect.emailuriParticipant;

  return (
    <div className="court-div">
      <img
        src={require("../Real_Madrid_CF.jpg")}
        style={{ height: "100%", borderRadius: "20px" }}
      ></img>
      <div style={{textAlign: "center"}}>
        <p>Team Description</p><br></br>
        <p id="numeEchipa">{descriereEchipa}</p>
      </div>
      <div className="sporturi-container">
        
      </div>
      <div className="pret-container">
        <p id="city">Team Name : {numeEchipa} </p>
        <p id="address">Number of members: {nrMembriActuali} </p>
        <p id="price"> Desired number of members : {numarMembriDoriti} </p>
      </div>
    </div>
  );
}

export default Echipa;
