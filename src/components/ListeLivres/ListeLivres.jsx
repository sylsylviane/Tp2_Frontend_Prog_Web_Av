// TODO: IMPORTER CSS 

import { useState, useEffect } from "react";
import CarteLivre from "../CarteLivre/CarteLivre";

// Composant qui permet d'afficher la liste des livres
function ListeLivres(){
  
    let [livres, setLivres] = useState([]);

    // Récupérer les livres de la base de données
    useEffect(() => {
      async function fetchData() {
        let url = import.meta.env.VITE_DEV_URL;
        
        if (import.meta.env.VITE_MODE == "PRODUCTION") {
          url = import.meta.env.VITE_PROD_URL;
        }

        const reponse = await fetch(`${url}/livres`);
        const donneesLivres = await reponse.json();
        setLivres(donneesLivres);
      }
      fetchData();
    }, []);

    return (

        <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 2xl:gap-x-15 xl:gap-10 lg:gap-10 md:gap-25 sm:gap-20 gap-y-20 m-[100px] py-[50px]">
          {livres.map((livre) => {
            return <CarteLivre key={livre.id} livre={livre} />;
          })}
          {livres.length == 0 && "Aucun livre trouvé."}
        </div>

    );
}
export default ListeLivres;
