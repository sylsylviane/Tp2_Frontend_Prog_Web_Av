import { Route, Routes } from "react-router-dom";
import DetailLivre from "../DetailLivre/DetailLivre";
import Header from "../Header/Header";
import Accueil from "../Accueil/Accueil";
import ListeLivres from "../ListeLivres/ListeLivres";
import FormAjoutLivre from "../FormAjoutLivre/FormAjoutLivre";
import Footer from "../Footer/Footer";
import FormModifierLivre from "../FormModifierLivre/FormModifierLivre";
import AuthContextProvider from "../AuthContext/AuthContext";
import ScrollToTop from "../ScrollToTop/ScrollToTop";

function App() {
  return (
    <AuthContextProvider>
      <Header />
      <ScrollToTop />
      <main>
        <Routes>
          <Route path="/" element={<Accueil />} />
          <Route path="/livres" element={<ListeLivres />} />
          <Route path="/livres/ajout" element={<FormAjoutLivre />} />
          <Route path="/livres/modifier/:id" element={<FormModifierLivre />} />
          <Route path="/livres/:id" element={<DetailLivre />} />
        </Routes>
      </main>
      <Footer />
    </AuthContextProvider>
  );
}

export default App;
