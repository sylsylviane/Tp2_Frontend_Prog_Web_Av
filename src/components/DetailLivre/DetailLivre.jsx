import { useParams, Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import he from "he";
import { motion } from "motion/react";
// Composant qui permet d'afficher les détails d'un livre
function DetailLivre (){
  const { id } = useParams();
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
  // Fonction qui permet de décoder les caractères spéciaux
  const d = (text) => he.decode(text);

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
      <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 px-4 py-24 sm:px-6 sm:py-32 lg:max-w-7xl lg:grid-cols-2 lg:px-8">
        <img src={`/img/${livre.image}`} alt="" />
        <div>
          <h2 className="text-3xl">{d(livre.titre)}</h2>
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
              <dd className="mt-2 text-sm">{d(livre.categories.join(", "))}</dd>
            </div>
          </dl>
          <div className="flex mt-8 gap-4 justify-between">
            <motion.div
              whileHover={{ scale: 1.1, transition: { duration: 1 } }}
              whileTap={{ scale: 0.9 }}
            >
              <Link
                to="/livres"
                className="border border-red-400 rounded-md text-gray-700 px-3.5 py-2.5 text-lg text-neutral-50 hover:bg-red-400"
              >
                Retour aux livres
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
        </div>
      </div>
    </main>
  );
}

export default DetailLivre