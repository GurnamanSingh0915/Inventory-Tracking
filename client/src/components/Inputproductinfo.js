import React, { useEffect, Fragment, useState } from "react";
import Listproductinfos from "./Listproductinfo";
import '../App.css';
import { useNavigate } from "react-router-dom";

const Inputproductinfo = () => {
  let navigate = useNavigate();
  const [id, setId] = useState("");
  const [product_name, setProduct_name] = useState("");
  const [quantity, setQuantity] = useState("");
  const [price, setPrice] = useState("");
  const [warehouse, setWarehouse] = useState([]);
  const [locationCity, setLocationCity] = useState([]);

  
  const [chosenWarehouse, setChosenWarehouse] = useState("");
  const [chosenLocationCity, setChosenLocationCity] = useState("");

  const [locationInfo, setLocationInfo] = useState("");
  const [warehouseInfo, setWarehouseInfo] = useState("");

  const [productinfos, setproductinfos] = useState([]);
  const [productinfosGreen, setproductinfosGreen] = useState([]);

  const onSubmitForm = async (event, id, product_name, quantity, price,warehouse,locationCity, productinfoStatus) => {
    event.preventDefault();
  
    try {
      const body = {id,product_name,quantity,price,warehouse,locationCity, 'status' : productinfoStatus};
      
      //proxy is only use in development so it will be ignored in production
      //so if there is no http://localhost:5000 then by default it is going to use heroku domain
      //remember this heroku app is just our server serving the build static content and also holding the restful api

      //https://pern-productinfo-app-demo.herokuapp.com/productinfos

      const idtaken = await fetch('/check_id/'+id, {
        method: "GET",
        headers: {"Content-Type": "application/json"}
      });

      let jsonData = await idtaken.json();
      if(jsonData.id_exists === "True"){
        if(jsonData.status === 'inactive') await fetch(`productinfos/${id}`,{method: "DELETE"});
        else {
          alert("ID is already taken!");
          return;
        }
      }

      const response = await fetch("/productinfos", {
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






  const onSubmitFormLocation = async (event,warehouseInfo,locationInfo) => {
    event.preventDefault();
  
    try {
      const body = {warehouseInfo,locationInfo};
          

      const response = await fetch("/warehouselocations", {
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


const getproductinfos = async (productinfo_status) => {
  try{
      const response = await fetch('/productinfo_status/' + productinfo_status)
      const jsonData = await response.json();

      return jsonData
  }catch(err){
      console.error(err.message);
  }
  return () => {
      console.log("component unmounted");
  }
}

const getWarehouseInfo = async () => {
  try{
      const response = await fetch('/warehouses')
      const jsonData = await response.json();
      
     console.log( Object.keys(jsonData).length);

     for(var i = 0; i<Object.keys(jsonData).length; i++){
      setWarehouse(warehouse => [warehouse,(JSON.stringify(jsonData[i]).substring(14).slice(0,JSON.stringify(jsonData[i]).substring(14).length-2))] );
      
     }
      console.log(warehouse);
      return jsonData
  }catch(err){
      console.error(err.message);
  }
  return () => {
      console.log("component unmounted");
  }
}

const getLocationInfo = async () => {
  try{
      const response = await fetch('/locations')
      const jsonData = await response.json();


      for(var i = 0; i<Object.keys(jsonData).length; i++){
       setLocationCity(locationCity => [locationCity,(JSON.stringify(jsonData[i]).substring(17).slice(0,JSON.stringify(jsonData[i]).substring(17).length-2))] );
      
      }
      console.log(locationCity);

      return jsonData
  }catch(err){
      console.error(err.message);
  }
  return () => {
      console.log("component unmounted");
  }
}

useEffect(()=>{
  getproductinfos('red').then((jsonData) => setproductinfos(jsonData))
  getproductinfos('green').then((jsonData) => setproductinfosGreen(jsonData))
  getWarehouseInfo();
  getLocationInfo();
  console.log(warehouse);
  
 // getLocationInfo().then((jsonData) => setLocationCity(jsonData))
  window.addEventListener('keydown', handleUserKeyPress);

  console.log(warehouse);
  
  console.log(locationCity);
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

const [isOpened, setIsOpened] = useState(false);

  function toggle() {
    setIsOpened(wasOpened => !wasOpened);
    setIslocationOpened(false);
  }

  const [islocationOpened, setIslocationOpened] = useState(false);

  function togglelocation() {
    setIslocationOpened(waslocationOpened => !waslocationOpened);
    setIsOpened(false);
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
       <button style = {{marginTop:"1em", marginBottom:"1em", width:"50%",}} className="btn btn-primary" onClick={toggle}>ADD NEW ITEM >></button>
       
       <button style = {{marginLeft:"1em",marginTop:"1em", marginBottom:"1em", width:"50%",}} className="btn btn-primary" onClick={togglelocation}>ADD NEW WAREHOUSE/LOCATION (City) >></button>
       </div>

       {isOpened && (
     <form onSubmit={(e) => onSubmitForm(e, id, product_name, quantity, price, chosenWarehouse, chosenLocationCity, 'red')} >
       
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
         value={product_name}
         onChange={(e) => setProduct_name(e.target.value)}
         required
       />
       <input
         type="number"
         placeholder="Add Quantity"
         className="form-control"
         value={quantity}
         onChange={(e) => setQuantity(e.target.value)}
         required
       />
       <input
         type="number"
         placeholder="Add Price ($)"
         className="form-control"
         value={price}
         onChange={(e) => setPrice(e.target.value)}
         required
       />
       <select onChange={(e) => setChosenWarehouse(e.target.value)}>
          <option value="chosenWarehouse">Warehouse</option>
       
          {warehouse.map(warehouse => (     
                    <option value={warehouse} >
                      {warehouse}
                    </option>

          ))}
        </select>
        <select  onChange={(e) => setChosenLocationCity(e.target.value)}>
          <option value="chosenLocationCity">Location</option>
        
          {locationCity.map(locationCity => (               
                    <option value={locationCity}>
                      {locationCity}
                    </option>

          ))}        
        </select>
        
        <button style = {{backgroundColor:"orange",color:"black"}} className="btn btn-primary">CREATE</button>
          </div>
       
     </form>
       )}


{islocationOpened && (
     <form onSubmit={(e) => onSubmitFormLocation(e,warehouseInfo, locationInfo)} >
       
     <div class="d-flex flex-row">
      
       <input
         type="text"
         placeholder="Add Warehouse"
         className="form-control"
         value={warehouseInfo}
         onChange={(e) => setWarehouseInfo(e.target.value)}
         required
       />
         <input
         type="text"
         placeholder="Add Location"
         className="form-control"
         value={locationInfo}
         onChange={(e) => setLocationInfo(e.target.value)}
         required
       />
        <button style = {{backgroundColor:"orange",color:"black"}} className="btn btn-primary">ADD</button>
          </div>
       
     </form>
       )}
     </div>

     
      </div>
      <Listproductinfos />
      </div>
    </Fragment>
  );
};

export default Inputproductinfo;
