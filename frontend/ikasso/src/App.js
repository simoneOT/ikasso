import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import './style/home.css'
import NoPage from "./pages/NoPage";
import Appartement from "./pages/Appartement";
import Liste from "./pages/Listes";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/produits/" element={<Liste/>}/>
        <Route path="/appartement/:id" element={<Appartement/>}/>
        <Route path="*" element={<NoPage />}/>
      </Routes>
    </div>
  );
}

export default App;
