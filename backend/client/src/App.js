import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import './style/home.css'
import NoPage from "./pages/NoPage";
import Appartement from "./pages/Appartement";
import Navbar from "./Component/Navbar";
import { Uidcontext } from "./Component/Log/Appcontext";
import { useEffect, useState } from "react";
import Confreservaion from "./pages/Confreservaion";

function App() {
  const[uid, setUid]= useState(null)
  useEffect(()=>{
    if(localStorage.getItem("uid")) {setUid(localStorage.getItem("uid"))}
    else setUid(null)
   },[uid])
  return (
    <Uidcontext.Provider value={uid}>
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/appartement/:id" element={<Appartement/>}/>
        <Route path="/confreservation/" element={<Confreservaion/>}/>
        <Route path="*" element={<NoPage />}/>
      </Routes>
    </Uidcontext.Provider>
  );
}

export default App;
