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

        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-x-10 gap-y-20 m-[100px] py-[50px] rounded-md">
          {livres.map((livre) => {
            return <CarteLivre key={livre.id} livre={livre} />;
          })}
          {livres.length == 0 && "Aucun livre trouvé."}
        </div>

    );
}
export default ListeLivres;
