const express = require('express');
const app = express();
const cors = require("cors");
const pool = require("./db");
const path = require("path");
const PORT = process.env.PORT || 5000;


if (process.env.NODE_ENV === "production") {
    //server static content
    //npm run build
    app.use(express.static(path.join(__dirname, "client/build")));
  }
  
  console.log(__dirname);
  console.log(path.join(__dirname, "client/build"));
  
//middleware
app.use(cors());
app.use(express.json());//req.body

//ROUTES//

var dgram = require('dgram');
var server = dgram.createSocket('udp4');

const WebSocket = require('ws');
const wss = new WebSocket.Server({port:8888});

var dataTransmissionAndHits = [];
var dataPoints = [];
server.on('message', function(msg){
    console.log("Number is " + msg);
    createSocketWeb(msg);
    dataTransmissionAndHits.length = 0;

    var numberPattern = /\d+/g;
    var transmitNumber = String(msg).match( numberPattern )[0];
    var hitNumber = String(msg).match( numberPattern )[1];
    console.log(transmitNumber);
    console.log(hitNumber);

   
    if(dataPoints[transmitNumber]==null){
        dataPoints[transmitNumber] = 0;
        dataPoints[transmitNumber] += 10;

        dataTransmissionAndHits[transmitNumber] = 1;
    }else{
        dataPoints[transmitNumber] += 10;

        dataTransmissionAndHits[transmitNumber] = 1;
    }
    if(dataPoints[hitNumber]==null){
        dataPoints[hitNumber] = 0;

        dataTransmissionAndHits[hitNumber] = 0;
    }else{
        if(dataPoints[hitNumber] ==0){
            dataPoints[hitNumber] ==0;

            dataTransmissionAndHits[hitNumber] = 0;
        }else{
            dataPoints[hitNumber] -= 10;

            dataTransmissionAndHits[hitNumber] = 0;

        }
    }
    
    console.log(dataTransmissionAndHits);
});

server.bind(7501);
const createSocketWeb = (msg) => {
    wss.on('connection', async(ws) => {
        ws.on('message', async(message) => {
            console.log(`${message}`);
        })

        ws.send(JSON.stringify({
            'type': 'scorePoints',    
            'obj_array': dataPoints,
            }));
            ws.send(JSON.stringify({
                'type': 'dataStats',    
                'obj_array': dataTransmissionAndHits,
                }));
    });
}



//CREATE A productinfo
app.post("/productinfos", async(req, res) =>{
    try{
      const{id, product_name, quantity, price, warehouse, locationCity, status} = req.body;
      
      const newproductinfo = await pool.query(
      "INSERT INTO productinfo (id, product_name, quantity, price, warehouse, locationCity, status) VALUES($1,$2,$3,$4,$5,$6,$7) RETURNING *",
      [id, product_name, quantity, price, warehouse, locationCity, status]
      );

      res.json(newproductinfo.rows[0]);
   
    }catch(err){
        console.error(err.message);
    }
});

//CREATE instance of locationInfo
app.post("/warehouselocations", async(req, res) =>{
    try{
      const{ warehouseInfo, locationInfo} = req.body;
      
      const newLocation = await pool.query(
      "INSERT INTO warehouselocation (warehouse, locationCity) VALUES($1,$2) RETURNING *",
      [ warehouseInfo, locationInfo]
      );

      res.json(newLocation.rows[0]);
   
    }catch(err){
        console.error(err.message);
    }
});

//GET ALL warehouses 
app.get("/warehouses", async(req,res)=>{
    try{
        const allWarehouses = await pool.query("SELECT warehouse FROM warehouselocation");
        res.json(allWarehouses.rows);
    }catch(err){
        console.error(err.message);
    }
});

//GET ALL locations 
app.get("/locations", async(req,res)=>{
    try{
        const allLocations = await pool.query("SELECT locationCity FROM warehouselocation");
        res.json(allLocations.rows);
    }catch(err){
        console.error(err.message);
    }
});

//GET ALL productinfoS DEPENDING ON STATUS
app.get("/productinfo_status/:status", async(req,res)=>{
    try{
        const status = req.params.status;
        const allproductinfos = await pool.query("SELECT * FROM productinfo WHERE status = $1", [status]);
        res.json(allproductinfos.rows);
    }catch(err){
        console.error(err.message);
    }
});

app.get("/check_id/:id", async(req,res)=>{
    try{
        const id = req.params.id;
        const found = await pool.query("SELECT status FROM productinfo WHERE id = $1", [id]);
        found.rows.length === 0 ? res.json({"id_exists" : "False"}) : res.json({"id_exists" : "True", "status" : found.rows[0].status});
    }catch(err){
        console.error(err.message);
    }
});

//GET A productinfo BASED ON ID
app.get("/productinfo_id/:id", async(req,res) =>{
    try{
    const id = req.params.id;
    const productinfo = await pool.query("SELECT * FROM productinfo WHERE id = $1", 
    [id]
    );

    res.json(productinfo.rows[0])
    }catch(err){
        console.error(err.message);
    }
});



//UPDATE A productinfo
app.put("/productinfos/:id", async(req,res)=>{
    try{
        const id = req.params.id;
        const{new_id, product_name, quantity, price, status} = req.body;
        await pool.query(
            'UPDATE "productinfo" SET id = $1, product_name = $2, quantity = $3, price = $4 , status = $5 WHERE id = $6',
            [new_id, product_name, quantity, price, status, id]
        );
        res.json("productinfo was updated!");
    }catch(err){
        console.error(err.message);
    }
});

//DELETE A productinfo
app.delete("/productinfos/:id", async(req,res)=>{
    try{
        const id = req.params.id;
        await pool.query("DELETE FROM productinfo WHERE id = $1", [id]);
        res.json("productinfo was deleted!");

    }catch(err){
        console.error(err.message);
    }
});

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client/build/index.html"));
  });

app.listen(PORT, ()=> {
    console.log(`server has started on port ${PORT}`);
});
