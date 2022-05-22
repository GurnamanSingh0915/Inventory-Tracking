import React, { useEffect, Fragment, useState } from "react";
import ListPlayers from "./ListPlayer";
import '../App.css';
import { useNavigate } from "react-router-dom";

const InputPlayer = () => {
  let navigate = useNavigate();
  const [id, setId] = useState("");
  const [first_name, setFirst_name] = useState("");
  const [last_name, setLast_name] = useState("");
  const [codename, setCodename] = useState("");
  const [warehouse, setWarehouse] = useState("");
  const [locationCity, setLocationCity] = useState("");

  const [id_green, setId_green] = useState("");
  const [first_nameGreen, setFirst_nameGreen] = useState("");
  const [last_nameGreen, setLast_nameGreen] = useState("");
  const [codenameGreen, setCodenameGreen] = useState("");

  const [players, setPlayers] = useState([]);
  const [playersGreen, setPlayersGreen] = useState([]);

  const onSubmitForm = async (event, id, first_name, last_name, codename,warehouse,locationCity, playerStatus) => {
    event.preventDefault();
  
    try {
      const body = {id,first_name,last_name,codename,warehouse,locationCity, 'status' : playerStatus};
      
      //proxy is only use in development so it will be ignored in production
      //so if there is no http://localhost:5000 then by default it is going to use heroku domain
      //remember this heroku app is just our server serving the build static content and also holding the restful api

      //https://pern-player-app-demo.herokuapp.com/players

      const idtaken = await fetch('/check_id/'+id, {
        method: "GET",
        headers: {"Content-Type": "application/json"}
      });

      let jsonData = await idtaken.json();
      if(jsonData.id_exists === "True"){
        if(jsonData.status === 'inactive') await fetch(`players/${id}`,{method: "DELETE"});
        else {
          alert("ID is already taken!");
          return;
        }
      }

      const response = await fetch("/players", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      }
      
      );
      window.location = "/entryscreen";
      
     
    
    } catch (err) {
      console.error(err.message);
    }
  };

  const routeChangeToPlayAction = ()=>{


    navigate("/playaction");

}
 
const routeChangeToSplashScreen = ()=>{


  navigate("/");

}


const getPlayers = async (player_status) => {
  try{
      const response = await fetch('/player_status/' + player_status)
      const jsonData = await response.json();

      return jsonData
  }catch(err){
      console.error(err.message);
  }
  return () => {
      console.log("component unmounted");
  }
}

useEffect(()=>{
  getPlayers('red').then((jsonData) => setPlayers(jsonData))
  getPlayers('green').then((jsonData) => setPlayersGreen(jsonData))
  window.addEventListener('keydown', handleUserKeyPress);

  return () => {
      window.removeEventListener('keydown', handleUserKeyPress);
      console.log("component unmounted");
  }

}, []);

const handleUserKeyPress = event => {
  const { key, keyCode } = event;

  if (keyCode === 116) {
      navigate("/");
  }
};

const showAddOptions = () => {


}

  return (
   


    <Fragment>
<h1 style={{textAlign:"center",marginTop:"0.5%",marginBottom:"-2.5%",color:"orange", textShadow:"2px 2px red", fontSize:"2.5em"}}>
      Logistics Inventory Tracking System
    </h1>
<div className = "container">
  <br></br>
  <div style={{display:"flex"}}>
  
    
     
  </div>
  <br></br>
      <div class="row">
      <div class="col bg-success text-white" style={{borderRadius:"15px 0px 0px 0px", color:"orange", textShadow:"2px 2px green"}}><h1 className="text-center my-2 ">Inventory Items </h1>
      <div class="d-flex flex-row justify-content-center">
       <button style = {{marginTop:"1em", marginBottom:"1em", width:"50%",}} className="btn btn-primary">ADD NEW ITEM >></button>
       
       <button style = {{marginLeft:"1em",marginTop:"1em", marginBottom:"1em", width:"50%",}} className="btn btn-primary">ADD NEW Warehouse/Location (City) >></button>
       </div>
     <form onSubmit={(e) => onSubmitForm(e, id, first_name, last_name, codename, warehouse, locationCity, 'red')} >
       
     <div class="d-flex flex-row">
       <input
           type="number"
           placeholder="Add ID (Integer)*"
           className="form-control"
           value={id}
           onChange={(e) => setId(e.target.value)}
           required
       />
       <input
         type="text"
         placeholder="Add Product Name"
         className="form-control"
         value={first_name}
         onChange={(e) => setFirst_name(e.target.value)}
       />
       <input
         type="text"
         placeholder="Add Quantity"
         className="form-control"
         value={last_name}
         onChange={(e) => setLast_name(e.target.value)}
       />
       <input
         type="text"
         placeholder="Add Price ($)"
         className="form-control"
         value={codename}
         onChange={(e) => setCodename(e.target.value)}
       />
       <input
         type="text"
         placeholder="Add Warehouse"
         className="form-control"
         value={warehouse}
         onChange={(e) => setWarehouse(e.target.value)}
       />
        <select onChange={(e) => setLocationCity(e.target.value)}>
          <option value="location">Location</option>
        {playersGreen.map(player => (
                    
                    <option value={player.first_name}>
                      {player.first_name}
                    </option>

                      
                    
                ))}
                
        </select>
        <button style = {{backgroundColor:"orange",color:"black"}} className="btn btn-primary">CREATE</button>
          </div>
       
     </form></div>

     
      </div>
      <ListPlayers />
      </div>
    </Fragment>
  );
};

export default InputPlayer;
