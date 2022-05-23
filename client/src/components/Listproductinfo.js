import React, {Fragment, useEffect, useState} from "react";
import Editproductinfo from "./Editproductinfo";
import { useNavigate } from "react-router-dom";
import '../App.css';
import { database } from "pg/lib/defaults";

const Listproductinfos = () => {


    // const apiKey = '50d37fc909dbe9bb4f2fb50827dab1c8';
    // const [weatherData, setWeatherData] = useState([{}]);
    // const [city, setCity] = useState("");

    // const getWeather = (houston) => {
    //     fetch(`https://api.openweathermap.org/data/2.5/weather?q=houston&units=imperial&APPID=50d37fc909dbe9bb4f2fb50827dab1c8`).then(
    //         response => response.json()
    //     ).then(
    //         data=>{
    //             setWeatherData(data)
                
    //         }
         
    //     )
    //   }



    let navigate = useNavigate();
    const [productinfos, setproductinfos] = useState([]);
    const [productinfosGreen, setproductinfosGreen] = useState([]);

    const deleteproductinfo = async (id) => {
        try{
            await fetch(`productinfos/${id}`,{
                method: "DELETE"
            });
            setproductinfos(productinfos.filter(productinfo => productinfo.id !== id));
            setproductinfosGreen(productinfosGreen.filter(productinfo => productinfo.id !== id));
        }catch(err){
            console.error(err.message);
        }
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

    useEffect(()=>{
        getproductinfos('red').then((jsonData) => setproductinfos(jsonData))
        
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



  
return (<Fragment>
    <div class="row">
    <div class="col-sm bg-success table-striped text-white table-responsive table-sm" style={{borderRadius:"0px 0px 0px 15px"}}>
            <table className="table table-success table-bordered table-curved mt-3 text-center">
        <thead>
        <tr>
            <th>Id</th>
            <th>Product Name</th>
            <th>Quantity</th>
            <th>Price ($)</th>
            <th>Warehouse</th>
            <th>Location</th>
        
            <th>Edit</th>
            <th>Delete</th>
        </tr>
        </thead>
        <tbody>
        {productinfos.map(productinfo => (
            <tr key={productinfo.id}>
                <td>{productinfo.id}</td>
                <td>{productinfo.product_name}</td>
                <td>{productinfo.quantity}</td>
                <td>{productinfo.price}</td>
                <td>{productinfo.warehouse}</td>
                <td>{productinfo.locationcity}</td>
                
                       
                <td><Editproductinfo productinfo={productinfo}/></td>
                <td><button className = "btn btn-danger" onClick={()=>deleteproductinfo(productinfo.id)}>Delete</button></td>
            </tr>
         ))}
    
    </tbody>
  </table></div>

  {/* <div class="col-sm-4 bg-warning text-white table-striped table-responsive table-sm" style={{borderRadius:"0px 0px 15px 0px"}}>
            <table className="table mt-3 table-bordered table-curved table-warning text-center">
        <thead>
        <tr>
        
            
            <th>Edit</th>
            <th>Delete</th>
        </tr>
        </thead>
        <tbody>
        {productinfosGreen.map(productinfo => (
            <tr key={productinfo.id}>
                <td>{productinfo.quantity}</td>
                <td>{productinfo.product_name}</td>
                
                <td><Editproductinfo productinfo={productinfo}/></td>
                <td><button className = "btn btn-danger" onClick={()=>deleteproductinfo(productinfo.id)}>Delete</button></td>
            </tr>
         ))}

    </tbody>
  </table></div> */}

    </div>
</Fragment>);
};

export default Listproductinfos;
