// IMPORTER LES STYLES CSS DE L'APP ICI

import { Route, Routes } from "react-router-dom";
import DetailFilm from "../DetailLivre/DetailLivre";
import Header from "../Header/Header";
import Accueil from "../Accueil/Accueil";
import ListeLivres from "../ListeLivres/ListeLivres";
import FormAjoutLivre from "../FormAjoutLivre/FormAjoutLivre";
import Footer from "../Footer/Footer";
function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Accueil />} />
        <Route path="/livres" element={<ListeLivres />} />
        <Route path="/livres/:id" element={<DetailFilm />} />
        <Route path="/livres/ajout" element={<FormAjoutLivre />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
