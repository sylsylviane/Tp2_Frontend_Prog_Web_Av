// IMPORTER LES STYLES CSS DE L'APP ICI

import { Route, Routes } from "react-router-dom";

import Header from "../Header/Header";
import Accueil from "../Accueil/Accueil";
import ListeLivres from "../ListeLivres/ListeLivres";
import CarteLivre from "../CarteLivre/CarteLivre";
function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Accueil />} />
        <Route path="/livres" element={<ListeLivres />} />
        <Route path="/livres/:id" element={<CarteLivre />} />
      </Routes>
    </>
  );
}

export default App;
