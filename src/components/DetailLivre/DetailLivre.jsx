import { useParams, Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import he from "he";
import { motion } from "motion/react";
import { AuthContext } from "../AuthContext/AuthContext";
import { useContext } from "react";
import { Helmet } from "react-helmet-async";
// Composant qui permet d'afficher les détails d'un livre
function DetailLivre() {
  // Récupérer l'identifiant du livre à afficher
  const { id } = useParams();

  // Définition de l'état du livre
  let [livre, setLivre] = useState({
    titre: "",
    description: "",
    editeur: "",
    isbn: "",
    pages: "",
    date: "",
    image: "",
    categories: [],
    auteur: "",
  });

  const { jeton, connexion, deconnexion } = useContext(AuthContext);

  // Fonction qui permet de décoder les caractères spéciaux
  const d = (text) => he.decode(text);

  // Utiliser le hook useNavigate pour la navigation
  const navigate = useNavigate();

  // Définition de l'état du message
  const [message, setMessage] = useState("");

  // Récupérer les détails d'un livre de la base de données
  useEffect(() => {
    async function fetchData() {
      try {
        let url = import.meta.env.VITE_DEV_URL;

        if (import.meta.env.VITE_MODE == "PRODUCTION") {
          url = import.meta.env.VITE_PROD_URL;
        }

        const reponse = await fetch(`${url}/livres/${id}`);
        const donneesLivre = await reponse.json();
        setLivre(donneesLivre);
      } catch (erreur) {
        setMessage("Une erreur s'est produite. Veuillez réessayer plus tard.");
      }
    }
    fetchData();
  }, []);

  // Fonction qui permet de supprimer un livre
  async function supprimerLivre() {
    try {
      let url = import.meta.env.VITE_DEV_URL;

      if (import.meta.env.VITE_MODE == "PRODUCTION") {
        url = import.meta.env.VITE_PROD_URL;
      }

      const objDonnees = {
        method: "DELETE",
        headers:{
          authorization: `Bearer ${jeton}`,	
        }
      };
      const reponse = await fetch(`${url}/livres/${id}`, objDonnees);
      if (reponse.ok) {
        navigate("/livres");
      } else {
        setMessage("Erreur lors de la suppression du livre.");
      }
    } catch (erreur) {
      setMessage("Une erreur s'est produite. Veuillez réessayer plus tard.");
    }
  }

  // Afficher les détails d'un livre
  return (
    <>
      <Helmet>
        <title>Libra System - {d(livre.titre)}</title>
        <meta name="description" content={d(livre.description)} />
        <meta
          name="keywords"
          content="Api rest, livre, bibliothèque, gestion de livres, catalogue, recherche de livres"
        />
      </Helmet>
      <div>
        <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 px-4 py-24 sm:px-6 sm:py-32 lg:max-w-7xl lg:grid-cols-2 lg:px-8">
          <img src={`/img/${livre.image}`} alt="" />
          <div>
            <h2 className="text-3xl">{d(livre.titre)} </h2>
            <p className="mt-4">{d(livre.description)}</p>
            <dl className="mt-16 grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-8">
              <div className="border-t border-gray-200 pt-4">
                <dt className="font-medium">Auteur</dt>
                <dd className="mt-2 text-sm">{d(livre.auteur)}</dd>
              </div>
              <div className="border-t border-gray-200 pt-4">
                <dt className="font-medium">Éditeur</dt>
                <dd className="mt-2 text-sm">{d(livre.editeur)}</dd>
              </div>
              <div className="border-t border-gray-200 pt-4">
                <dt className="font-medium">ISBN</dt>
                <dd className="mt-2 text-sm">{d(livre.isbn)}</dd>
              </div>
              <div className="border-t border-gray-200 pt-4">
                <dt className="font-medium">Nombre de pages</dt>
                <dd className="mt-2 text-sm">{d(livre.pages)}</dd>
              </div>
              <div className="border-t border-gray-200 pt-4">
                <dt className="font-medium">Date de publication</dt>
                <dd className="mt-2 text-sm">{d(livre.date)}</dd>
              </div>
              <div className="border-t border-gray-200 pt-4">
                <dt className="font-medium">Catégorie(s)</dt>
                <dd className="mt-2 text-sm">
                  {d(livre.categories.join(", "))}
                </dd>
              </div>
            </dl>
            {jeton && (
              <div className="flex mt-8 gap-4 justify-between">
                <motion.div
                  whileHover={{ scale: 1.1, transition: { duration: 1 } }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Link
                    to={`/livres/modifier/${id}`}
                    className="border-red-400 bg-red-400 uppercase rounded-md text-gray-700 px-3.5 py-2.5 text-lg text-neutral-50 hover:bg-red-400"
                  >
                    Modifier
                  </Link>
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.1, transition: { duration: 1 } }}
                  whileTap={{ scale: 0.9 }}
                  className="font-[Cormorant_Garamond] uppercase bg-red-800 px-3.5 py-2.5 text-lg rounded-md text-white hover:bg-red-400"
                  onClick={supprimerLivre}
                >
                  Supprimer
                </motion.div>
              </div>
            )}
            <div className="mt-5">
              <Link
                to="/livres"
                className="border border-red-400 rounded-md text-gray-700 px-3.5 py-2.5 text-lg text-neutral-50 hover:bg-red-400"
              >
                Retour aux livres
              </Link>
            </div>
          </div>
        </div>
        {/* Afficher message */}
        {message ? (
          <div className="border rounded-md p-3 m-[100px] ">
            <p>{message}</p>
          </div>
        ) : (
          ""
        )}
      </div>
    </>
  );
}

export default DetailLivre;
