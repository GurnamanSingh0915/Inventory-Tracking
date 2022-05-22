import React, {Fragment, useEffect, useState} from "react";
import EditPlayer from "./EditPlayer";
import { useNavigate } from "react-router-dom";
import '../App.css';

const ListPlayers = () => {
    let navigate = useNavigate();
    const [players, setPlayers] = useState([]);
    const [playersGreen, setPlayersGreen] = useState([]);

    const deletePlayer = async (id) => {
        try{
            await fetch(`players/${id}`,{
                method: "DELETE"
            });
            setPlayers(players.filter(player => player.id !== id));
            setPlayersGreen(playersGreen.filter(player => player.id !== id));
        }catch(err){
            console.error(err.message);
        }
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
        {players.map(player => (
            <tr key={player.id}>
                <td>{player.id}</td>
                <td>{player.first_name}</td>
                <td>{player.last_name}</td>
                <td>{player.codename}</td>
                <td>{player.warehouse}</td>
                <td>{player.locationCity}</td>
                <td><EditPlayer player={player}/></td>
                <td><button className = "btn btn-danger" onClick={()=>deletePlayer(player.id)}>Delete</button></td>
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
        {playersGreen.map(player => (
            <tr key={player.id}>
                <td>{player.last_name}</td>
                <td>{player.first_name}</td>
                
                <td><EditPlayer player={player}/></td>
                <td><button className = "btn btn-danger" onClick={()=>deletePlayer(player.id)}>Delete</button></td>
            </tr>
         ))}

    </tbody>
  </table></div> */}

    </div>
</Fragment>);
};

export default ListPlayers;
