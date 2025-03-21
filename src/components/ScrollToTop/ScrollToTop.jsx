import { useEffect } from "react";
import { useLocation } from "react-router-dom";

// Composant qui permet de remonter en haut de la page à chaque changement de route	
const ScrollToTop = () => {
  const { pathname } = useLocation(); // Récupérer le chemin de la route. Pathname est une propriété de l'objet location qui contient le chemin de la route actuelle

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

export default ScrollToTop;
