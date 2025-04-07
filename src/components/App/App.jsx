import { Route, Routes, useLocation } from "react-router-dom";
import DetailLivre from "../DetailLivre/DetailLivre";
import Header from "../Header/Header";
import Accueil from "../Accueil/Accueil";
import ListeLivres from "../ListeLivres/ListeLivres";
import FormAjoutLivre from "../FormAjoutLivre/FormAjoutLivre";
import Footer from "../Footer/Footer";
import FormModifierLivre from "../FormModifierLivre/FormModifierLivre";
import AuthContextProvider from "../AuthContext/AuthContext";
import ScrollToTop from "../ScrollToTop/ScrollToTop";
import AdminRoute from "../AdminRoute/AdminRoute";
import { HelmetProvider } from "react-helmet-async";

function App() {
  return (
    <HelmetProvider>
      <AuthContextProvider>
        <Header />
        <ScrollToTop />
        <main className="min-h-screen mx-auto py-3 px-4 sm:px-6 lg:px-8">
          <Routes>
            <Route path="/" element={<Accueil />} />
            <Route path="/livres" element={<ListeLivres />} />
            <Route element={<AdminRoute />}>
              <Route path="/livres/ajout" element={<FormAjoutLivre />} />
              <Route
                path="/livres/modifier/:id"
                element={<FormModifierLivre />}
              />
            </Route>
            <Route path="/livres/:id" element={<DetailLivre />} />
          </Routes>
        </main>
        <Footer />
      </AuthContextProvider>
    </HelmetProvider>
  );
}

export default App;
