import React, { Fragment } from "react";
import Inputproductinfo from "./components/Inputproductinfo";
import AppSlashproductinfo from "./components/AppSplashproductinfo";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";


function App() {
  return (
    <Fragment>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<AppSlashproductinfo/>}/>
          <Route index element={<AppSlashproductinfo/>} />
          <Route path="/entryscreen" element={<Inputproductinfo/>} />
      </Routes>
    </BrowserRouter>
    
    </Fragment>
  );
}

export default App;
