import { useParams, Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

// Composant qui permet d'afficher les détails d'un livre
function DetailFilm (){
    const {id} = useParams();
    let [livre, setLivre] = useState({
        titre:"",
        description:"",
        editeur:"",
        isbn:"",
        pages:"",
        date:"",
        image:"",
        categories:[],
        auteur:""
    });

    // Récupérer les détails d'un livre de la base de données
    useEffect(() => {
      async function fetchData() {
        let url = import.meta.env.VITE_DEV_URL;

        if (import.meta.env.VITE_MODE == "PRODUCTION") {
          url = import.meta.env.VITE_PROD_URL;
        }

        const reponse = await fetch(`${url}/livres/${id}`);
        const donneesLivre = await reponse.json();
        setLivre(donneesLivre);
      }
      fetchData();
    }, []);

    // Fonction qui permet de supprimer un livre
    async function supprimerLivre() {
      let url = import.meta.env.VITE_DEV_URL;

      if (import.meta.env.VITE_MODE == "PRODUCTION") {
        url = import.meta.env.VITE_PROD_URL;
      }

      const objDonnees = {
        method: "DELETE",
      };
      const reponse = await fetch(`${url}/livres/${id}`, objDonnees);
      if (reponse.ok) {
        navigate("/livres");
      } 
    }

    // Afficher les détails d'un livre
    return (
      <main>
        <div>
          <img src={`/img/${livre.image}`} alt="" />
          <p>
            <strong>Titre: </strong>
            {livre.titre}
          </p>
          <p>
            <strong>Description: </strong>
            {livre.description}
          </p>
          <p>
            <strong>Éditeur: </strong>
            {livre.editeur}
          </p>
          <p>
            <strong>ISBN: </strong>
            {livre.isbn}
          </p>
          <p>
            <strong>Nombre de pages: </strong>
            {livre.pages}
          </p>
          <p>
            <strong>Date de publication: </strong>
            {livre.date}
          </p>
          <p>
            <strong>Catégories: </strong>
            {livre.categories.join(", ")}
          </p>
          <p>
            <strong>Auteur: </strong>
            {livre.auteur}
          </p>

          <div onClick={supprimerLivre}>Supprimer</div>

          <Link to="/livres">Retour aux livres</Link>
        </div>
      </main>
    );
}

export default DetailFilm