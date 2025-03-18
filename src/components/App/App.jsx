// IMPORTER LES STYLES CSS DE L'APP ICI

import { Route, Routes } from "react-router-dom";
import DetailLivre from "../DetailLivre/DetailLivre";
import Header from "../Header/Header";
import Accueil from "../Accueil/Accueil";
import ListeLivres from "../ListeLivres/ListeLivres";
import FormAjoutLivre from "../FormAjoutLivre/FormAjoutLivre";
import Footer from "../Footer/Footer";
import FormModifierLivre from "../FormModifierLivre/FormModifierLivre";
function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Accueil />} />
        <Route path="/livres" element={<ListeLivres />} />
        <Route path="/livres/ajout" element={<FormAjoutLivre />} />
        <Route path="/livres/modifier/:id" element={<FormModifierLivre />} />
        <Route path="/livres/:id" element={<DetailLivre />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
