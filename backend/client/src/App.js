import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import './style/home.css'
import NoPage from "./pages/NoPage";
import Appartement from "./pages/Appartement";
import { Uidcontext } from "./Component/Log/Appcontext";
import { useEffect, useState } from "react";
import Confreservaion from "./pages/Confreservaion";
import Categoriapp from "./pages/Categoriapp";
import Accueil from "./pages/dasbord/Accueil";
import Addappartement from "./pages/dasbord/Addappartement";
import AppartementReserve from "./pages/dasbord/AppartementReserve";
import GetAppartement from "./pages/dasbord/GetAppartement";
import Clients from "./pages/dasbord/Clients";
import PostAppartement from "./pages/dasbord/PostAppartement";

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
          <Route path="/confreservation/:id" element={<Confreservaion/>}/>
          <Route path="/categorieappartement/:nameapp" element={<Categoriapp />} />
          <Route path="/admin/accueil" element={<Accueil />} />
          <Route path="/admin/appartement/:id" element={<GetAppartement/>} />
          <Route path="/admin/addappartement" element={<Addappartement/>} />
          <Route path="/admin/appartement/post" element={<PostAppartement/>} />
          <Route path="/admin/appartementreserve" element={<AppartementReserve/>} />
          <Route path="/admin/clients" element={<Clients/>} />
          <Route path="*" element={<NoPage />} />
        </Routes>
    </Uidcontext.Provider>
  );
}

export default App;
